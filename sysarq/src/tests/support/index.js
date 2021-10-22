import { screen, fireEvent, within } from "@testing-library/react";
import { rest } from "msw";

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

export const documentTypeSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Tipo de Documento*"));
	const documentTypeOptions = within(screen.getByRole("listbox"));
	await documentTypeOptions.findByText("documentType_name_test");
	fireEvent.click(documentTypeOptions.getByText(/documentType_name_test/i));
};

export const senderUnitSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
	const senderUnitOptions = within(screen.getByRole("listbox"));
	await senderUnitOptions.findByText("sender_unit_name_test");
	fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
};

export const auth = () => {
	const axiosProfileTest = process.env.REACT_APP_URL_API_PROFILE;
		return rest.post(
			`${axiosProfileTest}api/token/refresh/`,
			(req, res, ctx) => {
				if (req.body.refresh === "401") {
					return res(ctx.status(401));
				}
				if (req.body.refresh === "404") {
					return res(ctx.status(404));
				}
				return res(ctx.status(200));
			}
		);
};
