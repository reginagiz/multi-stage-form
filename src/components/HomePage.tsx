import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/formSlice";
import { UserForm } from "../types";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import s from "./HomePage.module.css";

const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, "");

  const match = phoneNumber.match(
    /^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/
  );

  if (match) {
    return `+7 (${match[2] || ""})${match[3] ? ` ${match[3]}` : ""}${
      match[4] ? `-${match[4]}` : ""
    }${match[5] ? `-${match[5]}` : ""}`;
  }

  return value;
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formValues = useSelector((state: RootState) => state.form.formValues);

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона")
      .required("Поле обязательно для заполнения"),
    email: Yup.string()
      .email("Неверный Email формат ")
      .required("Поле обязательно для заполнения"),
  });

  const handleSubmit = (values: UserForm) => {
    dispatch(formActions.setFormValues(values));
    navigate("/form");
  };

  return (
    <div className={s.home_page}>
      <Formik
        initialValues={{ ...formValues }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <div className={s.phone_container}>
            <label>Номер телефона</label>
            <Field name="phone">
              {({ field, form }: any) => (
                <input
                  {...field}
                  type="text"
                  className={`form-field ${s.field_input}`}
                  placeholder="+7 (___) ___-__-__"
                  value={formatPhoneNumber(field.value)}
                  onBlur={() => form.setFieldTouched("phone", true)}
                  onChange={(e) => {
                    form.setFieldValue(
                      "phone",
                      formatPhoneNumber(e.target.value)
                    );
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />
          </div>

          <div className={s.email_container}>
            <label>Email</label>
            <Field
              type="email"
              name="email"
              placeholder="webstudio.fractal@example.com"
              className={`form-field ${s.field_input}`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <button type="submit" className={`button-next ${s.button_next}`}>
            Начать
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default HomePage;
