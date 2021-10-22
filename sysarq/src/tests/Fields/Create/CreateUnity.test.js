import React from "react";
import CreateUnity from "../../../pages/Fields/Create/CreateUnity";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { testEvent } from "./inputTest.test";
import { auth } from "../../support";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}unity/`;

const server = setupServer(
	auth(),
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.unity_name === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

const makeObject = (unity_name_value) => {
	return [
		UNITY_NAME,
		unity_name_value,
		UNITY_ABBREVIATION,
		UNITY_ABBREVIATION_VALUE,
		UNITY_BOND,
		UNITY_BOND_VALUE,
		UNITY_BOND_ABR,
		UNITY_BOND_ABR_VALUE,
		UNITY_TYPE,
		UNITY_TYPE_VALUE,
		UNITY_MUNICIPALITY,
		UNITY_MUNICIPALITY_VALUE,
		UNITY_TELEPHONE,
		UNITY_TELEPHONE_VALUE,
		OBSERVATIONS,
		OBSERVATIONS_VALUE,
	];
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();

const UNITY_NAME = "Nome da unidade*";
const UNITY_ABBREVIATION = "Sigla da unidade";
const UNITY_ABBREVIATION_VALUE = "20º DP";
const UNITY_BOND = "Vínculo administrativo";
const UNITY_BOND_VALUE = "Jurídico";
const UNITY_BOND_ABR = "Sigla do vínculo";
const UNITY_BOND_ABR_VALUE = "SAG";
const UNITY_TYPE = "Tipo de unidade";
const UNITY_TYPE_VALUE = "Administrativa";
const UNITY_MUNICIPALITY = "Município";
const UNITY_MUNICIPALITY_VALUE = "Abadiania";
const UNITY_TELEPHONE = "Telefone";
const UNITY_TELEPHONE_VALUE = "6199563432";
const OBSERVATIONS = "Observações";
const OBSERVATIONS_VALUE = "obs1";

describe("Button test", () => {
	it("axios success", async () => {
		const objSucess = makeObject("201");

		await testEvent(<CreateUnity />, objSucess, "Unidade cadastrada!");
	});
	it("axios fail", async () => {
		const objFail = makeObject("401");

		await testEvent(
			<CreateUnity />,
			objFail,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});

	it("unityName null", async () => {
		const objFail = makeObject("");

		await testEvent(
			<CreateUnity />,
			objFail,
			"Nome da unidade não pode ser vazio"
		);
	});

	it("localstorage fail", async () => {
		const localStFail = makeObject("254");

		localStorage.setItem("tkr", 401);
		await testEvent(<CreateUnity />, localStFail, "Cadastrar unidade");
	});

	it("localstorage2 fail", async () => {
		const localStFail2 = makeObject("436");

		localStorage.setItem("tkr", 404);
		await testEvent(
			<CreateUnity />,
			localStFail2,
			"Verifique sua conexão com a internet e recarregue a página."
		);
	});
});
