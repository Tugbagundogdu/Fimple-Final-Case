import { Link } from "react-router-dom";
import styles from "./homepage.module.css";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.homepage}>
      <div>
        <Link to="/admin">
        ADMİN PANEL
        </Link>
     
      </div>
      <div>
       <Link to={"/basvuru-olustur"}>
       DEVELOPER PANEL
       </Link>

       <button onClick={() => navigate("/basvuru-olustur")} >Basvuru Olustur</button>
       <button onClick={() => navigate("/basvuru-sorgula")} >Sorgula</button>
      </div>
    </div>
  )
}

export default Homepage
