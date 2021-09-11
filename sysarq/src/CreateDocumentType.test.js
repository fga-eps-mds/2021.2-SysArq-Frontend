import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";

describe('Main component', () => {
	it('Show page title', () => {
		render(<CreateDocumentType />);

		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});
});

describe('Ensure that the document type input fields exist', () => {
	describe('Document type', () => {
		it('Document name', () => {
			render(<CreateDocumentType />);

			expect(screen.getByText("Nome do Documento")).toBeInTheDocument();

			const input = screen.getByLabelText("Nome do Documento");
			fireEvent.change(input, { target: { value: "Teste" } });
			const valor = screen.getByLabelText("Nome do Documento").value;
			expect(valor == "Teste").toBe(true);
		});

		it('Temporality', () => {
			render(<CreateDocumentType />);

			expect(screen.getByText("Temporalidade")).toBeInTheDocument();

			const input = screen.getByLabelText("Temporalidade");
			fireEvent.change(input, { target: { value: "12" } });
			const valor = screen.getByLabelText("Temporalidade").value;
			expect(valor == "12").toBe(true);
		});
	});
});

describe('Button test', () => {
	it('Save button', () => {
		render(<CreateDocumentType />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
