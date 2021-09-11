import React from "react";
import { render, screen } from "@testing-library/react";

import FrontCover from "./pages/FieldsRegister/FrontCover";

describe("Main component", () => {
	it("Title", () => {
		render(<FrontCover />);

		expect(
			screen.getByText("Capa de Rosto da Caixa para Impressão")
		).toBeInTheDocument();
	});
});
