import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateUnity from "../pages/FieldsRegister/CreateUnity";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { inputChange } from "../serverTest";

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


describe("Button test", () => {
	it("axios success", async () => {
		render(<CreateUnity />);

		inputChange("Nome da unidade", "201");
		inputChange("Sigla da unidade", "20º DP");
		inputChange("Vínculo administrativo", "Jurídico");
		inputChange("Sigla do vínculo", "VJA");
		inputChange("Tipo de unidade", "Administrativa");
		inputChange("Município", "Abadiânia");
		inputChange("Telefone", "912398734");
		inputChange("Observações", "Robson");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});

	it("axios fail", async () => {
		render(<CreateUnity />);

		inputChange("Nome da unidade", "401");
		inputChange("Sigla da unidade", "20º DP");
		inputChange("Vínculo administrativo", "Jurídico");
		inputChange("Sigla do vínculo", "VJA");
		inputChange("Tipo de unidade", "Administrativa");
		inputChange("Município", "Abadiânia");
		inputChange("Telefone", "912398734");
		inputChange("Observações", "Robson");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
});
