import { FC, useState } from "react";
import { RangeFieldProps } from "../../types";

export const RangeFieldComponent: FC<RangeFieldProps> = ({
	name,
	minValue,
	maxValue,
	register,
	onRangeChange,
}: RangeFieldProps) => {
	const [minValueInput, setMinValueInput] = useState(minValue !== null ? minValue.toString() : "");
	const [maxValueInput, setMaxValueInput] = useState(maxValue !== null ? maxValue.toString() : "");

	const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		setMinValueInput(input);
		const minValue = parseFloat(input);
		const maxValue = parseFloat(maxValueInput);
		if (!isNaN(minValue) && !isNaN(maxValue)) {
			onRangeChange(minValue, maxValue);
		}
	};

	const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		setMaxValueInput(input);
		const minValue = parseFloat(minValueInput);
		const maxValue = parseFloat(input);
		if (!isNaN(minValue) && !isNaN(maxValue)) {
			onRangeChange(minValue, maxValue);
		}
	};

	return (
		<div className="flex items-center justify-end gap-4 w-full">
			<label className="flex flex-col">
				min value:
				<input
					type="number"
					{...register(`${name}.from`, { valueAsNumber: true })}
					value={minValueInput}
					onChange={handleMinValueChange}
					className="flex w-full p-2 border-2 border-gray-600 bg-dark-200 rounded-md"
				/>
			</label>
			<label className="flex flex-col">
				max value:
				<input
					type="number"
					{...register(`${name}.to`, { valueAsNumber: true })}
					value={maxValueInput}
					onChange={handleMaxValueChange}
					className="flex w-full p-2 border-2 border-gray-600 bg-dark-200 rounded-md"
				/>
			</label>
		</div>
	);
};
