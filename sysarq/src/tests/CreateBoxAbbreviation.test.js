import React from "react";
import CreateBoxAbbreviation from "../pages/FieldsRegister/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}box-abbreviation/`;

const server = setupServer(
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.number === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();

describe("Page test", () => {
	it("axios sucess", async () => {
		const objSucess = [
			"Número da caixa",
			"201",
			"Sigla da caixa",
			"ASD",
			"Nome completo",
			"Polícia Civil do Goias",
			"Ano",
			"2021",
		];
		await testEvent(<CreateBoxAbbreviation />, objSucess, "Campo cadastrado!");
	});

	it("axios fail", async () => {
		const objFail = [
			"Número da caixa",
			"401",
			"Sigla da caixa",
			"ASD",
			"Nome completo",
			"Polícia Civil do Goias",
			"Ano",
			"2021",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Erro de conexão!");
	});

	it("year error", async () => {
		const objFail = [
			"Número da caixa",
			"345",
			"Sigla da caixa",
			"BOB",
			"Nome completo",
			"Polícia Civil do Goias",
			"Ano",
			"3",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Ano inválido");
	});
});
