import React from "react";
import { render, screen } from "@testing-library/react";

import PublicWorker from "./pages/FieldsRegister/PublicWorker";

describe("Componente principal", () => {
	it("Título", () => {
		render(<PublicWorker />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});
});
