import { useNavigate } from "react-router-dom"
import { useFormData } from "../../context/FormDataProvider"
const AdminApplyList = () => {
    const navigate = useNavigate()
    const {formList} = useFormData();

    console.log(formList)

  return (
    <div className="max-w-lg mx-auto p-4 bg-slate-200 rounded shadow-lg mt-7 ">
    <h2 className="text-2xl font-bold mb-4 text-center ">Apply</h2>
    {formList.map((form, i) => (
        <div
          className={`p-4 rounded-md mb-4 flex flex-col ${
            form.results ? 'bg-green-300' : 'bg-red-300'
          }`}
          key={i}
        >
        <h3 className="text-lg font-semibold mb-2">{form.name} {form.surname} </h3>
        <p className="mb-1"><span className="font-semibold">Email:</span> {form.email}</p>
        <p className="mb-1"><span className="font-semibold">Age:</span> {form.age}</p>
        <button
          onClick={() => navigate(`/admin/basvuru/${form.id}`)}
          className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none mt-2"
        >
           View Application
        </button>
      </div>
    ))}
  </div>
  
  )
}

export default AdminApplyList
