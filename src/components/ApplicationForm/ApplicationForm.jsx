import styles from "./applicationForm.module.css";
import { useForm } from "react-hook-form";
import {useFormData} from "../../context/FormDataProvider";
import '../../firebase/firebase';
import { getFirestore , addDoc , collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useGenerateUniqueCode } from "../../context/GenerateUniqueCode";
import {formSchema} from "../../utils/formSchema";
import {yupResolver} from "@hookform/resolvers/yup";
const ApplicationForm = () => {


  const {formList , updateFormData} = useFormData();

    const { register, handleSubmit , formState: { errors } } = useForm({
      resolver: yupResolver(formSchema),
    });

    const navigate = useNavigate();
    const {generateUniqueCode} = useGenerateUniqueCode();

    // girilen form verilerini veritabanına kaydetme
    const db = getFirestore();
    const saveToFirestore = async (data) => {
      const generatedUniqueCode = generateUniqueCode();
    await addDoc(collection(db, "formList"), {...data , queryCode : generatedUniqueCode});
    }

    console.log(formList)

    const onSubmit = async (data) => {
      await formSchema.validate(data);
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
        {errors.name && <p>{errors.name.message}</p>}
        <label htmlFor="surname">Surname</label>
        <input type="text"id="surname" {...register("surname")} />
        {errors.surname && <p>{errors.surname.message}</p>}
        <label htmlFor="email">Email</label>
        <input type="email"  id="email" {...register("email")}   />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="age">Age</label>
        <input type="text" id="age" {...register("age")}   />
        {errors.age && <p>{errors.age.message}</p>}
        <label htmlFor="tc">TC</label>
        <input type="text" id="tc" {...register("tc")} />
        {errors.tc && <p>{errors.tc.message}</p>}
        <label htmlFor="application">Application Motivation</label>
        <textarea id="application" cols="30" rows="10" {...register("application")} ></textarea>
        {errors.application && <p>{errors.application.message}</p>}
        <label htmlFor="address">Adress</label>
        <textarea  id="address" cols="30" rows="10" {...register("address")}></textarea>
        {errors.address && <p>{errors.address.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ApplicationForm
