import React from "react";
import CreatePublicWorker from "../../../pages/Fields/Create/CreatePublicWorker";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";
import { auth } from "../../support";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}public-worker/`;

const NAME = "Nome*";
const CPF = "CPF*";
const ROLE = "Cargo";
const CATEGORY = "Classe";
const WORKPLACE = "Unidade";
const MUNICIPALAREA = "Municipio";

const server = setupServer(
	auth(),
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.name === "201") {
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
		const objSuccess = [
			NAME,
			"201",
			CPF,
			"11111111111",
			ROLE,
			"test",
			CATEGORY,
			"test",
			WORKPLACE,
			"test",
			MUNICIPALAREA,
			"test",
		];
		await testEvent(<CreatePublicWorker />, objSuccess, "Servidor cadastrado!");
	});

	it("axios fail", async () => {
		const objFail = [
			NAME,
			"401",
			CPF,
			"11111111111",
			ROLE,
			"test",
			CATEGORY,
			"test",
			WORKPLACE,
			"test",
			MUNICIPALAREA,
			"test",
		];
		await testEvent(
			<CreatePublicWorker />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});

	it("name null", async () => {
		const objFail = [
			NAME,
			"",
			CPF,
			"11111111111",
			ROLE,
			"test",
			CATEGORY,
			"test",
			WORKPLACE,
			"test",
			MUNICIPALAREA,
			"test",
		];
		await testEvent(<CreatePublicWorker />, objFail, "Insira um nome");
	});

	it("temporality null", async () => {
		const objFail = [
			NAME,
			"test",
			CPF,
			"",
			ROLE,
			"test",
			CATEGORY,
			"test",
			WORKPLACE,
			"test",
			MUNICIPALAREA,
			"test",
		];
		await testEvent(<CreatePublicWorker />, objFail, "Insira um CPF válido");
	});

	it("localstorage fail", async () => {
		const objFail = [
			NAME,
			"test",
			CPF,
			"11111111111",
			ROLE,
			"test",
			CATEGORY,
			"test",
			WORKPLACE,
			"test",
			MUNICIPALAREA,
			"test",
		];
		localStorage.setItem("tkr", 401);
		await testEvent(<CreatePublicWorker />, objFail, "Cadastrar servidor");
	});

	it("localstorage2 fail", async () => {
		const objFail = [
			NAME,
			"test",
			CPF,
			"11111111111",
			ROLE,
			"test",
			CATEGORY,
			"test",
			WORKPLACE,
			"test",
			MUNICIPALAREA,
			"test",
		];
		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreatePublicWorker />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
