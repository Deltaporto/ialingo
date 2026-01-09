
import csv
import sys

# Data extracted from the chart
data = [
    ["Mês", "Ativos (Azul)", "Suspensos (Verde)", "Total", "Variação Mensal"],
    ["Jan/2024", 569, 339, 908, "0,00%"],
    ["Fev/2024", 606, 339, 945, "4,07%"],
    ["Mar/2024", 654, 339, 993, "5,08%"],
    ["Abr/2024", 739, 338, 1077, "8,46%"],
    ["Mai/2024", 817, 338, 1155, "7,24%"],
    ["Jun/2024", 942, 338, 1280, "10,82%"],
    ["Jul/2024", 1126, 338, 1464, "14,37%"],
    ["Ago/2024", 1284, 338, 1622, "10,79%"],
    ["Set/2024", 1415, 338, 1753, "8,08%"],
    ["Out/2024", 1730, 219, 1949, "11,18%"],
    ["Nov/2024", 1783, 201, 1984, "1,80%"],
    ["Dez/2024", 1826, 201, 2027, "2,17%"]
]

csv_file = "evolucao_acervo_2024.csv"
xlsx_file = "evolucao_acervo_2024.xlsx"

try:
    import pandas as pd
    df = pd.DataFrame(data[1:], columns=data[0])
    df.to_excel(xlsx_file, index=False)
    print(f"Arquivo Excel gerado com sucesso: {xlsx_file}")
except ImportError:
    print("Pandas não encontrado. Gerando CSV como alternativa...")
    with open(csv_file, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerows(data)
    print(f"Arquivo CSV gerado com sucesso: {csv_file}")
