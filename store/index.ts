import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import languageReducer from "./slices/languageSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

export const store = configureStore({
	reducer: {
		search: searchReducer,
		language: languageReducer,
		subscription: subscriptionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


