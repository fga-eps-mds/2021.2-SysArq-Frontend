import { render, screen } from "@testing-library/react";

import CreateBoxArchiving from "../../../../pages/Documents/Create/CreateBoxArchiving";

import { failedAbbreviationServer } from "../../../support/server";

beforeAll(() => failedAbbreviationServer.listen());
afterEach(() => failedAbbreviationServer.resetHandlers());
afterAll(() => failedAbbreviationServer.close());

describe("Abbreviation Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<CreateBoxArchiving />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
