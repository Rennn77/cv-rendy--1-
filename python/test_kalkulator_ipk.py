import unittest
from kalkulator_ipk import hitung_ipk


class TestIPK(unittest.TestCase):
    def test_semua_a(self):
        self.assertEqual(hitung_ipk([(3, "A"), (2, "A")]), 4.0)

    def test_campuran(self):
        # (3*4 + 3*3) / 6 = 3.5
        self.assertAlmostEqual(hitung_ipk([(3, "A"), (3, "B")]), 3.5)

    def test_kosong(self):
        self.assertEqual(hitung_ipk([]), 0.0)

    def test_nilai_salah(self):
        with self.assertRaises(ValueError):
            hitung_ipk([(3, "Z")])


if __name__ == "__main__":
    unittest.main()
