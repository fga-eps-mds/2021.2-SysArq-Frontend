import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateDocumentSubject from "./pages/FieldsRegister/CreateDocumentSubject";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateDocumentSubject />);

		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
	});
});

describe("Ensure that the document subject input fields exist", () => {
	it("Full name", () => {
		render(<CreateDocumentSubject />);

		expect(screen.getByText("Nome do documento")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome do documento");
		fireEvent.change(input, { target: { value: "Novo Processo" } });
		const valor = screen.getByLabelText("Nome do documento").value;
		expect(valor == "Novo Processo").toBe(true);
	});

	it("Temporality", () => {
		render(<CreateDocumentSubject />);

		expect(screen.getByText("Temporalidade")).toBeInTheDocument();

		const input = screen.getByLabelText("Temporalidade");
		fireEvent.change(input, { target: { value: "2021" } });
		const valor = screen.getByLabelText("Temporalidade").value;
		expect(valor == "2021").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}document_subject`;

describe("Button test", () => {
	it("Save button", () => {
		let mock = new MockAdapter(axios);

		render(<CreateDocumentSubject />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ subject_name: "", temporality: 0 })
		);
	});
});
