import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserForm } from "../types";
import { submitFormApi } from "./api";

interface FormState {
  activeStep: number;
  formValues: UserForm;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FormState = {
  activeStep: 1,
  formValues: {
    nickname: "",
    name: "",
    sername: "",
    phone: "",
    email: "",
    sex: "",
    advantages: [],
    radio: "",
    checkbox: [],
    about: "",
  },
  loading: "idle",
  error: null,
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formValues: UserForm, { rejectWithValue }) => {
    try {
      const data = await submitFormApi(formValues);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error submitting form");
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormValues: (
      state,
      action: PayloadAction<Partial<FormState["formValues"]>>
    ) => {
      state.formValues = { ...state.formValues, ...action.payload };
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { reducer: formReducer, actions: formActions } = formSlice;
export type { FormState };
