"""
Sistema de Simulação de Regras de Automação - Eproc
Testes rigorosos para validar as regras antes da implementação
"""

import re
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Set, Callable
from enum import Enum
from datetime import datetime, timedelta
import json

# ============================================
# MODELOS DE DADOS
# ============================================

class TipoControle(Enum):
    POR_DATA = "POR_DATA"
    POR_EVENTO = "POR_EVENTO"
    POR_PETICAO = "POR_PETICAO"
    POR_TEMPO_LOCALIZADOR = "POR_TEMPO_LOCALIZADOR"

class ComportamentoRemover(Enum):
    REMOVER_ORIGEM = "REMOVER_ORIGEM"
    NAO_REMOVER = "NAO_REMOVER"
    REMOVER_TODOS = "REMOVER_TODOS"

@dataclass
class Parte:
    nome: str
    cpf: str
    data_nascimento: datetime
    polo: str  # "ATIVO" ou "PASSIVO"
    
    @property
    def idade(self) -> int:
        hoje = datetime.now()
        return hoje.year - self.data_nascimento.year - (
            (hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day)
        )

@dataclass
class Processo:
    numero: str
    classe: str
    assunto: str
    competencia: str
    localizadores: Set[str] = field(default_factory=set)
    conteudo_peticao: str = ""
    ultima_movimentacao: datetime = field(default_factory=datetime.now)
    partes: List[Parte] = field(default_factory=list)
    eventos: List[Dict] = field(default_factory=list)
    
    def dias_sem_movimentacao(self) -> int:
        return (datetime.now() - self.ultima_movimentacao).days
    
    def tem_parte_idosa(self) -> bool:
        return any(p.idade >= 60 and p.polo == "ATIVO" for p in self.partes)
    
    def adicionar_localizador(self, loc: str):
        self.localizadores.add(loc)
    
    def remover_localizador(self, loc: str):
        self.localizadores.discard(loc)
    
    def esta_em_localizador(self, loc: str) -> bool:
        return loc in self.localizadores

@dataclass
class Classificador:
    """Classificador por conteúdo usando palavras-chave"""
    nome: str
    palavras: List[str]
    operador: str = "OU"  # "OU" ou "E"
    tolerancia: float = 0.05
    
    def avaliar(self, texto: str) -> bool:
        texto_lower = texto.lower()
        
        if self.operador == "OU":
            return any(palavra.lower() in texto_lower for palavra in self.palavras)
        elif self.operador == "E":
            return all(palavra.lower() in texto_lower for palavra in self.palavras)
        return False

