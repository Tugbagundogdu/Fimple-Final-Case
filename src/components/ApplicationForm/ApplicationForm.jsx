import styles from "./applicationForm.module.css";
import { useForm } from "react-hook-form";
import {useFormData} from "../../context/FormDataProvider";
import '../../firebase/firebase';
import { getFirestore , addDoc , collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const ApplicationForm = () => {


  const {formList , updateFormData} = useFormData();

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();


    // girilen form verilerini veritabanına kaydetme
    const db = getFirestore();
    const saveToFirestore = async (data) => {
      const docRef = await addDoc(collection(db, "formList"), data);
      console.log("Document written with ID: ", docRef.id);
    }

    console.log(formList)

    const onSubmit = (data) => {
      saveToFirestore(data);
      updateFormData(data); // Yeni verileri doğrudan updateFormData'ya geçirin
      navigate("/basvuru-basarili");
    }

  return (
    <div className={styles.applicationForm}>
        <h2>DEVELOPER APPLİCATİON FORM</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name")} />
        <label htmlFor="surname">Surname</label>
        <input type="text"id="surname" {...register("surname")} />
        <label htmlFor="email">Email</label>
        <input type="email"  id="email" {...register("email")}   />
        <label htmlFor="age">Age</label>
        <input type="text" id="age" {...register("age")}   />
        <label htmlFor="tc">TC</label>
        <input type="text" id="tc" {...register("tc")} />
        <label htmlFor="application">Application Motivation</label>
        <textarea id="application" cols="30" rows="10" {...register("application")} ></textarea>
        <label htmlFor="address">Adress</label>
        <textarea  id="address" cols="30" rows="10" {...register("address")}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ApplicationForm
