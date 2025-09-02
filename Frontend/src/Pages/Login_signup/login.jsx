import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { toast } from "react-toastify";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          values
        );

        // LocalStorage me full user save
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: res.data.user.id || res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            photo: res.data.user.photo || null,
            token: res.data.token,
          })
        );

        toast.success("Login successful 🎉");
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed ❌");
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const idToken = await user.getIdToken();

      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { idToken }
      );

      // Google user data save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.user.id || res.data.user._id,
          name: res.data.user.name || user.displayName,
          email: res.data.user.email || user.email,
          photo: res.data.user.photo || user.photoURL || null,
          token: res.data.token,
        })
      );

      toast.success(`Welcome ${res.data.user.name || user.displayName} 🎉`);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Google login error:", err);
      toast.error(err.response?.data?.message || "Google login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-200">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-[#7c5c4c]">Login</h1>
        <p className="text-center text-gray-500 mb-4">Welcome back!</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c5c4c]"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs">{formik.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c5c4c]"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          className="bg-[#7c5c4c] hover:bg-[#6a4d3d] text-white py-2 rounded-md mt-2"
        >
          Login
        </button>

        {/* Google login button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border py-2 rounded-md mt-2 hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          Don’t have an account?{" "}
          <span
            className="text-[#7c5c4c] hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
