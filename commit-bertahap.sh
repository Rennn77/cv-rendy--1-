#!/usr/bin/env bash
# Membuat riwayat commit bertahap. Jalankan SEKALI di folder project (butuh Git terpasang).
# Sebelumnya atur identitas:  git config --global user.name "Nama"  &&  git config --global user.email "email"
set -e
git init -b main
git add README.md .gitignore && git commit -m "Tambah README dan .gitignore"
git add index.html && git commit -m "Tambah struktur HTML halaman CV"
git add style.css && git commit -m "Tambah styling CSS responsif dan tema gelap"
git add foto.jpg && git commit -m "Tambah foto profil"
git add script.js && git commit -m "Tambah JavaScript: tema, kalkulator IPK, validasi form"
git add python && git commit -m "Tambah kalkulator IPK Python beserta unit test"
echo "Selesai. Lanjutkan dengan:"
echo "  git remote add origin https://github.com/USERNAME/NAMA-REPO.git"
echo "  git push -u origin main"
