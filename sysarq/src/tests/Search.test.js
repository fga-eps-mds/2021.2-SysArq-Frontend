import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Search from "../pages/Search";

describe("Main component", () => {
	it("Show page components", () => {
		render(<Search />);
		expect(
			screen.getByText("Arquivo Geral da Polícia Civil do Goiás")
		).toBeInTheDocument();
		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByText("Filtrar por:")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Pesquisar:")).toBeInTheDocument();
	});
});

describe("Ensure that is reciveing inputs form select and textfield", () => {
	it("Url Generation", () => {
		render(<Search />);

		expect(screen.getByTestId("InputBox"));

		const InputBox = screen.getByTestId("InputBox");
		fireEvent.change(InputBox, {
			target: { value: "1" },
		});

		const FilterSelect = screen.getByTestId("FilterSelect");
		fireEvent.change(FilterSelect, {
			target: { value: "process_number" },
		});
	});
});
