import { useForm } from "react-hook-form";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../../context/Auth";

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const {setIsLogin} = useAuthContext();
  const auth = getAuth();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsLogin(true);
      console.log("Giriş başarılı, kullanıcı:", user);
      navigate("/admin/basvuru-listesi");
      // Başarılı giriş durumunda yönlendirme veya diğer işlemleri yapabilirsiniz
    } catch (error) {
      // Giriş hatası durumunda
      console.log("Giriş hatası:", error.message);
    }
  };

  return (
    <div>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} id="password" />
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
};

export default AdminLogin;
