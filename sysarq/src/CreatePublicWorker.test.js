import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreatePublicWorker from "./pages/FieldsRegister/CreatePublicWorker";

describe("Componente principal", () => {
	it("Mostrar o título da página", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});
});

describe("Garantir que os campos de input do servidor existam", () => {
	it("Nome do servidor", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Nome do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome do servidor");
		fireEvent.change(input, { target: { value: "João" } });
		const valor = screen.getByLabelText("Nome do servidor").value;
		expect(valor == "João").toBe(true);
	});

	it("CPF do servidor", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("CPF do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("CPF do servidor");
		fireEvent.change(input, { target: { value: "12345678912" } });
		const valor = screen.getByLabelText("CPF do servidor").value;
		expect(valor == "12345678912").toBe(true);
	});

	it("Cargo do servidor", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Cargo do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Cargo do servidor");
		fireEvent.change(input, { target: { value: "Supervisor" } });
		const valor = screen.getByLabelText("Cargo do servidor").value;
		expect(valor == "Supervisor").toBe(true);
	});

	it("Classe do servidor", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Classe do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Classe do servidor");
		fireEvent.change(input, { target: { value: "Administrativo" } });
		const valor = screen.getByLabelText("Classe do servidor").value;
		expect(valor == "Administrativo").toBe(true);
	});

	it("Lotação do servidor", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Lotação do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Lotação do servidor");
		fireEvent.change(input, { target: { value: "Numérica" } });
		const valor = screen.getByLabelText("Lotação do servidor").value;
		expect(valor == "Numérica").toBe(true);
	});

	it("Município do servidor", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Município do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Município do servidor");
		fireEvent.change(input, { target: { value: "Abadiânia" } });
		const valor = screen.getByLabelText("Município do servidor").value;
		expect(valor == "Abadiânia").toBe(true);
	});
});

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		render(<CreatePublicWorker />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
