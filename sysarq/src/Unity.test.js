import React from "react";
import { render, screen } from "@testing-library/react";

import Unity from "./pages/FieldsRegister/Unity";

describe("Componente principal", () => {
	it("Título", () => {
		render(<Unity />);

		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});
});
