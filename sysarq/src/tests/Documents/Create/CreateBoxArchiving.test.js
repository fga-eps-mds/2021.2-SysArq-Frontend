import { screen, fireEvent, render, within } from "@testing-library/react";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { server } from "../../support/server";

import {
	input,
	submitClick,
	documentTypeSelector,
	senderUnitSelector,
	shelfSelector,
	rackSelector,
} from "../../support";

import CreateBoxArchiving from "../../../pages/Documents/Create/CreateBoxArchiving";

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

const PROCESS_NUMBER = "Número do Processo*";

const ADD_TYPE = "Adicionar Tipo";

const INVALID_YEAR_ERROR_MESSAGE = "Insira um ano válido";

const RECEIVED_DATE_FIELD_LABEL = "Data de Recebimento*";

const REQUIRED_DATE_ERROR_MESSAGE = "Insira uma data";

const INVALID_DATE_ERROR_MESSAGE = "Insira uma data válida";

const ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL = "Adicionar Assunto";

const ADD_ORIGIN_BOX_SUBJECT_DATE_BUTTON_LABEL = "Adicionar Data";

const A_SUBJECT_DATE = "12/01/2020";

const B_SUBJECT_DATE = "13/12/1992";

const DELETE_ORIGIN_BOX_BUTTON_LABEL = "Excluir Caixa de Origem";

describe("Create Archiving Relation Screen Test", () => {
	it("type select", async () => {
		render(<CreateBoxArchiving />);

		input(PROCESS_NUMBER, "3");
		await senderUnitSelector();

		submitClick();

		isOnTheScreen(
			"Não é possível criar um Arquivamento de Caixas sem um Tipo do Documento."
		);

		fireEvent.click(screen.getByText(ADD_TYPE));
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Selecione um tipo");

		await documentTypeSelector();

		inputTypes("Mês", "22", "Insira um mês válido");

		inputTypes("Mês", "0", "Insira um mês válido");

		inputTypes("Mês", "3", INVALID_YEAR_ERROR_MESSAGE);

		inputTypes("Ano*", "1023", INVALID_YEAR_ERROR_MESSAGE);

		input("Ano*", "2021");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("documentType_name_test - 3/2021");

		await screen.findByText("CADASTRAR");
	});

	it("box select", async () => {
		render(<CreateBoxArchiving />);

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
		render(<CreateBoxArchiving />);

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input(PROCESS_NUMBER, "3");
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

		fireEvent.click(screen.getByText(ADD_TYPE));

		await documentTypeSelector();

		input("Mês", "1");
		input("Ano*", "2021");

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("documentType_name_test - 1/2021");

		await screen.findByText("CADASTRAR");

		fireEvent.click(screen.getByText("CADASTRAR"));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("post success", async () => {
		render(<CreateBoxArchiving />);

		input(PROCESS_NUMBER, "3");
		input(RECEIVED_DATE_FIELD_LABEL, "04/05/2006");

		await senderUnitSelector();

		await shelfSelector();

		await rackSelector();

		input("Observação", "notes_test");

		fireEvent.click(screen.getByText("Adicionar Caixa de Origem"));
		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(screen.getByText("Adicionar Caixa de Origem"));
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

		fireEvent.click(screen.getByText("7/2008"));

		fireEvent.click(screen.getByText(ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL));
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um assunto");

		input("Assunto*", "originBoxSubject_test");
		isNotOnTheScreen("Insira um assunto");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getByText(ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL));
		input("Assunto*", "differentSubject_test");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getByText(ADD_ORIGIN_BOX_SUBJECT_BUTTON_LABEL));
		input("Assunto*", "");
		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

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

		input("Data*", B_SUBJECT_DATE);
		isNotOnTheScreen("Data já adicionada");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen(B_SUBJECT_DATE);

		expect(screen.getAllByTestId("delete").length).toBe(2);
		fireEvent.click(screen.getAllByTestId("delete")[0]);
		expect(screen.getAllByTestId("delete").length).toBe(1);

		isNotOnTheScreen(A_SUBJECT_DATE);
		isOnTheScreen(B_SUBJECT_DATE);

		expect(screen.getAllByText("Excluir").length).toBe(2);
		fireEvent.click(screen.getAllByText("Excluir")[1]);
		expect(screen.getAllByText("Excluir").length).toBe(1);

		isOnTheScreen("originBoxSubject_test");
		isOnTheScreen(B_SUBJECT_DATE);

		isNotOnTheScreen("differentSubject_test");

		fireEvent.click(screen.getByText(DELETE_ORIGIN_BOX_BUTTON_LABEL));

		isNotOnTheScreen("originBoxSubject_test");
		isNotOnTheScreen(B_SUBJECT_DATE);

		fireEvent.click(screen.getByText(ADD_TYPE));

		await documentTypeSelector();

		input("Mês", "1");
		input("Ano*", "2021");

		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getByText("CADASTRAR"));

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	});

	it("detailPage test", async () => {
		const history = createMemoryHistory();
		history.push("/documents/box-archiving/view/1");

		render(
			<Router history={history}>
				<CreateBoxArchiving detail />
			</Router>
		);

		expect(screen.getByText("Editar")).toBeInTheDocument();
		expect(screen.getByText("Excluir")).toBeInTheDocument();

		await screen.findByDisplayValue("7");

		// screen.debug();
	});
});
