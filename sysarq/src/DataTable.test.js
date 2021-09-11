import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, within } from "@testing-library/react";

import DataTable from "./pages/components/DataTable/DataTable";

const hostApi = `${process.env.REACT_APP_URL_API}document_subject`;

const server = setupServer(
	rest.get(hostApi, async (req, res, ctx) => {
		return res(
			ctx.json([
				{ id: 1, subject_name: "teste", temporality: 1 },
				{ id: 2, subject_name: "teste1", temporality: 1 },
				{ id: 3, subject_name: "teste2", temporality: 1 },
				{ id: 4, subject_name: "teste3", temporality: 1 },
				{ id: 5, subject_name: "teste4", temporality: 1 },
				{ id: 6, subject_name: "teste5", temporality: 1 },
				{ id: 7, subject_name: "teste6", temporality: 1 },
				{ id: 8, subject_name: "teste7", temporality: 1 },
				{ id: 9, subject_name: "teste8", temporality: 1 },
				{ id: 10, subject_name: "teste9", temporality: 1 },
				{ id: 11, subject_name: "teste10", temporality: 1 },
				{ id: 12, subject_name: "teste11", temporality: 1 },
			])
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("idk", () => {
	it("loads and displays greeting", async () => {
		render(<DataTable title="Assunto do documento" url="document_subject/" />);

		await screen.findByText("teste");

		fireEvent.click(screen.getByText("Nome do Assunto"));
		// verificar se o primeiro esta na tela

		fireEvent.click(screen.getByText("Nome do Assunto"));
		// verificar se o ultimo esta na tela

		expect(
			screen.getByRole("button", { name: /Previous page/ })
		).toBeDisabled();
		expect(
			screen.getByRole("button", { name: /Next page/ })
		).not.toBeDisabled();

		fireEvent.click(screen.getByRole("button", { name: /Next page/ }));

		expect(screen.getByRole("button", { name: /Next page/ })).toBeDisabled();
		expect(
			screen.getByRole("button", { name: /Previous page/ })
		).not.toBeDisabled();

		fireEvent.mouseDown(screen.getByRole("button", { name: /10/ }));
		const listbox = within(screen.getByRole("listbox"));
		fireEvent.click(listbox.getByText(/25/i));

		expect(screen.getByRole("button", { name: /25/ })).toHaveTextContent("25");

		// screen.debug()
	});
});
