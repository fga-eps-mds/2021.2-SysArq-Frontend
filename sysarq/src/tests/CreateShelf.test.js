import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";

import CreateShelf from "../pages/FieldsRegister/CreateShelf";
import { rest } from "msw";
import { setupServer } from "msw/node";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

const server = setupServer(
	rest.post(axiosArchives + `shelf/`, (req, res, ctx) => {
		if (req.body.number === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	}),
	rest.post(axiosArchives + `rack/`, (req, res, ctx) => {
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

const inputChange = (title, targetValue) => {
	const inputReference = screen.getByLabelText(title);
	fireEvent.change(inputReference, {
		target: { value: targetValue },
	});
};
const selectValue = (title) => {
	fireEvent.mouseDown(screen.getByLabelText("Selecione"));
	const subjectsOptions = within(screen.getByRole("listbox"));
	fireEvent.click(subjectsOptions.getByText(title));
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
	it("axios sucess rack", async () => {
		render(<CreateShelf />);

		selectValue("Prateleira");
		inputChange("Número da prateleira", "201");
		fireEvent.click(screen.getByTestId("click"));
		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
	it("axios sucess shelf", async () => {
		render(<CreateShelf />);

		selectValue("Estante");
		inputChange("Número da estante", "201");
		fireEvent.click(screen.getByTestId("click"));
		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
	it("axios fail rack", async () => {
		render(<CreateShelf />);

		selectValue("Prateleira");
		inputChange("Número da prateleira", "401");
		fireEvent.click(screen.getByTestId("click"));
		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
	it("axios fail shelf", async () => {
		render(<CreateShelf />);

		selectValue("Estante");
		inputChange("Número da estante", "401");
		fireEvent.click(screen.getByTestId("click"));
		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});
});
