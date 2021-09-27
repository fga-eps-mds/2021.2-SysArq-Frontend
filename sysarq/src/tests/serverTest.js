import { screen, fireEvent } from "@testing-library/react";

export default function inputChange(title, targetValue) {
	const inputReference = screen.getByLabelText(title);
	fireEvent.change(inputReference, {
		target: { value: targetValue },
	});
}
