import { configureStore } from "@reduxjs/toolkit";
import { formReducer, FormState } from "./formSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type { FormState };
