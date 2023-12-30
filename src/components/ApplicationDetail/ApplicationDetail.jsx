import { useEffect } from "react";
import { useApplicationResult } from "../../context/ApplicationResult";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ApplicationDetail = () => {

  const {setResult} = useApplicationResult();
  const { basvuruNo } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const formListRef = collection(db, "formList");
        const q = query(formListRef, where("queryCode", "==", basvuruNo));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setResult(doc.data().result); // QueryCode'a bağlı olarak sonuçları getirin
            // Diğer gerekli verileri set edebilirsiniz
          });
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
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
