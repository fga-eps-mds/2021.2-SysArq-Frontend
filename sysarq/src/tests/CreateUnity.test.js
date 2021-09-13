import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateUnity from "../pages/FieldsRegister/CreateUnity";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});
});

describe("Ensure unit input fields exist", () => {
	it("Unit name, abbreviation, administrative bond, abbreviation bond, type unity, municipality, comments", () => {
		render(<CreateUnity />);

		expect(screen.getByText("Nome da unidade")).toBeInTheDocument();
		expect(screen.getByText("Sigla da unidade")).toBeInTheDocument();
		expect(screen.getByText("Vínculo administrativo")).toBeInTheDocument();
		expect(screen.getByText("Sigla do vínculo")).toBeInTheDocument();
		expect(screen.getByText("Tipo de unidade")).toBeInTheDocument();
		expect(screen.getByText("Município")).toBeInTheDocument();
		expect(screen.getByText("Número de telefone")).toBeInTheDocument();
		expect(screen.getByText("Observações")).toBeInTheDocument();

		const inputUnityName = screen.getByLabelText("Nome da unidade");
		fireEvent.change(inputUnityName, {
			target: { value: "20º Delegacia de Polícia" },
		});
		const valueUnityName = screen.getByLabelText("Nome da unidade").value;
		expect(valueUnityName === "20º Delegacia de Polícia").toBe(true);

		const inputBoxUnity = screen.getByLabelText("Sigla da unidade");
		fireEvent.change(inputBoxUnity, { target: { value: "20º DP" } });
		const valueBoxUnity = screen.getByLabelText("Sigla da unidade").value;
		expect(valueBoxUnity === "20º DP").toBe(true);

		const inputAdministrativeBond = screen.getByLabelText(
			"Vínculo administrativo"
		);
		fireEvent.change(inputAdministrativeBond, {
			target: { value: "Jurídico" },
		});
		const valueAdministrativeBond = screen.getByLabelText(
			"Vínculo administrativo"
		).value;
		expect(valueAdministrativeBond === "Jurídico").toBe(true);

		const inputAbbreviationBond = screen.getByLabelText("Sigla do vínculo");
		fireEvent.change(inputAbbreviationBond, { target: { value: "VJA" } });
		const valueAbbreviationBond =
			screen.getByLabelText("Sigla do vínculo").value;
		expect(valueAbbreviationBond === "VJA").toBe(true);

		const inputTypeUnity = screen.getByLabelText("Tipo de unidade");
		fireEvent.change(inputTypeUnity, { target: { value: "Administrativa" } });
		const valueTypeUnity = screen.getByLabelText("Tipo de unidade").value;
		expect(valueTypeUnity === "Administrativa").toBe(true);

		const inputMunicipality = screen.getByLabelText("Município");
		fireEvent.change(inputMunicipality, { target: { value: "Abadiânia" } });
		const valueMunicipality = screen.getByLabelText("Município").value;
		expect(valueMunicipality === "Abadiânia").toBe(true);

		const inputPhoneNumber = screen.getByLabelText("Número de telefone");
		fireEvent.change(inputPhoneNumber, { target: { value: "912398734" } });
		const valuePhoneNumber = screen.getByLabelText("Número de telefone").value;
		expect(valuePhoneNumber === "912398734").toBe(true);

		const inputComments = screen.getByLabelText("Observações");
		fireEvent.change(inputComments, { target: { value: "Testando" } });
		const valueComments = screen.getByLabelText("Observações").value;
		expect(valueComments === "Testando").toBe(true);
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}unity`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

		render(<CreateUnity />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({
				unity_name: "",
				unity_abbreviation: "",
				administrative_bond: "",
				bond_abbreviation: "",
				type_of_unity: "",
				telephone_number: "",
				county: "",
			})
		);
	});
});
