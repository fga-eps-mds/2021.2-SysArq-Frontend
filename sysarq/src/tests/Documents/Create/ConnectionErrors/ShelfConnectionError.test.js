import { render, screen } from "@testing-library/react";

import CreateBoxArchiving from "../../../../pages/Documents/Create/CreateBoxArchiving";

import { failedShelfServer } from "../../../support/server";

beforeAll(() => failedShelfServer.listen());
afterEach(() => failedShelfServer.resetHandlers());
afterAll(() => failedShelfServer.close());

describe("Shelf Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<CreateBoxArchiving />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
