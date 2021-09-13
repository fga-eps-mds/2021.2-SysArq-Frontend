import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreatePublicWorker from "../pages/FieldsRegister/CreatePublicWorker";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});
});

describe("Ensure server input fields exist", () => {
	it("name, CPF, class, office, municipality and position", () => {
		render(<CreatePublicWorker />);

		expect(screen.getByText("Nome do servidor")).toBeInTheDocument();
		expect(screen.getByText("CPF do servidor")).toBeInTheDocument();
		expect(screen.getByText("Cargo do servidor")).toBeInTheDocument();
		expect(screen.getByText("Classe do servidor")).toBeInTheDocument();
		expect(screen.getByText("Lotação do servidor")).toBeInTheDocument();
		expect(screen.getByText("Município do servidor")).toBeInTheDocument();

		const inputServerName = screen.getByLabelText("Nome do servidor");
		fireEvent.change(inputServerName, { target: { value: "João" } });
		const valueServerName = screen.getByLabelText("Nome do servidor").value;
		expect(valueServerName === "João").toBe(true);

		const inputCPF = screen.getByLabelText("CPF do servidor");
		fireEvent.change(inputCPF, { target: { value: "12345678912" } });
		const valueCPF = screen.getByLabelText("CPF do servidor").value;
		expect(valueCPF === "12345678912").toBe(true);

		const inputServerPosition = screen.getByLabelText("Cargo do servidor");
		fireEvent.change(inputServerPosition, { target: { value: "Supervisor" } });
		const valueServerPosition =
			screen.getByLabelText("Cargo do servidor").value;
		expect(valueServerPosition === "Supervisor").toBe(true);

		const inputServerClass = screen.getByLabelText("Classe do servidor");
		fireEvent.change(inputServerClass, { target: { value: "Administrativo" } });
		const valueServerClass = screen.getByLabelText("Classe do servidor").value;
		expect(valueServerClass === "Administrativo").toBe(true);

		const inputServerStocking = screen.getByLabelText("Lotação do servidor");
		fireEvent.change(inputServerStocking, { target: { value: "Numérica" } });
		const valueServerStocking = screen.getByLabelText(
			"Lotação do servidor"
		).value;
		expect(valueServerStocking === "Numérica").toBe(true);

		const inputMunicipality = screen.getByLabelText("Município do servidor");
		fireEvent.change(inputMunicipality, { target: { value: "Abadiânia" } });
		const valueMunicipality = screen.getByLabelText(
			"Município do servidor"
		).value;
		expect(valueMunicipality === "Abadiânia").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}public_worker`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

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
