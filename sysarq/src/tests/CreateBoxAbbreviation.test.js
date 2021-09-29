import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateBoxAbbreviation from "../pages/FieldsRegister/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";
import inputChange from "./serverTest";

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

const testEvent1 = async (object, findText) => {
	render(<CreateBoxAbbreviation />);
	for (let i = 0; i < object.length; i += 2) {
		inputChange(object[i], object[i + 1]);
	}
	fireEvent.click(screen.getByTestId("click"));

	await screen.findByText(findText);
	act(() => {
		jest.advanceTimersByTime(3000);
	});
};

describe("Page test", () => {
	it("axios sucess", async () => {
		const objSucess = [
			"Número da caixa",
			"201",
			"Sigla da caixa",
			"ASD",
			"Nome completo",
			"Polícia Civil do Goias",
			"Ano",
			"2021"
		];
		await testEvent1(objSucess, "Campo cadastrado!");
	});

	it("axios fail", async () => {
		const objFail = [
			"Número da caixa",
			"401",
			"Sigla da caixa",
			"ASD",
			"Nome completo",
			"Polícia Civil do Goias",
			"Ano",
			"2021"
		];
		await testEvent1(objFail, "Erro de conexão!");
	});

	it("year error", async () => {
		const objFail = [
			"Número da caixa",
			"345",
			"Sigla da caixa",
			"BOB",
			"Nome completo",
			"Polícia Civil do Goias",
			"Ano",
			"3"
		];
		await testEvent1(objFail, "Ano inválido");
	});
});
