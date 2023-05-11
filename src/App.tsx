import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setIsMobileAction, setWidthAction } from "./store/slices/appSlice";

import { HeaderComponent } from "./components/header";

import { HomePage } from "./pages/HomePage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { ModalComponent } from "./components/modal";

export const App: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { width, modalIsOpen } = useAppSelector((state) => state.appReducer);

	useEffect(() => {
		const handleResize = () => dispatch(setWidthAction(window.innerWidth));
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [dispatch]);

	useEffect(() => {
		width < 744 ? dispatch(setIsMobileAction(true)) : dispatch(setIsMobileAction(false));
	}, [width, dispatch]);

	return (
		<div className="min-h-screen bg-dark-100 text-white">
			<HeaderComponent />
			<ModalComponent isOpen={modalIsOpen} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/characters/:name" element={<CharacterDetailPage />} />
			</Routes>
		</div>
	);
};
