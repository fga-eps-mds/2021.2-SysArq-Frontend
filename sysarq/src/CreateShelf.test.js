import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateShelf from "./pages/FieldsRegister/CreateShelf";

describe("Componente principal", () => {
	it("Mostrar o título da página", () => {
		render(<CreateShelf />);

		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});
});

describe("Garantir que os campos de input da estante e prateleira existam", () => {
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
		render(<CreateShelf />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
