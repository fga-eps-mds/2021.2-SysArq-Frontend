import React from "react";
import { render, screen } from "@testing-library/react";

import FrequencyDocument from "../pages/DocumentsRegister/FrequencyDocument";

describe("Main component", () => {
	it("Title", () => {
		render(<FrequencyDocument />);

		expect(screen.getByText("Folha de Frequências")).toBeInTheDocument();
	});
});
