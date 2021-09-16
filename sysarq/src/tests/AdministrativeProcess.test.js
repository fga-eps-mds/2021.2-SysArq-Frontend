import React from "react";
import { render, screen } from "@testing-library/react";

import AdministrativeProcess from "../pages/DocumentsRegister/AdministrativeProcess";

describe("Main component", () => {
	it("Title", () => {
		render(<AdministrativeProcess />);

		expect(screen.getByText("Processos Administrativos")).toBeInTheDocument();
	});
});
