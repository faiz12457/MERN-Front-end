import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import api from "../../../api";
import { Slide, toast } from "react-toastify";
import { ResetPasswordSchema } from "../../yupSchema/resetPasswordSchema";

export function ResetPassword() {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
    }
  }, []);

  async function onSubmit(values, actions) {
    try {
      values["token"] = token;
      values["userId"] = userId;

      actions.setSubmitting(true);

      const res = await api.post("/auth/resetPassword", values);
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } finally {
      actions.setSubmitting(false);
      actions.resetForm();
      navigate("/login");
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;
  const { password, confirmPassword } = values;
  return (
    <div className="w-full h-screen grid place-content-center">
      <form
        onSubmit={handleSubmit}
        className="  shadow p-6 flex flex-col gap-4 items-center "
      >
        <div className="space-y-2   w-full   ">
          <h5 className="text-3xl font-bold text-black">Reset Password</h5>
          <p className="text-black opacity-70">
            Please enter and confirm new password
          </p>
        </div>

        <AuthInput
          type="password"
          name={"password"}
          placeholder={"New Password"}
          value={password}
          touched={touched.password}
          errors={errors.password}
          handlechange={handleChange}
          handleblur={handleBlur}
        />
        <AuthInput
          type="password"
          name={"confirmPassword"}
          placeholder={"Confrim New Password"}
          value={confirmPassword}
          touched={touched.confirmPassword}
          errors={errors.confirmPassword}
          handlechange={handleChange}
          handleblur={handleBlur}
        />
        <AuthButton title={"RESET PASSWORD"} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}


