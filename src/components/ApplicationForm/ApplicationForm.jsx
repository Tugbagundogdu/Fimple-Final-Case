import { useForm } from "react-hook-form";
import {useFormData} from "../../context/FormDataProvider";
import '../../firebase/firebase';
import { getFirestore , addDoc , collection, serverTimestamp } from "firebase/firestore";
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

    const db = getFirestore();
    const saveToFirestore = async (data) => {
      const generatedUniqueCode = generateUniqueCode();
      const createdDate = serverTimestamp();

      await addDoc(collection(db, "formList"), {
        ...data,
        queryCode: generatedUniqueCode,
        createdAt: createdDate, 
      });
    }

    console.log(formList)

    const onSubmit = async (data) => {
      await formSchema.validate(data);
      saveToFirestore(data);
      updateFormData(data); // Yeni verileri doğrudan updateFormData'ya geçirin
      navigate("/basvuru-basarili");
    }

  return (
    <div className="flex flex-col items-center w-[60%] mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4 ">DEVELOPER APPLİCATİON FORM</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full bg-lime-200 p-12 rounded-2xl max-sm:p-2 " >
        <label className="form-label" htmlFor="name">Name</label>
        <input className="form-input" type="text" id="name" {...register("name")} />
        {errors.name && <p className="form-error" >{errors.name.message}</p>}
        <label className="form-label" htmlFor="surname">Surname</label>
        <input className="form-input" type="text"id="surname" {...register("surname")} />
        {errors.surname && <p   className="form-error">{errors.surname.message}</p>}
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-input" type="email"  id="email" {...register("email")}   />
        {errors.email && <p  className="form-error">{errors.email.message}</p>}
        <label className="form-label" htmlFor="age">Age</label>
        <input className="form-input" type="text" id="age" {...register("age")}   />
        {errors.age && <p  className="form-error" >{errors.age.message}</p>}
        <label className="form-label" htmlFor="tc">TC</label>
        <input className="form-input" type="text" id="tc" {...register("tc")} />
        {errors.tc && <p  className="form-error" >{errors.tc.message}</p>}
        <label className="form-label" htmlFor="application">Application Motivation</label>
        <textarea className="form-input" id="application" cols="30" rows="4" {...register("application")} ></textarea>
        {errors.application && <p  className="form-error">{errors.application.message}</p>}
        <label className="form-label" htmlFor="address">Adress</label>
        <textarea className="form-input" id="address" cols="30" rows="4" {...register("address")}></textarea>
        {errors.address && <p  className="form-error" >{errors.address.message}</p>}
        <button className="bg-gray-600 hover:bg-gray-700 mt-4 rounded-md text-white p-3" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ApplicationForm
