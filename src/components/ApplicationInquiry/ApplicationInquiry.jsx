import { useNavigate } from "react-router-dom"
const ApplicationInquiry = () => {
    const navigate = useNavigate();
  return (
    <div>
      <h2>Application Inquiry</h2>
      <form action="">
        <input type="text" />
        <button onClick={() => navigate("/basvuru/{basvuruNo}")} type="submit">basvuruyu sorgula</button>
      </form>
    </div>
  )
}

export default ApplicationInquiry
