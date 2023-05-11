// data

import { UseFormRegister } from "react-hook-form";

export interface ICharactersData {
	birth_year: string;
	created: string;
	edited: string;
	eye_color: string;
	films: string;
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	species: string[] | null;
	starships: string[];
	url: string;
	vehicles: string;
}

export interface IFilmsData {
	characters: string[];
	created: string;
	director: string;
	edited: string;
	episode_id: number;
	opening_crawl: string;
	planets: string[];
	producer: string;
	release_date: string;
	species: string[];
	starships: string[];
	title: string;
	url: string;
	vehicles: string[];
}

export interface IShipsData {
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	created: string;
	crew: string;
	edited: string;
	films: string[];
	hyperdrive_rating: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	pilots: string[];
	starship_class: string;
	url: string;
}

export interface ISpeciesData {
	average_height: string;
	average_lifespan: string;
	classification: string;
	created: string;
	designation: string;
	edited: string;
	eye_colors: string;
	films: string[];
	hair_colors: string;
	homeworld: string;
	language: string;
	name: string;
	people: any;
	skin_colors: string;
	url: string;
}

export interface FilterInputs {
	film: IFilmsData | null;
	species: ISpeciesData[];
	height: {
		from: number | null;
		to: number | null;
	};
	mass: {
		from: number | null;
		to: number | null;
	};
}

// props

export interface ICharacterProps {
	character: ICharactersData;
}

export interface IIconProps {
	icon: string;
	size: number;
}

export interface IModalProps {
	isOpen: boolean;
}

export interface SelectFieldProps {
	options: IFilmsData[];
	value: string | undefined;
	onChange: (value: IFilmsData) => void;
}

export interface RangeFieldProps {
	name: "mass" | "height";
	register: UseFormRegister<any>;
	minValue: number | null;
	maxValue: number | null;
	onRangeChange: (minValue: number | null, maxValue: number | null) => void;
}

export interface CheckboxGroupProps {
	options: ISpeciesData[];
	value: ISpeciesData[];
	onChange: (value: ISpeciesData[]) => void;
}
