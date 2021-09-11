import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MenuCard from "./pages/components/MenuCard";

describe("Button test", () => {
	it("Document subject", () => {
		render(
			<MenuCard
				icon="icone-assunto"
				title="Assunto do Documento"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const clickDocumentSubject = screen.getByTestId("click-criar");
		expect(fireEvent.click(clickDocumentSubject)).toBe(true);
		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();

		const clickDocumentSubject1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(clickDocumentSubject1)).toBe(true);
		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
	});

	it("Box abbreviation", () => {
		render(
			<MenuCard
				icon="icone-sigla-da-caixa"
				title="Sigla da Caixa"
				createUrl="/create-document-subject"
				listUrl="/fields-register/document-subject"
			/>
		);

		const clickBoxAbbreviation = screen.getByTestId("click-criar");
		expect(fireEvent.click(clickBoxAbbreviation)).toBe(true);
		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();

		const clickBoxAbbreviation1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(clickBoxAbbreviation1)).toBe(true);
		expect(screen.getByText("Sigla da Caixa")).toBeInTheDocument();
	});

	it("Publick worker", () => {
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

		const click1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});

	it("Unity", () => {
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

		const click1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Unidade")).toBeInTheDocument();
	});

	it("Document type", () => {
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

		const click1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});

	it("Status", () => {
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

		const click1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	it("Shelf", () => {
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

		const click1 = screen.getByTestId("click-listar");
		expect(fireEvent.click(click)).toBe(true);
		expect(screen.getByText("Estante e Prateleira")).toBeInTheDocument();
	});
});
