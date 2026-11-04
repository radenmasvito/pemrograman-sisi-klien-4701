import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/UIComponents';

export default function Dashboard() {
  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dosenData')) || [];
    setDosen(data);
  }, []);

  const total = dosen.length;
  const aktif = dosen.filter(d => d.status === 'Aktif').length;
  const cuti = dosen.filter(d => d.status === 'Cuti').length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Selamat Datang di Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Ringkasan data dosen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-violet-500 !p-5">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">Total Dosen</h3>
          <p className="text-4xl font-bold text-gray-800">{total}</p>
        </Card>
        <Card className="border-t-4 border-t-green-400 !p-5">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">Dosen Aktif</h3>
          <p className="text-4xl font-bold text-gray-800">{aktif}</p>
        </Card>
        <Card className="border-t-4 border-t-gray-200 !p-5">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">Dosen Cuti</h3>
          <p className="text-4xl font-bold text-gray-800">{cuti}</p>
        </Card>
      </div>
    </div>
  );
}