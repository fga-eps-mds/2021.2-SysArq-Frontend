import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("Main component", () => {
	it("Show names in navigation bar", () => {
		render(<App />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Cadastro de Campos")).toBeInTheDocument();
	});
});
