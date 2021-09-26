import { setupServer } from "msw/node";
import { rest } from "msw";

import { render, screen, fireEvent, within } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../pages/Documents/Create/CreateAdministrativeProcess";

const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

jest.setTimeout(20000);

const server = setupServer(
	rest.get(`${hostApiArchives}document-subject/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 34,
					subject_name: "subject_name_test",
					temporality: "2035-09-10",
				},
			])
		);
	}),

	rest.get(`${hostApiArchives}unity/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 38,
					telephone_number: "39",
					note: "unit_notes_test",
					unity_name: "sender_unit_name_test",
					unity_abbreviation: "unit_abbreviation_test",
					administrative_bond: "unit_administrative_bond_test",
					bond_abbreviation: "unit_bond_abbreviation_test",
					type_of_unity: "type_of_unit_test",
					municipality: "unit_municipality_test",
				},
				{
					id: 40,
					telephone_number: "41",
					note: "unit_notes_test_1",
					unity_name: "destination_unit_name_test",
					unity_abbreviation: "unit_abbreviation_test_1",
					administrative_bond: "unit_administrative_bond_test_1",
					bond_abbreviation: "unit_bond_abbreviation_test_1",
					type_of_unity: "type_of_unit_test_1",
					municipality: "unit_municipality_test_1",
				},
				{
					id: 41,
					telephone_number: "42",
					note: "unit_notes_test_2",
					unity_name: "unarchive_unit_name_test",
					unity_abbreviation: "unit_abbreviation_test_2",
					administrative_bond: "unit_administrative_bond_test_2",
					bond_abbreviation: "unit_bond_abbreviation_test_2",
					type_of_unity: "type_of_unit_test_2",
					municipality: "unit_municipality_test_2",
				},
			])
		);
	}),

	rest.get(`${hostApiArchives}box-abbreviation/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 43,
					number: 44,
					abbreviation: "abbreviation_test",
					name: "abbreviation_name_test",
					year: 2045,
				},
			])
		);
	}),

	rest.get(`${hostApiArchives}shelf/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 46,
					number: 47,
				},
			])
		);
	}),

	rest.get(`${hostApiArchives}rack/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 48,
					number: 49,
				},
			])
		);
	}),

	rest.post(`${hostApiArchives}administrative-process/`, (req, res, ctx) => {
		if (
			req.body.notice_date === "2005-04-03" &&
			req.body.archiving_date === "2011-10-09" &&
			req.body.reference_month_year === "2015-04-01" &&
			req.body.process_number === "16" &&
			req.body.cpf_cnpj === "28293031323" &&
			req.body.interested === "interested_test" &&
			req.body.subject_id === 34 &&
			req.body.dest_unity_id === 40 &&
			req.body.sender_unity === 38 &&
			req.body.sender_user === "sender_worker_test" &&
			req.body.abbreviation_id === 43 &&
			req.body.shelf_id === 46 &&
			req.body.rack_id === 48 &&
			req.body.is_filed === false &&
			req.body.is_eliminated === false &&
			req.body.unity_id === 41 &&
			req.body.administrative_process_number === "50" &&
			req.body.send_date === "2055-09-08" &&
			req.body.notes === "notes_test"
		) {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

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

const isNotInTheDocument = (text) => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

const NOTICE_DATE_LABEL = "Data de Autuação*";

const INVALID_DATE_ERROR_MESSAGE = "Insira uma data válida";

const ARCHIVING_DATE_LABEL = "Data de Arquivamento*";

const UNARCHIVE_DESTINATION_UNIT_LABEL =
	"Unidade de Destino do Desarquivamento";

const UNARCHIVE_PROCESS_NUMBER_LABEL = "Número do Processo do Desarquivamento";

const UNARCHIVE_DATE_LABEL = "Data de Desarquivamento";

describe("Create Administrative Process Screen Test", () => {
	it("complete test", async () => {
		render(<CreateAdministrativeProcess />);

		input(NOTICE_DATE_LABEL, "");
		submitClick();
		isOnTheScreen("Insira a data de autuação");

		input(NOTICE_DATE_LABEL, "01/02/");
		isNotInTheDocument("Insira a data de autuação");
		submitClick();
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(NOTICE_DATE_LABEL, "03/04/2005");
		isNotInTheDocument(INVALID_DATE_ERROR_MESSAGE);

		input(ARCHIVING_DATE_LABEL, "");
		submitClick();
		isOnTheScreen("Insira a data de arquivamento");

		input(ARCHIVING_DATE_LABEL, "36/07/2008");
		isNotInTheDocument("Insira a data de arquivamento");
		submitClick();
		isOnTheScreen(INVALID_DATE_ERROR_MESSAGE);

		input(ARCHIVING_DATE_LABEL, "09/10/2011");
		isNotInTheDocument(INVALID_DATE_ERROR_MESSAGE);

		input("Referência", "13/2012");
		submitClick();
		isOnTheScreen("Insira uma referência válida");

		input("Referência", "04/2015");
		isNotInTheDocument("Insira uma referência válida");

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "16");
		isNotInTheDocument("Insira o número do processo");

		input("CPF/CNPJ", "171.819.20212");
		submitClick();
		isOnTheScreen("Insira somente números");

		input("CPF/CNPJ", "2324252627");
		isNotInTheDocument("Insira somente números");
		submitClick();
		isOnTheScreen("Insira um CPF/CNPJ válido");

		input("CPF/CNPJ", "28293031323");
		isNotInTheDocument("Insira um CPF/CNPJ válido");
		submitClick();
		isOnTheScreen("Insira um interessado");

		input("Interessado*", "interested_test");
		isNotInTheDocument("Insira um interessado");
		submitClick();
		isOnTheScreen("Selecione um assunto");

		fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("subject_name_test");
		fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));
		isNotInTheDocument("Selecione um assunto");

		submitClick();
		isOnTheScreen("Selecione uma unidade");

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("sender_unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
		isNotInTheDocument("Selecione uma unidade");

		submitClick();
		isOnTheScreen("Selecione um status");

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions.getByText(/Eliminado/i));
		isNotInTheDocument("Selecione um status");

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

		isNotInTheDocument(UNARCHIVE_DESTINATION_UNIT_LABEL);
		isNotInTheDocument(UNARCHIVE_PROCESS_NUMBER_LABEL);
		isNotInTheDocument(UNARCHIVE_DATE_LABEL);

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
		isOnTheScreen("Insira uma data de desarquivamento válida");

		input(UNARCHIVE_DATE_LABEL, "08/09/2055");
		isNotInTheDocument("Insira uma data de desarquivamento válida");

		input("Observação", "notes_test");

		submitClick();

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	});
});
