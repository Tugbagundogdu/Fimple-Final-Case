import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, query, where, collection, getDocs } from "firebase/firestore";

const AdminApplyListDetail = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const { basvuruNo } = useParams();
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const formsRef = collection(db, 'formList');
    const q = query(formsRef, where('queryCode', '==', basvuruNo));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setSelectedForm(doc.data());
          setAllResults(doc.data().results || []);
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }, [basvuruNo]);

  if (!selectedForm) {
    return <div>Form bulunamadı</div>;
  }

  return (
    <div>
      <h2>Basvuru Detayi</h2>
      <p>Name: {selectedForm.name}</p>
      <p>Email: {selectedForm.email}</p>

      <ul>
        {allResults.map((result, index) => (
          <div key={index}>
            <li>{result}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AdminApplyListDetail;
