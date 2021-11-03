import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../../support/server";

import { submitClick, input } from "../../support";

import CreateFrequencySheet from "../../../pages/Documents/Create/CreateFrequencySheet";

jest.setTimeout(90000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const isOnTheScreen = (text) => {
	expect(screen.getByText(text)).toBeInTheDocument();
};

const isNotOnTheScreen = (text) => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

const inputTest = (text, value, expectedOutput) => {
	input(text, value);
	submitClick();
	// isOnTheScreen(expectedOutput);
};

describe("Create Frequency Sheet Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencySheet />);

		submitClick();
		isOnTheScreen("Selecione um nome");

		const autocomplete = screen.getByTestId("autocomplete");
		const input2 = within(autocomplete).getByRole("textbox");
		await fireEvent.mouseDown(input2);
		// await screen.debug(undefined, 300000)
		const ListBox = screen.getByRole("listbox");
		expect(ListBox).toBeDefined();
		const menuItem1 = screen.getByText("inexiste, 55555555555");
		fireEvent.click(menuItem1);
		expect(screen.queryByRole("listbox")).toBeNull();
		isNotOnTheScreen("Selecione um nome");

		submitClick();
		isOnTheScreen("Insira um cargo");

		inputTest("Cargo*", "teste", "Insira uma lotação");
		inputTest("Lotação*", "lotaçao", "Insira um município");
		inputTest("Município*", "teste", "Selecione um tipo");

		fireEvent.mouseDown(screen.getByLabelText("Tipo do Documento*"));
		const typeOptions = within(screen.getByRole("listbox"));
		await typeOptions.findByText("documentType_name_test");
		fireEvent.click(typeOptions.getByText(/documentType_name_test/i));
		expect(screen.queryByText("Selecione um tipo")).not.toBeInTheDocument();

		input("Período de Referencia*", "");
		submitClick();
		// isOnTheScreen("Insira um período");

		input("Período de Referencia*", "03/");
		submitClick();
		// isOnTheScreen("Insira um período válido");

		input("Período de Referencia*", "03/2020");
		input("Número do Processo Encaminhador", "2222");

		submitClick();
		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/SucessoDocumento cadastrado!/i);
	});
	it("test fail", async () => {
		render(<CreateFrequencySheet />);

		const autocomplete = screen.getByTestId("autocomplete");
		const input2 = within(autocomplete).getByRole("textbox");
		fireEvent.mouseDown(input2);
		const ListBox = screen.getByRole("listbox");
		expect(ListBox).toBeDefined();
		const menuItem1 = screen.getByText("inexiste, 55555555555");
		fireEvent.click(menuItem1);

		input("Cargo*", "teste1");
		input("Lotação*", "lotaçao");
		input("Município*", "teste");
		input("Período de Referencia*", "03/2020");

		fireEvent.mouseDown(screen.getByLabelText("Tipo do Documento*"));
		const typeOptions = within(screen.getByRole("listbox"));
		await typeOptions.findByText("documentType_name_test");
		fireEvent.click(typeOptions.getByText(/documentType_name_test/i));

		submitClick();

		const failAlert = await screen.findByRole("alert");
		expect(failAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
