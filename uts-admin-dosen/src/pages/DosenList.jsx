import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Label, Button } from '@/components/ui/UIComponents';


const initialData = [
  { nidn: "1202113602", nama: "Vito Zharfan Syarif Prayogo", mataKuliah: "Pemrograman Sisi Klien", status: "Aktif" },
  { nidn: "1202113616", nama: "Satrio Allam Putro Utomo", mataKuliah: "Pemrograman Berbasis Web", status: "Cuti" },
  { nidn: "1202113618", nama: "Ainul Yaqin", mataKuliah: "Pemrograman Sisi Server", status: "Aktif" },
  { nidn: "1202113610", nama: "Slamet Hudha Nurrohman", mataKuliah: "Pemrograman Perangkat Bergerak", status: "Cuti" },
];

export default function DosenList() {
  const [dosen, setDosen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(''); // State untuk fitur pencarian
  const [modalData, setModalData] = useState(null); 
  const navigate = useNavigate();

  // Memuat data dengan delay 500ms
  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem('dosenData');
      if (stored) {
        setDosen(JSON.parse(stored));
      } else {
        setDosen(initialData);
        localStorage.setItem('dosenData', JSON.stringify(initialData));
      }
      setLoading(false);
    }, 500);
  }, []);

  // Fungsi menyimpan data ke localStorage
  const saveDosen = (newData) => {
    setDosen(newData);
    localStorage.setItem('dosenData', JSON.stringify(newData));
  };

  // Fungsi Hapus
  const handleDelete = (nidn) => {
    const target = dosen.find(d => d.nidn === nidn);
    if (target.status === 'Aktif') return; // Dilarang hapus dosen aktif
    if (window.confirm('Yakin ingin menghapus dosen ini?')) {
      saveDosen(dosen.filter(d => d.nidn !== nidn));
    }
  };

  // Fungsi Simpan (Tambah/Edit) di Modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    const isEdit = dosen.some(d => d.nidn === modalData.nidn);
    if (!isEdit && modalData.nidn.length !== 10) return alert('NIDN wajib 10 digit!');
    
    if (isEdit) {
      saveDosen(dosen.map(d => d.nidn === modalData.nidn ? modalData : d));
    } else {
      if (dosen.some(d => d.nidn === modalData.nidn)) return alert('NIDN sudah terdaftar (Duplikat)!');
      saveDosen([...dosen, modalData]);
    }
    setModalData(null);
  };

  // LOGIKA PENCARIAN REAL-TIME: Memfilter data berdasarkan input 'search'
  const filteredDosen = dosen.filter(d => 
    d.nama.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-gray-500">Loading data...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Dosen</h2>
        <Button onClick={() => setModalData({ nidn: '', nama: '', mataKuliah: '', status: 'Aktif' })}>
          + Tambah Dosen
        </Button>
      </div>

      {/* KOTAK INPUT PENCARIAN */}
      <div className="mb-6 max-w-sm">
        <Input 
          placeholder="Cari nama dosen..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
      </div>

      {/* DAFTAR DOSEN (Menggunakan data hasil filter pencarian) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDosen.map(d => (
          <Card key={d.nidn} className="flex flex-col !p-5">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-bold text-gray-800">{d.nama}</h3>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                d.status === 'Aktif' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {d.status}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mb-3">NIDN {d.nidn}</p>
            <p className="text-sm text-gray-700 mb-5">{d.mataKuliah}</p>
            
            <div className="mt-auto grid grid-cols-3 gap-2">
              <Button variant="primary" onClick={() => navigate(`/admin/dosen/${d.nidn}`)}>Detail</Button>
              <Button variant="warning" onClick={() => setModalData(d)}>Edit</Button>
              <Button 
                variant="danger" 
                disabled={d.status === 'Aktif'} 
                onClick={() => handleDelete(d.nidn)}
              >
                Hapus
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* MODAL TAMBAH & EDIT DOSEN */}
      {modalData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md !p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">
                {dosen.some(d => d.nidn === modalData.nidn) ? 'Edit' : 'Tambah'} Dosen
              </h3>
              <button onClick={() => setModalData(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            
            <form onSubmit={handleSaveModal} className="flex flex-col gap-4 p-5">
              <div>
                <Label>NIDN</Label>
                <Input 
                  placeholder="Masukkan 10 digit NIDN"
                  required 
                  value={modalData.nidn} 
                  readOnly={dosen.some(d => d.nidn === modalData.nidn)} 
                  onChange={e => setModalData({...modalData, nidn: e.target.value})} 
                  className={dosen.some(d => d.nidn === modalData.nidn) ? "bg-gray-50" : ""}
                />
              </div>
              <div>
                <Label>Nama</Label>
                <Input 
                  placeholder="Masukkan nama"
                  required 
                  value={modalData.nama} 
                  onChange={e => setModalData({...modalData, nama: e.target.value})} 
                />
              </div>
              <div>
                <Label>Mata Kuliah</Label>
                <Input 
                  placeholder="Masukkan mata kuliah"
                  required 
                  value={modalData.mataKuliah} 
                  onChange={e => setModalData({...modalData, mataKuliah: e.target.value})} 
                />
              </div>
              <div>
                <Label>Status</Label>
                <select 
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500" 
                  value={modalData.status} 
                  onChange={e => setModalData({...modalData, status: e.target.value})}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <Button type="button" variant="secondary" onClick={() => setModalData(null)}>Batal</Button>
                <Button type="submit" variant="primary">Simpan</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}