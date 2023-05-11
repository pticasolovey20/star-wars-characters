import { FC } from "react";
import { Link } from "react-router-dom";

import { ICharacterProps } from "../../types";
import { classNames } from "../../utils";
import { styles } from "../../styles/styles";

export const CharacterComponent: FC<ICharacterProps> = ({ character }: ICharacterProps): JSX.Element => {
	return (
		<Link
			to={`/characters/${character.name}`}
			className={classNames(styles.squares, "flex flex-col overflow-hidden")}
		>
			<img
				src={`https://dummyimage.com/420x320/7472ed/333333.png&text=${character.name}`}
				alt={`character_${character.name}`}
				className="aspect-video flex-1"
			/>
			<div className="flex items-end justify-between gap-4 p-4 text-silver-100">
				<h1 className="w-full truncate text-lg hover:text-white">{character.name}</h1>
				<p className="text-end hover:text-white">{character.gender}</p>
			</div>
		</Link>
	);
};
