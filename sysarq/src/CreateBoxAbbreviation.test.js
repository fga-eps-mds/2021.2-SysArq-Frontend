import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateBoxAbbreviation from "./pages/FieldsRegister/CreateBoxAbbreviation";

describe("Componente principal", () => {
	it("Mostrar o título da página", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});
});

describe("Garantir que os campos de input da sigla da caixa existam", () => {
	it("Número da caixa", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Número da caixa")).toBeInTheDocument();

		const input = screen.getByLabelText("Número da caixa");
		fireEvent.change(input, { target: { value: "10" } });
		const valor = screen.getByLabelText("Número da caixa").value;
		expect(valor == "10").toBe(true);
	});

	it("Sigla da caixa", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Sigla da caixa")).toBeInTheDocument();

		const input = screen.getByLabelText("Sigla da caixa");
		fireEvent.change(input, { target: { value: "PC-GO" } });
		const valor = screen.getByLabelText("Sigla da caixa").value;
		expect(valor == "PC-GO").toBe(true);
	});

	it("Nome completo", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Nome completo")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome completo");
		fireEvent.change(input, { target: { value: "Polícia Civil do Goias" } });
		const valor = screen.getByLabelText("Nome completo").value;
		expect(valor == "Polícia Civil do Goias").toBe(true);
	});

	it("Ano", () => {
		render(<CreateBoxAbbreviation />);

		expect(screen.getByText("Ano")).toBeInTheDocument();

		const input = screen.getByLabelText("Ano");
		fireEvent.change(input, { target: { value: "2021" } });
		const valor = screen.getByLabelText("Ano").value;
		expect(valor == "2021").toBe(true);
	});
});

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		render(<CreateBoxAbbreviation />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
