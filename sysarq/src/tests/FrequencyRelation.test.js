import React from "react";
import { render, screen } from "@testing-library/react";

import FrequencyRelation from "../pages/DocumentsRegister/FrequencyRelation";

describe("Main component", () => {
	it("Title", () => {
		render(<FrequencyRelation />);

		expect(screen.getByText("Relação de Frequência")).toBeInTheDocument();
	});
});
