import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../../context/Auth";
import { adminSchema } from "../../utils/formSchema";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(adminSchema),
  });
  const navigate = useNavigate();
  const { setIsLogin } = useAuthContext();
  const auth = getAuth();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsLogin(true);
      console.log("Successful login, user:", user);
      navigate("/admin/basvuru-listesi");
    } catch (error) {
      console.log("Login error:", error.message);
    }
  };

  return (
    <div>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} id="email" />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} id="password" />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
};

export default AdminLogin;
