import { useNavigate } from "react-router-dom"
import { useGenerateUniqueCode } from "../../context/GenerateUniqueCode";

const ApplicationSuccess = () => {
    const navigate = useNavigate();
    const {code} = useGenerateUniqueCode();

const handleClick = () => {
  navigate("/basvuru-sorgula");
  JSON.stringify(localStorage.setItem("queryCode", code));
}

  return (
    <div>
      <h1>Application Success</h1>
      <h3>Thank you for your application</h3>
      <p>We will get back to you shortly</p>
      <p>Sorgulama Kodunuz:{code}</p>

      <button onClick={() => handleClick()}>Basvuru Sorgulama sayfasına git</button>
    </div>


  )
}

export default ApplicationSuccess
