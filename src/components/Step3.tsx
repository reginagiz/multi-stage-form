import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formActions, submitForm } from "../store/formSlice";
import { RootState } from "../store/store";
import s from "./Step3.module.css";
import { UserForm } from "../types";
import Modal from "./Modal";

const Step3: React.FC = () => {
  const dispatch = useDispatch();

  const [actionButton, setActionButton] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formValues = useSelector((state: RootState) => state.form.formValues);
  const formLoading = useSelector((state: RootState) => state.form.loading);

  const validationSchema = Yup.object({
    about: Yup.string().max(200).required("Обязательно для заполнения"),
  });

  const onSubmit = async (values: UserForm) => {
    dispatch(formActions.setFormValues(values));

    if (actionButton === 1) {
      dispatch(formActions.setActiveStep(2));
    } else {
      if (values.about?.length && values.about?.length > 0) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const action = await dispatch(submitForm(values));

          if (submitForm.fulfilled.match(action)) {
            const { success } = action.payload;
            if (success) {
              console.log("Form submitted successfully:", values);
              setIsSuccess(true);
              setShowModal(true);
            } else {
              console.error("Form submission failed:", values);
              setIsSuccess(false);
              setShowModal(true);
            }
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setIsSuccess(false);
          setShowModal(true);
        }
      }
    }
    return;
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{ ...formValues }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={s.form}>
            <div className={s.about_container}>
              <label>О себе</label>
              <Field as="textarea" name="about" />
              <ErrorMessage
                name="about"
                component="div"
                className="error-message"
              />
            </div>

            <div className={s.button_block}>
              <button
                type="submit"
                className="button-back"
                onClick={() => setActionButton(1)}
              >
                Назад
              </button>
              <button
                type="submit"
                className="button-next"
                onClick={() => setActionButton(2)}
                disabled={formLoading === "pending"}
              >
                {formLoading === "pending" ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {showModal && (
        <Modal isSuccess={isSuccess} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Step3;
