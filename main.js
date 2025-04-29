import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZk_BSxdm6_VJsVPI2Ne8S3RO5pi0-lg",
  authDomain: "paisal-abret.firebaseapp.com",
  projectId: "paisal-abret",
  storageBucket: "paisal-abret.appspot.com",
  messagingSenderId: "368318578592",
  appId: "1:368318578592:web:491e88e8b6eee503d72ec5",
  measurementId: "G-7Q534CCZNV"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftartodolist() {
  const refDokumen = collection(db, "todolist");
  const kueri = query(refDokumen, orderBy("Namatugas"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      Namatugas: dok.data(). Namatugas,
      prioritas: dok.data(). prioritas,
      status: dok.data(). status,
      tanggal: dok.data(). tanggal 
    });
  });

  return hasil
}

export async function tambahtodolist(Namatugas, prioritas, status, tanggal,) {
  try {
    const dokRef = await addDoc(collection(db, 'todolist'), {
      Namatugas: Namatugas,
      prioritas: prioritas,
      status: status,
      tanggal: tanggal
    });
    console.log('berhasil menembah todolist ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah todolist' + e);
  }
}


//fungsi untuk hapus data
export async function hapustodolist(docId) {
  await deleteDoc(doc(db, "todolist", docId));
}
//fungsi untukcondition ? true : false ubah data
export async function ubahtodolist(docId, Namatugas, prioritas, status, tanggal ) {
  await updateDoc(doc(db, "todolist", docId), {
    Namatugas: Namatugas,
    prioritas: prioritas,
    status: status,
    tanggal: tanggal,
  });
}
export async function ubahtodolist2(docId, Namatugas, prioritas, status, tanggal) {
  let updateData = {};
  if (Namatugas !== undefined) updateData.Namatugas = Namatugas;
  if (prioritas !== undefined) updateData.prioritas = prioritas;
  if (status !== undefined) updateData.status = status;
  if (tanggal !== undefined) updateData.tanggal = tanggal;

  await updateDoc(doc(db, "todolist", docId), updateData);
}
//fungsi untuk ambil data dan untuk diubah
export async function ambiltodolist(docId) {
  const docRef = await doc(db, "todolist", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
function ubahStatus(tombol) {
  let status = tombol.dataset.status;

  if (status === "Selesai") {
    tombol.textContent = "Belum Selesai";
    tombol.dataset.status = "Belum Selesai";
  } else {
    tombol.textContent = "Selesai";
    tombol.dataset.status = "Selesai";
  }
}