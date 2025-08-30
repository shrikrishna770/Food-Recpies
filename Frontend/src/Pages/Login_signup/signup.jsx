import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupSchema = Yup.object({
  name: Yup.string().min(2, "Too short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirm_password: "" },
    validationSchema: SignupSchema,
    onSubmit: async (values, actions) => {
      try {
        const { name, email, password } = values;
        await axios.post("http://localhost:5000/api/auth/signup", {
          name,
          email,
          password,
        });
        actions.resetForm();
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Signup failed");
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-200">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-[#7c5c4c]">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Welcome to  favourite recipes{" "}
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c5c4c]"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs">{formik.errors.name}</p>
        )}

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

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c5c4c]"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
        />
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <p className="text-red-500 text-xs">
            {formik.errors.confirm_password}
          </p>
        )}

        <button
          type="submit"
          className="bg-[#7c5c4c] hover:bg-[#6a4d3d] text-white py-2 rounded-md mt-2"
        >
          Signup
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          Already have an account?{" "}
          <span
            className="text-[#7c5c4c] hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
