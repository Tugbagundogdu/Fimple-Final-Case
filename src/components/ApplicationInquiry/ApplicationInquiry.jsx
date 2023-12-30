// ApplicationInquiry.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataProvider";
import { useGenerateUniqueCode } from "../../context/GenerateUniqueCode";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const ApplicationInquiry = () => {
  const [inputCode, setInputCode] = useState(""); // Kullanıcının girdiği kod
  const [tcNumber , setTcNumber] = useState("");
  const [newCode , setNewCode] = useState(false);
  const [tcMatch , setTcMatch] = useState(false);

  const {formList} = useFormData();
  const {generateUniqueCode , setCode , code} = useGenerateUniqueCode();

const localQueryCode = localStorage.getItem("queryCode"); 

const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(inputCode === localQueryCode){
      navigate(`/basvuru/${inputCode}`);
    }else{
      alert("Sorgulama kodunuz yanlıs");
    }
   
  };

  const newQueryCode = async (e) => {
    e.preventDefault();
    const foundUser = formList.find((item) => item.tc === tcNumber);

    if (foundUser) {
      const newCode = generateUniqueCode();
      setCode(newCode); // Yeni kodu context içinde setleyin
      setTcMatch(true);
      JSON.stringify(localStorage.setItem("queryCode", newCode));

      // Firestore'da ilgili kaydı güncelleyin
      const db = getFirestore();
      const userDoc = doc(db, "formList", foundUser.id);
      await updateDoc(userDoc, { queryCode: newCode });

      alert("Yeni kod oluşturuldu: " + newCode);
    } else {
      alert("Bu TC ile eşleşen bir kayıt bulunamadı.");
    }
  };

  return (
    <div>
      <h2>Application Inquiry</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit">Inquire Application</button>
      </form>
      <button onClick={() => setNewCode(true)}>Generate New Query Code</button>
      {
        newCode && (
          <form onSubmit={newQueryCode}>
            <label htmlFor="tc">tc nı gir</label>
            <input
              type="text"
              value={tcNumber}
              onChange={(e) => setTcNumber(e.target.value)}
            />
            <button type="submit">New Query Code</button>
            <div>
               {tcMatch && <p>Yeni kod oluşturuldu: {code}</p>}
            </div>
          </form>
        )
      }
    </div>
  );
};

export default ApplicationInquiry;
