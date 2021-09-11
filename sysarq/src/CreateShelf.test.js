import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateShelf from "./pages/FieldsRegister/CreateShelf";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateShelf />);

		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});
});

describe("Ensure that the shelf input fields exist", () => {
	it("shelf", () => {
		render(<CreateShelf />);

		expect(screen.getByText("Estante")).toBeInTheDocument();
		expect(screen.getByText("Prateleira")).toBeInTheDocument();

		const inputShelfE = screen.getByLabelText("Estante");
		fireEvent.change(inputShelfE, { target: { value: "2" } });
		const valorShelfE = screen.getByLabelText("Estante").value;
		expect(valorShelfE === "2").toBe(true);

		const inputShelfP = screen.getByLabelText("Prateleira");
		fireEvent.change(inputShelfP, { target: { value: "4" } });
		const valorShelfP = screen.getByLabelText("Prateleira").value;
		expect(valorShelfP === "4").toBe(true);
	});
});

const hostApiShelfE = `${process.env.REACT_APP_URL_API}shelfE`;
const hostApiShelfP = `${process.env.REACT_APP_URL_API}shelfP`;

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		const mock = new MockAdapter(axios);

		render(<CreateShelf />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApiShelfE).reply(function () {
			return [201];
		});

		mock.onPost(hostApiShelfP).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(2);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ shelfe: 0, shelfp: 0 })
		);
		expect(mock.history.post[1].data).toBe(JSON.stringify({ number: 0 }));
	});
});
