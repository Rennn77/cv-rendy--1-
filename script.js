// Data keterampilan (dirender lewat JavaScript)
const keterampilan = [
  "Komunikasi & relasi interpersonal",
  "Kerja tim dan mandiri",
  "Disiplin, jujur, dan teliti",
  "Multitasking",
  "Cepat belajar & adaptif",
  "Pemecahan masalah",
  "Microsoft Office (Word, Excel, PowerPoint)"
];

const daftar = document.getElementById("skill-list");
keterampilan.forEach(function (skill) {
  const li = document.createElement("li");
  li.textContent = skill;
  daftar.appendChild(li);
});

document.getElementById("tahun").textContent = new Date().getFullYear();

// Salin email ke clipboard
const tombolSalin = document.getElementById("salin");
tombolSalin.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText("rendinovian031@gmail.com");
    tombolSalin.textContent = "Email tersalin";
  } catch (e) {
    tombolSalin.textContent = "Gagal menyalin";
  }
  setTimeout(function () { tombolSalin.textContent = "Salin email"; }, 2000);
});

// Validasi formulir lalu buka aplikasi email
const form = document.getElementById("form");
const status = document.getElementById("status");

function tampilkanError(nama, pesan) {
  form.querySelector('[data-for="' + nama + '"]').textContent = pesan;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const pesan = form.pesan.value.trim();
  let valid = true;

  tampilkanError("nama", ""); tampilkanError("email", ""); tampilkanError("pesan", "");

  if (nama.length < 2) { tampilkanError("nama", "Isi nama minimal 2 huruf."); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { tampilkanError("email", "Masukkan alamat email yang valid."); valid = false; }
  if (pesan.length < 10) { tampilkanError("pesan", "Tulis pesan minimal 10 karakter."); valid = false; }
  if (!valid) { status.textContent = ""; return; }

  const subjek = encodeURIComponent("Pesan dari " + nama);
  const isi = encodeURIComponent(pesan + "\n\nEmail balasan: " + email);
  window.location.href = "mailto:rendinovian031@gmail.com?subject=" + subjek + "&body=" + isi;
  status.textContent = "Membuka aplikasi email Anda…";
  form.reset();
});

// ---------- Ganti tema terang/gelap ----------
const tombolTema = document.getElementById("tema");
const root = document.documentElement;
try {
  const tersimpan = localStorage.getItem("tema");
  if (tersimpan) root.setAttribute("data-theme", tersimpan);
} catch (e) { /* penyimpanan tidak tersedia */ }

tombolTema.addEventListener("click", function () {
  const gelap = root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const baru = gelap ? "light" : "dark";
  root.setAttribute("data-theme", baru);
  try { localStorage.setItem("tema", baru); } catch (e) { /* abaikan */ }
});

// ---------- Kalkulator IPK ----------
const SKALA_NILAI = { A: 4, AB: 3.5, B: 3, BC: 2.5, C: 2, D: 1, E: 0 };
const daftarMk = document.getElementById("daftar-mk");
const hasilIpk = document.getElementById("hasil-ipk");

function tambahBaris() {
  const baris = document.createElement("div");
  baris.className = "mk";

  const nama = document.createElement("input");
  nama.type = "text";
  nama.placeholder = "Mata kuliah";
  nama.setAttribute("aria-label", "Nama mata kuliah");

  const sks = document.createElement("input");
  sks.type = "number";
  sks.min = "1";
  sks.max = "6";
  sks.value = "3";
  sks.setAttribute("aria-label", "Jumlah SKS");

  const nilai = document.createElement("select");
  nilai.setAttribute("aria-label", "Nilai huruf");
  Object.keys(SKALA_NILAI).forEach(function (huruf) {
    const opsi = document.createElement("option");
    opsi.value = huruf;
    opsi.textContent = huruf;
    nilai.appendChild(opsi);
  });

  const hapus = document.createElement("button");
  hapus.type = "button";
  hapus.className = "btn hapus";
  hapus.textContent = "×";
  hapus.setAttribute("aria-label", "Hapus baris");
  hapus.addEventListener("click", function () { baris.remove(); });

  baris.append(nama, sks, nilai, hapus);
  daftarMk.appendChild(baris);
}

function hitungIpk() {
  let totalSks = 0, totalMutu = 0;
  daftarMk.querySelectorAll(".mk").forEach(function (baris) {
    const sks = parseInt(baris.querySelector("input[type=number]").value, 10);
    const huruf = baris.querySelector("select").value;
    if (sks > 0) {
      totalSks += sks;
      totalMutu += sks * SKALA_NILAI[huruf];
    }
  });
  if (totalSks === 0) {
    hasilIpk.textContent = "Tambahkan minimal satu mata kuliah dengan SKS yang valid.";
    return;
  }
  hasilIpk.textContent = "IPK: " + (totalMutu / totalSks).toFixed(2) + " dari " + totalSks + " SKS";
}

document.getElementById("tambah-mk").addEventListener("click", tambahBaris);
document.getElementById("hitung-ipk").addEventListener("click", hitungIpk);
tambahBaris();
tambahBaris();
