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
	it("Full name and temporality", () => {
		render(<CreateDocumentSubject />);

		expect(screen.getByText("Nome do documento")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();

		const inputDocumentName = screen.getByLabelText("Nome do documento");
		fireEvent.change(inputDocumentName, { target: { value: "Novo Processo" } });
		const valorDocumentName = screen.getByLabelText("Nome do documento").value;
		expect(valorDocumentName === "Novo Processo").toBe(true);

		const inputTemporality = screen.getByLabelText("Temporalidade");
		fireEvent.change(inputTemporality, { target: { value: "2021" } });
		const valorTemporality = screen.getByLabelText("Temporalidade").value;
		expect(valorTemporality === "2021").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}document_subject`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

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
