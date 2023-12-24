import { useNavigate } from "react-router-dom"
const AdminPanel = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h2>ADMİN PANEL</h2>
      <form action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <button onClick={() => navigate("/admin/basvuru-listesi")} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AdminPanel
