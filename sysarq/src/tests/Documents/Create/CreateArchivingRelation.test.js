import { screen, render, fireEvent, within } from "@testing-library/react";

import { server } from "../../support/server";
import { abbreviationSelector, input, rackSelector, shelfSelector, submitClick } from "../../support";

import CreateArchivingRelation from "../../../pages/Documents/Create/CreateArchivingRelation";

jest.setTimeout(40000);

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

		input("Nº de Caixas", "");
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

		await abbreviationSelector();

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
		fireEvent.click(screen.getAllByText("Adicionar Assunto")[0]);
		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(screen.getAllByText("Adicionar Assunto")[0]);
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um assunto");

		input("Assunto*", "originBoxSubject_test");
		isNotOnTheScreen("Insira um assunto");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getAllByText("Adicionar Assunto")[0]);
		input("Assunto*", "differentSubject_test");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		fireEvent.click(screen.getAllByText("Adicionar Data")[0]);
		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		fireEvent.click(screen.getAllByText("Adicionar Data")[0]);
		input("Data*", "");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira uma data");

		input("Data*", "12/");
		isNotOnTheScreen("Insira uma data");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira uma data válida");

		input("Data*", "12/01/2020");
		isNotOnTheScreen("Insira uma data válida");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("12/01/2020");

		fireEvent.click(screen.getAllByText("Adicionar Data")[0]);
		input("Data*", "12/01/2020");
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

		expect(screen.getAllByText("Excluir Caixa de Origem").length).toBe(2);
		fireEvent.click(screen.getAllByText("Excluir Caixa de Origem")[1]);
		expect(screen.getAllByText("Excluir Caixa de Origem").length).toBe(1);
	});
});
