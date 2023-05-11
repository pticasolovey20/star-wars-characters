import { configureStore, combineReducers } from "@reduxjs/toolkit";

import appReducer from "./slices/appSlice";
import dataReducer from "./slices/dataSlice";

const rootReducer = combineReducers({ appReducer, dataReducer });

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
