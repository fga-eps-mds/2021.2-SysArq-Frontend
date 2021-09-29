import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";

import { failedShelfServer } from "../../../support/server";

beforeAll(() => failedShelfServer.listen());
afterEach(() => failedShelfServer.resetHandlers());
afterAll(() => failedShelfServer.close());

describe("Shelf Connection Error Test", () => {
    it("connectionError test", async () => {
        render(<CreateAdministrativeProcess />);

        const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
    });
});
