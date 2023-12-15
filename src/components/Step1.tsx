import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/formSlice";
import { UserForm } from "../types";
import { RootState } from "../store/store";
import { NavLink } from "react-router-dom";
import s from "./Step1.module.css";

const Step1: React.FC = () => {
  const dispatch = useDispatch();

  const formValues = useSelector((state: RootState) => state.form.formValues);

  const validationSchema = Yup.object({
    nickname: Yup.string()
      .max(30)
      .matches(/^[a-zA-Zа-яА-Я0-9]+$/, "Используйте только буквы и цифры")
      .required("Обязательно для заполнения"),

    name: Yup.string()
      .max(50)
      .matches(/^[a-zA-Zа-яА-Я]+$/, "Используйте только буквы")
      .required("Обязательно для заполнения"),

    sername: Yup.string()
      .max(50)
      .matches(/^[a-zA-Zа-яА-Я]+$/, "Используйте только буквы")
      .required("Обязательно для заполнения"),

    sex: Yup.string()
      .oneOf(["man", "woman"])
      .required("Обязательно для заполнения"),
  });

  const handleSubmit = (values: UserForm) => {
    dispatch(formActions.setFormValues(values));
    dispatch(formActions.setActiveStep(2));
  };

  return (
    <Formik
      initialValues={{ ...formValues }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <div className={s.field_block}>
          <label>Никнейм</label>
          <Field
            type="text"
            name="nickname"
            className={`form-field ${s.field_input}`}
          />
          <ErrorMessage
            name="nickname"
            component="div"
            className="error-message"
          />
        </div>

        <div className={s.field_block}>
          <label>Имя</label>
          <Field
            type="text"
            name="name"
            className={`form-field ${s.field_input}`}
          />
          <ErrorMessage name="name" component="div" className="error-message" />
        </div>

        <div className={s.field_block}>
          <label>Фамилия</label>
          <Field
            type="text"
            name="sername"
            className={`form-field ${s.field_input}`}
          />
          <ErrorMessage
            name="sername"
            component="div"
            className="error-message"
          />
        </div>

        <div className={s.field_block}>
          <label>Пол</label>
          <Field as="select" name="sex" className={s.selector}>
            <option value="">Не выбрано</option>
            <option value="man">Мужской</option>
            <option value="woman">Женский</option>
          </Field>
          <ErrorMessage name="sex" component="div" className="error-message" />
        </div>

        <div className={s.button_block}>
          <NavLink to={"/"}>
            <button type="submit" className="button-back">
              Назад
            </button>
          </NavLink>

          <button type="submit" className="button-next">
            Далее
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Step1;
