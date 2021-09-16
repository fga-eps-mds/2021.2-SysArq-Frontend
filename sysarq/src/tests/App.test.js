import React from "react";
import { render, screen } from "@testing-library/react";

import App from "../App";

describe("Main component", () => {
	it("Show names in navigation bar", () => {
		render(<App />);

		expect(screen.getByText("Pesquisar")).toBeInTheDocument();
		expect(screen.getByText("Campos")).toBeInTheDocument();
		expect(screen.getByText("Cadastro")).toBeInTheDocument();
		expect(screen.getByText("Configurações")).toBeInTheDocument();
		expect(screen.getByText("Relatório")).toBeInTheDocument();
	});
}); 