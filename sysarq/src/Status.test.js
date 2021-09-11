import React from "react";
import { render, screen } from "@testing-library/react";

import Status from "./pages/FieldsRegister/Status";

describe("Main component", () => {
	it("Title", () => {
		render(<Status />);

		expect(screen.getByText("Status de Encaminhamento")).toBeInTheDocument();
	});
});
