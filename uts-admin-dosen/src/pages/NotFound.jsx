import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Halaman Tidak Ditemukan</h1>
      <Link to="/" className="text-emerald-600 hover:underline">Kembali ke Halaman Utama</Link>
    </div>
  );
}