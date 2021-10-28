import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";
import CreateArchivingRelation from "../../../../pages/Documents/Create/CreateArchivingRelation";
import CreateFrequencyRelation from "../../../../pages/Documents/Create/CreateFrequencyRelation";
import CreateFrequencySheet from "../../../../pages/Documents/Create/CreateFrequencySheet";

import { server } from "../../../support/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Auth Connection Error Test", () => {
	it("wrong token in CreateAdministrativeProcess", async () => {
		localStorage.setItem("tkr", 401);
		render(<CreateAdministrativeProcess />);
		await screen.findByText("Processo Administrativo");
	});

	it("connectionError in CreateAdministrativeProcess", async () => {
		localStorage.setItem("tkr", 404);
		render(<CreateAdministrativeProcess />);
		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("wrong token in CreateArchivingRelation", async () => {
		localStorage.setItem("tkr", 401);
		render(<CreateArchivingRelation />);
		await screen.findByText("Arquivamento de Caixas");
	});

	it("connectionError in CreateArchivingRelation", async () => {
		localStorage.setItem("tkr", 404);
		render(<CreateArchivingRelation />);
		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("wrong token in CreateFrequencyRelation", async () => {
		localStorage.setItem("tkr", 401);
		render(<CreateFrequencyRelation />);
		await screen.findByText("Relação de Frequências");
	});

	it("connectionError in CreateFrequencyRelation", async () => {
		localStorage.setItem("tkr", 404);
		render(<CreateFrequencyRelation />);
		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("wrong token in CreateFrequencySheet", async () => {
		localStorage.setItem("tkr", 401);
		render(<CreateFrequencySheet />);
		await screen.findByText("Folha de Frequências");
	});

	it("connectionError in CreateFrequencySheet", async () => {
		localStorage.setItem("tkr", 404);
		render(<CreateFrequencySheet />);
		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
