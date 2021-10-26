import React from "react";
import { render, screen } from "@testing-library/react";

import Rack from "../../../pages/Fields/List/Rack";

describe("Main component", () => {
	it("Title", () => {
		render(<Rack />);

		expect(screen.getByText("Prateleira e Estante")).toBeInTheDocument();
	});
});
