import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	width: window.innerWidth,
	isMobile: false,
	modalIsOpen: false,
} as appState;

interface appState {
	width: number;
	isMobile: boolean;
	modalIsOpen: boolean;
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setWidthAction(state, action: PayloadAction<number>) {
			state.width = action.payload;
		},
		setIsMobileAction(state, action: PayloadAction<boolean>) {
			state.isMobile = action.payload;
		},
		setModalIsOpenAction(state, action: PayloadAction<boolean>) {
			state.modalIsOpen = action.payload;
		},
	},
});

export const { setWidthAction, setIsMobileAction, setModalIsOpenAction } = appSlice.actions;
export default appSlice.reducer;
