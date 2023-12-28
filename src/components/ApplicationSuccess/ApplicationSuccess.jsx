import { useNavigate } from "react-router-dom"

const ApplicationSuccess = () => {
    const navigate = useNavigate();


  return (
    <div>
      <h1>Application Success</h1>
      <h3>Thank you for your application</h3>
      <p>We will get back to you shortly</p>
      <p>Sorgulama Kodunuz:  {}</p>

      <button onClick={() => navigate("/basvuru-sorgula")}>Basvuru Sorgulama sayfasına git</button>
    </div>


  )
}

export default ApplicationSuccess
