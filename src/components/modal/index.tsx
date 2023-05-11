import { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setModalIsOpenAction } from "../../store/slices/appSlice";

import { IconSelectorComponent } from "../icon-selector";
import { SelectFieldComponent } from "../select-field";
import { RangeFieldComponent } from "../range-field";

import { FilterInputs, ICharactersData, IFilmsData, IModalProps, ISpeciesData } from "../../types";
import { classNames } from "../../utils";

import { CheckboxGroupComponent } from "../checkbox-group";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { setFilteredCharactersAction } from "../../store/slices/dataSlice";

export const ModalComponent: FC<IModalProps> = ({ isOpen }: IModalProps) => {
	const [showModal, setShowModal] = useState(isOpen);
	const [selectedFilm, setSelectedFilm] = useState<IFilmsData | null>(null);
	const [selectedSpecies, setSelectedSpecies] = useState<ISpeciesData[]>([]);
	const [weightRange, setWeightRange] = useState<{ from: number | null; to: number | null }>({
		from: null,
		to: null,
	});
	const [heightRange, setHeightRange] = useState<{ from: number | null; to: number | null }>({
		from: null,
		to: null,
	});
	const [filters, setFilters] = useState<FilterInputs | null>(null);

	const { handleSubmit, control, register } = useForm<FilterInputs>();

	const dispatch = useAppDispatch();
	const { characters, films, species } = useAppSelector((state) => state.dataReducer);

	const filterCharactersByFilm = (characters: ICharactersData[], selectedFilm: IFilmsData | null) => {
		if (!selectedFilm) {
			return characters;
		}

		return characters.filter((character) => {
			return character.films.includes(selectedFilm.url);
		});
	};

	const filterCharactersBySpecies = (characters: ICharactersData[], selectedSpecies: ISpeciesData[]) => {
		if (selectedSpecies.length === 0) {
			return characters;
		}

		return characters.filter((character) => {
			return selectedSpecies.some((species) => character.species && character.species.includes(species.url));
		});
	};

	const filterCharactersByWeight = (
		characters: ICharactersData[],
		minWeight: number | null,
		maxWeight: number | null
	) => {
		return characters.filter((character) => {
			const weight = parseInt(character.mass);
			return !isNaN(weight) && weight >= +minWeight! && weight <= +maxWeight!;
		});
	};

	const filterCharactersByHeight = (
		characters: ICharactersData[],
		minHeight: number | null,
		maxHeight: number | null
	) => {
		return characters.filter((character) => {
			const height = parseInt(character.height);
			return !isNaN(height) && height >= +minHeight! && height <= +maxHeight!;
		});
	};

	const applyFilters = useCallback(
		(filters: FilterInputs | null) => {
			let filtered = characters;

			if (filters && filters.film) {
				filtered = filterCharactersByFilm(filtered, filters.film);
			}

			if (filters && filters.species) {
				const selectedSpeciesData = filters.species
					.map((selected) => {
						return species.find((item) => item.name === selected.name);
					})
					.filter(Boolean) as ISpeciesData[];

				filtered = filterCharactersBySpecies(filtered, selectedSpeciesData);
			}

			if (weightRange.from !== null && weightRange.to !== null) {
				filtered = filterCharactersByWeight(filtered, weightRange.from, weightRange.to);
			}

			if (heightRange.from !== null && heightRange.to !== null) {
				filtered = filterCharactersByHeight(filtered, heightRange.from, heightRange.to);
			}

			dispatch(setFilteredCharactersAction(filtered));
		},
		[characters, dispatch, species, heightRange, weightRange]
	);

	useEffect(() => {
		setShowModal(isOpen);
		applyFilters(filters);
	}, [isOpen, applyFilters, filters]);

	const handleClose = useCallback(() => {
		setShowModal(false);
		setTimeout(() => {
			dispatch(setModalIsOpenAction(false));
		}, 500);
	}, [dispatch]);

	const onSubmit: SubmitHandler<FilterInputs> = (data) => {
		const { film, species, height, mass } = data;
		const heightRange = { from: height?.from, to: height?.to };
		const weightRange = { from: mass?.from, to: mass?.to };

		setFilters({ film, species, height: heightRange, mass: weightRange });
		applyFilters({ film, species, height: heightRange, mass: weightRange });
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed flex justify-center items-center outline-none focus:outline-none overflow-x-hidden overflow-y-auto inset-0 z-50 bg-neutral-800/70">
			<div className="relative mx-auto">
				<div
					className={classNames(
						"h-full translate duration-500",
						showModal ? "translate-y-0" : "translate-y-full",
						showModal ? "opacity-100" : "opacity-0"
					)}
				>
					<div className="relative flex flex-col w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-black shadow-md translate  outline-none focus:outline-none bg-dark-200">
						<div
							className="
                            relative flex justify-center items-center p-3 rounded-t border-b-[1px] "
						>
							<button
								className="absolute left-2 p-1 border-0 hover:opacity-70 transition"
								onClick={handleClose}
							>
								<IconSelectorComponent icon="close" size={20} />
							</button>
							<h1 className="text-xl">Filters</h1>
						</div>
						<form className="relative p-6 flex-auto flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								control={control}
								name="film"
								render={({ field }) => (
									<SelectFieldComponent
										{...field}
										options={films}
										value={selectedFilm?.title}
										onChange={(selectedOption: IFilmsData | null) => {
											setSelectedFilm(selectedOption);
											field.onChange(selectedOption);
										}}
									/>
								)}
							/>
							<Controller
								control={control}
								name="species"
								render={({ field }) => (
									<CheckboxGroupComponent
										options={species}
										value={selectedSpecies}
										onChange={(selectedValues: any) => {
											field.onChange(selectedValues);
											setSelectedSpecies(selectedValues);
										}}
									/>
								)}
							/>
							<div className="flex items-end gap-4">
								<p className="text-xl text-silver-100">Height:</p>

								<Controller
									control={control}
									name="height"
									render={({ field }) => (
										<RangeFieldComponent
											{...field}
											register={register}
											minValue={heightRange.from}
											maxValue={heightRange.to}
											onRangeChange={(minValue, maxValue) => {
												setHeightRange({ from: minValue, to: maxValue });
											}}
										/>
									)}
								/>
							</div>
							<div className="flex items-end gap-4">
								<p className="text-xl text-silver-100">Mass:</p>
								<Controller
									control={control}
									name="mass"
									render={({ field }) => (
										<RangeFieldComponent
											register={register}
											{...field}
											minValue={weightRange.from}
											maxValue={weightRange.to}
											onRangeChange={(minValue, maxValue) => {
												setWeightRange({ from: minValue, to: maxValue });
											}}
										/>
									)}
								/>
							</div>
							<button
								className="w-full p-2 bg-rose-600 border-2 border-gray-600 rounded-lg"
								type="submit"
							>
								SUBMIT
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
