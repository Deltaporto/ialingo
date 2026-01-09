
def calculate():
    blue_rects = [25, 27, 29, 33, 37, 43, 51, 58, 65, 79, 82, 84]
    green_rects = [15, 15, 15, 15, 15, 14, 15, 15, 14, 9, 8, 8]
    months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

    # Calibration based on Jun/2024 (Index 5)
    # Blue (Ativos): 43px = 942 -> Factor ~21.907
    # Green (Suspensos): 14px = 338 -> Factor ~24.143 
    
    blue_factor = 942 / 43
    green_factor = 338 / 14

    print(f"| Mês       | Ativos (Azul) | Suspensos (Verde) | Total Est. |")
    print(f"|-----------|---------------|-------------------|------------|")
    for i, m in enumerate(months):
        ativo = int(blue_rects[i] * blue_factor)
        suspenso = int(green_rects[i] * green_factor)
        print(f"| {m}/2024  | {ativo:<13} | {suspenso:<17} | {ativo + suspenso:<10} |")

if __name__ == "__main__":
    calculate()
