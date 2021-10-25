import { screen, fireEvent, render, within } from "@testing-library/react";

import { server } from "../../support/server";

import {
	input,
	submitClick,
	documentTypeSelector,
	senderUnitSelector,
	shelfSelector,
	rackSelector,
} from "../../support";

import CreateArchivingRelation from "../../../pages/Documents/Create/CreateArchivingRelation";

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

const inputTypes = (field, value, error) => {
	input(field, value);
	fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
	isOnTheScreen(error);
};

const INVALID_YEAR_ERROR_MESSAGE = "Insira um ano válido";

const DELETE_ORIGIN_BOX_BUTTON_LABEL = "Excluir Caixa de Origem";

const A_SUBJECT_DATE = "12/01/2020";

const ADD_ORIGIN_BOX_SUBJECT_DATE_BUTTON_LABEL = "Adicionar Data";

const ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL = "Adicionar Assunto";

const INVALID_DATE_ERROR_MESSAGE = "Insira uma data válida";

const REQUIRED_DATE_ERROR_MESSAGE = "Insira uma data";

const RECEIVED_DATE_FIELD_LABEL = "Data de Recebimento*";

describe("Create Archiving Relation Screen Test", () => {
	it("type select", async () => {
		render(<CreateArchivingRelation />);

		fireEvent.click(screen.getByText("Adicionar Tipo"));
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Selecione um tipo");

		await documentTypeSelector();

		inputTypes("Mês", "22", "Insira um mês válido");

		inputTypes("Mês", "0", "Insira um mês válido");

		inputTypes("Mês", "3", "Insira um ano válido");

		inputTypes("Ano*", "1023", "Insira um ano válido");

		input("Ano*", "2021");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("documentType_name_test - 3/2021");

		await screen.findByText("CADASTRAR");
	});

	it("box select", async () => {
		render(<CreateArchivingRelation />);

		fireEvent.mouseDown(screen.getByLabelText("Sigla da Caixa"));
		const boxAbbreviationOptions = within(screen.getByRole("listbox"));
		await boxAbbreviationOptions.findByText("abbreviation_test");
		fireEvent.click(boxAbbreviationOptions.getByText(/abbreviation_test/i));

		const warning = await screen.findByRole("alert");
		expect(warning).toHaveTextContent(
			/Selecione o Ano da Caixa e o Número da Caixa para cadastrar uma Caixa corretamente./i
		);

		fireEvent.mouseDown(screen.getByLabelText("Ano da Caixa"));
		const boxYearOptions = within(screen.getByRole("listbox"));
		await boxYearOptions.findByText("2045");
		fireEvent.click(boxYearOptions.getByText(/2045/i));

		fireEvent.mouseDown(screen.getByLabelText("Número da Caixa"));
		const boxOptions = within(screen.getByRole("listbox"));
		await boxOptions.findByText("44");
		fireEvent.click(boxOptions.getByText(/44/i));

		isNotOnTheScreen(
			"Selecione o Ano da Caixa e o Número da Caixa para cadastrar uma Caixa corretamente."
		);
	});

	it("validation and post error", async () => {
		render(<CreateArchivingRelation />);

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "3");
		isNotOnTheScreen("Insira o número do processo");

		input(RECEIVED_DATE_FIELD_LABEL, "");
		submitClick();
		isOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);

		input(RECEIVED_DATE_FIELD_LABEL, "04/");
		isNotOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);
		submitClick();
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(RECEIVED_DATE_FIELD_LABEL, "04/05/2006");
		isNotOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		submitClick();
		isOnTheScreen("Selecione uma unidade");

		await senderUnitSelector();
		isNotOnTheScreen("Selecione uma unidade");

		submitClick();

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("complete test", async () => {
		render(<CreateArchivingRelation />);

		input("Número do Processo*", "3");
		input(RECEIVED_DATE_FIELD_LABEL, "04/05/2006");

		await senderUnitSelector();

		await shelfSelector();

		await rackSelector();

		input("Observação", "notes_test");

		fireEvent.click(screen.getByText("Adicionar"));
		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

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
		isOnTheScreen("7/2008");

		fireEvent.click(screen.getByText("Adicionar"));
		input("Número da Caixa*", "9");
		input("Ano*", "2010");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("9/2010");

		fireEvent.click(screen.getByText("7/2008"));
		fireEvent.click(
			screen.getAllByText(ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL)[0]
		);

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(
			screen.getAllByText(ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL)[0]
		);

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um assunto");

		input("Assunto*", "originBoxSubject_test");
		isNotOnTheScreen("Insira um assunto");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(
			screen.getAllByText(ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL)[0]
		);

		input("Assunto*", "differentSubject_test");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(
			screen.getAllByText(ADD_ORIGIN_BOX_SUBJECT_DATE_BUTTON_LABEL)[0]
		);

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(
			screen.getAllByText(ADD_ORIGIN_BOX_SUBJECT_DATE_BUTTON_LABEL)[0]
		);

		input("Data*", "");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);

		input("Data*", "12/");
		isNotOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input("Data*", A_SUBJECT_DATE);
		isNotOnTheScreen(INVALID_DATE_ERROR_MESSAGE);
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen(A_SUBJECT_DATE);

		fireEvent.click(
			screen.getAllByText(ADD_ORIGIN_BOX_SUBJECT_DATE_BUTTON_LABEL)[0]
		);

		input("Data*", A_SUBJECT_DATE);
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Data já adicionada");

		input("Data*", "13/12/1992");
		isNotOnTheScreen("Data já adicionada");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("13/12/1992");

		expect(screen.getAllByTestId("delete").length).toBe(2);
		fireEvent.click(screen.getAllByTestId("delete")[0]);
		expect(screen.getAllByTestId("delete").length).toBe(1);

		expect(screen.getAllByText("Excluir").length).toBe(2);
		fireEvent.click(screen.getAllByText("Excluir")[1]);
		expect(screen.getAllByText("Excluir").length).toBe(1);

		expect(screen.getAllByText(DELETE_ORIGIN_BOX_BUTTON_LABEL).length).toBe(2);
		fireEvent.click(screen.getAllByText(DELETE_ORIGIN_BOX_BUTTON_LABEL)[1]);
		expect(screen.getAllByText(DELETE_ORIGIN_BOX_BUTTON_LABEL).length).toBe(1);

		fireEvent.click(screen.getByText("CADASTRAR"));

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	});
});
