import { screen, render, fireEvent, within } from "@testing-library/react";

import { server } from "../../support/server";

import { submitClick, input } from "../../support";

import CreateFrequencyRelation from "../../../pages/Documents/Create/CreateFrequencyRelation";

import { formatDate, initialPeriod } from "../../../support";

jest.setTimeout(60000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const isOnTheScreen = (text) => {
	expect(screen.getByText(text)).toBeInTheDocument();
};

const isNotOnTheScreen = (text) => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

const RECEIVED_DATE = "Data de Recebimento*";
const DOCUMENT_DATE = "Data do Documento*";

describe("Create Frequency Relation Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencyRelation />);

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "28");
		isNotOnTheScreen("Insira o número do processo");

		input(DOCUMENT_DATE, "");
		submitClick();
		isOnTheScreen("Insira uma data");

		input(DOCUMENT_DATE, "29/03/");
		isNotOnTheScreen("Insira uma data");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input(DOCUMENT_DATE, "31/05/2032");
		isNotOnTheScreen("Insira uma data válida");

		input(RECEIVED_DATE, "");
		submitClick();
		isOnTheScreen("Insira uma data");

		input(RECEIVED_DATE, "29/03/");
		isNotOnTheScreen("Insira uma data");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input(RECEIVED_DATE, "31/05/2033");
		isNotOnTheScreen("Insira uma data válida");

		submitClick();
		isOnTheScreen("Selecione um tipo de documento");

		fireEvent.mouseDown(screen.getByLabelText("Tipo de Documento*"));
		const documentTypeOptions = within(screen.getByRole("listbox"));
		await documentTypeOptions.findByText("documentType_name_test");
		fireEvent.click(documentTypeOptions.getByText(/documentType_name_test/i));
		isNotOnTheScreen("Selecione um tipo de documento");

		submitClick();
		isOnTheScreen("Selecione uma unidade");

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("destination_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/destination_unit_name_test/i));
		isNotOnTheScreen("Selecione uma unidade");

		const today = formatDate(initialPeriod);
		isOnTheScreen(`${today.substring(5, 7)}/${today.substring(0, 4)}`);

		fireEvent.click(screen.getByTestId("delete"));

		isNotOnTheScreen(`${today.substring(5, 7)}/${today.substring(0, 4)}`);

		submitClick();

		isOnTheScreen(
			"Não é possível criar uma Relação de Frequências sem um Período de Referência."
		);

		fireEvent.click(screen.getByText("Adicionar"));

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(screen.getByText("Adicionar"));

		input("Período", "");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um período");

		input("Período", "13/2022");
		isNotOnTheScreen("Insira um período");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um período válido");

		input("Período", "10/2022");
		isNotOnTheScreen("Insira um período válido");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		isOnTheScreen("10/2022");
		isNotOnTheScreen(
			"Não é possível criar uma Relação de Frequências sem um Período de Referência."
		);

		fireEvent.click(screen.getByText("Adicionar"));
		input("Período", "10/2022");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Período já adicionado");

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		input("Observação", "note_test");

		await screen.findByText("CADASTRAR");

		fireEvent.click(screen.getByText("CADASTRAR"));

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/SucessoDocumento cadastrado!/i);

		// input("Observação", "");

		// submitClick();

		// const errorAlert = await screen.findByRole("alert");
		// expect(errorAlert).toHaveTextContent(
		// 	/Verifique sua conexão com a internet e recarregue a página./i
		// );
	});
});
