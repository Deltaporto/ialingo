
import pandas as pd
import io

file_path = r'C:\Users\Casa\Downloads\Evolução__acervo_ 2023-2024.xlsx'
df = pd.read_excel(file_path, header=None)

# Extracting data
# Columns 2 to 13 are 2023 Jan-Dec
# Columns 14 to 25 are 2024 Jan-Dec

months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
years = [2023, 2024]


print("Rows in dataframe:")
for i in range(5):
    print(f"Row {i}: {df.iloc[i, 0]} | {df.iloc[i, 1]} | {df.iloc[i, 2]}")

# Identify rows by label in column 1
suspenso_row_idx = df[df.iloc[:, 1] == 'Suspenso'].index[0]
tramite_row_idx = df[df.iloc[:, 1] == 'Trâmite'].index[0]

print(f"\nSuspenso Row Index: {suspenso_row_idx}")
print(f"Trâmite Row Index: {tramite_row_idx}")

suspensos_2023 = df.iloc[suspenso_row_idx, 2:14].values
ativos_2023 = df.iloc[tramite_row_idx, 2:14].values

suspensos_2024 = df.iloc[suspenso_row_idx, 14:26].values
ativos_2024 = df.iloc[tramite_row_idx, 14:26].values

# Combine into a structured list
data = []
for i, m in enumerate(months):
    data.append({'Date': f'{m}/2023', 'Ativos': ativos_2023[i], 'Suspensos': suspensos_2023[i], 'Year': 2023, 'MonthIdx': i+1})

for i, m in enumerate(months):
    data.append({'Date': f'{m}/2024', 'Ativos': ativos_2024[i], 'Suspensos': suspensos_2024[i], 'Year': 2024, 'MonthIdx': i+1 + 12})

df_clean = pd.DataFrame(data)

# Calculate Deltas
df_clean['Delta_Ativos'] = df_clean['Ativos'].diff()
df_clean['Growth_Ativos'] = df_clean['Ativos'].pct_change() * 100

pd.set_option('display.max_rows', None)
pd.set_option('display.expand_frame_repr', False)

print(df_clean[['Date', 'Ativos', 'Suspensos', 'Delta_Ativos', 'Growth_Ativos']])

# Find inflection point (max change in growth rate or sustained growth start)
avg_growth_H1_2023 = df_clean[df_clean['MonthIdx'] <= 6]['Growth_Ativos'].mean()
print(f"\nMédia cresc. 1º Sem 2023: {avg_growth_H1_2023:.2f}%")

# Check where it starts differing significantly
print("\nAnálise de mudança de tendência:")
for i in range(1, len(df_clean)):
    row = df_clean.iloc[i]
    prev = df_clean.iloc[i-1]
    
    direction = "Estável"
    if row['Growth_Ativos'] > 2: direction = "Aumento Forte"
    elif row['Growth_Ativos'] > 0.5: direction = "Aumento Leve"
    elif row['Growth_Ativos'] < -0.5: direction = "Queda"
    
    print(f"{row['Date']}: {int(row['Ativos'])} ({row['Growth_Ativos']:+.2f}%) -> {direction}")