@dataclass
class RegraAutomacao:
    """Definição de uma regra de automação"""
    id: str
    nome: str
    origem: List[str]  # Lista de localizadores de origem
    destino: str       # Localizador de destino
    tipo_controle: TipoControle
    comportamento: ComportamentoRemover
    classificador: Optional[Classificador] = None
    filtro_assunto: Optional[List[str]] = None
    filtro_competencia: Optional[str] = None
    dias_tempo: Optional[int] = None  # Para controle por tempo
    filtro_idade_minima: Optional[int] = None
    
    def aplicar(self, processo: Processo) -> Dict:
        """
        Aplica a regra ao processo e retorna o resultado.
        Retorna dict com 'aplicada', 'motivo', 'acoes'
        """
        resultado = {
            "regra_id": self.id,
            "regra_nome": self.nome,
            "processo": processo.numero,
            "aplicada": False,
            "motivo": "",
            "acoes": []
        }
        
        # Verificar se está em localizador de origem
        em_origem = any(processo.esta_em_localizador(loc) for loc in self.origem)
        if not em_origem and self.origem[0] != "*":
            resultado["motivo"] = f"Processo não está em localizador de origem {self.origem}"
            return resultado
        
        # Verificar filtro de assunto
        if self.filtro_assunto:
            if not any(ass.lower() in processo.assunto.lower() for ass in self.filtro_assunto):
                resultado["motivo"] = f"Assunto '{processo.assunto}' não corresponde ao filtro"
                return resultado
        
        # Verificar filtro de competência
        if self.filtro_competencia:
            if self.filtro_competencia.lower() not in processo.competencia.lower():
                resultado["motivo"] = f"Competência não corresponde ao filtro"
                return resultado
        
        # Verificar classificador de conteúdo
        if self.classificador:
            if not self.classificador.avaliar(processo.conteudo_peticao):
                resultado["motivo"] = f"Conteúdo não correspondeu ao classificador '{self.classificador.nome}'"
                return resultado
        
        # Verificar tempo no localizador
        if self.tipo_controle == TipoControle.POR_TEMPO_LOCALIZADOR:
            if processo.dias_sem_movimentacao() < self.dias_tempo:
                resultado["motivo"] = f"Tempo no localizador ({processo.dias_sem_movimentacao()} dias) < {self.dias_tempo} dias"
                return resultado
        
        # Verificar filtro de idade
        if self.filtro_idade_minima:
            if not any(p.idade >= self.filtro_idade_minima and p.polo == "ATIVO" for p in processo.partes):
                resultado["motivo"] = f"Nenhuma parte ativa com idade >= {self.filtro_idade_minima}"
                return resultado
        
        # REGRA APROVADA - aplicar ações
        resultado["aplicada"] = True
        resultado["motivo"] = "Todos os critérios atendidos"
        
        # Aplicar comportamento de remoção
        if self.comportamento == ComportamentoRemover.REMOVER_ORIGEM:
            for loc in self.origem:
                if processo.esta_em_localizador(loc):
                    processo.remover_localizador(loc)
                    resultado["acoes"].append(f"REMOVIDO de '{loc}'")
        
        # Adicionar ao destino
        processo.adicionar_localizador(self.destino)
        resultado["acoes"].append(f"ADICIONADO em '{self.destino}'")
        
        return resultado


# ============================================
# DEFINIÇÃO DAS REGRAS
# ============================================

