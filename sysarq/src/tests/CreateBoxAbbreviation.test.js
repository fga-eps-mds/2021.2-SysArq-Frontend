import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateBoxAbbreviation from "../pages/FieldsRegister/CreateBoxAbbreviation";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});
});

describe("Ensure that the input fields of the box abbreviation exist", () => {
	it("box number, box abbreviation, full name and year", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Número da caixa")).toBeInTheDocument();
		expect(screen.getByText("Sigla da caixa")).toBeInTheDocument();
		expect(screen.getByText("Nome completo")).toBeInTheDocument();
		expect(screen.getByText("Ano")).toBeInTheDocument();

		const inputBoxNumner = screen.getByLabelText("Número da caixa");
		fireEvent.change(inputBoxNumner, { target: { value: "10" } });
		const valorBoxNumber = screen.getByLabelText("Número da caixa").value;
		expect(valorBoxNumber === "10").toBe(true);

		const inputBoxAbbreviation = screen.getByLabelText("Sigla da caixa");
		fireEvent.change(inputBoxAbbreviation, { target: { value: "PC-GO" } });
		const valorBoxAbbreviation = screen.getByLabelText("Sigla da caixa").value;
		expect(valorBoxAbbreviation === "PC-GO").toBe(true);

		const inputFullName = screen.getByLabelText("Nome completo");
		fireEvent.change(inputFullName, {
			target: { value: "Polícia Civil do Goias" },
		});
		const valorFullName = screen.getByLabelText("Nome completo").value;
		expect(valorFullName === "Polícia Civil do Goias").toBe(true);

		const inputYear = screen.getByLabelText("Ano");
		fireEvent.change(inputYear, { target: { value: "2021" } });
		const valorYear = screen.getByLabelText("Ano").value;
		expect(valorYear === "2021").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}box_abbreviation`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

		render(<CreateBoxAbbreviation />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ number: "", abbreviation: "", name: "", year: "" })
		);
	});
});
