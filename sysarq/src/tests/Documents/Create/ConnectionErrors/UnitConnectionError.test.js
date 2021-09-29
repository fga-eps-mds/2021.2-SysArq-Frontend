import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";

import { failedUnitServer } from "../../../support/server";

beforeAll(() => failedUnitServer.listen());
afterEach(() => failedUnitServer.resetHandlers());
afterAll(() => failedUnitServer.close());

describe("Unit Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<CreateAdministrativeProcess />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
