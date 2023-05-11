import { FC } from "react";
import { BsFilterRight } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import { IIconProps } from "../../types";

export const IconSelectorComponent: FC<IIconProps> = ({ icon, size }: IIconProps): JSX.Element | null => {
	switch (icon) {
		case "filter":
			return <BsFilterRight size={size} />;

		case "close":
			return <IoClose size={size} />;

		default:
			return null;
	}
};
