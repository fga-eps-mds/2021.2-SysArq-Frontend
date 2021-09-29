import { render, fireEvent, screen, within } from "@testing-library/react";

import CreateArchivingRelation from "../../../pages/Documents/Create/CreateArchivingRelation";

import { server } from "../../support/server";

import { input, submitClick } from "../../support";

jest.setTimeout(30000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const isOnTheScreen = (text) => {
	expect(screen.getByText(text)).toBeInTheDocument();
};

const isNotOnTheScreen = (text) => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

const INVALID_YEAR_ERROR_MESSAGE = "Insira um ano válido";

describe("Create Archiving Relation Screen Test", () => {
	it("complete test", async () => {
		render(<CreateArchivingRelation />);

		input("Nº de Caixas", "-1");
		submitClick();
		isOnTheScreen("Insira um número válido");

		input("Nº de Caixas", "1");
		isNotOnTheScreen("Insira um número válido");
		submitClick();
		isOnTheScreen("Insira o número");

		input("Número*", "2");
		isNotOnTheScreen("Insira o número");
		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "3");
		isNotOnTheScreen("Insira o número do processo");

		input("Data de Recebimento*", "");
		submitClick();
		isOnTheScreen("Insira uma data");

		input("Data de Recebimento*", "04/");
		isNotOnTheScreen("Insira uma data");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input("Data de Recebimento*", "04/05/2006");
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
		await senderUnitOptions.findByText("sender_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
		isNotOnTheScreen("Selecione uma unidade");

		submitClick();

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);

		fireEvent.mouseDown(screen.getByLabelText("Sigla da Caixa"));
		const abbreviationOptions = within(screen.getByRole("listbox"));
		await abbreviationOptions.findByText("abbreviation_test");
		fireEvent.click(abbreviationOptions.getByText(/abbreviation_test/i));

		fireEvent.mouseDown(screen.getByLabelText("Estante"));
		const shelfOptions = within(screen.getByRole("listbox"));
		await shelfOptions.findByText("47");
		fireEvent.click(shelfOptions.getByText(/47/i));

		fireEvent.mouseDown(screen.getByLabelText("Prateleira"));
		const rackOptions = within(screen.getByRole("listbox"));
		await rackOptions.findByText("49");
		fireEvent.click(rackOptions.getByText(/49/i));

		input("Observação", "notes_test");

		fireEvent.click(screen.getByText("Adicionar"));
		// await screen.findByText("Nova Caixa de Origem");

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));
		// await screen.findByText("CADASTRAR");

		fireEvent.click(screen.getByText("Adicionar"));
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um número");

		input("Número da Caixa*", "7");
		isNotOnTheScreen("Insira um número");

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um ano");

		input("Ano*", "199o");
		isNotOnTheScreen("Insira um ano");

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen(INVALID_YEAR_ERROR_MESSAGE);

		input("Ano*", "2008");
		isNotOnTheScreen(INVALID_YEAR_ERROR_MESSAGE);

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getByText("Adicionar"));
		input("Número da Caixa*", "9");
		input("Ano*", "2010");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		isOnTheScreen("7/2008");
		isOnTheScreen("9/2010");

		fireEvent.click(screen.getByText("7/2008"));
		fireEvent.click(screen.getAllByText("Excluir Caixa de Origem")[0]);

		isNotOnTheScreen("7/2008");
		isOnTheScreen("9/2010");

		fireEvent.click(screen.getByText("9/2010"));
		fireEvent.click(screen.getByText("Adicionar Assunto"));

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(screen.getByText("9/2010"));
		fireEvent.click(screen.getByText("Adicionar Assunto"));

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um assunto");

		input("Assunto*", "originBoxSubject_test");
		isNotOnTheScreen("Insira um assunto");

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getByText("Adicionar"));
		input("Número da Caixa*", "10");
		input("Ano*", "2011");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// fireEvent.click(screen.getByText("10/2011"));
		// fireEvent.click(screen.getByText("Adicionar Assunto"));

		// input("Assunto*", "originBoxSubject_test_1");
		// isNotOnTheScreen("Insira um assunto");

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// fireEvent.click(screen.getAllByText("Excluir")[0]);

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		// isOnTheScreen("Insira um ano");

		// input("Ano*", "1899");
		// isNotOnTheScreen(INVALID_YEAR_ERROR_MESSAGE);

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		// isOnTheScreen(INVALID_YEAR_ERROR_MESSAGE);

		// input("Ano*", "1900");
		// isNotOnTheScreen(INVALID_YEAR_ERROR_MESSAGE);

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// screen.debug();

		// isOnTheScreen("9/1900");

		// fireEvent.click(screen.getByText("9/1900"));

		// fireEvent.click(screen.getByText("Adicionar Assunto"));
		// isOnTheScreen("Novo Assunto");

		// input("Assunto*", "");

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// isOnTheScreen("Insira um assunto");

		// input("Assunto*", "subject_test");
		// isNotOnTheScreen("Insira um assunto");

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// fireEvent.click(screen.getByText("Adicionar Data"));

		// input("Data*", "");

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// isOnTheScreen("Insira uma data");

		// input("Data*", "12/30/2021");

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// isOnTheScreen("Insira uma data válida");

		// input("Data*", "12/03/2021");

		// fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		// fireEvent.click(screen.getByText("Adicionar Data"));

		// input("Data*", "12/03/2021");

		// fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		// await screen.findByText("CADASTRAR");

		// isOnTheScreen("2021-03-12");

		// fireEvent.click(screen.getByText("CADASTRAR"));

		// fireEvent.click(screen.getByTestId("delete"));

		// fireEvent.click(screen.getByText("Excluir"));
		// fireEvent.click(screen.getByText("Excluir Caixa de Origem"));

		// fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		// const senderUnitOptions = within(screen.getByRole("listbox"));
		// await senderUnitOptions.findByText("destination_unit_name_test");
		// fireEvent.click(senderUnitOptions.getByText(/destination_unit_name_test/i));
		// isNotOnTheScreen("Selecione uma unidade");

		// input("Nº de Caixas", "12");
		// input("Número do Processo*", "13");
	});
});
