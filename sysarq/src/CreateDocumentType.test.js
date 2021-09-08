import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";

describe("Componente principal", () => {
	it("Mostrar o título da página", () => {
		render(<CreateDocumentType />);

		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});
});

describe("Garantir que os campos de input existam", () => {
	describe("Tipo de documento", () => {
		it("Nome do documento", () => {
			render(<CreateDocumentType />);

			expect(screen.getByText("Nome do Documento")).toBeInTheDocument();

			const input = screen.getByLabelText("Nome do Documento");
			fireEvent.change(input, { target: { value: "Teste" } });
			const valor = screen.getByLabelText("Nome do Documento").value;
			expect(valor == "Teste").toBe(true);
		});

		it("Temporalidade", () => {
			render(<CreateDocumentType />);

			expect(screen.getByText("Temporalidade")).toBeInTheDocument();

			const input = screen.getByLabelText("Temporalidade");
			fireEvent.change(input, { target: { value: "12" } });
			const valor = screen.getByLabelText("Temporalidade").value;
			expect(valor == "12").toBe(true);
		});
	});
});

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		render(<CreateDocumentType />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
