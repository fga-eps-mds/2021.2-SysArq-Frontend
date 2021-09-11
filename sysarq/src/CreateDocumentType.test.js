import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateDocumentType />);

		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});
});

describe("Ensure that the document type input fields exist", () => {
	describe("Document type", () => {
		it("Document name", () => {
			render(<CreateDocumentType />);

			expect(screen.getByText("Nome do Documento")).toBeInTheDocument();

			const input = screen.getByLabelText("Nome do Documento");
			fireEvent.change(input, { target: { value: "Teste" } });
			const valor = screen.getByLabelText("Nome do Documento").value;
			expect(valor == "Teste").toBe(true);
		});

		it("Temporality", () => {
			render(<CreateDocumentType />);

			expect(screen.getByText("Temporalidade")).toBeInTheDocument();

			const input = screen.getByLabelText("Temporalidade");
			fireEvent.change(input, { target: { value: "12" } });
			const valor = screen.getByLabelText("Temporalidade").value;
			expect(valor == "12").toBe(true);
		});
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}document_type`;

describe("Button test", () => {
	it("Save button", () => {
		let mock = new MockAdapter(axios);

		render(<CreateDocumentType />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ document_name: "", temporality: 0 })
		);
	});
});
