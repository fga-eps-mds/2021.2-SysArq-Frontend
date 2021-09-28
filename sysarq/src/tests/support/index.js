import { screen, fireEvent } from "@testing-library/react";

export const input = (field, value) => {
	fireEvent.change(screen.getByLabelText(field), { target: { value } });
};

export const submitClick = () => {
	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
};
