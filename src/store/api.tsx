import { UserForm } from "../types";

export const submitFormApi = async (formValues: UserForm) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.3;
      if (isSuccess) {
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    }, 1500);
  });
};
