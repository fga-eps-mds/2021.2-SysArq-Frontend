import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";

import Search from "../pages/Search";

describe("Main component", () => {
	it("Show page components", () => {
		render(<Search />);
		expect(
			screen.getByText("Arquivo Geral da Polícia Civil de Goiás")
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

const testSelect = (value) => {
	render(<Search />);
	const InputBox = screen.getByTestId("InputBox");
	fireEvent.change(InputBox, {
		target: { value: "asd" },
	});

	fireEvent.mouseDown(screen.getByLabelText("Filtrar por:"));
	const subjectsOptions = within(screen.getByRole("listbox"));
	fireEvent.click(subjectsOptions.getByText(value));

	fireEvent.click(screen.getByText("Ir"));
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
		testSelect("Número de processo");
	});
	it("filed test", async () => {
		testSelect("Arquivado");
	});
	it("unfiled test", async () => {
		testSelect("Desarquivado");
	});
	it("eliminated test", async () => {
		testSelect("Assunto do documento");
	});
	it("filed test", async () => {
		testSelect("Tipo do documento");
	});
	it("unfiled test", async () => {
		testSelect("Interessado");
	});
	it("eliminated test", async () => {
		testSelect("Servidor");
	});
	it("filed test", async () => {
		testSelect("Servidor que encaminhou");
	});
	it("unfiled test", async () => {
		testSelect("Unidade que encaminhou");
	});
	it("eliminated test", async () => {
		testSelect("Temporalidade");
	});
	it("eliminated test", async () => {
		testSelect("Caixa");
	});
	it("eliminated test", async () => {
		testSelect("Estante");
	});

	it("test handleCLick", async () => {
		render(<Search />);

		fireEvent.mouseDown(screen.getByLabelText("Filtrar por:"));
		const searchOptions = within(screen.getByRole("listbox"));
		fireEvent.click(searchOptions.getByText("Eliminado"));

		fireEvent.mouseDown(screen.getAllByLabelText("Filtrar por:")[0]);
		const searchOptions1 = within(screen.getByRole("listbox"));
		fireEvent.click(searchOptions1.getByText("Estante"));
	});
});
