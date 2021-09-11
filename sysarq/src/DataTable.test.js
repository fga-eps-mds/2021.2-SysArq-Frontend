import React from "react";
import { render, screen, fireEvent, shallow } from "@testing-library/react";
// import { shallow } from 'enzyme';

import DataTable from "./pages/components/DataTable/DataTable";
import axios from 'axios';

describe("Componente principal", () => {
	it("Informações da tabela de listagem do assunto do documento", () => {
		render(<DataTable title="Assunto do documento" url="document_subject/" />);

		expect(screen.getByText("Nome do Assunto")).toBeInTheDocument();
		expect(screen.getByText("Temporalidade")).toBeInTheDocument();
	});

	it("Existir botão de adicionar assunto do documento", () => {
		render(<DataTable title="Assunto do documento" url="document_subject/" />);

		const botaoAdicionar = screen.getByTestId("botao-adicionar");
		expect(fireEvent.click(botaoAdicionar)).toBe(true);
	});

	
});