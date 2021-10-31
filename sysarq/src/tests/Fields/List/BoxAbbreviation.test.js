import React from "react";
import { render, screen } from "@testing-library/react";

import BoxAbbreviation from "../../../pages/Fields/List/BoxAbbreviation";

describe("Main component", () => {
	it("Title", () => {
		render(<BoxAbbreviation />);

		expect(screen.getByText("Sigla")).toBeInTheDocument();
	});
});
