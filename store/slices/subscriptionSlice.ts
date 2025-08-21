import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SubscriptionState } from "@/types";

const initialState: SubscriptionState = {
	status: "idle",
	knownEmails: [],
};

const subscriptionSlice = createSlice({
	name: "subscription",
	initialState,
	reducers: {
		startSubmitting(state, action: PayloadAction<string>) {
			state.status = "submitting";
			state.lastEmail = action.payload.toLowerCase();
			state.errorMessage = undefined;
		},
		subscribeSuccess(state) {
			state.status = "success";
			if (state.lastEmail && !state.knownEmails.includes(state.lastEmail)) {
				state.knownEmails.push(state.lastEmail);
			}
		},
		subscribeError(state, action: PayloadAction<string | undefined>) {
			state.status = "error";
			state.errorMessage = action.payload;
		},
		resetStatus(state) {
			state.status = "idle";
			state.errorMessage = undefined;
		},
	},
});

export const { startSubmitting, subscribeSuccess, subscribeError, resetStatus } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;


