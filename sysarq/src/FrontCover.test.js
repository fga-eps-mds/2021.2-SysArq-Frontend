import React from "react";
import { render, screen } from "@testing-library/react";

import FrontCover from "./pages/FieldsRegister/FrontCover";

describe("Componente principal", () => {
	it("Título", () => {
		render(<FrontCover />);

		expect(
			screen.getByText("Capa de Rosto da Caixa para Impressão")
		).toBeInTheDocument();
	});
});
