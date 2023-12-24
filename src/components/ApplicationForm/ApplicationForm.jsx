import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/basvuru-basarili");
    }
  return (
    <div>
        <h2>DEVELOPER APPLİCATİON FORM</h2>
      <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default ApplicationForm
