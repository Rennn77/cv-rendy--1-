"""Kalkulator IPK sederhana (Python).

Cara pakai:
    python kalkulator_ipk.py
Masukkan nama mata kuliah, SKS, dan nilai huruf. Ketik 'selesai' untuk menghitung.
"""

SKALA_NILAI = {"A": 4.0, "AB": 3.5, "B": 3.0, "BC": 2.5, "C": 2.0, "D": 1.0, "E": 0.0}


def hitung_ipk(daftar_mk):
    """Hitung IPK dari list tuple (sks, nilai_huruf). Return float, atau 0.0 jika kosong."""
    total_sks = 0
    total_mutu = 0.0
    for sks, huruf in daftar_mk:
        huruf = huruf.upper()
        if sks <= 0 or huruf not in SKALA_NILAI:
            raise ValueError(f"Data tidak valid: sks={sks}, nilai={huruf}")
        total_sks += sks
        total_mutu += sks * SKALA_NILAI[huruf]
    return total_mutu / total_sks if total_sks else 0.0


def main():
    daftar = []
    print("=== Kalkulator IPK ===")
    while True:
        nama = input("Nama mata kuliah (ketik 'selesai' untuk menghitung): ").strip()
        if nama.lower() == "selesai":
            break
        try:
            sks = int(input("  SKS: "))
            huruf = input("  Nilai huruf (A/AB/B/BC/C/D/E): ").strip().upper()
            hitung_ipk([(sks, huruf)])  # validasi input
        except ValueError:
            print("  Input tidak valid, coba lagi.")
            continue
        daftar.append((sks, huruf))
    print(f"\nJumlah mata kuliah: {len(daftar)}")
    print(f"IPK Anda: {hitung_ipk(daftar):.2f}")


if __name__ == "__main__":
    main()
