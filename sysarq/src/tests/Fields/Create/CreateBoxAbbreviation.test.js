import React from "react";
import CreateBoxAbbreviation from "../../../pages/Fields/Create/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";
import { auth } from "../../support";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}box-abbreviation/`;

const server = setupServer(
	auth(),
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

const BOX_NUMBER = "Número da caixa*";
const BOX_NUMBER_VALUE = "10";
const BOX_ABBREVIATION = "Sigla da caixa*";
const BOX_ABBREVIATION_VALUE = "SAG";
const BOX_NAME = "Nome completo";
const BOX_NAME_VALUE = "Sistema de Arquivos Goias";
const BOX_YEAR = "Ano*";
const BOX_YEAR_VALUE = "2021";

describe("Page test", () => {
	it("axios sucess", async () => {
		const objSucess = [
			BOX_NUMBER,
			"201",
			BOX_ABBREVIATION,
			BOX_ABBREVIATION_VALUE,
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			BOX_YEAR_VALUE,
		];
		await testEvent(<CreateBoxAbbreviation />, objSucess, "Caixa cadastrada!");
	});

	it("axios fail", async () => {
		const objFail = [
			BOX_NUMBER,
			"401",
			BOX_ABBREVIATION,
			BOX_ABBREVIATION_VALUE,
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			BOX_YEAR_VALUE,
		];
		await testEvent(
			<CreateBoxAbbreviation />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});

	it("year error", async () => {
		const objFail = [
			BOX_NUMBER,
			BOX_NUMBER_VALUE,
			BOX_ABBREVIATION,
			BOX_ABBREVIATION_VALUE,
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			"4",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Ano inválido");
	});

	it("boxNumber error", async () => {
		const objFail = [
			BOX_NUMBER,
			"",
			BOX_ABBREVIATION,
			BOX_ABBREVIATION_VALUE,
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			BOX_YEAR_VALUE,
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Número inválido");
	});

	it("boxAbbreviation error", async () => {
		const objFail = [
			BOX_NUMBER,
			BOX_NUMBER_VALUE,
			BOX_ABBREVIATION,
			"",
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			BOX_YEAR_VALUE,
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Sigla inválida");
	});

	it("localStorage error", async () => {
		const objSuccess = [
			BOX_NUMBER,
			BOX_NUMBER_VALUE,
			BOX_ABBREVIATION,
			BOX_ABBREVIATION_VALUE,
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			BOX_YEAR_VALUE,
		];
		localStorage.setItem("tkr", 401);
		await testEvent(<CreateBoxAbbreviation />, objSuccess, "CADASTRAR");
	});

	it("localStorage2 error", async () => {
		const objSuccess = [
			BOX_NUMBER,
			BOX_NUMBER_VALUE,
			BOX_ABBREVIATION,
			BOX_ABBREVIATION_VALUE,
			BOX_NAME,
			BOX_NAME_VALUE,
			BOX_YEAR,
			BOX_YEAR_VALUE,
		];
		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreateBoxAbbreviation />,
			objSuccess,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
