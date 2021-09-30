import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";
import CreateFrequencyRelation from "../../../../pages/Documents/Create/CreateFrequencyRelation";
import CreateArchivingRelation from "../../../../pages/Documents/Create/CreateArchivingRelation";

import { failedUnitServer } from "../../../support/server";

beforeAll(() => failedUnitServer.listen());
afterEach(() => failedUnitServer.resetHandlers());
afterAll(() => failedUnitServer.close());

describe("Unit Connection Error Test", () => {
	it("CreateAdministrativeProcess connectionError test", async () => {
		render(<CreateAdministrativeProcess />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("CreateFrequencyRelation connectionError test", async () => {
		render(<CreateFrequencyRelation />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("CreateArchivingRelation connectionError test", async () => {
		render(<CreateArchivingRelation />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
