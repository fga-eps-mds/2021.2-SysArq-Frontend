import React from "react";
import CreateDocumentType from "../../../pages/Fields/Create/CreateDocumentType";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}document-type/`;
const axiosProfile = process.env.REACT_APP_URL_API_PROFILE;

const server = setupServer(
	rest.post(`${axiosProfile}api/token/refresh/`, (req, res, ctx) => {
		if (req.body.refresh === "401") {
			return res(ctx.status(401));
		} else if (req.body.refresh === "404") {
			return res(ctx.status(404));
		} else {
			if (req.body.refresh === localStorage.getItem("tkr")) {
				return res(ctx.status(200));
			}
		}
	}),
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.document_name === "201") {
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

const DOCUMENT_NAME = "Nome do documento*";
const TEMPORALITY = "Temporalidade (anos)*";

describe("Page test", () => {
	it("axios sucess", async () => {
		const objSuccess = [DOCUMENT_NAME, "201", TEMPORALITY, "20"];
		await testEvent(<CreateDocumentType />, objSuccess, "Tipo cadastrado!");
	});

	it("axios fail", async () => {
		const objFail = [DOCUMENT_NAME, "401", TEMPORALITY, "20"];
		await testEvent(
			<CreateDocumentType />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});

	it("subject null", async () => {
		const objFail = [DOCUMENT_NAME, "", TEMPORALITY, "20"];
		await testEvent(
			<CreateDocumentType />,
			objFail,
			"Tipo de documento inválido"
		);
	});

	it("temporality null", async () => {
		const objFail = [DOCUMENT_NAME, "asd", TEMPORALITY, ""];
		await testEvent(<CreateDocumentType />, objFail, "Temporalidade inválida");
	});

	it("localstorage fail", async () => {
		const objFail = [DOCUMENT_NAME, "asd", TEMPORALITY, "20"];
		localStorage.setItem("tkr", 401);
		await testEvent(
			<CreateDocumentType />,
			objFail,
			"Cadastrar tipo do documento"
		);
	});

	it("localstorage2 fail", async () => {
		const objFail = [DOCUMENT_NAME, "asd", TEMPORALITY, "20"];
		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreateDocumentType />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
