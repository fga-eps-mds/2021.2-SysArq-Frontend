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
					unity_name: "unit_name_test",
					unity_abbreviation: "unit_abbreviation_test",
					administrative_bond: "unit_administrative_bond_test",
					bond_abbreviation: "unit_bond_abbreviation_test",
					type_of_unity: "type_of_unit_test",
					municipality: "unit_municipality_test",
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

	rest.post(`${hostApiArchives}frequency-relation/`, (req, res, ctx) => {
		if (
			req.body.process_number === "28" &&
			req.body.notes === "n_test" &&
			req.body.number === "27" &&
			req.body.received_date === "" &&
			req.body.reference_period === [] &&
			req.body.sender_unit === 0 &&
			req.body.abbreviation_id === 0 &&
			req.body.shelf_id === 0 &&
			req.body.rack_id === 0 &&
			req.body.dcoument_type_id === 0
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

describe("Create Administrative Process Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencyRelation />);

		submitClick();
		isOnTheScreen("Insira o número");

		input("Número*", "27");
		isNotInTheDocument("Insira o número");

		submitClick();
		isOnTheScreen("Insira o número do processo");

		input("Número do Processo*", "28");
		isNotInTheDocument("Insira o número do processo");

		input("Data de Recebimento*", "");
		submitClick();
		isOnTheScreen("Insira uma data");

		input("Data de Recebimento*", "29/03/");
		isNotInTheDocument("Insira uma data");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input("Data de Recebimento*", "31/05/2033");
		isNotInTheDocument("Insira uma data válida");

		submitClick();
		isOnTheScreen("Selecione um tipo de documento");

		fireEvent.mouseDown(screen.getByLabelText("Tipo de Documento*"));
		const documentTypeOptions = within(screen.getByRole("listbox"));
		await documentTypeOptions.findByText("documentType_name_test");
		fireEvent.click(documentTypeOptions.getByText(/documentType_name_test/i));
		isNotInTheDocument("Selecione um tipo de documento");

		submitClick();
		isOnTheScreen("Selecione uma unidade");

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("unit_name_test");
		fireEvent.click(senderUnitOptions.getByText(/unit_name_test/i));
		isNotInTheDocument("Selecione uma unidade");

		isOnTheScreen("09/2021");

		fireEvent.click(screen.getByTestId("delete"));		

		isNotInTheDocument("09/2021");

		submitClick();

		isOnTheScreen("Não é possível criar uma Relação de Frequências sem um Período de Referência.");

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
