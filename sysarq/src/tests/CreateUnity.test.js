import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateUnity from "../pages/FieldsRegister/CreateUnity";
import { rest } from "msw";
import { setupServer } from "msw/node";


const hostApi = `${process.env.REACT_APP_URL_API}unity/`;

const server = setupServer(
	rest.post(hostApi, (req, res, ctx) => {
		if (req.body.unity_name === '20º Delegacia de Polícia') {
			return res(
				ctx.status(201),
			)
		} else {
			return res(
				ctx.status(404)
			)
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();


// describe("Render Test", () => {
// 	it("test component rendering", () => {
// 		render(<CreateUnity />);
		
// 		expect(screen.getByText("Cadastrar Unidade")).toBeInTheDocument();
// 		expect(screen.getByText("Nome da unidade")).toBeInTheDocument();
// 		expect(screen.getByText("Sigla da unidade")).toBeInTheDocument();
// 		expect(screen.getByText("Vínculo administrativo")).toBeInTheDocument();
// 		expect(screen.getByText("Sigla do vínculo")).toBeInTheDocument();
// 		expect(screen.getByText("Tipo de unidade")).toBeInTheDocument();
// 		expect(screen.getByText("Município")).toBeInTheDocument();
// 		expect(screen.getByText("Telefone")).toBeInTheDocument();
// 		expect(screen.getByText("Observações")).toBeInTheDocument();

// 	});
// });

describe("Button test", () => {
	it("axios success", async () => {
		render(<CreateUnity />);

		const inputUnityName = screen.getByLabelText("Nome da unidade");
		fireEvent.change(inputUnityName, {
			target: { value: "20º Delegacia de Polícia" },
		});

		const inputBoxUnity = screen.getByLabelText("Sigla da unidade");
		fireEvent.change(inputBoxUnity, { target: { value: "20º DP" } });

		const inputAdministrativeBond = screen.getByLabelText(
			"Vínculo administrativo"
		);
		fireEvent.change(inputAdministrativeBond, {
			target: { value: "Jurídico" },
		});

		const inputAbbreviationBond = screen.getByLabelText("Sigla do vínculo");
		fireEvent.change(inputAbbreviationBond, { target: { value: "VJA" } });

		const inputTypeUnity = screen.getByLabelText("Tipo de unidade");
		fireEvent.change(inputTypeUnity, { target: { value: "Administrativa" } });

		const inputMunicipality = screen.getByLabelText("Município");
		fireEvent.change(inputMunicipality, { target: { value: "Abadiânia" } });

		const inputPhoneNumber = screen.getByLabelText("Telefone");
		fireEvent.change(inputPhoneNumber, { target: { value: "912398734" } });

		const inputComments = screen.getByLabelText("Observações");
		fireEvent.change(inputComments, { target: { value: "Testando" } });


		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		await (screen.findByText("Campo cadastrado!"));
		act(() => {
			jest.advanceTimersByTime(3000);
		})
	});

	// it("axios fail", async () => {
	// 	render(<CreateUnity />);

	// 	const inputUnityName = screen.getByLabelText("Nome da unidade");
	// 	fireEvent.change(inputUnityName, {
	// 		target: { value: "fail" },
	// 	});

	// 	const inputBoxUnity = screen.getByLabelText("Sigla da unidade");
	// 	fireEvent.change(inputBoxUnity, { target: { value: "20º DP" } });

	// 	const inputAdministrativeBond = screen.getByLabelText(
	// 		"Vínculo administrativo"
	// 	);
	// 	fireEvent.change(inputAdministrativeBond, {
	// 		target: { value: "Jurídico" },
	// 	});

	// 	const inputAbbreviationBond = screen.getByLabelText("Sigla do vínculo");
	// 	fireEvent.change(inputAbbreviationBond, { target: { value: "VJA" } });

	// 	const inputTypeUnity = screen.getByLabelText("Tipo de unidade");
	// 	fireEvent.change(inputTypeUnity, { target: { value: "Administrativa" } });

	// 	const inputMunicipality = screen.getByLabelText("Município");
	// 	fireEvent.change(inputMunicipality, { target: { value: "Abadiânia" } });

	// 	const inputPhoneNumber = screen.getByLabelText("Telefone");
	// 	fireEvent.change(inputPhoneNumber, { target: { value: "912398734" } });

	// 	const inputComments = screen.getByLabelText("Observações");
	// 	fireEvent.change(inputComments, { target: { value: "Testando" } });


	// 	const click = screen.getByTestId("click");
	// 	expect(fireEvent.click(click)).toBe(true);

	// 	await (screen.findByText("Erro de conexão!"));
	// 	act(() => {
	// 		jest.advanceTimersByTime(3000);
	// 	})
	// });
});
