import { screen, fireEvent } from "@testing-library/react";

export const inputChange = (title, targetValue) => {
	const inputReference = screen.getByLabelText(title);
	fireEvent.change(inputReference, {
		target: { value: targetValue },
	});
};
