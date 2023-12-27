import { useEffect } from "react";
import { useApplicationResult } from "../../context/ApplicationResult";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ApplicationDetail = () => {

  const {setResult} = useApplicationResult();
  const { basvuruNo } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "formList", basvuruNo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResult(docSnap.data().result); // Başvuru id'sine bağlı olarak cevapları getirin
        // Diğer gerekli verileri set edebilirsiniz
      }
    };

    fetchData();
  }, [basvuruNo, setResult]);

  const {result} = useApplicationResult();
  return (
    <div>
      <h2> Application Detail </h2>
      <p>basvurular</p>
      <p>son durum</p>
      <h2> Application Detail </h2>
      <p>Cevap: {result}</p>
      <h2> EVET İŞTE BASVURU SONUCUNUZZZ</h2>
    </div>
  )
}

export default ApplicationDetail
