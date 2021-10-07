import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import Search from "../pages/Search";

describe("Main component", () => {
	it("Show page components", () => {
		render(<Search />);
		expect(
			screen.getByText("Arquivo Geral da Polícia Civil do Goiás")
		).toBeInTheDocument();
		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByText("Filtrar por:")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Pesquisar")).toBeInTheDocument();
	});
});

describe("Ensure that is receiving inputs form select and textfield", () => {
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

describe("Test onClick of status type searches", () => {
	it("onClickStatus test", () => {
		render(<Search />);

		const FilterSelect = screen.getByTestId("FilterSelect");
		fireEvent.change(FilterSelect, {
			target: { value: "is_filed/true" },
		});
		expect(screen.getByText("Arquivado")).toBeInTheDocument();
	});
});


const selectValue = (title) => {
	fireEvent.mouseDown(screen.getByLabelText("dropdown"));
	const subjectsOptions = within(screen.getByRole("listbox"));
	fireEvent.click(subjectsOptions.getByText(title));
};

const testEvent = async (object, findTextMsg) => {
	render(<Search />);
	selectValue(object[0]);
	inputChange(object[1], object[2]);
	fireEvent.click(screen.getByTestId("click"));
	await screen.findByText(findTextMsg);
	act(() => {
		jest.advanceTimersByTime(3000);
	});
};

describe("Axios requests", () => {
	it("axios fail", async () => {
		render(<Search />);
		fireEvent.click(screen.getByText("Ir"));
		await screen.findByText("Pesquise por algum valor");
	});
	it("axios fail", async () => {
		render(<Search />);
		const InputBox = screen.getByTestId("InputBox");
		fireEvent.change(InputBox, {
			target: { value: "asd" },
		});
		fireEvent.click(screen.getByText("Ir"));
		await screen.findByText("Selecione algum filtro");
	});
	it("axios success", async () => {
		render(<Search />);
		const InputBox = screen.getByTestId("InputBox");
		fireEvent.change(InputBox, {
			target: { value: "asd" },
		});
		fireEvent.mouseDown(screen.getByLabelText("Filtrar por:"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		fireEvent.click(subjectsOptions.getByText("Número de processo"));

		fireEvent.click(screen.getByText("Ir"));
		// await screen.findByText("Selecione algum filtro");
	});
});
