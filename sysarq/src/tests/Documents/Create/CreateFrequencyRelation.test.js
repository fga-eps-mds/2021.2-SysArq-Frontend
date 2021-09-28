import { render, screen, fireEvent, within } from "@testing-library/react";

import server from "../../support/testServer";

import CreateFrequencyRelation from "../../../pages/Documents/Create/CreateFrequencyRelation";

jest.setTimeout(30000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const input = (field, value) => {
	fireEvent.change(screen.getByLabelText(field), { target: { value: value } });
};

const submitClick = () => {
	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
};

const isOnTheScreen = (text) => {
	expect(screen.getByText(text)).toBeInTheDocument();
};

const isNotOnTheScreen = (text) => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

describe("Create Administrative Process Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencyRelation />);

		submitClick();
		isOnTheScreen("Insira o número");

		input("Número*", "27");
		isNotOnTheScreen("Insira o número");

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "28");
		isNotOnTheScreen("Insira o número do processo");

		input("Data de Recebimento*", "");
		submitClick();
		isOnTheScreen("Insira uma data");

		input("Data de Recebimento*", "29/03/");
		isNotOnTheScreen("Insira uma data");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input("Data de Recebimento*", "31/05/2033");
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

		isOnTheScreen("09/2021");

		fireEvent.click(screen.getByTestId("delete"));

		isNotOnTheScreen("09/2021");

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
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Insira um período válido");

		input("Período", "10/2022");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));

		isOnTheScreen("10/2022");

		fireEvent.click(screen.getByText("Adicionar"));
		input("Período", "10/2022");
		fireEvent.click(screen.getByRole("button", { name: /Confirmar/ }));
		isOnTheScreen("Período já adicionado");

		fireEvent.click(screen.getByRole("button", { name: /Cancelar/ }));

		await screen.findByText("CADASTRAR");

		fireEvent.click(screen.getByText("CADASTRAR"));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
