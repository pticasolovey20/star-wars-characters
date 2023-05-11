import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchData } from "../store/slices/dataSlice";

import { LoaderSquareComponent } from "../components/loader";
import { CharacterComponent } from "../components/character";

import { classNames } from "../utils";
import { styles } from "../styles/styles";

export const HomePage: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const { loading, filteredCharacter } = useAppSelector((state) => state.dataReducer);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	return (
		<div className={classNames(styles.grid, "gap-4 p-4")}>
			{loading
				? Array.from({ length: 10 }).map((_, index) => <LoaderSquareComponent key={index} />)
				: filteredCharacter.map((character) => (
						<CharacterComponent key={character.created} character={character} />
				  ))}
		</div>
	);
};
