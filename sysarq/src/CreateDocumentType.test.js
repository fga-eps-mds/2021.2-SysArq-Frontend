import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const testType = (titulo, valor) => {
	expect(screen.getByText(titulo)).toBeInTheDocument();

	const input = screen.getByLabelText(titulo);
	fireEvent.change(input, { target: { value: valor } });
	const value = screen.getByLabelText(titulo).value;
	expect(value === valor).toBe(true);
};

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateDocumentType />);

		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});
});

describe("Ensure that the document type input fields exist", () => {
	it("Full name and temporality", () => {
		render(<CreateDocumentType />);

		testType("Nome do Documento", "teste");
		testType("Temporalidade", "12");
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
