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
	it("Estante", () => {
		render(<CreateShelf />);

		expect(screen.getByText("Estante")).toBeInTheDocument();

		const input = screen.getByLabelText("Estante");
		fireEvent.change(input, { target: { value: "2" } });
		const valor = screen.getByLabelText("Estante").value;
		expect(valor == "2").toBe(true);
	});

	it("Prateleira", () => {
		render(<CreateShelf />);

		expect(screen.getByText("Prateleira")).toBeInTheDocument();

		const input = screen.getByLabelText("Prateleira");
		fireEvent.change(input, { target: { value: "4" } });
		const valor = screen.getByLabelText("Prateleira").value;
		expect(valor == "4").toBe(true);
	});
});

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		let mock = new MockAdapter(axios);

		render(<CreateShelf />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost("http://0.0.0.0:8002/shelfE").reply(function () {
			return [201];
		});

		mock.onPost("http://0.0.0.0:8002/shelfP").reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(2);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ shelfe: 0, shelfp: 0 })
		);
		expect(mock.history.post[1].data).toBe(JSON.stringify({ number: 0 }));
	});
});
