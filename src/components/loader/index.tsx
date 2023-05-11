import { FC } from "react";
import ContentLoader from "react-content-loader";

export const LoaderSquareComponent: FC = (): JSX.Element => {
	return (
		<div className="rounded-xl border-2 border-dark-200 overflow-hidden">
			<ContentLoader speed={2} viewBox="0 0 400 400" backgroundColor="#212121" foregroundColor="#0F0F0F">
				<rect x="0" y="0" rx="2" ry="2" width="400" height="305" />
				<rect x="0" y="310" rx="2" ry="2" width="400" height="90" />
			</ContentLoader>
		</div>
	);
};

export const LoaderRectangleComponent: FC = (): JSX.Element => {
	return (
		<ContentLoader speed={3} viewBox="0 0 300 100" backgroundColor="#0F0F0F" foregroundColor="#212121">
			<rect x="0" y="0" rx="2" ry="2" width="300" height="20" />
			<rect x="0" y="25" rx="2" ry="2" width="300" height="20" />
			<rect x="0" y="50" rx="2" ry="2" width="300" height="20" />
			<rect x="0" y="75" rx="2" ry="2" width="300" height="20" />
		</ContentLoader>
	);
};
