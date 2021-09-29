import React from "react";
import { render, screen } from "@testing-library/react";

import Search from "../pages/Search";


describe("Main component", () => {
	it("Show page components", () => {
		render(<Search />);
		expect(screen.getByText("Arquivo Geral da Polícia Civil do Goiás")
		).toBeInTheDocument();
		expect(screen.getByAltText("Logo")).toBeInTheDocument();
        expect(screen.getByText("Filtrar por:")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Pesquisar:")).toBeInTheDocument();

	});
});
