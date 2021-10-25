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
});