def criar_regras() -> List[RegraAutomacao]:
    """Cria todas as 15 regras de automação"""
    
    regras = []
    
    # GRUPO 1: TRIAGEM
    
    # TRIA-01: LOAS/BPC
    regras.append(RegraAutomacao(
        id="TRIA-01",
        nome="Triagem LOAS/BPC",
        origem=["2.3 GAB03-TR02"],
        destino="2.3 LOAS",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="LOAS Keywords",
            palavras=["BPC", "LOAS", "benefício assistencial", "Lei 8.742", "deficiente"],
            operador="OU"
        ),
        filtro_assunto=["Deficiente"]
    ))
    
    # TRIA-02: Aposentadoria Especial
    regras.append(RegraAutomacao(
        id="TRIA-02",
        nome="Triagem Ap. Especial/ATC",
        origem=["2.3 GAB03-TR02"],
        destino="2.3 Ap. Especial/ATC",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="Especial Keywords",
            palavras=["aposentadoria especial", "tempo especial", "atividade insalubre", "agente nocivo"],
            operador="OU"
        ),
        filtro_assunto=["Aposentadoria Especial", "Aposentadoria por Tempo"]
    ))
    
    # TRIA-03: Aposentadoria por Idade
    regras.append(RegraAutomacao(
        id="TRIA-03",
        nome="Triagem Ap. Idade",
        origem=["2.3 GAB03-TR02"],
        destino="2.3 Ap. Idade urbana",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="Idade Keywords",
            palavras=["aposentadoria por idade", "idade mínima", "art. 48"],
            operador="OU"
        ),
        filtro_assunto=["Aposentadoria por Idade"]
    ))
    
    # TRIA-04: Incapacidade
    regras.append(RegraAutomacao(
        id="TRIA-04",
        nome="Triagem Incapacidade",
        origem=["2.3 GAB03-TR02"],
        destino="2.3 Benefício Incapacidade",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="Incapacidade Keywords",
            palavras=["auxílio-doença", "aposentadoria por invalidez", "incapacidade", "perícia médica"],
            operador="OU"
        ),
        filtro_assunto=["Auxílio-Doença", "Aposentadoria por Invalidez"]
    ))
    
    # TRIA-05: Pensão
    regras.append(RegraAutomacao(
        id="TRIA-05",
        nome="Triagem Pensão",
        origem=["2.3 GAB03-TR02"],
        destino="2.3 Pensão (RGPS)",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="Pensao Keywords",
            palavras=["pensão por morte", "dependente", "óbito do segurado"],
            operador="OU"
        ),
        filtro_assunto=["Pensão por Morte"]
    ))
    
    # GRUPO 2: PRAZOS
    
    # PRAZO-01: Alerta 60 dias
    regras.append(RegraAutomacao(
        id="PRAZO-01",
        nome="Alerta Parados >60 dias",
        origem=["2.3 LOAS", "2.3 Ap. Especial/ATC", "2.3 Ap. Idade urbana", 
                "2.3 Benefício Incapacidade", "2.3 Pensão (RGPS)"],
        destino="2.3 ALERTA - Parados >60 dias",
        tipo_controle=TipoControle.POR_TEMPO_LOCALIZADOR,
        comportamento=ComportamentoRemover.NAO_REMOVER,
        dias_tempo=60
    ))
    
    # PRAZO-02: Crítico 120 dias
    regras.append(RegraAutomacao(
        id="PRAZO-02",
        nome="Crítico Parados >120 dias",
        origem=["2.3 ALERTA - Parados >60 dias"],
        destino="2.3 CRÍTICO - Parados >120 dias",
        tipo_controle=TipoControle.POR_TEMPO_LOCALIZADOR,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        dias_tempo=60  # 60 dias adicionais após o alerta
    ))
    
    # PRAZO-03: Prioridade Idoso
    regras.append(RegraAutomacao(
        id="PRAZO-03",
        nome="Prioridade Idoso",
        origem=["2.3 LOAS", "2.3 Ap. Especial/ATC", "2.3 Ap. Idade urbana", 
                "2.3 Benefício Incapacidade", "2.3 Pensão (RGPS)"],
        destino="2.3 PRIORIDADE IDOSO",
        tipo_controle=TipoControle.POR_TEMPO_LOCALIZADOR,
        comportamento=ComportamentoRemover.NAO_REMOVER,
        dias_tempo=30,
        filtro_idade_minima=60
    ))
    
    # GRUPO 3: SUSPENSÃO
    
    # SUSP-01: Tema 1.102/STF
    regras.append(RegraAutomacao(
        id="SUSP-01",
        nome="Suspensão Revisão Vida Toda",
        origem=["*"],  # Qualquer localizador
        destino="2.3 tema 1.102/STF - Suspensos",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="RVT Keywords",
            palavras=["revisão da vida toda", "regra definitiva", "art. 29, I", "art. 29, II"],
            operador="OU"
        ),
        filtro_assunto=["RMI", "Revisão"]
    ))
    
    # SUSP-02: Tema 1.031/STJ
    regras.append(RegraAutomacao(
        id="SUSP-02",
        nome="Suspensão Vigilante",
        origem=["2.3 Ap. Especial/ATC"],
        destino="2.3 - Tema 1031/STJ",
        tipo_controle=TipoControle.POR_DATA,
        comportamento=ComportamentoRemover.REMOVER_ORIGEM,
        classificador=Classificador(
            nome="Vigilante Keywords",
            palavras=["vigilante", "vigia", "segurança patrimonial", "segurança privada"],
            operador="OU"
        )
    ))
    
    return regras


# ============================================
# FÁBRICA DE PROCESSOS PARA TESTES
# ============================================

