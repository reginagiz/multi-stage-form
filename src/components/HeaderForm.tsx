import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import s from "./HeaderForm.module.css";

const HeaderForm: React.FC = () => {
  const activeStep = useSelector((state: RootState) => state.form.activeStep);

  return (
    <div className={s.header_form}>
      <div className={s.slider}>
        <div className={s.sircle_block}>
          <div
            className={`${s.sircle} ${activeStep >= 1 ? s.active_sircle : ""}`}
          ></div>
          <div
            className={`${s.digital} ${
              activeStep >= 1 ? s.active_digital : ""
            }`}
          >
            1
          </div>
        </div>
        <div
          className={`${s.line} ${activeStep >= 2 ? s.active_line : ""}`}
        ></div>

        <div className={s.sircle_block}>
          <div
            className={`${s.sircle} ${activeStep >= 2 ? s.active_sircle : ""}`}
          ></div>
          <div
            className={`${s.digital} ${
              activeStep >= 2 ? s.active_digital : ""
            }`}
          >
            2
          </div>
        </div>
        <div
          className={`${s.line} ${activeStep === 3 ? s.active_line : ""}`}
        ></div>
        <div className={s.sircle_block}>
          <div
            className={`${s.sircle} ${activeStep === 3 ? s.active_sircle : ""}`}
          ></div>
          <div
            className={`${s.digital} ${
              activeStep === 3 ? s.active_digital : ""
            }`}
          >
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderForm;
