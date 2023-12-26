import { useNavigate } from "react-router-dom"
import { useFormData } from "../../context/FormDataProvider"
import styles from './adminApplyList.module.css'
const AdminApplyList = () => {
    const navigate = useNavigate()
    const {formList} = useFormData();

  return (
    <div>
      <h2>Admin Apply List</h2>
      <p>basvurular</p>
      {
        formList.map((form , i) => (
          <div className={styles.apply} key={i}>
            <h3>{form.name}</h3>
            <h3>{form.email}</h3>
            <h3>{form.surname}</h3>
            <h3>{form.age}</h3>
            <button onClick={() => navigate(`/admin/basvuru/${i}`)}>Basvuru Detayi</button>
          </div>
        ))
      }
   </div>
  )
}

export default AdminApplyList
