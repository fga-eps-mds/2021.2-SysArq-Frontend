import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import DataTable from "./pages/components/DataTable/DataTable";

describe("Componente principal", () => {
	it("Informações da tabela de listagem", () => {
		render(<DataTable title="Assunto do documento" url="document_subject/" />);

		expect(screen.getByText("Nome do Assunto")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();
	});

	it("Existir botão de adicionar", () => {
		render(<DataTable title="Assunto do documento" url="document_subject/" />);

		const botaoAdicionar = screen.getByTestId("botao-adicionar");
		expect(fireEvent.click(botaoAdicionar)).toBe(true);
	});
});
