import React from "react";
import CreateDocumentSubject from "../../../pages/Fields/Create/CreateDocumentSubject";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}document-subject/`;
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
		if (req.body.subject_name === "201") {
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

const DOCUMENT_SUBJECT = "Assunto do documento*";
const TEMPORALITY = "Temporalidade (anos)*";

describe("Page test", () => {
	it("axios sucess", async () => {
		const objSuccess = [DOCUMENT_SUBJECT, "201", TEMPORALITY, "20"];
		await testEvent(
			<CreateDocumentSubject />,
			objSuccess,
			"Assunto cadastrado!"
		);
	});

	it("axios fail", async () => {
		const objFail = [DOCUMENT_SUBJECT, "401", TEMPORALITY, "20"];
		await testEvent(
			<CreateDocumentSubject />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});

	it("subject null", async () => {
		const objFail = [DOCUMENT_SUBJECT, "", TEMPORALITY, "20"];
		await testEvent(<CreateDocumentSubject />, objFail, "Assunto inválido");
	});

	it("temporality null", async () => {
		const objFail = [DOCUMENT_SUBJECT, "asd", TEMPORALITY, ""];
		await testEvent(
			<CreateDocumentSubject />,
			objFail,
			"Temporalidade inválida"
		);
	});

	it("localstorage fail", async () => {
		const objFail = [DOCUMENT_SUBJECT, "asd", TEMPORALITY, "20"];
		localStorage.setItem("tkr", 401);
		await testEvent(
			<CreateDocumentSubject />,
			objFail,
			"Cadastrar assunto do documento"
		);
	});

	it("localstorage logout", async () => {
		const objFail = [DOCUMENT_SUBJECT, "asd", TEMPORALITY, "20"];
		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreateDocumentSubject />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
