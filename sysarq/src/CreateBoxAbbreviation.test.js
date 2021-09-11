import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateBoxAbbreviation from "./pages/FieldsRegister/CreateBoxAbbreviation";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});
});

describe("Ensure that the input fields of the box abbreviation exist", () => {
	it("box number", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Número da caixa")).toBeInTheDocument();

		const input = screen.getByLabelText("Número da caixa");
		fireEvent.change(input, { target: { value: "10" } });
		const valor = screen.getByLabelText("Número da caixa").value;
		expect(valor == "10").toBe(true);
	});

	it("box abbreviation", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Sigla da caixa")).toBeInTheDocument();

		const input = screen.getByLabelText("Sigla da caixa");
		fireEvent.change(input, { target: { value: "PC-GO" } });
		const valor = screen.getByLabelText("Sigla da caixa").value;
		expect(valor == "PC-GO").toBe(true);
	});

	it("Full name", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Nome completo")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome completo");
		fireEvent.change(input, { target: { value: "Polícia Civil do Goias" } });
		const valor = screen.getByLabelText("Nome completo").value;
		expect(valor == "Polícia Civil do Goias").toBe(true);
	});

	it("Year", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Ano")).toBeInTheDocument();

		const input = screen.getByLabelText("Ano");
		fireEvent.change(input, { target: { value: "2021" } });
		const valor = screen.getByLabelText("Ano").value;
		expect(valor == "2021").toBe(true);
	});
});

describe("Button test", () => {
	it("Save button", () => {
		let mock = new MockAdapter(axios);

		render(<CreateBoxAbbreviation />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost("http://0.0.0.0:8002/box_abbreviation").reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ number: "", abbreviation: "", name: "", year: "" })
		);
	});
});
