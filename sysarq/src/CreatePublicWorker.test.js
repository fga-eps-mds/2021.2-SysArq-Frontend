import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreatePublicWorker from "./pages/FieldsRegister/CreatePublicWorker";

describe('Main component', () => {
	it('Show page title', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});
}); 

describe('Ensure server input fields exist', () => {
	it('server name', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Nome do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome do servidor");
		fireEvent.change(input, { target: { value: "João" } });
		const valor = screen.getByLabelText("Nome do servidor").value;
		expect(valor == "João").toBe(true);
	});

	it('Server CPF', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("CPF do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("CPF do servidor");
		fireEvent.change(input, { target: { value: "12345678912" } });
		const valor = screen.getByLabelText("CPF do servidor").value;
		expect(valor == "12345678912").toBe(true);
	});

	it('Server position', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Cargo do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Cargo do servidor");
		fireEvent.change(input, { target: { value: "Supervisor" } });
		const valor = screen.getByLabelText("Cargo do servidor").value;
		expect(valor == "Supervisor").toBe(true);
	});

	it('Server class', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Classe do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Classe do servidor");
		fireEvent.change(input, { target: { value: "Administrativo" } });
		const valor = screen.getByLabelText("Classe do servidor").value;
		expect(valor == "Administrativo").toBe(true);
	});

	it('Server stocking', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Lotação do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Lotação do servidor");
		fireEvent.change(input, { target: { value: "Numérica" } });
		const valor = screen.getByLabelText("Lotação do servidor").value;
		expect(valor == "Numérica").toBe(true);
	});

	it('Server municipality', () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Município do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Município do servidor");
		fireEvent.change(input, { target: { value: "Abadiânia" } });
		const valor = screen.getByLabelText("Município do servidor").value;
		expect(valor == "Abadiânia").toBe(true);
	});
});

describe('Button test', () => {
	it('Save button', () => {
		render(<CreatePublicWorker />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});