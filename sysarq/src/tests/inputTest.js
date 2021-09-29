import { render, screen, fireEvent, act } from "@testing-library/react";

export function inputChange(title, targetValue) {
	const inputReference = screen.getByLabelText(title);
	fireEvent.change(inputReference, {
		target: { value: targetValue },
	});
}

export async function testEvent(component, object, findText) {
	render(component);
	for (let i = 0; i < object.length; i += 2) {
		inputChange(object[i], object[i + 1]);
	}
	fireEvent.click(screen.getByTestId("click"));

	await screen.findByText(findText);
	act(() => {
		jest.advanceTimersByTime(3000);
	});
}
