import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateUnity from "./pages/FieldsRegister/CreateUnity";

describe("Componente principal", () => {
	it("Mostrar o título da página", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});
});

describe("Garantir que os campos de input da unidade existam", () => {
	it("Nome da unidade", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Nome da unidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome da unidade");
		fireEvent.change(input, { target: { value: "20º Delegacia de Polícia" } });
		const valor = screen.getByLabelText("Nome da unidade").value;
		expect(valor == "20º Delegacia de Polícia").toBe(true);
	});

	it("Sigla da unidade", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Sigla da unidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Sigla da unidade");
		fireEvent.change(input, { target: { value: "20º DP" } });
		const valor = screen.getByLabelText("Sigla da unidade").value;
		expect(valor == "20º DP").toBe(true);
	});

	it("Vínculo administrativo", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Vínculo administrativo")).toBeInTheDocument();

		const input = screen.getByLabelText("Vínculo administrativo");
		fireEvent.change(input, { target: { value: "Jurídico" } });
		const valor = screen.getByLabelText("Vínculo administrativo").value;
		expect(valor == "Jurídico").toBe(true);
	});

	it("Sigla do vínculo", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Sigla do vínculo")).toBeInTheDocument();

		const input = screen.getByLabelText("Sigla do vínculo");
		fireEvent.change(input, { target: { value: "VJA" } });
		const valor = screen.getByLabelText("Sigla do vínculo").value;
		expect(valor == "VJA").toBe(true);
	});

	it("Tipo de unidade", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Tipo de unidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Tipo de unidade");
		fireEvent.change(input, { target: { value: "Administrativa" } });
		const valor = screen.getByLabelText("Tipo de unidade").value;
		expect(valor == "Administrativa").toBe(true);
	});

	it("Município", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Município")).toBeInTheDocument();

		const input = screen.getByLabelText("Município");
		fireEvent.change(input, { target: { value: "Abadiânia" } });
		const valor = screen.getByLabelText("Município").value;
		expect(valor == "Abadiânia").toBe(true);
	});

	it("Número de telefone", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Número de telefone")).toBeInTheDocument();

		const input = screen.getByLabelText("Número de telefone");
		fireEvent.change(input, { target: { value: "912398734" } });
		const valor = screen.getByLabelText("Número de telefone").value;
		expect(valor == "912398734").toBe(true);
	});

	it("Observações", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Observações")).toBeInTheDocument();

		const input = screen.getByLabelText("Observações");
		fireEvent.change(input, { target: { value: "Testando" } });
		const valor = screen.getByLabelText("Observações").value;
		expect(valor == "Testando").toBe(true);
	});
});

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		render(<CreateUnity />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
