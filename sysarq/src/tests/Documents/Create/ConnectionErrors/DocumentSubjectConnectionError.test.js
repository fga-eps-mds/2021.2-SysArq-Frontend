import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";

import { failedDocumentSubjectServer } from "../../../support/server";

beforeAll(() => failedDocumentSubjectServer.listen());
afterEach(() => failedDocumentSubjectServer.resetHandlers());
afterAll(() => failedDocumentSubjectServer.close());

describe("DocumentSubject Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<CreateAdministrativeProcess />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
