import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";

import { failedRackServer } from "../../../support/server";

beforeAll(() => failedRackServer.listen());
afterEach(() => failedRackServer.resetHandlers());
afterAll(() => failedRackServer.close());

describe("Rack Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<CreateAdministrativeProcess />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("localstorage test", async () => {
		localStorage.setItem("tkr", 401);
		render(<CreateAdministrativeProcess />);
		await screen.findByText("Processo Administrativo");
	});

	it("localstorage2 test", async () => {
		localStorage.setItem("tkr", 404);
		render(<CreateAdministrativeProcess />);
		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
