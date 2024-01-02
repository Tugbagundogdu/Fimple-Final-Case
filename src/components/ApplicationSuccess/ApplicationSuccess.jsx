import { useNavigate } from "react-router-dom"
import { useGenerateUniqueCode } from "../../context/GenerateUniqueCode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationSuccess = () => {
    const navigate = useNavigate();
    const {code} = useGenerateUniqueCode();

const handleClick = () => {
  navigate("/basvuru-sorgula");
  JSON.stringify(localStorage.setItem("queryCode", code));
}

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
<div className="max-w-md mx-auto p-6 bg-green-50 rounded-lg shadow-md text-center">
  <ToastContainer />
  <h1 className="text-3xl font-bold mb-4 text-green-600">Application Success</h1>
  <h3 className="text-xl font-semibold mb-2 text-green-700">Thank you for your application</h3>
  <p className="text-lg mb-2 text-green-800">We will get back to you shortly</p>
  <p className="text-lg mb-4">
    Sorgulama Kodunuz:{" "}
    <button
      className="bg-gray-300 hover:bg-gray-400  px-6 py-3 rounded-md cursor-pointer select-all"
      onClick={()=>handleCopyToClipboard(code)}
    >
      {code}
    </button>
  </p>

  <button
    onClick={() => handleClick()}
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
  >
    Query Application Status
  </button>
</div>

  )
}

export default ApplicationSuccess
