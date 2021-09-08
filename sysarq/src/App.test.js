import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("Componente principal", () => {
	it("Mostrar os nomes na barra de navegação", () => {
		render(<App />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Cadastro de Campos")).toBeInTheDocument();
	});
});
