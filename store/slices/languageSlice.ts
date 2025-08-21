import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LanguageState, SupportedLocale } from "@/types";

const initialState: LanguageState = {
	locale: "en",
};

const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		setLocale(state, action: PayloadAction<SupportedLocale>) {
			state.locale = action.payload;
		},
	},
});

export const { setLocale } = languageSlice.actions;
export default languageSlice.reducer;


