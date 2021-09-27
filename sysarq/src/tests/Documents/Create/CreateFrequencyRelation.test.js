import { setupServer } from "msw/node";
import { rest } from "msw";

import { render, screen, fireEvent, within } from "@testing-library/react";

import CreateFrequencyRelation from "../../../pages/Documents/Create/CreateFrequencyRelation";

const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

jest.setTimeout(30000);

const server = setupServer(
	rest.get(`${hostApiArchives}document-type/`, (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 34,
					document_name: "documentType_name_test",
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

	// rest.post(`${hostApiArchives}administrative-process/`, (req, res, ctx) => {
	// 	if (
	// 		req.body.notice_date === "2005-04-03" &&
	// 		req.body.archiving_date === "2011-10-09" &&
	// 		req.body.reference_month_year === "2015-04-01" &&
	// 		req.body.process_number === "16" &&
	// 		req.body.cpf_cnpj === "28293031323" &&
	// 		req.body.interested === "interested_test" &&
	// 		req.body.subject_id === 34 &&
	// 		req.body.dest_unity_id === 40 &&
	// 		req.body.sender_unity === 38 &&
	// 		req.body.sender_user === "sender_worker_test" &&
	// 		req.body.abbreviation_id === 43 &&
	// 		req.body.shelf_id === 46 &&
	// 		req.body.rack_id === 48 &&
	// 		req.body.is_filed === false &&
	// 		req.body.is_eliminated === false &&
	// 		req.body.unity_id === 41 &&
	// 		req.body.administrative_process_number === "50" &&
	// 		req.body.send_date === "2055-09-08" &&
	// 		req.body.notes === "notes_test"
	// 	) {
	// 		return res(ctx.status(201));
	// 	} else {
	// 		return res(ctx.status(404));
	// 	}
	// })
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

describe("Create Administrative Process Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencyRelation />);
	
		submitClick();
		isOnTheScreen("Insira o número");
    
        input("Número*", "1");
        isNotInTheDocument("Insira o número");

        submitClick();
		isOnTheScreen("Insira o número do processo");

        input("Número do Processo*", "1");
        isNotInTheDocument("Insira o número do processo");

        input("Data de Recebimento*", "");
        submitClick();
		isOnTheScreen("Insira a data de recebimento");

		input("Data de Recebimento*", "01/02/");
		isNotInTheDocument("Insira a data de recebimento");
		submitClick();
		isOnTheScreen("Insira uma data válida");   
        
        input("Data de Recebimento*", "03/04/2005");
		isNotInTheDocument("Insira uma data válida");

        submitClick();
		isOnTheScreen("Selecione um tipo de documento");

		fireEvent.mouseDown(screen.getByLabelText("Tipo de Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("documentType_name_test");
		fireEvent.click(subjectsOptions.getByText(/documentType_name_test/i));
		isNotInTheDocument("Selecione um tipo de documento");        

        submitClick();
		isOnTheScreen("Selecione uma unidade");

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const subjectsOptions1 = within(screen.getByRole("listbox"));
		await subjectsOptions1.findByText("sender_unit_name_test");
		fireEvent.click(subjectsOptions1.getByText(/sender_unit_name_test/i));
		isNotInTheDocument("Selecione uma unidade"); 

        submitClick();
    });
});
