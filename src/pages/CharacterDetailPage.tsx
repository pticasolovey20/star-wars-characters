import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCharactersByName } from "../store/slices/dataSlice";

import { classNames } from "../utils";
import { IFilmsData, IShipsData, ISpeciesData } from "../types";

export const CharacterDetailPage: FC = (): JSX.Element => {
	const { name } = useParams();

	const { isMobile } = useAppSelector((state) => state.appReducer);
	const { character, films, species, starships } = useAppSelector((state) => state.dataReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCharactersByName(name));
	}, [dispatch, name]);

	const charactersFilms = films.filter((film: IFilmsData) => character?.films.includes(film.url));
	const charactersSpecies = species.filter((item: ISpeciesData) => item.people?.includes(character!?.url));
	const charactersSpaceships = starships.filter((starship: IShipsData) =>
		character?.starships.includes(starship.url)
	);

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div
				className={classNames("flex rounded-xl overflow-hidden shadow-lg shadow-black", isMobile && "flex-col")}
			>
				<img
					src={`https://dummyimage.com/420x320/ff7f7f/333333.png&text=${name}`}
					alt={`character_${name}`}
					className="aspect-square"
				/>
				<div className="flex flex-col justify-around p-4 gap-2 text-silver-100 text-2xl bg-dark-200">
					<p className="cursor-pointer">Name: {name}</p>
					<div className="flex gap-2 cursor-pointer">
						Species:
						<p className="">{charactersSpecies.length > 0 && charactersSpecies[0].name}</p>
					</div>
					<div className="flex flex-col gap-1 cursor-pointer">
						Movies:
						{charactersFilms.map((film) => (
							<li className="text-sm" key={film.title}>
								{film.title}
							</li>
						))}
					</div>

					<div className="flex flex-col gap-1 cursor-pointer">
						Spaceships:
						{charactersSpaceships.map((starships) => (
							<li className="text-sm" key={starships.model}>
								{starships.model}
							</li>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
