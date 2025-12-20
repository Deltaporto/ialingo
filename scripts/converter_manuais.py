import pdfplumber
import os

manuais_dir = r"C:\Users\Casa\Documents\Trabalho\TR\Gestao-inteligente\Manuais"
output_dir = r"C:\Users\Casa\Documents\Trabalho\TR\Gestao-inteligente\Manuais\txt"

os.makedirs(output_dir, exist_ok=True)

pdf_files = [f for f in os.listdir(manuais_dir) if f.endswith('.pdf')]

for pdf_file in pdf_files:
    pdf_path = os.path.join(manuais_dir, pdf_file)
    txt_path = os.path.join(output_dir, pdf_file.replace('.pdf', '.txt'))
    
    print(f"Processando: {pdf_file}")
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
        
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(text)
        
        print(f"  -> Salvo: {txt_path}")
    except Exception as e:
        print(f"  -> Erro: {e}")

print("\nConversão concluída!")
