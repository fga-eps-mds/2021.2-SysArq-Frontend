import React from "react";
import { render, screen } from "@testing-library/react";

import Search from "../pages/Search";

const testType = (title, valueTest) => {
	expect(screen.getByLabelText(title)).toBeInTheDocument();

	const input = screen.getByLabelText(title);
	fireEvent.change(input, { target: { value: valueTest } });
	const value = screen.getByLabelText(title).value;
	expect(value === valueTest).toBe(true);
};

describe("Main component", () => {
	it("Show page components", () => {
		render(<Search />);
		expect(screen.getByText("Arquivo Geral da Polícia Civil do Goiás")).toBeInTheDocument();
        expect(screen.getByAltText("Logo")).toBeInTheDocument();
        testType("Pesquisa", "teste");
	});
});
