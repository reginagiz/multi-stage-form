import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import s from "./MainForm.module.css";
import HeaderForm from "./HeaderForm";

const MainForm: React.FC = () => {
  const activeStep = useSelector((state: RootState) => state.form.activeStep);

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
    }
  };

  return (
    <div className={s.main_form}>
      <HeaderForm />
      {renderStep()}
    </div>
  );
};

export default MainForm;
