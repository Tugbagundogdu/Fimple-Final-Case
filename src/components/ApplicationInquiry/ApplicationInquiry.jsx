import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataProvider";
import { useGenerateUniqueCode } from "../../context/GenerateUniqueCode";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const ApplicationInquiry = () => {
  const [inputCode, setInputCode] = useState(""); 
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
      alert("You must enter the inquiry code correctly");
    }
   
  };

  const newQueryCode = async (e) => {
    e.preventDefault();
    const foundUser = formList.find((item) => item.tc === tcNumber);

    if (foundUser) {
      const newCode = generateUniqueCode();
      setCode(newCode); 
      setTcMatch(true);
      JSON.stringify(localStorage.setItem("queryCode", newCode));

      const db = getFirestore();
      const userDoc = doc(db, "formList", foundUser.id);
      await updateDoc(userDoc, { queryCode: newCode });

      alert("Yeni kod oluşturuldu: " + newCode);
    } else {
      alert("No record matching this TC was found");
    }
  };

  // ... (existing code remains unchanged)

// ... (rest of the code remains unchanged)


  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied!', {
          position: toast.POSITION.TOP_LEFT,
        });
      })
      .catch((err) => {
        console.error('Kopyalama başarısız oldu: ', err);
      });
  };

  return (
   <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-lg mt-7">
    <ToastContainer/>
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
      className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
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
        className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
      >
        New Query Code
      </button>
      <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none" type="button" onClick={() => setNewCode(false)}>Cancel</button>
      <div>
        {tcMatch &&     
        <button
      className="bg-gray-300 hover:bg-gray-400  px-6 py-3 rounded-md cursor-pointer select-all"
      onClick={()=>handleCopyToClipboard(code)}
    >
      {code}
    </button>}
      </div>
      </form>
  )}
</div>

  );
};

export default ApplicationInquiry;
