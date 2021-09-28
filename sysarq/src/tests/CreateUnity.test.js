import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateUnity from "../pages/FieldsRegister/CreateUnity";
import { rest } from "msw";
import { setupServer } from "msw/node";
import inputChange from "./serverTest";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}unity/`;

const server = setupServer(
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

const testEvent = async (object, findText) => {
	render(<CreateUnity />);
	for (let i = 0; i < object.length; i += 2) {
		inputChange(object[i], object[i + 1]);
	}
	fireEvent.click(screen.getByTestId("click"));

	await screen.findByText(findText);
	act(() => {
		jest.advanceTimersByTime(3000);
	});
};

describe("Button test", () => {
	it("axios success", async () => {
		const objSucess = [
			"Nome da unidade",
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
		await testEvent(objSucess, "Campo cadastrado!");
	});
	it("axios fail", async () => {
		const objFail = [
			"Nome da unidade",
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
		await testEvent(objFail, "Erro de conexão!");
	});
});
