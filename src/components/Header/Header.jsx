import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Auth";

const Header = () => {
  const {isLogin , setIsLogin} = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
    navigate("/");
  }
  return (
    <header className="p-6 bg-slate-600 text-white font-semibold flex justify-between max-sm:flex-col max-sm:items-center ">
      <h3 className="cursor-pointer hover:text-slate-200"><Link to="/">ANDROMEDA</Link></h3>
      <nav className="flex gap-6 list-none cursor-pointer max-sm:mt-3">
      <li className="hover:text-slate-200" onClick={() => navigate("/")} >Home</li>

        {
          isLogin ? 
          <>
          <li className="hover:text-slate-200" onClick={() => navigate("/admin/basvuru-listesi")} >Apply</li>
          <li className="hover:text-slate-200" onClick={() => logout()}>Logout</li>
          </> : 
          <>
        <li className="hover:text-slate-200">
          <Link to="/basvuru-olustur">Application</Link>
        </li>
        <li className="hover:text-slate-200">
          <Link to="/basvuru-sorgula">Inquiry</Link>
        </li>
          </>
        }
      </nav>
    </header>
  );
};

export default Header;
