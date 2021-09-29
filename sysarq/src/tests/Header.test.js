import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Header from "../pages/components/Header";

const renderHeader = (label, href, icon) => {
	render(<Header icon={icon} label={label} href={href} />);
};

const obj = [
	{
		label: "Pesquisar",
		href: "/",
	},
	{
		label: "Campos",
		href: "/fields-register",
	},
	{
		label: "Cadastro",
		href: "/documents-register",
	},
	{
		label: "Configurações",
		href: "/",
	},
	{
		label: "Relatório",
		href: "#",
	},
];

const testClick = (testText) => {
	const click = screen.getByTestId("click");
	expect(fireEvent.click(click)).toBe(true);
	expect(screen.getByText(testText)).toBeInTheDocument();
};

describe("Button test", () => {
	obj.forEach((element) => {
		it(element.href, () => {
			renderHeader(element.icon, element.href, element.label);
			testClick(element.label); //fazer o testClick
		});
	});
});

describe("Ensure that the input dropdown exist", () => {
	it("checkbox input", () => {
		render(<Header />);

		expect(screen.getByTestId("bt_menu")).toBeInTheDocument();

		const inputDropdown = screen.getByTestId("bt_menu");
		fireEvent.change(inputDropdown, { target: { value: true } });
		const valueInputDropdown = screen.getByTestId("bt_menu").value;
		expect(valueInputDropdown === true).toBe(true);
	});
});
