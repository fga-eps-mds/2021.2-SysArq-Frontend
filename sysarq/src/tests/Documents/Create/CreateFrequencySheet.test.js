import { render, screen, fireEvent, within } from "@testing-library/react";

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
	isOnTheScreen(expectedOutput);
};

describe("Create Frequency Sheet Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencySheet />);
		submitClick();
		isOnTheScreen("Insira o nome");

		input("Nome do Servidor*", "teste");
		submitClick();
		inputTest("Nome do Servidor*", "teste", "Insira um CPF");
		inputTest("CPF*", "13421.5325", "Insira um CPF válido");
		inputTest("CPF*", "12345", "Insira um CPF válido");
		inputTest("CPF*", "12345678911", "Insira um cargo");
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
		isOnTheScreen("Insira um período");

		input("Período de Referencia*", "03/");
		submitClick();
		isOnTheScreen("Insira um período válido");

		input("Período de Referencia*", "03/2020");
		input("Número do Processo Encaminhador", "2222");

		submitClick();

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/SucessoDocumento cadastrado!/i);
	});
	it("test fail", async () => {
		render(<CreateFrequencySheet />);

		input("Nome do Servidor*", "teste");
		input("CPF*", "12345678911");
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
