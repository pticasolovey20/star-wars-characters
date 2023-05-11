import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setModalIsOpenAction } from "../../store/slices/appSlice";

import { IconSelectorComponent } from "../icon-selector";

import { classNames } from "../../utils";

export const HeaderComponent: FC = (): JSX.Element => {
	const { width } = useAppSelector((state) => state.appReducer);
	const dispatch = useAppDispatch();
	const location = useLocation();

	return (
		<header
			className={classNames(
				"sticky top-0 flex justify-between p-4 z-10 bg-dark-100 shadow-black shadow-md",
				width < 500 ? "flex-col gap-3" : "items-center"
			)}
		>
			<Link to="/" className="text-2xl tracking-wide">
				Star Wars | Characters
			</Link>
			<div className="flex justify-end">
				{location.pathname === "/" && (
					<button
						className="flex gap-2 px-4 py-2 rounded-lg border-2 border-gray-600"
						onClick={() => dispatch(setModalIsOpenAction(true))}
					>
						FILTER
						<IconSelectorComponent icon="filter" size={24} />
					</button>
				)}
			</div>
		</header>
	);
};
