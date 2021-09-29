import { render, fireEvent, screen, within } from "@testing-library/react";

import CreateArchivingRelation from "../../../pages/Documents/Create/CreateArchivingRelation";

import server from "../../support/testServer";

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

describe("Create Archiving Relation Screen Test", () => {
    it("complete test", async () => {
        render(<CreateArchivingRelation/>);

        fireEvent.click(screen.getByText("Adicionar"));
        isOnTheScreen("Nova Caixa de Origem");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
        isOnTheScreen("Insira um número");

        input("Número da Caixa*", "9");
		isNotOnTheScreen("Insira um número");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
        isOnTheScreen("Insira um ano");

        input("Ano*", "199o");
		isNotOnTheScreen("Insira um ano");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
        isOnTheScreen("Insira um ano válido");

        input("Ano*", "1899");
		isNotOnTheScreen("Insira um ano válido");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
        isOnTheScreen("Insira um ano válido");
    
        input("Ano*", "1900");
		isNotOnTheScreen("Insira um ano válido");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		
        screen.debug();
        
        isOnTheScreen("9/1900");

        fireEvent.click(screen.getByText("9/1900"));

        fireEvent.click(screen.getByText("Adicionar Assunto"));
        isOnTheScreen("Novo Assunto");

        input("Assunto*", "");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

        isOnTheScreen("Insira um assunto");

        input("Assunto*", "subject_test");
        isNotOnTheScreen("Insira um assunto");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

        fireEvent.click(screen.getByText("Adicionar Data"));

        input("Data*", "");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

        isOnTheScreen("Insira uma data");

        input("Data*", "12/30/2021");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

        isOnTheScreen("Insira uma data válida");

        input("Data*", "12/03/2021");

        fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

        fireEvent.click(screen.getByText("Adicionar Data"));

        input("Data*", "12/03/2021");

        fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		await screen.findByText("CADASTRAR");
        
        isOnTheScreen("2021-03-12");

		fireEvent.click(screen.getByText("CADASTRAR"));

        fireEvent.click(screen.getByTestId("delete"));

        fireEvent.click(screen.getByText("Excluir"));
        fireEvent.click(screen.getByText("Excluir Caixa de Origem"));

        fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("destination_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/destination_unit_name_test/i));
		isNotOnTheScreen("Selecione uma unidade");

        input("Nº de Caixas", "12");
        input("Número do Processo*", "13");
    });
});
