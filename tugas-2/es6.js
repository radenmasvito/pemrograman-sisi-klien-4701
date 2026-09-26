// ==========================================
// 1. CLASS MAHASISWA (Entitas Tunggal)
// ==========================================
class Mahasiswa {
  constructor(nim, nama, statusAktif, tugas, uts, uas) {
    this.nim = nim;
    this.nama = nama;
    this.statusAktif = statusAktif; // boolean: true (Aktif), false (Tidak Aktif)
    this.nilai = { tugas, uts, uas };
  }

  // Menghitung total nilai (contoh bobot: Tugas 30%, UTS 30%, UAS 40%)
  totalNilai() {
    const { tugas, uts, uas } = this.nilai;
    return (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
  }

  // Mengelompokkan nilai ke dalam kategori
  kategoriNilai() {
    const total = this.totalNilai();
    if (total >= 85) return 'A';
    if (total >= 70) return 'B';
    if (total >= 55) return 'C';
    if (total >= 40) return 'D';
    return 'E';
  }

  // Menghitung Indeks Prestasi Semester (IPS)
  IPS() {
    const kategori = this.kategoriNilai();
    switch (kategori) {
      case 'A': return 4.0;
      case 'B': return 3.0;
      case 'C': return 2.0;
      case 'D': return 1.0;
      default: return 0.0;
    }
  }
}

// ==========================================
// 2. CLASS MANAJEMEN (Array of Object / List)
// ==========================================
class ManajemenMahasiswa {
  constructor() {
    this.listMahasiswa = []; // Array of Object
  }

  // ✅ add() – Menambah mahasiswa baru
  add(mahasiswa) {
    this.listMahasiswa.push(mahasiswa);
    console.log(`[+] Mahasiswa ${mahasiswa.nama} berhasil ditambahkan.`);
  }

  // ✅ show() – Menampilkan semua data mahasiswa
  show() {
    if (this.listMahasiswa.length === 0) {
      console.log("[-] Data mahasiswa masih kosong.");
      return;
    }
    console.log("\n=== DATA MAHASISWA ===");
    this.listMahasiswa.forEach((mhs, index) => {
      console.log(`${index + 1}. NIM: ${mhs.nim} | Nama: ${mhs.nama} | Status: ${mhs.statusAktif ? 'Aktif' : 'Tidak Aktif'}`);
      console.log(`   Total Nilai: ${mhs.totalNilai().toFixed(2)} | Grade: ${mhs.kategoriNilai()} | IPS: ${mhs.IPS().toFixed(2)}`);
    });
    console.log("======================\n");
  }

  // ✅ update() – Mengupdate informasi mahasiswa tertentu berdasarkan NIM
  update(nim, dataBaru) {
    const mhsIndex = this.listMahasiswa.findIndex(mhs => mhs.nim === nim);
    
    if (mhsIndex !== -1) {
      // Update property (jika ada nilai baru, gunakan nilai baru. Jika tidak, tetap gunakan yang lama)
      if (dataBaru.nama) this.listMahasiswa[mhsIndex].nama = dataBaru.nama;
      if (dataBaru.statusAktif !== undefined) this.listMahasiswa[mhsIndex].statusAktif = dataBaru.statusAktif;
      if (dataBaru.nilai) {
        this.listMahasiswa[mhsIndex].nilai = { ...this.listMahasiswa[mhsIndex].nilai, ...dataBaru.nilai };
      }
      console.log(`[*] Data mahasiswa NIM ${nim} berhasil diupdate.`);
    } else {
      console.log(`[-] Mahasiswa dengan NIM ${nim} tidak ditemukan.`);
    }
  }

  // ✅ deleteById() – Menghapus mahasiswa berdasarkan NIM
  deleteById(nim) {
    const initialLength = this.listMahasiswa.length;
    this.listMahasiswa = this.listMahasiswa.filter(mhs => mhs.nim !== nim);
    
    if (this.listMahasiswa.length < initialLength) {
      console.log(`[-] Mahasiswa dengan NIM ${nim} berhasil dihapus.`);
    } else {
      console.log(`[-] Mahasiswa dengan NIM ${nim} tidak ditemukan.`);
    }
  }

  // ✅ clear() & clearArray() – Menghapus semua data mahasiswa
  clear() {
    this.listMahasiswa = [];
    console.log("[!] Semua data mahasiswa berhasil dibersihkan.");
  }
  
  clearArray() {
    this.clear(); // Alias function
  }

  // ✅ jumlahMahasiswa() – Menghitung jumlah mahasiswa dalam array
  jumlahMahasiswa() {
    return this.listMahasiswa.length;
  }

  // ✅ sortByNIM() – Mengurutkan mahasiswa berdasarkan NIM secara Ascending
  sortByNIM() {
    this.listMahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));
    console.log("[*] Data diurutkan berdasarkan NIM.");
  }

  // ✅ sortByStatus() – Mengurutkan mahasiswa, yang aktif di atas
  sortByStatus() {
    this.listMahasiswa.sort((a, b) => (a.statusAktif === b.statusAktif) ? 0 : a.statusAktif ? -1 : 1);
    console.log("[*] Data diurutkan berdasarkan Status (Aktif di atas).");
  }

  // ✅ jumlahAktifTidak() – Menghitung jumlah mahasiswa aktif dan tidak aktif
  jumlahAktifTidak() {
    const rekap = this.listMahasiswa.reduce((acc, mhs) => {
      mhs.statusAktif ? acc.aktif++ : acc.tidakAktif++;
      return acc;
    }, { aktif: 0, tidakAktif: 0 }); // Inisialisasi awal

    console.log(`\nRekap Status: ${rekap.aktif} Aktif, ${rekap.tidakAktif} Tidak Aktif.`);
    return rekap;
  }
}

// ==========================================
// 3. SIMULASI / PENGGUNAAN (TESTING)
// ==========================================

const kampus = new ManajemenMahasiswa();

// Menambahkan Data Mahasiswa (NIM, Nama, Status, Nilai Tugas, UTS, UAS)
kampus.add(new Mahasiswa("103", "Budi Santoso", true, 80, 85, 90));
kampus.add(new Mahasiswa("101", "Andi Wijaya", false, 60, 65, 70));
kampus.add(new Mahasiswa("102", "Citra Kirana", true, 90, 95, 95));

// Menampilkan Data
kampus.show();

// Menghitung Jumlah Aktif & Tidak
kampus.jumlahAktifTidak();

// Sort by NIM
kampus.sortByNIM();
kampus.show();

// Update Data Mahasiswa (Mengganti nama dan nilai Andi)
kampus.update("101", { 
  nama: "Andi Wijaya Kusuma", 
  statusAktif: true,
  nilai: { tugas: 75, uts: 80, uas: 85 } // Update sebagian objek
});
kampus.show();

// Menghitung total mahasiswa
console.log(`Jumlah Mahasiswa Saat Ini: ${kampus.jumlahMahasiswa()}`);

// Hapus satu mahasiswa berdasarkan NIM
kampus.deleteById("103");
kampus.show();

// Bersihkan semua array
kampus.clearArray();
kampus.show();