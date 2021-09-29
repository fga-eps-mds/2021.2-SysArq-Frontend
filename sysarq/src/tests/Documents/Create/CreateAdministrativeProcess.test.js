import { render, screen, fireEvent, within } from "@testing-library/react";

import server from "../../support/server";
import { input, submitClick } from "../../support";

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

describe("Create Administrative Process Screen Test", () => {
	it("complete test", async () => {
		render(<CreateAdministrativeProcess />);

		input(NOTICE_DATE_LABEL, "");
		submitClick();
		expect(screen.getByText(REQUIRED_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(NOTICE_DATE_LABEL, "01/02/");
		expect(
			screen.queryByText(REQUIRED_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();
		submitClick();
		expect(screen.getByText(INVALID_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(NOTICE_DATE_LABEL, "03/04/2005");
		expect(
			screen.queryByText(INVALID_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();

		input(ARCHIVING_DATE_LABEL, "");
		submitClick();
		expect(screen.getByText(REQUIRED_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(ARCHIVING_DATE_LABEL, "36/07/2008");
		expect(
			screen.queryByText(REQUIRED_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();
		submitClick();
		expect(screen.getByText(INVALID_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(ARCHIVING_DATE_LABEL, "09/10/2011");
		expect(
			screen.queryByText(INVALID_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();

		input("Referência", "13/2012");
		submitClick();
		expect(screen.getByText("Insira um período válido")).toBeInTheDocument();

		input("Referência", "04/2015");
		expect(
			screen.queryByText("Insira um período válido")
		).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText("Insira o número do processo")).toBeInTheDocument();

		input("Número do Processo*", "16");
		expect(
			screen.queryByText("Insira o número do processo")
		).not.toBeInTheDocument();

		input("CPF/CNPJ", "171.819.20212");
		submitClick();
		expect(screen.getByText("Insira somente números")).toBeInTheDocument();

		input("CPF/CNPJ", "2324252627");
		expect(
			screen.queryByText("Insira somente números")
		).not.toBeInTheDocument();
		submitClick();
		expect(screen.getByText("Insira um CPF/CNPJ válido")).toBeInTheDocument();

		input("CPF/CNPJ", "28293031323");
		expect(
			screen.queryByText("Insira um CPF/CNPJ válido")
		).not.toBeInTheDocument();
		submitClick();
		expect(screen.getByText("Insira um interessado")).toBeInTheDocument();

		input("Interessado*", "interested_test");
		expect(screen.queryByText("Insira um interessado")).not.toBeInTheDocument();
		submitClick();
		expect(screen.getByText("Selecione um assunto")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("subject_name_test");
		fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));
		expect(screen.queryByText("Selecione um assunto")).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText("Selecione uma unidade")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("sender_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
		expect(screen.queryByText("Selecione uma unidade")).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText("Selecione um status")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions.getByText(/Eliminado/i));
		expect(screen.queryByText("Selecione um status")).not.toBeInTheDocument();

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

		expect(
			screen.queryByText(UNARCHIVE_DESTINATION_UNIT_LABEL)
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(UNARCHIVE_PROCESS_NUMBER_LABEL)
		).not.toBeInTheDocument();
		expect(screen.queryByText(UNARCHIVE_DATE_LABEL)).not.toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions2 = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions2.getByText(/Desarquivado/i));

		expect(
			screen.getByText(UNARCHIVE_DESTINATION_UNIT_LABEL)
		).toBeInTheDocument();
		expect(
			screen.getByText(UNARCHIVE_PROCESS_NUMBER_LABEL)
		).toBeInTheDocument();
		expect(screen.getByText(UNARCHIVE_DATE_LABEL)).toBeInTheDocument();

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
		expect(screen.getByText(INVALID_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(UNARCHIVE_DATE_LABEL, "08/09/2055");
		expect(
			screen.queryByText(INVALID_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();

		input("Observação", "notes_test");

		submitClick();

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	});
});
