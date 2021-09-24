import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import CreateDocumentType from "../pages/FieldsRegister/CreateDocumentType";

import { rest } from "msw";
import { setupServer } from "msw/node";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}document-type/`;

const server = setupServer(
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

const inputChange = (title, targetValue) => {
	const inputReference = screen.getByLabelText(title);
	fireEvent.change(inputReference, {
		target: { value: targetValue },
	});
};

describe("Page test", () => {
	it("axios sucess", async () => {
		render(<CreateDocumentType />);

		inputChange("Nome do documento", "201");
		inputChange("Temporalidade", "2022-01-01");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
	it("axios fail", async () => {
		render(<CreateDocumentType />);

		inputChange("Nome do documento", "401");
		inputChange("Temporalidade", "2022-01-01");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
});
