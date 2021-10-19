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

const UNITY_NAME = "Nome da unidade*";
const UNITY_ABBREVIATION = "Sigla da unidade";
const UNITY_BOND = "Vínculo administrativo";
const UNITY_BOND_ABR = "Sigla do vínculo";
const UNITY_TYPE = "Tipo de unidade";
const UNITY_MUNICIPALITY = "Município";
const UNITY_TELEPHONE = "Telefone";
const OBSERVATIONS = "Observações";

describe("Button test", () => {
	it("axios success", async () => {
		const objSucess = [
			UNITY_NAME,
			"201",
			UNITY_ABBREVIATION,
			"20º DP",
			UNITY_BOND,
			"Jurídico",
			UNITY_BOND_ABR,
			"VJA",
			UNITY_TYPE,
			"Administrativa",
			UNITY_MUNICIPALITY,
			"Abadiânia",
			UNITY_TELEPHONE,
			"912398734",
			OBSERVATIONS,
			"Robson",
		];
		await testEvent(<CreateUnity />, objSucess, "Unidade cadastrada!");
	});
	it("axios fail", async () => {
		const objFail = [
			UNITY_NAME,
			"401",
			UNITY_ABBREVIATION,
			"20º DP",
			UNITY_BOND,
			"Jurídico",
			UNITY_BOND_ABR,
			"VJA",
			UNITY_TYPE,
			"Administrativa",
			UNITY_MUNICIPALITY,
			"Abadiânia",
			UNITY_TELEPHONE,
			"912398734",
			OBSERVATIONS,
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
			UNITY_NAME,
			"",
			UNITY_ABBREVIATION,
			"20º DP",
			UNITY_BOND,
			"Jurídico",
			UNITY_BOND_ABR,
			"VJA",
			UNITY_TYPE,
			"Administrativa",
			UNITY_MUNICIPALITY,
			"Abadiânia",
			UNITY_TELEPHONE,
			"912398734",
			OBSERVATIONS,
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
			UNITY_NAME,
			"401",
			UNITY_ABBREVIATION,
			"20º DP",
			UNITY_BOND,
			"Jurídico",
			UNITY_BOND_ABR,
			"VJA",
			UNITY_TYPE,
			"Administrativa",
			UNITY_MUNICIPALITY,
			"Abadiânia",
			UNITY_TELEPHONE,
			"912398734",
			OBSERVATIONS,
			"Robson",
		];
		localStorage.setItem("tkr", 401);
		await testEvent(<CreateUnity />, objFail, "Cadastrar unidade");
	});

	it("localstorage2 fail", async () => {
		const objFail = [
			UNITY_NAME,
			"401",
			UNITY_ABBREVIATION,
			"20º DP",
			UNITY_BOND,
			"Jurídico",
			UNITY_BOND_ABR,
			"VJA",
			UNITY_TYPE,
			"Administrativa",
			UNITY_MUNICIPALITY,
			"Abadiânia",
			UNITY_TELEPHONE,
			"912398734",
			OBSERVATIONS,
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
