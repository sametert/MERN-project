import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../../store/store";
import merp from "../../images/merp1.png";

function Login() {
  const navigateTo = useNavigate();
  const setUserValues = useMainStore((state) => state.setUserValues);

  return (
    <div
      className="flex items-center gap-4 h-screen"
      style={{ backgroundColor: "rgb(22,72,196)" }}
    >
      <img src={merp} alt="" />
      <div className="p-8 bg-white rounded-lg shadow-lg z-30 w-2/6 shadow-cyan-500/50">
        <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
        <Formik
          initialValues={{
            name: "",
            secondname: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false,
            classYear: "",
            department: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (!values.email.endsWith("@std.ankaramedipol.edu.tr")) {
              errors.email = "Please enter a school email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword = "Passwords must match";
            }
            if (!values.termsAccepted) {
              errors.termsAccepted = "You must accept the terms and conditions";
            }
            if (!values.name) {
              errors.name = "Name not entered";
            }
            if (!values.secondname) {
              errors.secondname = "Second name not entered";
            }
            if (!values.classYear) {
              errors.classYear = "Class year not selected";
            }
            if (!values.department) {
              errors.department = "Department not selected";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setUserValues(values);
            if (
              !values.name ||
              !values.secondname ||
              !values.email ||
              !values.password ||
              !values.confirmPassword ||
              !values.termsAccepted ||
              !values.classYear ||
              !values.department
            ) {
              setSubmitting(false);
              return;
            }
            navigateTo("/home");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm text-slate-600">
                  İsim ve Soyisim
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500">{errors.name}</div>
                  )}
                  <input
                    type="text"
                    name="secondname"
                    placeholder="Enter your second name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondname}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                  />
                  {errors.secondname && touched.secondname && (
                    <div className="text-red-500">{errors.secondname}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm text-slate-600">
                  E posta
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your school email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm text-slate-600">
                  Parolanızı ayarlayın
                </label>
                <input
                  type="password"
                  placeholder="Parolanızı ayarlayın"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm text-slate-600">
                  Parolanızı doğrulayın
                </label>
                <input
                  type="password"
                  placeholder="Parolanızı doğrulayın"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-6"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500">{errors.confirmPassword}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm text-slate-600">
                  Sınıf
                </label>
                <select
                  name="classYear"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.classYear}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                >
                  <option value="" label="Sınıfınızı seçin" />
                  <option value="1" label="1. Sınıf" />
                  <option value="2" label="2. Sınıf" />
                  <option value="3" label="3. Sınıf" />
                  <option value="4" label="4. Sınıf" />
                </select>
                {errors.classYear && touched.classYear && (
                  <div className="text-red-500">{errors.classYear}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm text-slate-600">
                  Bölüm
                </label>
                <select
                  name="department"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.department}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
                >
                  <option value="" label="Bölümünüzü seçin" />
                  <option
                    value="Yönetim Bilişim Sistemleri"
                    label="Yönetim Bilişim Sistemleri"
                  />
                  <option value="Psikoloji" label="Psikoloji" />
                  <option
                    value="Uluslararası Ticaret ve Finansman"
                    label="Uluslararası Ticaret ve Finansman"
                  />
                </select>
                {errors.department && touched.department && (
                  <div className="text-red-500">{errors.department}</div>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  className="cursor-pointer"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.termsAccepted}
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-slate-600"
                >
                  Kaydolarak Şartlarımızı ve Gizlilik Politikamızı kabul etmiş
                  olursunuz.
                </label>
                {errors.termsAccepted && touched.termsAccepted && (
                  <div className="text-red-500">{errors.termsAccepted}</div>
                )}
              </div>
              <button
                className="w-full bg-merpBg hover:bg-hoverBg text-white py-2 px-4 rounded-md transition duration-300 mt-6 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                Şimdi Katıl
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
