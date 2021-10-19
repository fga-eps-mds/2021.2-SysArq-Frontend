import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "../pages/components/Header";

describe("Main component", () => {
	it("Title", () => {
		render(<Header />);
		expect(screen.getAllByText("Pesquisar").length).toBe(2);
	});
});
