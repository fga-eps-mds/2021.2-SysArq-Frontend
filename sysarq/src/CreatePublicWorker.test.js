import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreatePublicWorker from "./pages/FieldsRegister/CreatePublicWorker";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});
});

describe("Ensure server input fields exist", () => {
	it("server name", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Nome do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Nome do servidor");
		fireEvent.change(input, { target: { value: "João" } });
		const valor = screen.getByLabelText("Nome do servidor").value;
		expect(valor == "João").toBe(true);
	});

	it("Server CPF", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("CPF do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("CPF do servidor");
		fireEvent.change(input, { target: { value: "12345678912" } });
		const valor = screen.getByLabelText("CPF do servidor").value;
		expect(valor == "12345678912").toBe(true);
	});

	it("Server position", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Cargo do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Cargo do servidor");
		fireEvent.change(input, { target: { value: "Supervisor" } });
		const valor = screen.getByLabelText("Cargo do servidor").value;
		expect(valor == "Supervisor").toBe(true);
	});

	it("Server class", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Classe do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Classe do servidor");
		fireEvent.change(input, { target: { value: "Administrativo" } });
		const valor = screen.getByLabelText("Classe do servidor").value;
		expect(valor == "Administrativo").toBe(true);
	});

	it("Server stocking", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Lotação do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Lotação do servidor");
		fireEvent.change(input, { target: { value: "Numérica" } });
		const valor = screen.getByLabelText("Lotação do servidor").value;
		expect(valor == "Numérica").toBe(true);
	});

	it("Server municipality", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Município do servidor")).toBeInTheDocument();

		const input = screen.getByLabelText("Município do servidor");
		fireEvent.change(input, { target: { value: "Abadiânia" } });
		const valor = screen.getByLabelText("Município do servidor").value;
		expect(valor == "Abadiânia").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}public_worker`;

describe("Button test", () => {
	it("Save button", () => {
		let mock = new MockAdapter(axios);

		render(<CreatePublicWorker />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({
				name: "",
				cpf: "",
				office: "",
				class_worker: "",
				capacity: "",
				county: "",
			})
		);
	});
});
