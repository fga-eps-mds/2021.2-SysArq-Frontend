import React from "react";
import { render, screen } from "@testing-library/react";

import Documents from "../../pages/Documents";

describe("Documents Menu", () => {
	it("Documents MenuCards", () => {
		render(<Documents />);

		expect(screen.getByText("Processo Administrativo")).toBeInTheDocument();
		expect(screen.getByText("Relação de Frequências")).toBeInTheDocument();
		expect(screen.getByText("Folha de Frequências")).toBeInTheDocument();
		expect(screen.getByText("Relação de Arquivamento")).toBeInTheDocument();
	});
});
