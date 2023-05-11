import { FC, ChangeEvent, useState } from "react";
import { CheckboxGroupProps, ISpeciesData } from "../../types";

export const CheckboxGroupComponent: FC<CheckboxGroupProps> = ({
	options,
	value,
	onChange,
}: CheckboxGroupProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedValue = event.target.value;
		let updatedValues: ISpeciesData[];

		if (value.find((species) => species.name === selectedValue)) {
			updatedValues = value.filter((species) => species.name !== selectedValue);
		} else {
			const selectedSpecies = options.find((species) => species.name === selectedValue);
			if (selectedSpecies) {
				updatedValues = [...value, selectedSpecies];
			} else {
				updatedValues = value;
			}
		}

		onChange(updatedValues);
	};

	return (
		<div className="relative w-full">
			<button
				className="flex items-center justify-between w-full px-4 py-2 text-sm bg-dark-200 border-2 border-gray-600 rounded-md focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-white">Select Species</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={`absolute right-1 w-4 h-4 ml-2 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path fillRule="evenodd" d="M10 14l6-6H4l6 6z" />
				</svg>
			</button>
			{isOpen && (
				<div className="absolute max-h-[300px] flex flex-col gap-2 p-3 z-10 w-full mt-2 bg-dark-200 rounded-md shadow-lg overflow-hidden overflow-y-auto">
					{options.map((option) => (
						<label key={option.name} className="flex items-center justify-end gap-1">
							{option.name}
							<input
								type="checkbox"
								value={option.name}
								checked={value.includes(option)}
								onChange={handleCheckboxChange}
							/>
						</label>
					))}
				</div>
			)}
		</div>
	);
};
