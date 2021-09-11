import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateUnity from "./pages/FieldsRegister/CreateUnity";
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
		const valorUnityName = screen.getByLabelText("Nome da unidade").value;
		expect(valorUnityName === "20º Delegacia de Polícia").toBe(true);

		const inputBoxUnity = screen.getByLabelText("Sigla da unidade");
		fireEvent.change(inputBoxUnity, { target: { value: "20º DP" } });
		const valorBoxUnity = screen.getByLabelText("Sigla da unidade").value;
		expect(valorBoxUnity === "20º DP").toBe(true);

		const inputAdministrativeBond = screen.getByLabelText(
			"Vínculo administrativo"
		);
		fireEvent.change(inputAdministrativeBond, {
			target: { value: "Jurídico" },
		});
		const valorAdministrativeBond = screen.getByLabelText(
			"Vínculo administrativo"
		).value;
		expect(valorAdministrativeBond === "Jurídico").toBe(true);

		const inputAbbreviationBond = screen.getByLabelText("Sigla do vínculo");
		fireEvent.change(inputAbbreviationBond, { target: { value: "VJA" } });
		const valorAbbreviationBond =
			screen.getByLabelText("Sigla do vínculo").value;
		expect(valorAbbreviationBond === "VJA").toBe(true);

		const inputTypeUnity = screen.getByLabelText("Tipo de unidade");
		fireEvent.change(inputTypeUnity, { target: { value: "Administrativa" } });
		const valorTypeUnity = screen.getByLabelText("Tipo de unidade").value;
		expect(valorTypeUnity === "Administrativa").toBe(true);

		const inputMunicipality = screen.getByLabelText("Município");
		fireEvent.change(inputMunicipality, { target: { value: "Abadiânia" } });
		const valorMunicipality = screen.getByLabelText("Município").value;
		expect(valorMunicipality === "Abadiânia").toBe(true);

		const inputPhoneNumber = screen.getByLabelText("Número de telefone");
		fireEvent.change(inputPhoneNumber, { target: { value: "912398734" } });
		const valorPhoneNumber = screen.getByLabelText("Número de telefone").value;
		expect(valorPhoneNumber === "912398734").toBe(true);

		const inputComments = screen.getByLabelText("Observações");
		fireEvent.change(inputComments, { target: { value: "Testando" } });
		const valorComments = screen.getByLabelText("Observações").value;
		expect(valorComments === "Testando").toBe(true);
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
