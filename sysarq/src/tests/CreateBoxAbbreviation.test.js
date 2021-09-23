import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateBoxAbbreviation from "../pages/FieldsRegister/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";


const hostApi = `${process.env.REACT_APP_URL_API}box-abbreviation/`;

const server = setupServer(
	rest.post(hostApi, (req, res, ctx) => {
		console.log(req.body.abbreviation)
		if (req.body.number === '201') {
			return res(
				ctx.status(201),
			)
		} else {
			return res(
				ctx.status(404)
			)
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();


describe("Render test", () => {
	it("test component rendering", () => {
		render(<CreateBoxAbbreviation />);
		expect(screen.getByText("Cadastrar sigla da caixa")).toBeInTheDocument();
		expect(screen.getByText("Número da caixa")).toBeInTheDocument();
		expect(screen.getByText("Sigla da caixa")).toBeInTheDocument();
		expect(screen.getByText("Nome completo")).toBeInTheDocument();
		expect(screen.getByText("Ano")).toBeInTheDocument();
		expect(screen.getByText("CADASTRAR")).toBeInTheDocument();
	});
});

describe("Button test", () => {
	it("axios success", async () => {
		render(<CreateBoxAbbreviation />);

		const inputBoxNumber = screen.getByLabelText("Número da caixa");
		fireEvent.change(inputBoxNumber, { target: { value: '201' } });

		const inputBoxAbbreviation = screen.getByLabelText("Sigla da caixa");
		fireEvent.change(inputBoxAbbreviation, { target: { value: "ASD" } });

		const inputFullName = screen.getByLabelText("Nome completo");
		fireEvent.change(inputFullName, {
			target: { value: "Polícia Civil do Goias" },
		});

		const inputYear = screen.getByLabelText("Ano");
		fireEvent.change(inputYear, { target: { value: "2021" } });

		fireEvent.click(screen.getByTestId("click"))
		
		await screen.findByText("Campo cadastrado!")
		act(() => {
			jest.advanceTimersByTime(3000);
		})
	});

	it("axios fail", async () => {
		render(<CreateBoxAbbreviation />);

		const inputBoxNumber = screen.getByLabelText("Número da caixa");
		fireEvent.change(inputBoxNumber, { target: { value: '401' } });

		const inputBoxAbbreviation = screen.getByLabelText("Sigla da caixa");
		fireEvent.change(inputBoxAbbreviation, { target: { value: "PC-GO" } });

		const inputFullName = screen.getByLabelText("Nome completo");
		fireEvent.change(inputFullName, {
			target: { value: "Polícia Civil do Goias" },
		});

		const inputYear = screen.getByLabelText("Ano");
		fireEvent.change(inputYear, { target: { value: "2021" } });

		fireEvent.click(screen.getByTestId("click"))

		await (screen.findByText("Erro de conexão!"));
		act(() => {
			jest.advanceTimersByTime(3000);
		})
	});
});
