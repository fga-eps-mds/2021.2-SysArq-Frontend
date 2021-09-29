import { screen, fireEvent, within } from "@testing-library/react";

export const input = (field, value) => {
	fireEvent.change(screen.getByLabelText(field), { target: { value } });
};

export const submitClick = () => {
	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
};

export const abbreviationSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Sigla da Caixa"));
	const abbreviationOptions = within(screen.getByRole("listbox"));
	await abbreviationOptions.findByText("abbreviation_test");
	fireEvent.click(abbreviationOptions.getByText(/abbreviation_test/i));
};

export const shelfSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Estante"));
	const shelfOptions = within(screen.getByRole("listbox"));
	await shelfOptions.findByText("47");
	fireEvent.click(shelfOptions.getByText(/47/i));
};

export const rackSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Prateleira"));
	const rackOptions = within(screen.getByRole("listbox"));
	await rackOptions.findByText("49");
	fireEvent.click(rackOptions.getByText(/49/i));
};
