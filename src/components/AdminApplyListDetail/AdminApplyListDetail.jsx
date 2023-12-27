// Örnek Detay Sayfası (AdminApplyDetail.js)

import { useParams } from "react-router-dom";
import { useFormData } from "../../context/FormDataProvider";
import { useEffect, useState } from "react";
import { useApplicationResult } from "../../context/ApplicationResult";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const AdminApplyListDetail = () => {

    const [resultText , setResultText] = useState("");
    const [selectedForm , setSelectedForm] = useState(null);

    const { formList } = useFormData();
    const { basvuruNo } = useParams();
    const {  updateResult} = useApplicationResult();

    useEffect(() => {
        const form = formList.find((form) => form.id === basvuruNo);
        setSelectedForm(form);
    },[basvuruNo, formList]);
    

    const updateResults = async (e) => {
        e.preventDefault();
        // Bağlantılı başvuru id'siyle cevabı Firestore'a kaydedin
        const db = getFirestore();
        const docRef = doc(db, "formList", basvuruNo);
        await updateDoc(docRef, {
          result: resultText // Başvuru id'sine bağlı olarak cevabı Firestore'a kaydedin
          // Diğer gerekli güncellemeleri burada yapabilirsiniz
        });
      
        updateResult(resultText);
        setResultText("");
      };

   

    const [response , setResponse ] = useState(false);

    if (!selectedForm) {
        return <div>Form bulunamadı</div>;
    }

    // Burada form detaylarını göstermek için gerekli işlemleri yapabilirsiniz

    return (
        <div>
            <h2>Basvuru Detayi</h2>
            <p>Name: {selectedForm.name}</p>
            <p>Email: {selectedForm.email}</p>
            {/* Diğer form detaylarını burada gösterebilirsiniz */}
            <button onClick={() => setResponse(true)}>Cevap oluştur</button>

            {
                response &&
                <>
                <form action="" onSubmit={updateResults}>
                  <label htmlFor="">Başvuruya Cevap: </label>
                  <textarea name="" id="" cols="30" rows="10" value={resultText} onChange={(e) => setResultText(e.target.value)}>

                  </textarea>
                  <button type="submit" >Basvuru Durumunu İlet</button>
                </form>
                 <h2>TEBRİKLER FİMPLE DA İŞE GİRMEYE HAK KAZANDINIZ</h2>
                </>
            }
        </div>
    );
};

export default AdminApplyListDetail;
