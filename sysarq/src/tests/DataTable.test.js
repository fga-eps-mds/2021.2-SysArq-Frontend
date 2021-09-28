import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, within } from "@testing-library/react";

import DataTable from "../pages/components/DataTable";

const axiosArchives = process.env.REACT_APP_URL_API_ARCHIVES;

const server = setupServer(
	rest.get(`${axiosArchives}document-subject/`, async (req, res, ctx) => {
		return res(
			ctx.json([
				{
					id: 1,
					subject_name: "a-document-subject-test",
					temporality: "2021-09-18",
				},
				{
					id: 2,
					subject_name: "document-subject-test1",
					temporality: "2021-09-19",
				},
				{
					id: 3,
					subject_name: "document-subject-test2",
					temporality: "2021-09-20",
				},
				{
					id: 4,
					subject_name: "document-subject-test3",
					temporality: "2021-09-21",
				},
				{
					id: 5,
					subject_name: "document-subject-test4",
					temporality: "2021-09-22",
				},
				{
					id: 6,
					subject_name: "document-subject-test5",
					temporality: "2021-09-23",
				},
				{
					id: 7,
					subject_name: "document-subject-test6",
					temporality: "2021-09-24",
				},
				{
					id: 8,
					subject_name: "document-subject-test7",
					temporality: "2021-09-25",
				},
				{
					id: 9,
					subject_name: "document-subject-test8",
					temporality: "2021-09-26",
				},
				{
					id: 10,
					subject_name: "document-subject-test9",
					temporality: "2021-09-27",
				},
				{
					id: 11,
					subject_name: "document-subject-test10",
					temporality: "2021-09-28",
				},
				{
					id: 12,
					subject_name: "z-document-subject-test",
					temporality: "2021-09-29",
				},
			])
		);
	}),

	rest.get(`${axiosArchives}box-abbreviation/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}unity/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}document-type/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}shelf/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	}),

	rest.get(`${axiosArchives}status/`, async (req, res, ctx) => {
		return res(ctx.json([]));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("DataTable and tablesHeadCells Test", () => {
	it("test components flow", async () => {
		render(<DataTable title="Assunto do documento" url="document-subject/" />);

		expect(screen.getByText("Nome do Assunto")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();

		await screen.findByText("a-document-subject-test");

		fireEvent.click(screen.getByText("Nome do Assunto"));

		expect(screen.getByText("a-document-subject-test")).toBeInTheDocument();
		expect(
			screen.queryByText("z-document-subject-test")
		).not.toBeInTheDocument();

		fireEvent.click(screen.getByText("Nome do Assunto"));

		expect(screen.getByText("z-document-subject-test")).toBeInTheDocument();
		expect(
			screen.queryByText("a-document-subject-test")
		).not.toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: /Página anterior/ })
		).toBeDisabled();
		expect(
			screen.getByRole("button", { name: /Próxima página/ })
		).not.toBeDisabled();

		fireEvent.click(screen.getByRole("button", { name: /Próxima página/ }));

		expect(
			screen.getByRole("button", { name: /Próxima página/ })
		).toBeDisabled();
		expect(
			screen.getByRole("button", { name: /Página anterior/ })
		).not.toBeDisabled();

		fireEvent.mouseDown(screen.getByRole("button", { name: /10/ }));
		const listbox = within(screen.getByRole("listbox"));
		fireEvent.click(listbox.getByText(/25/i));

		expect(screen.getByRole("button", { name: /25/ })).toHaveTextContent("25");
	});

	it("test box abrreviation table head cells", async () => {
		render(<DataTable title="Sigla da Caixa" url="box-abbreviation/" />);

		expect(screen.getByText("Número")).toBeInTheDocument();
		expect(screen.getByText("Abreviação")).toBeInTheDocument();
		expect(screen.getByText("Nome")).toBeInTheDocument();
		expect(screen.getByText("Ano")).toBeInTheDocument();
	});

	it("test unity table head cells", async () => {
		render(<DataTable title="Unidade" url="unity/" />);

		expect(screen.getByText("Nome da Unidade")).toBeInTheDocument();
		expect(screen.getByText("Sigla da Unidade")).toBeInTheDocument();
		expect(screen.getByText("Vínculo Administrativo")).toBeInTheDocument();
		expect(screen.getByText("Sigla do Vínculo")).toBeInTheDocument();
		expect(screen.getByText("Tipo de Unidade")).toBeInTheDocument();
		expect(screen.getByText("Município")).toBeInTheDocument();
		expect(screen.getByText("Telefone")).toBeInTheDocument();
		expect(screen.getByText("Observações")).toBeInTheDocument();
	});

	it("test document type table head cells", async () => {
		render(<DataTable title="Tipo de Documento" url="document-type/" />);

		expect(screen.getByText("Nome do Documento")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();
	});

	it("test shelf table head cells", async () => {
		render(<DataTable title="Estante e Prateleira" url="shelf/" />);

		expect(screen.getByText("Estante")).toBeInTheDocument();
		expect(screen.getByText("Prateleira")).toBeInTheDocument();
	});

	it("test status table head cells", async () => {
		render(<DataTable title="Status de Encaminhamento" url="status/" />);

		expect(screen.getByText("Arquivado")).toBeInTheDocument();
		expect(screen.getByText("Unidade que Encaminhou")).toBeInTheDocument();
		expect(screen.getByText("Documento Solicitado")).toBeInTheDocument();
		expect(screen.getByText("Data de Envio")).toBeInTheDocument();
	});
});
