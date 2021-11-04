import { render, screen, fireEvent, within } from "@testing-library/react";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { server } from "../../support/server";
import { input, submitClick } from "../../support";

import CreateAdministrativeProcess from "../../../pages/Documents/Create/CreateAdministrativeProcess";

jest.setTimeout(60000);

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

const REFERENCE_FIELD_LABEL = "Referência";

describe("Create Administrative Process Screen Test", () => {
	it("validation and post error", async () => {
		render(<CreateAdministrativeProcess detail={false} />);

		submitClick();
		expect(screen.getByText("Insira o número do processo")).toBeInTheDocument();

		input("Número do Processo*", "1");

		expect(
			screen.queryByText("Insira o número do processo")
		).not.toBeInTheDocument();

		input(NOTICE_DATE_LABEL, "");
		submitClick();
		expect(screen.queryByText(REQUIRED_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(NOTICE_DATE_LABEL, "02/");

		expect(
			screen.queryByText(REQUIRED_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText(INVALID_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(NOTICE_DATE_LABEL, "03/04/2005");

		expect(
			screen.queryByText(INVALID_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText("Insira um interessado")).toBeInTheDocument();

		input("Interessado*", "interested_test");
		expect(screen.queryByText("Insira um interessado")).not.toBeInTheDocument();

		input("CPF/CNPJ", "171.819.20212");
		submitClick();
		expect(screen.getByText("Insira somente números")).toBeInTheDocument();

		input("CPF/CNPJ", "2324252627");

		expect(
			screen.queryByText("Insira somente números")
		).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText("Insira um CPF/CNPJ válido")).toBeInTheDocument();

		input("CPF/CNPJ", "12345678910");

		expect(
			screen.queryByText("Insira um CPF/CNPJ válido")
		).not.toBeInTheDocument();

		submitClick();
		expect(screen.getByText("Selecione um assunto")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("subject_name_test");
		fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));
		expect(screen.queryByText("Selecione um assunto")).not.toBeInTheDocument();

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

		submitClick();
		expect(screen.getByText("Selecione uma unidade")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("sender_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
		expect(screen.queryByText("Selecione uma unidade")).not.toBeInTheDocument();

		submitClick();

		input(REFERENCE_FIELD_LABEL, "13/2012");
		submitClick();
		expect(screen.getByText("Insira um período válido")).toBeInTheDocument();

		input(REFERENCE_FIELD_LABEL, "12/2012");

		expect(
			screen.queryByText("Insira um período válido")
		).not.toBeInTheDocument();

		submitClick();

		expect(screen.getByText("Selecione um status")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions.getByText(/^Arquivado/i));
		expect(screen.queryByText("Selecione um status")).not.toBeInTheDocument();

		submitClick();

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions1 = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions1.getByText(/^Desarquivado/i));

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

		input(UNARCHIVE_PROCESS_NUMBER_LABEL, "44");

		input(UNARCHIVE_DATE_LABEL, "09/10/204");
		submitClick();
		expect(screen.getByText(INVALID_DATE_ERROR_MESSAGE)).toBeInTheDocument();

		input(UNARCHIVE_DATE_LABEL, "09/10/2047");
		expect(
			screen.queryByText(INVALID_DATE_ERROR_MESSAGE)
		).not.toBeInTheDocument();

		submitClick();
	});

	it("success test", async () => {
		render(<CreateAdministrativeProcess detail={false} />);

		input("Número do Processo*", "50");
		input(NOTICE_DATE_LABEL, "03/04/2005");
		input("Interessado*", "interested_test");
		input("CPF/CNPJ", "");

		fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("subject_name_test");
		fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));

		fireEvent.mouseDown(screen.getByLabelText("Unidade de Destino"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("destination_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/destination_unit_name_test/i));

		input(ARCHIVING_DATE_LABEL, "09/10/2011");

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnit1Options = within(screen.getByRole("listbox"));
		await senderUnit1Options.findByText("sender_unit_name_test");
		fireEvent.click(senderUnit1Options.getByText(/sender_unit_name_test/i));

		const autocomplete = screen.getByTestId("autocomplete");
		const input2 = within(autocomplete).getByRole("textbox");
		await fireEvent.mouseDown(input2);
		const ListBox = screen.getByRole("listbox");
		expect(ListBox).toBeDefined();
		const menuItem1 = screen.getByText("inexiste, 55555555555");
		fireEvent.click(menuItem1);
		expect(screen.queryByRole("listbox")).toBeNull();

		input(REFERENCE_FIELD_LABEL, "");

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions.getByText(/Eliminado/i));

		input("Observação", "obs");

		submitClick();

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/SucessoDocumento cadastrado!/i);
	});

	it("detailPage test", async () => {
		const history = createMemoryHistory();
		history.push("/documents/administrative-process/view/1");

		render(
			<Router history={history}>
				<CreateAdministrativeProcess detail />
			</Router>
		);

		expect(screen.getByText("Editar")).toBeInTheDocument();
		expect(screen.getByText("Excluir")).toBeInTheDocument();

		await screen.findByDisplayValue("18");

		screen.debug();
	});
});
