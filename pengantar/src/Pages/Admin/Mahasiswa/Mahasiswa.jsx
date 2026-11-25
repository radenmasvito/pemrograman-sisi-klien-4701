import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import {confirmDelete} from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import { getAllMahasiswa, storeMahasiswa, updateMahasiswa, deleteMahasiswa,} from "@/Utils/Apis/MahasiswaApi";

//import { mahasiswaList } from "@/Data/Dummy";



const fetchMahasiswa = async () => {
  getAllMahasiswa().then((res) => setMahasiswa(res.data));
};


const handleEdit(mhs) =>{
  setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama });
    setIsEdit(true);
    setIsModalOpen(true);
}
const Mahasiswa = () => {
  const handleEdit = (nama) => alert(`Edit data ${nama}`);
  const handleDelete = (nim) => {
    
  confirmDelete(() => {
    // eslint-disable-next-line no-undef
    deleteMahasiswa(nim);
    toastSuccess("Data berhasil dihapus");
  });
};

/*const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.nim || !form.nama) {
    toastError("NIM dan Nama wajib diisi");
    return;
  }

  if (isEdit) {
    confirmUpdate(() => {
      updateMahasiswa(form.nim, form);
      toastSuccess("Data berhasil diperbarui");
      setForm({ nim: "", nama: "" });
      setIsEdit(false);
      setIsModalOpen(false);
    });
  } else {
    const exists = mahasiswa.find((m) => m.nim === form.nim);
    if (exists) {
      toastError("NIM sudah terdaftar!");
      return;
    }
    addMahasiswa(form);
    toastSuccess("Data berhasil ditambahkan");
    setForm({ nim: "", nama: "" });
    setIsModalOpen(false);
  }
};*/

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
        <Button onClick={() => alert("Buka modal tambah")}>+ Tambah Mahasiswa</Button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.map((mhs, index) => (
            <tr
              key={mhs.nim}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.nama}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <a
                  href={`/admin/mahasiswa/${mhs.nim}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                >
                  Detail
                </a>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(mhs.nama)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(mhs.nama)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Mahasiswa;