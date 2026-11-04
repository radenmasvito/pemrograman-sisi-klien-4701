import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Button } from '@/components/ui/UIComponents';

export default function DosenDetail() {
  const { nidn } = useParams();
  const navigate = useNavigate();
  const [dosen, setDosen] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dosenData')) || [];
    const found = stored.find(d => d.nidn === nidn);
    setDosen(found);
  }, [nidn]);

  return (
    <div className="max-w-3xl">
      {dosen ? (
        <Card className="!p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Detail Dosen</h2>
          
          <div className="flex flex-col text-sm">
            <div className="flex py-3 border-b border-gray-100">
              <span className="w-1/3 font-semibold text-gray-700">NIDN</span>
              <span className="w-2/3 text-gray-600">{dosen.nidn}</span>
            </div>
            <div className="flex py-3 border-b border-gray-100">
              <span className="w-1/3 font-semibold text-gray-700">Nama</span>
              <span className="w-2/3 text-gray-600">{dosen.nama}</span>
            </div>
            <div className="flex py-3 border-b border-gray-100">
              <span className="w-1/3 font-semibold text-gray-700">Mata Kuliah</span>
              <span className="w-2/3 text-gray-600">{dosen.mataKuliah}</span>
            </div>
            <div className="flex py-3 border-b border-gray-100">
              <span className="w-1/3 font-semibold text-gray-700">Status</span>
              <span className="w-2/3 flex">
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  dosen.status === 'Aktif' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {dosen.status}
                </span>
              </span>
            </div>
          </div>

          <Button variant="secondary" onClick={() => navigate('/admin/dosen')} className="mt-8">
            &larr; Kembali
          </Button>
        </Card>
      ) : (
        <Card><p className="text-red-500 font-bold">Data dosen tidak ditemukan.</p></Card>
      )}
    </div>
  );
}