class FabricaProcessos:
    """Gera processos de teste com cenários diversos"""
    
    @staticmethod
    def criar_processo_loas_tipico() -> Processo:
        """Processo típico de LOAS/BPC"""
        return Processo(
            numero="0001234-56.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Deficiente",
            competencia="JEF Previdenciária",
            localizadores={"2.3 GAB03-TR02"},
            conteudo_peticao="""
                Trata-se de recurso inominado interposto pela parte autora em face de 
                sentença que julgou improcedente o pedido de concessão de BENEFÍCIO DE 
                PRESTAÇÃO CONTINUADA - BPC/LOAS, previsto no art. 20 da Lei 8.742/93.
                O autor é pessoa portadora de deficiência, conforme laudo médico anexo.
                A renda per capita familiar é inferior a 1/4 do salário mínimo.
            """,
            partes=[Parte("Maria Silva", "111.222.333-44", datetime(1960, 5, 15), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_aposentadoria_especial() -> Processo:
        """Processo de aposentadoria especial"""
        return Processo(
            numero="0002222-11.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Aposentadoria Especial (Art. 57/8)",
            competencia="JEF Previdenciária",
            localizadores={"2.3 GAB03-TR02"},
            conteudo_peticao="""
                Recurso contra sentença que negou o pedido de APOSENTADORIA ESPECIAL 
                com base no reconhecimento de TEMPO ESPECIAL por exposição a agentes 
                nocivos (ruído acima de 85 dB) durante atividade insalubre.
                O recorrente laborou como torneiro mecânico de 1990 a 2015.
            """,
            partes=[Parte("José Santos", "222.333.444-55", datetime(1965, 8, 20), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_vigilante() -> Processo:
        """Processo de vigilante (tema suspensão)"""
        return Processo(
            numero="0003333-99.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Aposentadoria Especial (Art. 57/8)",
            competencia="JEF Previdenciária",
            localizadores={"2.3 Ap. Especial/ATC"},
            conteudo_peticao="""
                Recurso requerendo o reconhecimento de TEMPO ESPECIAL para a 
                atividade de VIGILANTE armado, exercida de 1995 a 2010, com 
                exposição permanente a risco de vida.
            """,
            partes=[Parte("Pedro Oliveira", "333.444.555-66", datetime(1970, 3, 10), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_incapacidade() -> Processo:
        """Processo de auxílio-doença"""
        return Processo(
            numero="0004444-33.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Auxílio-Doença Previdenciário",
            competencia="JEF Previdenciária",
            localizadores={"2.3 GAB03-TR02"},
            conteudo_peticao="""
                Recurso inominado contra sentença que julgou improcedente o pedido de 
                AUXÍLIO-DOENÇA, com conversão em APOSENTADORIA POR INVALIDEZ, tendo em 
                vista a incapacidade laborativa total e permanente demonstrada na perícia médica.
            """,
            partes=[Parte("Ana Costa", "444.555.666-77", datetime(1975, 12, 25), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_revisao_vida_toda() -> Processo:
        """Processo de revisão da vida toda"""
        return Processo(
            numero="0005555-44.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="RMI - Renda Mensal Inicial",
            competencia="JEF Previdenciária",
            localizadores={"2.3 GAB03-TR02"},
            conteudo_peticao="""
                Recurso pleiteando a REVISÃO DA VIDA TODA, com base na aplicação 
                da REGRA DEFINITIVA prevista no art. 29, I e II, da Lei 8.213/91, 
                por ser mais favorável ao segurado do que a regra de transição.
            """,
            partes=[Parte("Carlos Ferreira", "555.666.777-88", datetime(1955, 4, 8), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_parado_70_dias() -> Processo:
        """Processo parado há 70 dias"""
        return Processo(
            numero="0006666-55.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Deficiente",
            competencia="JEF Previdenciária",
            localizadores={"2.3 LOAS"},
            conteudo_peticao="Processo de LOAS em andamento",
            ultima_movimentacao=datetime.now() - timedelta(days=70),
            partes=[Parte("Francisca Lima", "666.777.888-99", datetime(1980, 7, 30), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_idoso_parado() -> Processo:
        """Processo de idoso parado há 35 dias"""
        return Processo(
            numero="0007777-66.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Aposentadoria por Idade",
            competencia="JEF Previdenciária",
            localizadores={"2.3 Ap. Idade urbana"},
            conteudo_peticao="Processo de aposentadoria",
            ultima_movimentacao=datetime.now() - timedelta(days=35),
            partes=[Parte("Antônio Pereira", "777.888.999-00", datetime(1955, 2, 12), "ATIVO")]  # 69 anos
        )
    
    @staticmethod
    def criar_processo_jovem_parado() -> Processo:
        """Processo de pessoa jovem parado há 35 dias (não deve ter prioridade)"""
        return Processo(
            numero="0008888-77.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Auxílio-Doença Previdenciário",
            competencia="JEF Previdenciária",
            localizadores={"2.3 Benefício Incapacidade"},
            conteudo_peticao="Processo de auxílio-doença",
            ultima_movimentacao=datetime.now() - timedelta(days=35),
            partes=[Parte("Lucas Souza", "888.999.000-11", datetime(1995, 9, 5), "ATIVO")]  # 29 anos
        )
    
    @staticmethod
    def criar_processo_nao_previdenciario() -> Processo:
        """Processo que não é previdenciário (não deve ser triado)"""
        return Processo(
            numero="0009999-88.2025.4.02.5151",
            classe="Mandado de Segurança Cível",
            assunto="Servidor Público Civil",
            competencia="Administrativa",
            localizadores={"2.3 GAB03-TR02"},
            conteudo_peticao="""
                Mandado de segurança contra ato do Diretor do INSS que indeferiu
                pedido de remoção do servidor público.
            """,
            partes=[Parte("Marcos Alves", "999.000.111-22", datetime(1985, 11, 18), "ATIVO")]
        )
    
    @staticmethod
    def criar_processo_limite_loas_aposentadoria() -> Processo:
        """Caso limite: menciona deficiência mas pede aposentadoria"""
        return Processo(
            numero="0010000-99.2025.4.02.5151",
            classe="Recurso Inominado Cível",
            assunto="Aposentadoria por Idade",  # NÃO é LOAS
            competencia="JEF Previdenciária",
            localizadores={"2.3 GAB03-TR02"},
            conteudo_peticao="""
                O autor, pessoa idosa com deficiência, requer a concessão de 
                aposentadoria por idade, alegando que a renda familiar não permite 
                sua sobrevivência digna.
            """,
            partes=[Parte("Joana Martins", "000.111.222-33", datetime(1958, 6, 22), "ATIVO")]
        )


# ============================================
# EXECUTOR DE TESTES
# ============================================

class TestResult:
    """Resultado de um teste individual"""
    def __init__(self, nome: str, passou: bool, detalhes: str):
        self.nome = nome
        self.passou = passou
        self.detalhes = detalhes
    
    def __str__(self):
        status = "✅ PASS" if self.passou else "❌ FAIL"
        return f"{status} | {self.nome}\n    {self.detalhes}"


class SimuladorRegras:
    """Executa simulações das regras"""
    
    def __init__(self):
        self.regras = criar_regras()
        self.resultados: List[TestResult] = []
    
    def obter_regra(self, id_regra: str) -> Optional[RegraAutomacao]:
        for regra in self.regras:
            if regra.id == id_regra:
                return regra
        return None
    
    def executar_teste(self, nome_teste: str, processo: Processo, 
                       regra_id: str, espera_aplicar: bool) -> TestResult:
        """Executa um teste individual"""
        regra = self.obter_regra(regra_id)
        if not regra:
            return TestResult(nome_teste, False, f"Regra {regra_id} não encontrada")
        
        resultado = regra.aplicar(processo)
        
        passou = resultado["aplicada"] == espera_aplicar
        
        if passou:
            detalhes = f"Resultado conforme esperado. {resultado['motivo']}"
            if resultado['acoes']:
                detalhes += f" Ações: {', '.join(resultado['acoes'])}"
        else:
            detalhes = f"FALHA! Esperava aplicar={espera_aplicar}, obteve={resultado['aplicada']}. {resultado['motivo']}"
        
        return TestResult(nome_teste, passou, detalhes)
    
    def rodar_todos_testes(self) -> List[TestResult]:
        """Executa todos os cenários de teste"""
        self.resultados = []
        fabrica = FabricaProcessos()
        
        print("=" * 70)
        print("EXECUTANDO SIMULAÇÕES DE REGRAS DE AUTOMAÇÃO")
        print("=" * 70)
        
        # =====================
        # TESTES TRIA-01 (LOAS)
        # =====================
        print("\n📋 GRUPO: TRIAGEM LOAS (TRIA-01)")
        
        # Cenário positivo: LOAS típico
        proc = fabrica.criar_processo_loas_tipico()
        self.resultados.append(self.executar_teste(
            "TRIA-01.1: LOAS típico deve ser triado",
            proc, "TRIA-01", True
        ))
        
        # Cenário negativo: Aposentadoria especial não deve ir para LOAS
        proc = fabrica.criar_processo_aposentadoria_especial()
        self.resultados.append(self.executar_teste(
            "TRIA-01.2: Ap. Especial NÃO deve ir para LOAS",
            proc, "TRIA-01", False
        ))
        
        # Cenário limite: Menciona deficiência mas pede aposentadoria
        proc = fabrica.criar_processo_limite_loas_aposentadoria()
        self.resultados.append(self.executar_teste(
            "TRIA-01.3: Limite - menciona deficiência mas assunto é Aposentadoria",
            proc, "TRIA-01", False
        ))
        
        # ==========================
        # TESTES TRIA-02 (ESPECIAL)
        # ==========================
        print("\n📋 GRUPO: TRIAGEM APOSENTADORIA ESPECIAL (TRIA-02)")
        
        proc = fabrica.criar_processo_aposentadoria_especial()
        self.resultados.append(self.executar_teste(
            "TRIA-02.1: Ap. Especial típico deve ser triado",
            proc, "TRIA-02", True
        ))
        
        proc = fabrica.criar_processo_loas_tipico()
        self.resultados.append(self.executar_teste(
            "TRIA-02.2: LOAS NÃO deve ir para Ap. Especial",
            proc, "TRIA-02", False
        ))
        
        # =============================
        # TESTES TRIA-04 (INCAPACIDADE)
        # =============================
        print("\n📋 GRUPO: TRIAGEM INCAPACIDADE (TRIA-04)")
        
        proc = fabrica.criar_processo_incapacidade()
        self.resultados.append(self.executar_teste(
            "TRIA-04.1: Auxílio-doença deve ser triado",
            proc, "TRIA-04", True
        ))
        
        proc = fabrica.criar_processo_loas_tipico()
        self.resultados.append(self.executar_teste(
            "TRIA-04.2: LOAS NÃO deve ir para Incapacidade",
            proc, "TRIA-04", False
        ))
        
        # =========================
        # TESTES SUSP-01 (RVT)
        # =========================
        print("\n📋 GRUPO: SUSPENSÃO REVISÃO VIDA TODA (SUSP-01)")
        
        proc = fabrica.criar_processo_revisao_vida_toda()
        self.resultados.append(self.executar_teste(
            "SUSP-01.1: RVT deve ser suspenso",
            proc, "SUSP-01", True
        ))
        
        proc = fabrica.criar_processo_aposentadoria_especial()
        self.resultados.append(self.executar_teste(
            "SUSP-01.2: Ap. Especial comum NÃO deve ser suspenso por RVT",
            proc, "SUSP-01", False
        ))
        
        # ==========================
        # TESTES SUSP-02 (VIGILANTE)
        # ==========================
        print("\n📋 GRUPO: SUSPENSÃO VIGILANTE (SUSP-02)")
        
        proc = fabrica.criar_processo_vigilante()
        self.resultados.append(self.executar_teste(
            "SUSP-02.1: Vigilante deve ser suspenso",
            proc, "SUSP-02", True
        ))
        
        proc = fabrica.criar_processo_aposentadoria_especial()
        self.resultados.append(self.executar_teste(
            "SUSP-02.2: Torneiro mecânico NÃO deve ser suspenso",
            proc, "SUSP-02", False
        ))
        
        # =======================
        # TESTES PRAZO-01 (60 DIAS)
        # =======================
        print("\n📋 GRUPO: ALERTA PARADOS >60 DIAS (PRAZO-01)")
        
        proc = fabrica.criar_processo_parado_70_dias()
        self.resultados.append(self.executar_teste(
            "PRAZO-01.1: Parado 70 dias deve receber alerta",
            proc, "PRAZO-01", True
        ))
        
        proc = fabrica.criar_processo_loas_tipico()  # recém movimentado
        self.resultados.append(self.executar_teste(
            "PRAZO-01.2: Processo recente NÃO deve receber alerta",
            proc, "PRAZO-01", False
        ))
        
        # ========================
        # TESTES PRAZO-03 (IDOSO)
        # ========================
        print("\n📋 GRUPO: PRIORIDADE IDOSO (PRAZO-03)")
        
        proc = fabrica.criar_processo_idoso_parado()
        self.resultados.append(self.executar_teste(
            "PRAZO-03.1: Idoso parado 35 dias deve ter prioridade",
            proc, "PRAZO-03", True
        ))
        
        proc = fabrica.criar_processo_jovem_parado()
        self.resultados.append(self.executar_teste(
            "PRAZO-03.2: Jovem parado 35 dias NÃO deve ter prioridade",
            proc, "PRAZO-03", False
        ))
        
        # ==========================
        # TESTE PROCESSO NÃO PREVIDENCIÁRIO
        # ==========================
        print("\n📋 GRUPO: PROCESSOS NÃO PREVIDENCIÁRIOS")
        
        proc = fabrica.criar_processo_nao_previdenciario()
        self.resultados.append(self.executar_teste(
            "FILTRO.1: MS Administrativo NÃO deve ser triado para LOAS",
            proc, "TRIA-01", False
        ))
        
        self.resultados.append(self.executar_teste(
            "FILTRO.2: MS Administrativo NÃO deve ser triado para Especial",
            proc, "TRIA-02", False
        ))
        
        return self.resultados
    
    def gerar_relatorio(self) -> str:
        """Gera relatório dos testes"""
        total = len(self.resultados)
        passou = sum(1 for r in self.resultados if r.passou)
        falhou = total - passou
        
        relatorio = []
        relatorio.append("\n" + "=" * 70)
        relatorio.append("RELATÓRIO DE SIMULAÇÕES")
        relatorio.append("=" * 70)
        
        for resultado in self.resultados:
            relatorio.append(str(resultado))
        
        relatorio.append("\n" + "-" * 70)
        relatorio.append(f"RESUMO: {passou}/{total} testes passaram ({100*passou/total:.1f}%)")
        
        if falhou > 0:
            relatorio.append(f"⚠️  {falhou} testes falharam - revisão necessária")
        else:
            relatorio.append("✅ Todos os testes passaram - regras prontas para implementação")
        
        relatorio.append("-" * 70)
        
        return "\n".join(relatorio)


# ============================================
# EXECUÇÃO PRINCIPAL
# ============================================

if __name__ == "__main__":
    simulador = SimuladorRegras()
    resultados = simulador.rodar_todos_testes()
    relatorio = simulador.gerar_relatorio()
    print(relatorio)
    
    # Salvar relatório em arquivo
    with open("resultados_simulacao.txt", "w", encoding="utf-8") as f:
        f.write(relatorio)
    
    print(f"\n📁 Relatório salvo em: resultados_simulacao.txt")
