import { useParams } from "react-router-dom";
import { useFormData } from "../../context/FormDataProvider";
import { useEffect, useState } from "react";
import { useApplicationResult } from "../../context/ApplicationResult";
import { doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

const AdminApplyListDetail = () => {
  const [resultText, setResultText] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const { formList } = useFormData();
  const { basvuruNo } = useParams();
  const { updateResult, results } = useApplicationResult();

  const [allResults, setAllResults] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedResult, setEditedResult] = useState('');
  const [editedResultIndex, setEditedResultIndex] = useState(null); // Güncellenen sonucun index'ini saklamak için

  useEffect(() => {
    const db = getFirestore();
    const resultsRef = doc(db, 'results', basvuruNo);

    const unsubscribe = onSnapshot(resultsRef, (doc) => {
      if (doc.exists()) {
        setAllResults(doc.data().results);
      } else {
        console.log('Sonuç bulunamadı.');
        setAllResults([]);
      }
    });

    return () => unsubscribe();
  }, [basvuruNo]);

  useEffect(() => {
    const form = formList.find((form) => form.id === basvuruNo);
    setSelectedForm(form);
  }, [basvuruNo, formList]);

  const updateResults = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const resultsRef = doc(db, 'results', basvuruNo); // Yeni bir koleksiyon referansı oluşturuluyor
    const resultDoc = await getDoc(resultsRef);

    if (!resultDoc.exists()) {
      // Belge yoksa oluştur
      await setDoc(resultsRef, { results: [resultText] });
    } else {
      // Belge varsa, mevcut sonuçları al ve yeni sonucu ekle
      const currentResults = resultDoc.data().results;
      await updateDoc(resultsRef, {
        results: [...currentResults, resultText],
      });
    }

    updateResult(basvuruNo, resultText);
    setResultText('');
  };

  if (!selectedForm) {
    return <div>Form bulunamadı</div>;
  }

  const handleEditResult = (index) => {
    setEditMode(true);
    setEditedResult(allResults[index]); // Sadece seçilen sonucu metin kutusuna yerleştirme
    setEditedResultIndex(index); // Güncellenecek sonucun index'ini saklama
  };

  const handleUpdateResult = async () => {
    // Firestore'da güncelleme işlemi
    const db = getFirestore();
    const resultsRef = doc(db, 'results', basvuruNo);
    const updatedResults = [...allResults];
    updatedResults[editedResultIndex] = editedResult;
    await updateDoc(resultsRef, { results: updatedResults });

    // Context'te güncelleme işlemi
    updateResult(basvuruNo, updatedResults);

    // Düzenleme modunu kapat
    setEditMode(false);
    setEditedResultIndex(null); // Index'i sıfırla
  };

  return (
    <div>
      <h2>Basvuru Detayi</h2>
      <p>Name: {selectedForm.name}</p>
      <p>Email: {selectedForm.email}</p>
      {/* Diğer form detaylarını burada gösterebilirsiniz */}
      <button onClick={() => setEditMode(true)}>Cevap oluştur</button>

      {results[basvuruNo] && (
        <ul>
          {allResults.map((result, index) => (
            <div key={index}>
              <li>{result}</li>
              <button onClick={() => handleEditResult(index)}>Düzenle</button>
            </div>
          ))}
        </ul>
      )}

      <form action="" onSubmit={updateResults}>
        <label htmlFor="">Başvuruya Cevap: </label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={resultText}
          onChange={(e) => setResultText(e.target.value)}
        ></textarea>
        <button type="submit">Basvuru Durumunu İlet</button>
      </form>
      <h2>TEBRİKLER FİMPLE DA İŞE GİRMEYE HAK KAZANDINIZ</h2>

      {editMode ? (
        <div>
          <textarea
            value={editedResult}
            onChange={(e) => setEditedResult(e.target.value)}
            rows="5"
            cols="50"
          ></textarea>
          <button onClick={handleUpdateResult}>Güncelle</button>
        </div>
      ) : (
        <button onClick={handleEditResult}>Sonuçları Düzenle</button>
      )}
    </div>
  );
};

export default AdminApplyListDetail;
