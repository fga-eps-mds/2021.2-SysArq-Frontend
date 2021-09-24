import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import CreateShelf from "../pages/FieldsRegister/CreateShelf";
import { rest } from "msw";
import { setupServer } from "msw/node";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}shelf/`;

const server = setupServer(
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.shelfe_number === "201") {
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
describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateShelf />);

		expect(
			screen.getByText("Cadastrar estantes e prateleiras")
		).toBeInTheDocument();
	});
});

describe("inputs", () => {
	it("axios sucess", async () => {
		render(<CreateShelf />);

		inputChange("Estante", "201");
		inputChange("Prateleira", "12");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
	it("axios fail", async () => {
		render(<CreateShelf />);

		inputChange("Estante", "401");
		inputChange("Prateleira", "12");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
});
