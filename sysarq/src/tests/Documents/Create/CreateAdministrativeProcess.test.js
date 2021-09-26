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

describe("Create Administrative Process Screen Test", () => {
	it("t", async () => {
		render(<CreateAdministrativeProcess />);

		input("Data de Autuação*", "");
		submitClick();
		isOnTheScreen("Insira a data de autuação");

		input("Data de Autuação*", "01/02/");
		isNotInTheDocument("Insira a data de autuação");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input("Data de Autuação*", "03/04/2005");
		isNotInTheDocument("Insira uma data válida");

		input("Data de Arquivamento*", "");
		submitClick();
		isOnTheScreen("Insira a data de arquivamento");

		input("Data de Arquivamento*", "36/07/2008");
		isNotInTheDocument("Insira a data de arquivamento");
		submitClick();
		isOnTheScreen("Insira uma data válida");

		input("Data de Arquivamento*", "09/10/2011");
		isNotInTheDocument("Insira uma data válida");

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

		isNotInTheDocument("Unidade de Destino do Desarquivamento");
		isNotInTheDocument("Número do Processo do Desarquivamento");
		isNotInTheDocument("Data de Desarquivamento");

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions1 = within(screen.getByRole("listbox"));
		fireEvent.click(statusOptions1.getByText(/Desarquivado/i));

		isOnTheScreen("Unidade de Destino do Desarquivamento");
		isOnTheScreen("Número do Processo do Desarquivamento");
		isOnTheScreen("Data de Desarquivamento");

		fireEvent.mouseDown(
			screen.getByLabelText("Unidade de Destino do Desarquivamento")
		);
		const unarchiveDestinationUnitOptions = within(screen.getByRole("listbox"));
		await unarchiveDestinationUnitOptions.findByText(
			"unarchive_unit_name_test"
		);
		fireEvent.click(
			unarchiveDestinationUnitOptions.getByText(/unarchive_unit_name_test/i)
		);

		input("Número do Processo do Desarquivamento", "50")

		input("Data de Desarquivamento", "51/2052");
		submitClick();
		isOnTheScreen("Insira uma data de desarquivamento válida");
	});

	// 	fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
	// 		target: { value: "34/05/2006" },
	// 	});
	// 	expect(
	// 		screen.queryByText("Insira a data de arquivamento")
	// 	).not.toBeInTheDocument();
	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Insira uma data válida")).toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
	// 		target: { value: "07/08/2009" },
	// 	});
	// 	expect(
	// 		screen.queryByText("Insira uma data válida")
	// 	).not.toBeInTheDocument();
	// 	fireEvent.change(screen.getByLabelText("Referência"), {
	// 		target: { value: "13/2010" },
	// 	});
	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(
	// 		screen.getByText("Insira uma referência válida")
	// 	).toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("Referência"), {
	// 		target: { value: "11/2012" },
	// 	});
	// 	expect(
	// 		screen.queryByText("Insira uma referência válida")
	// 	).not.toBeInTheDocument();

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Insira o número do processo")).toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("Número do Processo*"), {
	// 		target: { value: "131" },
	// 	});
	// 	expect(
	// 		screen.queryByText("Insira o número do processo")
	// 	).not.toBeInTheDocument();

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Insira um interessado")).toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("Interessado*"), {
	// 		target: { value: "interested_test" },
	// 	});
	// 	expect(screen.queryByText("Insira um interessado")).not.toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
	// 		target: { value: "1415." },
	// 	});
	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Insira somente números")).toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
	// 		target: { value: "1415" },
	// 	});
	// 	expect(
	// 		screen.queryByText("Insira somente números")
	// 	).not.toBeInTheDocument();
	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Insira um CPF/CNPJ válido")).toBeInTheDocument();

	// 	fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
	// 		target: { value: "16171819202" },
	// 	});
	// 	expect(
	// 		screen.queryByText("Insira um CPF/CNPJ válido")
	// 	).not.toBeInTheDocument();

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	expect(
	// 		screen.queryByText("Insira a data de autuação")
	// 	).not.toBeInTheDocument();
	// 	expect(
	// 		screen.queryByText("Insira uma data válida")
	// 	).not.toBeInTheDocument();
	// 	expect(
	// 		screen.queryByText("Insira a data de arquivamento")
	// 	).not.toBeInTheDocument();
	// 	expect(
	// 		screen.queryByText("Insira uma referência válida")
	// 	).not.toBeInTheDocument();
	// 	expect(
	// 		screen.queryByText("Insira o número do processo")
	// 	).not.toBeInTheDocument();
	// 	expect(screen.queryByText("Insira um interessado")).not.toBeInTheDocument();
	// 	expect(
	// 		screen.queryByText("Insira somente números")
	// 	).not.toBeInTheDocument();
	// 	expect(
	// 		screen.queryByText("Insira um CPF/CNPJ válido")
	// 	).not.toBeInTheDocument();
	// });

	// it("select fields input test, error post and post success", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.change(screen.getByLabelText("Data de Autuação*"), {
	// 		target: { value: "12/05/2026" },
	// 	});
	// 	fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
	// 		target: { value: "27/10/2029" },
	// 	});
	// 	fireEvent.change(screen.getByLabelText("Referência"), {
	// 		target: { value: "03/2031" },
	// 	});
	// 	fireEvent.change(screen.getByLabelText("Número do Processo*"), {
	// 		target: { value: "3234" },
	// 	});
	// 	fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
	// 		target: { value: "35363738394" },
	// 	});
	// 	fireEvent.change(screen.getByLabelText("Interessado*"), {
	// 		target: { value: "interested_test_1" },
	// 	});
	// 	fireEvent.change(screen.getByLabelText("Servidor que Encaminhou"), {
	// 		target: { value: "sender_worker_test" },
	// 	});

	// 	fireEvent.change(screen.getByLabelText("Observação"), {
	// 		target: { value: "notes_test_404" },
	// 	});

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Selecione um assunto")).toBeInTheDocument();

	// 	fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
	// 	const subjectsOptions = within(screen.getByRole("listbox"));
	// 	await subjectsOptions.findByText("subject_name_test");
	// 	fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));
	// 	expect(screen.queryByText("Selecione um assunto")).not.toBeInTheDocument();

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
	// 	expect(screen.getByText("Selecione um status")).toBeInTheDocument();

	// 	fireEvent.mouseDown(screen.getByLabelText("Status*"));
	// 	const statusOptions = within(screen.getByRole("listbox"));
	// 	await statusOptions.findByText("Arquivado");
	// 	fireEvent.click(statusOptions.getByText("Arquivado"));
	// 	expect(screen.queryByText("Selecione um status")).not.toBeInTheDocument();

	// 	fireEvent.mouseDown(screen.getByLabelText("Unidade de Destino"));
	// 	const destUnitOptions = within(screen.getByRole("listbox"));
	// 	await destUnitOptions.findByText("dest_unit_name_test");
	// 	fireEvent.click(destUnitOptions.getByText(/dest_unit_name_test/i));

	// 	fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou"));
	// 	const senderUnitOptions = within(screen.getByRole("listbox"));
	// 	await senderUnitOptions.findByText("sender_unit_name_test_1");
	// 	fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test_1/i));

	// 	fireEvent.mouseDown(screen.getByLabelText("Sigla da Caixa"));
	// 	const abbreviationOptions = within(screen.getByRole("listbox"));
	// 	await abbreviationOptions.findByText("abbreviation_test");
	// 	fireEvent.click(abbreviationOptions.getByText(/abbreviation_test/i));

	// 	fireEvent.mouseDown(screen.getByLabelText("Estante"));
	// 	const shelfOptions = within(screen.getByRole("listbox"));
	// 	await shelfOptions.findByText("11");
	// 	fireEvent.click(shelfOptions.getByText(/11/i));

	// 	fireEvent.mouseDown(screen.getByLabelText("Prateleira"));
	// 	const rackOptions = within(screen.getByRole("listbox"));
	// 	await rackOptions.findByText("12");
	// 	fireEvent.click(rackOptions.getByText(/12/i));

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);

	// 	fireEvent.change(screen.getByLabelText("Observação"), {
	// 		target: { value: "notes_test" },
	// 	});

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const successAlert = await screen.findByRole("alert");
	// 	expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	// });

	// it("document-subject get error", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);
	// });

	// it("document-subject get error", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);
	// });

	// it("unit get error", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);
	// });

	// it("box-abbreviation get error", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);
	// });

	// it("shelf get error", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);
	// });

	// it("status get error", async () => {
	// 	render(<CreateAdministrativeProcess />);

	// 	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

	// 	const errorAlert = await screen.findByRole("alert");
	// 	expect(errorAlert).toHaveTextContent(
	// 		/Verifique sua conexão com a internet e recarregue a página./i
	// 	);
	// });
});
