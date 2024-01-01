import { Link } from "react-router-dom";
import admin from "../../assets/admin.jpg";
import developer from "../../assets/developers.jpg";
const Homepage = () => {
  return (
    <>
    <section className="flex justify-between mx-auto container mt-36 gap-7 max-lg:flex-col ">

      <div className="flex w-[45%] max-lg:w-full max-lg:justify-center max-lg:mb-5 max-lg:p-4 ">
        <div className="w-2/3">
          <img src={admin} alt="admin" className="object-cover h-full rounded-bl-2xl rounded-tl-2xl" />
        </div>
        <div className="w-1/3 flex flex-col items-center bg-slate-400 rounded-tr-2xl rounded-br-2xl max-md:text-sm ">
        <Link to="/admin" className="mt-12 text-slate-900 hover:text-slate-950 font-semibold text-2xl max-md:text-sm " >
        EMPLOYERS
        </Link>
        <p className="mt-6 text-center p-4" >The admin login section provides access to administrative functionalities and controls within the system.</p>
        </div>     
      </div>

      <div className="flex w-[45%] max-lg:w-full max-lg:justify-center max-lg:p-4 ">
        <div className="w-1/3 flex flex-col items-center rounded-tl-2xl rounded-bl-2xl bg-slate-400 max-md:text-sm " > 
        <Link to="/basvuru-olustur" className=" mt-12 text-slate-900 hover:text-slate-950 font-semibold text-2xl text:hover max-md:text-sm  " >
        DEVELOPERS
        </Link>
        <p className="mt-6 text-center p-4" >The developers login portal offers access to tools and resources essential for software development and programming tasks</p>
        </div>  
        <div className="w-2/3" >
          <img src={developer} alt="admin" className="object-cover h-full rounded-br-2xl rounded-tr-2xl " />
        </div>   
      </div>
    </section>
    </>
  )
}

export default Homepage
