
data = [
    ('Jan', 569, 339), ('Fev', 606, 339), ('Mar', 654, 339),
    ('Abr', 739, 338), ('Mai', 817, 338), ('Jun', 942, 338),
    ('Jul', 1126, 338), ('Ago', 1284, 338), ('Set', 1415, 338),
    ('Out', 1730, 219), ('Nov', 1783, 201), ('Dez', 1826, 201)
]

print(f"{'Mês':<5} | {'Ativos':<7} | {'Total':<7} | {'% Ativos':<10} | {'% Total':<10}")
print('-'*55)

for i in range(1, len(data)):
    prev = data[i-1]
    curr = data[i]
    
    prev_total = prev[1] + prev[2]
    curr_total = curr[1] + curr[2]
    
    mom_total = ((curr_total - prev_total) / prev_total) * 100
    mom_ativos = ((curr[1] - prev[1]) / prev[1]) * 100
    
    print(f"{curr[0]:<5} | {curr[1]:<7} | {curr_total:<7} | {mom_ativos:>9.2f}% | {mom_total:>9.2f}%")

start_total = data[0][1] + data[0][2]
end_total = data[-1][1] + data[-1][2]
total_growth = ((end_total - start_total) / start_total) * 100

start_active = data[0][1]
end_active = data[-1][1]
active_growth = ((end_active - start_active) / start_active) * 100

print('-'*55)
print(f"Crescimento Total (Jan-Dez): {total_growth:.2f}%")
print(f"Crescimento Ativos (Jan-Dez): {active_growth:.2f}%")
