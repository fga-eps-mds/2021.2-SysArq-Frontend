import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateUnity from "./pages/FieldsRegister/CreateUnity";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});
});

describe("Ensure unit input fields exist", () => {
	it("Unit name", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Nome da unidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome da unidade");
		fireEvent.change(input, { target: { value: "20º Delegacia de Polícia" } });
		const valor = screen.getByLabelText("Nome da unidade").value;
		expect(valor == "20º Delegacia de Polícia").toBe(true);
	});

	it("Unit abbreviation", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Sigla da unidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Sigla da unidade");
		fireEvent.change(input, { target: { value: "20º DP" } });
		const valor = screen.getByLabelText("Sigla da unidade").value;
		expect(valor == "20º DP").toBe(true);
	});

	it("Administrative bond", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Vínculo administrativo")).toBeInTheDocument();

		const input = screen.getByLabelText("Vínculo administrativo");
		fireEvent.change(input, { target: { value: "Jurídico" } });
		const valor = screen.getByLabelText("Vínculo administrativo").value;
		expect(valor == "Jurídico").toBe(true);
	});

	it("Abbreviation bond", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Sigla do vínculo")).toBeInTheDocument();

		const input = screen.getByLabelText("Sigla do vínculo");
		fireEvent.change(input, { target: { value: "VJA" } });
		const valor = screen.getByLabelText("Sigla do vínculo").value;
		expect(valor == "VJA").toBe(true);
	});

	it("Unit type", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Tipo de unidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Tipo de unidade");
		fireEvent.change(input, { target: { value: "Administrativa" } });
		const valor = screen.getByLabelText("Tipo de unidade").value;
		expect(valor == "Administrativa").toBe(true);
	});

	it("Municipality", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Município")).toBeInTheDocument();

		const input = screen.getByLabelText("Município");
		fireEvent.change(input, { target: { value: "Abadiânia" } });
		const valor = screen.getByLabelText("Município").value;
		expect(valor == "Abadiânia").toBe(true);
	});

	it("Phone number", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Número de telefone")).toBeInTheDocument();

		const input = screen.getByLabelText("Número de telefone");
		fireEvent.change(input, { target: { value: "912398734" } });
		const valor = screen.getByLabelText("Número de telefone").value;
		expect(valor == "912398734").toBe(true);
	});

	it("Comments", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Observações")).toBeInTheDocument();

		const input = screen.getByLabelText("Observações");
		fireEvent.change(input, { target: { value: "Testando" } });
		const valor = screen.getByLabelText("Observações").value;
		expect(valor == "Testando").toBe(true);
	});
});

describe("Button test", () => {
	it("Save button", () => {
		render(<CreateUnity />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		let mock = new MockAdapter(axios);

		render(<CreateUnity />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(`${process.env.REACT_APP_API_URL}/unity`).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({
				unity_name: "",
				unity_abbreviation: "",
				administrative_bond: "",
				bond_abbreviation: "",
				type_of_unity: "",
				telephone_number: "",
				county: "",
			})
		);
	});
});
