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
	it("Document name and temporality", () => {
		render(<CreateDocumentType />);

		expect(screen.getByText("Nome do Documento")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();

		const inputDocumentName = screen.getByLabelText("Nome do Documento");
		fireEvent.change(inputDocumentName, { target: { value: "Teste" } });
		const valorDocumentName = screen.getByLabelText("Nome do Documento").value;
		expect(valorDocumentName === "Teste").toBe(true);

		const inputTemporality = screen.getByLabelText("Temporalidade");
		fireEvent.change(inputTemporality, { target: { value: "12" } });
		const valorTemporality = screen.getByLabelText("Temporalidade").value;
		expect(valorTemporality === "12").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}document_type`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

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
