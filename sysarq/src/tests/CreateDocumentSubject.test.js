import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateDocumentSubject from "../pages/FieldsRegister/CreateDocumentSubject";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const testSubject = (title, gain) => {
	expect(screen.getByText(title)).toBeInTheDocument();

	const input = screen.getByLabelText(title);
	fireEvent.change(input, { target: { value: gain } });
	const value = screen.getByLabelText(title).value;
	expect(value === gain).toBe(true);
};

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateDocumentSubject />);

		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
	});
});

describe("Ensure that the document subject input fields exist", () => {
	it("Full name and temporality", () => {
		render(<CreateDocumentSubject />);

		testSubject("Nome do documento", "Novo Processo");
		testSubject("Temporalidade", "2021");
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
