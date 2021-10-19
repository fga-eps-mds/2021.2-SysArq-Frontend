import React from "react";
import CreateUnity from "../../../pages/Fields/Create/CreateUnity";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}unity/`;
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
		if (req.body.unity_name === "201") {
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

describe("Button test", () => {
	it("axios success", async () => {
		const objSucess = [
			"Nome da unidade*",
			"201",
			"Sigla da unidade",
			"20º DP",
			"Vínculo administrativo",
			"Jurídico",
			"Sigla do vínculo",
			"VJA",
			"Tipo de unidade",
			"Administrativa",
			"Município",
			"Abadiânia",
			"Telefone",
			"912398734",
			"Observações",
			"Robson",
		];
		await testEvent(<CreateUnity />, objSucess, "Unidade cadastrada!");
	});
	it("axios fail", async () => {
		const objFail = [
			"Nome da unidade*",
			"401",
			"Sigla da unidade",
			"20º DP",
			"Vínculo administrativo",
			"Jurídico",
			"Sigla do vínculo",
			"VJA",
			"Tipo de unidade",
			"Administrativa",
			"Município",
			"Abadiânia",
			"Telefone",
			"912398734",
			"Observações",
			"Robson",
		];
		await testEvent(
			<CreateUnity />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});

	it("unityName null", async () => {
		const objFail = [
			"Nome da unidade*",
			"",
			"Sigla da unidade",
			"20º DP",
			"Vínculo administrativo",
			"Jurídico",
			"Sigla do vínculo",
			"VJA",
			"Tipo de unidade",
			"Administrativa",
			"Município",
			"Abadiânia",
			"Telefone",
			"912398734",
			"Observações",
			"Robson",
		];
		await testEvent(
			<CreateUnity />,
			objFail,
			"Nome da unidade não pode ser vazio"
		);
	});

	it("localstorage fail", async () => {
		const objFail = [
			"Nome da unidade*",
			"401",
			"Sigla da unidade",
			"20º DP",
			"Vínculo administrativo",
			"Jurídico",
			"Sigla do vínculo",
			"VJA",
			"Tipo de unidade",
			"Administrativa",
			"Município",
			"Abadiânia",
			"Telefone",
			"912398734",
			"Observações",
			"Robson",
		];
		localStorage.setItem("tkr", 401);
		await testEvent(<CreateUnity />, objFail, "Cadastrar unidade");
	});

	it("localstorage2 fail", async () => {
		const objFail = [
			"Nome da unidade*",
			"401",
			"Sigla da unidade",
			"20º DP",
			"Vínculo administrativo",
			"Jurídico",
			"Sigla do vínculo",
			"VJA",
			"Tipo de unidade",
			"Administrativa",
			"Município",
			"Abadiânia",
			"Telefone",
			"912398734",
			"Observações",
			"Robson",
		];
		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreateUnity />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
