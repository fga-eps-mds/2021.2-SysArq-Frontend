import { render, screen, fireEvent } from "@testing-library/react";

import DataTable from "../../pages/components/DataTable";

import { failedDocumentTypeServer } from "../support/server";

beforeAll(() => failedDocumentTypeServer.listen());
afterEach(() => failedDocumentTypeServer.resetHandlers());
afterAll(() => failedDocumentTypeServer.close());

describe("DataTable Connection Error Test", () => {
	it("connectionError test", async () => {
		render(<DataTable title="Tipo de Documento" url="document-type/" />);

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);

		fireEvent.click(screen.getByRole("button", { name: /Fechar/ }));
	});
});
