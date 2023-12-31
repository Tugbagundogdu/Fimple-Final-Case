import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const AdminApplyListDetail = () => {
  const [resultText, setResultText] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const { basvuruNo } = useParams();

  const [allResults, setAllResults] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedResult, setEditedResult] = useState('');
  const [editedResultIndex, setEditedResultIndex] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const formRef = doc(db, 'formList', basvuruNo);

    getDoc(formRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setSelectedForm(docSnap.data());
          setAllResults(docSnap.data().results || []);
        } else {
          console.log('Belirtilen form bulunamadı.');
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, [basvuruNo]);

  const updateResultsInFirestore = async (newResult) => {
    const db = getFirestore();
    const formRef = doc(db, 'formList', basvuruNo);

    const formDoc = await getDoc(formRef);
    if (formDoc.exists()) {
      const formData = formDoc.data();
      const updatedResults = formData.results ? [...formData.results, newResult] : [newResult];

      await updateDoc(formRef, { results: updatedResults });
      setAllResults(updatedResults);
    } else {
      console.log('Belirtilen form bulunamadı.');
    }
  };

  const updateResults = async (e) => {
    e.preventDefault();
    await updateResultsInFirestore(resultText);
    setResultText('');
  };

  if (!selectedForm) {
    return <div>Form bulunamadı</div>;
  }

  const handleEditResult = (index) => {
    setEditMode(true);
    setEditedResult(allResults[index]);
    setEditedResultIndex(index);
  };

  const handleUpdateResult = async () => {
    const db = getFirestore();
    const formRef = doc(db, 'formList', basvuruNo);
    const updatedResults = [...allResults];
    updatedResults[editedResultIndex] = editedResult;

    await updateDoc(formRef, { results: updatedResults });
    setAllResults(updatedResults);

    setEditMode(false);
    setEditedResultIndex(null);
  };

  return (
    <div>
      <h2>Basvuru Detayi</h2>
      <p>Name: {selectedForm.name}</p>
      <p>Email: {selectedForm.email}</p>

      <button onClick={() => setEditMode(true)}>Cevap oluştur</button>

      <ul>
        {allResults.map((result, index) => (
          <div key={index}>
            <li>{result}</li>
            <button onClick={() => handleEditResult(index)}>Düzenle</button>
          </div>
        ))}
      </ul>

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
