import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MenuCard from "./pages/components/MenuCard";

describe("Button test", () => {
	it("Save button", () => {
		render(
			<MenuCard
				icon="icone-assunto"
				title="Assunto do Documento"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
	});

	it("List button", () => {
		render(
			<MenuCard
				icon="icone-assunto"
				title="Assunto do Documento"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
	});

	it("Save abbreviation button", () => {
		render(
			<MenuCard
				icon="icone-sigla-da-caixa"
				title="Sigla da Caixa"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});

	it("Abbreviation list button", () => {
		render(
			<MenuCard
				icon="icone-sigla-da-caixa"
				title="Sigla da Caixa"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});

	it("Save server button", () => {
		render(
			<MenuCard
				icon="icone-servidor"
				title="Servidor"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});

	it("List server button", () => {
		render(
			<MenuCard
				icon="icone-servidor"
				title="Servidor"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});

	it("Unit save button", () => {
		render(
			<MenuCard
				icon="icone-unidade"
				title="Unidade"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});

	it("List unit button", () => {
		render(
			<MenuCard
				icon="icone-servidor"
				title="Unidade"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});

	it("Save document type button", () => {
		render(
			<MenuCard
				icon="icone-tipo-de-documento"
				title="Tipo de Documento"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});

	it("List Document Type Button", () => {
		render(
			<MenuCard
				icon="icone-tipo-de-documento"
				title="Tipo de Documento"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});

	it("Save status button", () => {
		render(
			<MenuCard
				icon="icone-status"
				title="Status"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	it("List status button", () => {
		render(
			<MenuCard
				icon="icone-status"
				title="Status"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	it("Bookshelf and shelf save button", () => {
		render(
			<MenuCard
				icon="icone-estante-prateleira"
				title="Estante e Prateleira"
				createUrl="/create-shelf"
				listUrl="/fields-register/shelf"
			/>
		);

		const click = screen.getByTestId("click-criar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});

	it("List shelf and shelf button", () => {
		render(
			<MenuCard
				icon="icone-estante-prateleira"
				title="Estante e Prateleira"
				createUrl="/create-shelf"
				listUrl="/fields-register/shelf"
			/>
		);

		const click = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});
});
