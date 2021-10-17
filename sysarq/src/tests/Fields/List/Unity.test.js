import React from "react";
import { render, screen } from "@testing-library/react";

import Unity from "../../../pages/Fields/List/Unity";

describe("Main component", () => {
	it("Title", () => {
		render(<Unity />);

		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});
});
