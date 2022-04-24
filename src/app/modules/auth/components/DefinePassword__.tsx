/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import * as auth from "../redux/AuthRedux";
import { register } from "../redux/AuthCRUD";
import { Link } from "react-router-dom";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const definePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  changepassword: Yup.string()
    .required("Password confirmation is required")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password didn't match"
      ),
    }),
});

export function DefinePassword() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: definePasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        register(
          values.email,
          values.firstname,
          values.lastname,
          values.password
        )
          .then(({ data: { accessToken } }) => {
            setLoading(false);
            dispatch(auth.actions.login(accessToken));
          })
          .catch(() => {
            setLoading(false);
            setSubmitting(false);
            setStatus("Define password process has broken");
          });
      }, 1000);
    },
  });

  return (
    <form
      className="form w-100"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Title */}
      <div className="pb-5 pb-lg-15">
        <h3 className="fw-bolder text-dark display-6">Define your password</h3>
        <p className="text-muted fw-bold fs-3">
          Please, define toyr password in order to accesse your secure user interface
        </p>
      </div>
      {/* end::Title */}

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Password */}
      <div className="fv-row mb-5">
        <label className="form-label fs-6 fw-bolder text-dark pt-5">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.password}</div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className="fv-row mb-10">
        <label className="form-label fs-6 fw-bolder text-dark pt-5">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Password confirmation"
          autoComplete="off"
          {...formik.getFieldProps("changepassword")}
          className={clsx(
            "form-control form-control-lg form-control-solid",
            {
              "is-invalid":
                formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              "is-valid":
                formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.changepassword}</div>
          </div>
        )}
      </div>
      {/* end::Form group */}

     

      {/* begin::Form group */}
      <div className="d-flex flex-wrap pb-lg-0 pb-5">
        <button
          type="submit"
          id="kt_login_signup_form_submit_button"
          className="btn btn-primary fw-bolder fs-6 px-8 py-4 my-3 me-4"
          disabled={
            formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms
          }
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        
      </div>
      {/* end::Form group */}
    </form>
  );
}
