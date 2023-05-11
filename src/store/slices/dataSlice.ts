import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ICharactersData, IFilmsData, ISpeciesData } from "../../types";

const BASE_URL = "https://swapi.dev/api/";

export const fetchCharacters = createAsyncThunk("characters/fetchCharacters", async (_, { rejectWithValue }) => {
	try {
		let characters: ICharactersData[] = [];
		let isLastPage = false;

		for (let i = 1; !isLastPage; i++) {
			const response = await axios.get(`${BASE_URL}/people?page=${i}`);
			const { results, next } = response.data;
			characters = characters.concat(results as ICharactersData[]);
			isLastPage = !next;
		}

		return characters;
	} catch (error: any) {
		if ("message" in error && typeof error.message === "string") {
			return rejectWithValue({ error: error.message });
		} else {
			return rejectWithValue({ error: "An error occurred" });
		}
	}
});

export const fetchCharactersByName = createAsyncThunk(
	"characterByName/fetchCharactersByName",
	async (name: string | undefined, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL}people/?search=${name}`);
			return data.results[0];
		} catch (error: any) {
			if ("message" in error && typeof error.message === "string") {
				return rejectWithValue({ error: error.message });
			} else {
				return rejectWithValue({ error: "An error occurred" });
			}
		}
	}
);

export const fetchSpecies = createAsyncThunk("species/fetchSpecies", async (_, { rejectWithValue }) => {
	try {
		let species: ISpeciesData[] = [];
		let isLastPage = false;

		for (let i = 1; !isLastPage; i++) {
			const response = await axios.get(`${BASE_URL}/species?page=${i}`);
			const { results, next } = response.data;
			species = species.concat(results as ISpeciesData[]);
			isLastPage = !next;
		}

		return species;
	} catch (error: any) {
		if ("message" in error && typeof error.message === "string") {
			return rejectWithValue({ error: error.message });
		} else {
			return rejectWithValue({ error: "An error occurred" });
		}
	}
});

export const fetchStarships = createAsyncThunk("starships/fetchStarships", async (_, { rejectWithValue }) => {
	try {
		let starships: any[] = [];
		let isLastPage = false;

		for (let i = 1; !isLastPage; i++) {
			const response = await axios.get(`${BASE_URL}/starships?page=${i}`);
			const { results, next } = response.data;
			starships = starships.concat(results as any[]);
			isLastPage = !next;
		}

		return starships;
	} catch (error: any) {
		if ("message" in error && typeof error.message === "string") {
			return rejectWithValue({ error: error.message });
		} else {
			return rejectWithValue({ error: "An error occurred" });
		}
	}
});

export const fetchData = createAsyncThunk("allFilms/fetchAllFilms", async (_, { rejectWithValue, dispatch }) => {
	try {
		const [charactersAction, speciesAction, starshipsAction, films] = await Promise.all([
			dispatch(fetchCharacters()),
			dispatch(fetchSpecies()),
			dispatch(fetchStarships()),
			axios.get(`${BASE_URL}films/`),
		]);

		const charactersResponse = charactersAction.payload;
		const filmsResponse = films.data.results;
		const speciesResponse = speciesAction.payload;
		const starshipsResponse = starshipsAction.payload;

		return {
			characters: charactersResponse,
			films: filmsResponse,
			species: speciesResponse,
			starships: starshipsResponse,
		};
	} catch (error: any) {
		if ("message" in error && typeof error.message === "string") {
			return rejectWithValue({ error: error.message });
		} else {
			return rejectWithValue({ error: "An error occurred" });
		}
	}
});

const initialState = {
	loading: false,
	error: "",
	characters: [],
	character: null,
	films: [],
	species: [],
	starships: [],
	filteredCharacter: [],
} as appState;

interface appState {
	loading: boolean;
	error: string;
	characters: ICharactersData[];
	character: ICharactersData | null;
	films: IFilmsData[];
	species: ISpeciesData[];
	starships: any[];
	filteredCharacter: ICharactersData[];
}

const dataSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setFilteredCharactersAction(state, action) {
			state.filteredCharacter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchData.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.characters = action.payload.characters as ICharactersData[];
			state.films = action.payload.films;
			state.species = action.payload.species as ISpeciesData[];
			state.starships = action.payload.starships as any[];
			state.loading = false;
			state.error = "";
		});
		builder.addCase(fetchData.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as string;
		});

		builder.addCase(fetchCharactersByName.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCharactersByName.fulfilled, (state, action) => {
			state.character = action.payload;
			state.loading = false;
			state.error = "";
		});
		builder.addCase(fetchCharactersByName.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as string;
		});
	},
});

export const { setFilteredCharactersAction } = dataSlice.actions;
export default dataSlice.reducer;
