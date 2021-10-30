import { render, screen } from "@testing-library/react";

import CreateBoxArchiving from "../../../../pages/Documents/Create/CreateBoxArchiving";

import { failedRackServer } from "../../../support/server";

beforeAll(() => failedRackServer.listen());
afterEach(() => failedRackServer.resetHandlers());
afterAll(() => failedRackServer.close());

describe("Rack Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<CreateBoxArchiving />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
