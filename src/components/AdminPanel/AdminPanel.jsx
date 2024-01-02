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
      localStorage.setItem("isLogin", true);
      navigate("/admin/basvuru-listesi");
    } catch (error) {
      console.log("Login error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-slate-300 rounded shadow-lg mt-24">
    <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label htmlFor="email" className="block">
        Email
      </label>
      <input
        type="email"
        {...register("email")}
        id="email"
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <label htmlFor="password" className="block">
        Password
      </label>
      <input
        type="password"
        {...register("password")}
        id="password"
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <button
        type="submit"
        className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
      >
        Login
      </button>
    </form>
  </div>
  
  );
};

export default AdminLogin;
