import React from "react";
import { render, screen } from "@testing-library/react";

import Shelf from "./pages/FieldsRegister/Shelf";

describe("Main component", () => {
	it("Title", () => {
		render(<Shelf />);

		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});
});
