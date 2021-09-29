import { render, screen } from "@testing-library/react";

import CreateFrequencyRelation from "../../../../pages/Documents/Create/CreateFrequencyRelation";

import { failedDocumentTypeServer } from "../../../support/server";

beforeAll(() => failedDocumentTypeServer.listen());
afterEach(() => failedDocumentTypeServer.resetHandlers());
afterAll(() => failedDocumentTypeServer.close());

describe("DocumentType Connection Error Test", () => {
    it("connectionError test", async () => {
        render(<CreateFrequencyRelation />);

        const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
    });
});
