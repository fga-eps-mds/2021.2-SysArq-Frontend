import React from "react";
import { render, screen } from "@testing-library/react";

import Fields from "../../pages/Fields";

describe("Documents Menu", () => {
	it("Documents MenuCards", () => {
		render(<Fields />);

		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
		expect(screen.getByText("Unidade")).toBeInTheDocument();
		expect(screen.getByText("Caixa")).toBeInTheDocument();
		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});
});
