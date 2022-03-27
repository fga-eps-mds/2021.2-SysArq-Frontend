import { render, screen, fireEvent } from "@testing-library/react";

import DataTable from "../../../pages/components/DataTable";

import { failedDocumentTypeServer } from "../../support/server";

beforeAll(() => failedDocumentTypeServer.listen());
afterEach(() => failedDocumentTypeServer.resetHandlers());
afterAll(() => failedDocumentTypeServer.close());

describe("DataTable Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<DataTable title="Tipo de Documento" url="document-name/" />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);

		fireEvent.click(screen.getByRole("button", { name: /Close/ }));
	});

	it("wrong token test", async () => {
		localStorage.setItem("tkr", 401);
		render(<DataTable title="Tipo de Documento" url="document-name/" />);
		await screen.findByText("Tipo de Documento");
	});

	it("refreshToken connectionError test", async () => {
		localStorage.setItem("tkr", 404);

		render(<DataTable title="Tipo de Documento" url="document-name/" />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
