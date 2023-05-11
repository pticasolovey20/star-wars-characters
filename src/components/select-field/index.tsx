import { FC, forwardRef, Ref } from "react";
import { SelectFieldProps } from "../../types";

export const SelectFieldComponent: FC<SelectFieldProps> = forwardRef(
	({ options, value, onChange }: SelectFieldProps, ref: Ref<HTMLSelectElement>) => {
		const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedValue = event.target.value;
			const selectedOption = options.find((option) => option.title === selectedValue);
			if (selectedOption) {
				onChange(selectedOption);
			}
		};

		return (
			<div className="relative w-full">
				<select
					ref={ref}
					className="flex items-center w-full px-4 py-2 text-sm bg-dark-200 border-2 border-gray-600 rounded-md focus:outline-none"
					value={value || ""}
					onChange={handleSelect}
				>
					<option value="">Select Film</option>
					{options.map((option) => (
						<option key={option.title} value={option.title}>
							{option.title}
						</option>
					))}
				</select>
			</div>
		);
	}
);
