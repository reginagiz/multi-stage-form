import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/formSlice";
import { UserForm } from "../types";
import { RootState } from "../store/store";
import PlusIcon from "../images/PlusIcon";
import RemoveIcon from "../images/RemoveIcon";
import s from "./Step2.module.css";

const Step2: React.FC = () => {
  const dispatch = useDispatch();

  const formValues = useSelector((state: RootState) => state.form.formValues);

  const validationSchema = Yup.object({
    advantages: Yup.array()
      .of(Yup.string())
      .min(1, "Наличие хотя бы одного поля обязательно.")
      .test(
        "at-least-one-advantage",
        "Хотя бы одно поле должно быть заполнено",
        (value) => {
          return value?.some((advantage) => advantage?.trim() !== "");
        }
      ),
    checkbox: Yup.array()
      .of(Yup.number().oneOf([1, 2, 3]))
      .min(1, "Выбор хотя бы одного варианта обязателен."),
    radio: Yup.number().oneOf([1, 2, 3]).required("Выбор варианта обязателен."),
  });

  const initialValues: UserForm = {
    advantages: formValues?.advantages?.length
      ? formValues.advantages
      : ["", "", ""],
    checkbox: formValues.checkbox || [],
    radio: formValues.radio || "",
  };

  const handleSubmit = (values: UserForm) => {
    dispatch(formActions.setFormValues(values));
    dispatch(formActions.setActiveStep(3));
    console.log(values);
  };

  const returnBack = () => {
    dispatch(formActions.setActiveStep(1));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={s.form}>
            <div className={s.advantages}>
              <label>Преимущества</label>
              <FieldArray name="advantages">
                {(arrayHelpers) => (
                  <>
                    {values?.advantages?.map(
                      (advantage: string, index: number) => (
                        <div key={index} className={s.field_block}>
                          <Field
                            type="text"
                            name={`advantages.${index}`}
                            className={`form-field ${s.field_input}`}
                          />
                          <button
                            className={s.remove_button}
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <RemoveIcon />
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      className={s.add_button}
                      onClick={() => arrayHelpers.push("")}
                    >
                      <PlusIcon />
                    </button>
                  </>
                )}
              </FieldArray>
              <ErrorMessage
                name="advantages"
                component="div"
                className="error-message"
              />
            </div>

            <div className={s.checkbox_group}>
              <label>Checkbox группа</label>
              <div className={s.checkbox_group_chek}>
                <label>
                  <Field type="checkbox" name="checkbox" value={"1"} />1
                </label>
                <label>
                  <Field type="checkbox" name="checkbox" value={"2"} />2
                </label>
                <label>
                  <Field type="checkbox" name="checkbox" value={"3"} />3
                </label>
              </div>
              <ErrorMessage
                name="checkbox"
                component="div"
                className="error-message"
              />
            </div>

            <div className={s.radio_group}>
              <label>Radio группа</label>
              <div className={s.radio_group_radio}>
                <label>
                  <Field type="radio" name="radio" value={"1"} />1
                </label>
                <label>
                  <Field type="radio" name="radio" value={"2"} />2
                </label>
                <label>
                  <Field type="radio" name="radio" value={"3"} />3
                </label>
              </div>
              <ErrorMessage
                name="radio"
                component="div"
                className="error-message"
              />
            </div>

            <div className={s.button_block}>
              <button
                type="button"
                onClick={() => returnBack()}
                className="button-back"
              >
                Назад
              </button>
              <button type="submit" className="button-next">
                Далее
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2;
