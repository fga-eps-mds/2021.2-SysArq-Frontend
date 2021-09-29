import React from "react";
import CreateBoxAbbreviation from "../pages/FieldsRegister/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";

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

const BOX_NUMBER = "Número da caixa";
const BOX_ABBREVIATION = "Sigla da caixa";
const BOX_NAME = "Nome completo";
const BOX_YEAR = "Ano";

describe("Page test", () => {
	it("axios sucess", async () => {
		const objSucess = [
			BOX_NUMBER,
			"201",
			BOX_ABBREVIATION,
			"ASD",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"2021",
		];
		await testEvent(<CreateBoxAbbreviation />, objSucess, "Campo cadastrado!");
	});

	it("axios fail", async () => {
		const objFail = [
			BOX_NUMBER,
			"401",
			BOX_ABBREVIATION,
			"ASD",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"2021",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Erro de conexão!");
	});

	it("year error", async () => {
		const objFail = [
			BOX_NUMBER,
			"345",
			BOX_ABBREVIATION,
			"BOB",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"3",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Ano inválido");
	});
});
