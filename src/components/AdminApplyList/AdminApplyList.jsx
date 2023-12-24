import { useNavigate } from "react-router-dom"
const AdminApplyList = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h2>Admin Apply List</h2>
      <p>basvurular</p>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button> </div>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button>  </div>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button> </div>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button> </div>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button> </div>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button> </div>
      <div>tugba basvuru <button onClick={() => navigate("/admin/basvuru/{basvuruNo}")} >basvuru goruntule</button> </div>
    </div>
  )
}

export default AdminApplyList
