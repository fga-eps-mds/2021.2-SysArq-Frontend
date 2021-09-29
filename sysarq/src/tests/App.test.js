import React from "react";
import { render, screen } from "@testing-library/react";

import App from "../App";

describe("Main component", () => {
	it("Show names in navigation bar", () => {
		render(<App />);

		screen.findByText("Pesquisar");
		screen.findByText("Campos");
		screen.findByText("Cadastro");
		screen.findByText("Configurações");
		screen.findByText("Relatório");
	});
});
