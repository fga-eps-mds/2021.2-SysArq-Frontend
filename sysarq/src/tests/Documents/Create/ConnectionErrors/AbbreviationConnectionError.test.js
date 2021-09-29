import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";

import { failedAbbreviationServer } from "../../../support/server";

beforeAll(() => failedAbbreviationServer.listen());
afterEach(() => failedAbbreviationServer.resetHandlers());
afterAll(() => failedAbbreviationServer.close());

describe("Abbreviation Connection Error Test", () => {
    it("connectionError test", async () => {
        render(<CreateAdministrativeProcess />);

        const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
    });
});
