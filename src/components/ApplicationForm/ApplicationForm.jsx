import styles from "./applicationForm.module.css";
import { useForm } from "react-hook-form";
import {useFormData} from "../../context/FormDataProvider";
const ApplicationForm = () => {


  const {formList , updateFormData} = useFormData();

    const { register, handleSubmit } = useForm();

    console.log(formList)



    const onSubmit = (data) => {
      updateFormData(data); // Yeni verileri doğrudan updateFormData'ya geçirin
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
        <label htmlFor="cv">CV</label>
        <input type="file" id="cv" {...register("cv")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ApplicationForm
