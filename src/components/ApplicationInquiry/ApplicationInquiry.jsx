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
   <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg mt-7">
  <h2 className="text-2xl font-bold mb-4">Application Inquiry</h2>
  <form onSubmit={handleFormSubmit} className="mb-4 space-y-4">
    <input
      type="text"
      value={inputCode}
      onChange={(e) => setInputCode(e.target.value)}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      placeholder="Enter query code"
    />
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
    >
      Inquire Application
    </button>
    {inputCode !== localQueryCode && inputCode.length > 0 && (
      <p className="text-red-500 text-sm">Query code is incorrect</p>
    )}
  </form>
  <button
    onClick={() => setNewCode(true)}
    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none"
  >
    Generate New Query Code
  </button>
  {newCode && (
    <form onSubmit={newQueryCode} className="mt-4 space-y-4">
      <label htmlFor="tc" className="block font-semibold">
        Enter TC Number:
      </label>
      <input
        type="text"
        value={tcNumber}
        onChange={(e) => setTcNumber(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        placeholder="Enter TC number"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
      >
        New Query Code
      </button>
      <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none" type="button" onClick={() => setNewCode(false)}>Cancel</button>
      <div>
        {tcMatch && <p className="text-green-600">New code generated: {code}</p>}
      </div>
      </form>
  )}
</div>

  );
};

export default ApplicationInquiry;
