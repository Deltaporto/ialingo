
import pandas as pd

# Re-creating the dataframe from the previous known values for precision
data_2023 = [
    ('Jan', 461, 224), ('Fev', 417, 213), ('Mar', 459, 203),
    ('Abr', 454, 207), ('Mai', 466, 213), ('Jun', 457, 214),
    ('Jul', 532, 233), ('Ago', 597, 285), ('Set', 514, 326),
    ('Out', 516, 337), ('Nov', 652, 338), ('Dez', 560, 339)
]

data_2024 = [
    ('Jan', 569, 339), ('Fev', 606, 339), ('Mar', 654, 339),
    ('Abr', 739, 338), ('Mai', 817, 338), ('Jun', 942, 338),
    ('Jul', 1126, 338), ('Ago', 1284, 338), ('Set', 1415, 338),
    ('Out', 1730, 219), ('Nov', 1783, 201), ('Dez', 1826, 201)
]

data = []
for m, a, s in data_2023:
    data.append({'Period': f'{m}/23', 'Ativos': a, 'Suspensos': s, 'Total': a+s})
for m, a, s in data_2024:
    data.append({'Period': f'{m}/24', 'Ativos': a, 'Suspensos': s, 'Total': a+s})

df = pd.DataFrame(data)

# Calculate monthly variations
df['Var_Total'] = df['Total'].diff()
df['Var_Ativos'] = df['Ativos'].diff()
df['Var_Suspensos'] = df['Suspensos'].diff()

# Calculate Absorption Rate (proxy): If Total grew less than previous months, implies Baixas increased
# We don't have exact 'Distribution' (Entry) numbers, but we can look at the Change in Total.
# Low Change in Total = High Baixas (assuming constant Distribution)

print(f"{'Período':<8} | {'Ativos':<6} | {'Var.Ativ':<8} | {'Suspensos':<9} | {'Var.Susp':<8} | {'Total':<6} | {'Var.Total (Saldo)'}")
print('-'*85)
for index, row in df.iterrows():
    if index == 0: continue
    
    # Highlight the user's period
    prefix = "   "
    if "Out/24" in row['Period'] or "Nov/24" in row['Period'] or "Dez/24" in row['Period']:
        prefix = "-> "
        
    print(f"{prefix}{row['Period']:<8} | {row['Ativos']:<6} | {row['Var_Ativos']:>+8.0f} | {row['Suspensos']:<9} | {row['Var_Suspensos']:>+8.0f} | {row['Total']:<6} | {row['Var_Total']:>+8.0f}")

# Calculate averages
avg_growth_h1_24 = df[12:18]['Var_Total'].mean() # Jan-Jun 24
avg_growth_q3_24 = df[18:21]['Var_Total'].mean() # Jul-Set 24
avg_growth_q4_24 = df[21:]['Var_Total'].mean()   # Out-Dez 24

print("\nAnálise de Médias de Crescimento Líquido (Saldo) do Acervo Total:")
print(f"Jan-Jun/24 (Crise): +{avg_growth_h1_24:.1f} processos/mês")
print(f"Jul-Set/24 (Pico):  +{avg_growth_q3_24:.1f} processos/mês")
print(f"Out/24 (Saneamento): +{df.iloc[21]['Var_Total']} processos (Impacto da reativação/distribuição)")
print(f"Nov-Dez/24 (Gestão): +{df[22:]['Var_Total'].mean():.1f} processos/mês (Queda drástica no crescimento)")
