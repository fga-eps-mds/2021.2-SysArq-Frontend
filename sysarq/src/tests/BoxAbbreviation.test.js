import React from "react";
import { render, screen } from "@testing-library/react";

import BoxAbbreviation from "../pages/FieldsRegister/BoxAbbreviation";

describe("Main component", () => {
	it("Title", () => {
		render(<BoxAbbreviation />);

		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});
});
