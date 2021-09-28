import { render, screen, fireEvent, within } from "@testing-library/react";

import server from "../../support/testServer";

import CreateAdministrativeProcess from "../../../pages/Documents/Create/CreateAdministrativeProcess";

jest.setTimeout(30000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const NOTICE_DATE_LABEL = "Data de Autuação*";

const REQUIRED_DATE_ERROR_MESSAGE = "Insira uma data";

const INVALID_DATE_ERROR_MESSAGE = "Insira uma data válida";

const ARCHIVING_DATE_LABEL = "Data de Arquivamento*";

const UNARCHIVE_DESTINATION_UNIT_LABEL = "Unid. Destino do Desarquivamento";

const UNARCHIVE_PROCESS_NUMBER_LABEL = "Nº do Processo do Desarquivamento";

const UNARCHIVE_DATE_LABEL = "Data de Desarquivamento";

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
		render(<CreateAdministrativeProcess />);

		input(NOTICE_DATE_LABEL, "");
		submitClick();
		isOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);

		input(NOTICE_DATE_LABEL, "01/02/");
		isNotOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);
		submitClick();
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(NOTICE_DATE_LABEL, "03/04/2005");
		isNotOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(ARCHIVING_DATE_LABEL, "");
		submitClick();
		isOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);

		input(ARCHIVING_DATE_LABEL, "36/07/2008");
		isNotOnTheScreen(REQUIRED_DATE_ERROR_MESSAGE);
		submitClick();
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(ARCHIVING_DATE_LABEL, "09/10/2011");
		isNotOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input("Referência", "13/2012");
		submitClick();
		isOnTheScreen("Insira um período válido");

		input("Referência", "04/2015");
		isNotOnTheScreen("Insira um período válido");

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "16");
		isNotOnTheScreen("Insira o número do processo");

		input("CPF/CNPJ", "171.819.20212");
		submitClick();
		isOnTheScreen("Insira somente números");

		input("CPF/CNPJ", "2324252627");
		isNotOnTheScreen("Insira somente números");
		submitClick();
		isOnTheScreen("Insira um CPF/CNPJ válido");

		input("CPF/CNPJ", "28293031323");
		isNotOnTheScreen("Insira um CPF/CNPJ válido");
		submitClick();
		isOnTheScreen("Insira um interessado");

		input("Interessado*", "interested_test");
		isNotOnTheScreen("Insira um interessado");
		submitClick();
		isOnTheScreen("Selecione um assunto");

		fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("subject_name_test");
		fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));
		isNotOnTheScreen("Selecione um assunto");

		submitClick();
		isOnTheScreen("Selecione uma unidade");

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("sender_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
		isNotOnTheScreen("Selecione uma unidade");

		submitClick();
		isOnTheScreen("Selecione um status");

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions.getByText(/Eliminado/i));
		isNotOnTheScreen("Selecione um status");

		submitClick();

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions1 = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions1.getByText("Arquivado"));

		submitClick();

		fireEvent.mouseDown(screen.getByLabelText("Unidade de Destino"));
		const destinationUnitOptions = within(screen.getByRole("listbox"));
		await destinationUnitOptions.findByText("destination_unit_name_test");
		fireEvent.click(
			destinationUnitOptions.getByText(/destination_unit_name_test/i)
		);

		input("Servidor que Encaminhou", "sender_worker_test");

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

		isNotOnTheScreen(UNARCHIVE_DESTINATION_UNIT_LABEL);
		isNotOnTheScreen(UNARCHIVE_PROCESS_NUMBER_LABEL);
		isNotOnTheScreen(UNARCHIVE_DATE_LABEL);

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions2 = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions2.getByText(/Desarquivado/i));

		isOnTheScreen(UNARCHIVE_DESTINATION_UNIT_LABEL);
		isOnTheScreen(UNARCHIVE_PROCESS_NUMBER_LABEL);
		isOnTheScreen(UNARCHIVE_DATE_LABEL);

		fireEvent.mouseDown(
			screen.getByLabelText(UNARCHIVE_DESTINATION_UNIT_LABEL)
		);

		const unarchiveDestinationUnitOptions = within(screen.getByRole("listbox"));
		await unarchiveDestinationUnitOptions.findByText(
			"unarchive_unit_name_test"
		);

		fireEvent.click(
			unarchiveDestinationUnitOptions.getByText(/unarchive_unit_name_test/i)
		);

		input(UNARCHIVE_PROCESS_NUMBER_LABEL, "50");

		input(UNARCHIVE_DATE_LABEL, "/06/2052");
		submitClick();
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(UNARCHIVE_DATE_LABEL, "08/09/2055");
		isNotOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input("Observação", "notes_test");

		submitClick();

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	});
});
