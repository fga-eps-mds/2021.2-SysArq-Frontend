import React from "react";
import CreateBoxAbbreviation from "../../../pages/Fields/Create/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}box-abbreviation/`;
const axiosProfile = process.env.REACT_APP_URL_API_PROFILE;

const server = setupServer(
	rest.post(`${axiosProfile}api/token/refresh/`, (req, res, ctx) => {
		if (req.body.refresh === "401") {
			return res(ctx.status(401));
		} else if (req.body.refresh === "404") {
			return res(ctx.status(404));
		} else {
			return res(ctx.status(200));
		}
	}),
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
const BOX_ABBREVIATION = "Sigla da caixa*";
const BOX_NAME = "Nome completo";
const BOX_YEAR = "Ano*";

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
		await testEvent(<CreateBoxAbbreviation />, objSucess, "Caixa cadastrada!");
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
		await testEvent(
			<CreateBoxAbbreviation />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
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

	it("boxNumber error", async () => {
		const objFail = [
			BOX_NUMBER,
			"",
			BOX_ABBREVIATION,
			"BOB",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"3",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Número inválido");
	});

	it("boxAbbreviation error", async () => {
		const objFail = [
			BOX_NUMBER,
			"345",
			BOX_ABBREVIATION,
			"",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"3",
		];
		await testEvent(<CreateBoxAbbreviation />, objFail, "Sigla inválida");
	});

	it("localStorage error", async () => {
		const objFail = [
			BOX_NUMBER,
			"345",
			BOX_ABBREVIATION,
			"SAG",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"3234",
		];
		localStorage.setItem("tkr", 401);
		await testEvent(<CreateBoxAbbreviation />, objFail, "CADASTRAR");
	});

	it("localStorage2 error", async () => {
		const objFail = [
			BOX_NUMBER,
			"345",
			BOX_ABBREVIATION,
			"SAG",
			BOX_NAME,
			"Polícia Civil do Goias",
			BOX_YEAR,
			"3234",
		];
		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreateBoxAbbreviation />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
