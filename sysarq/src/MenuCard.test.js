import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MenuCard from "./pages/components/MenuCard";

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
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

	it("Botão de listar", () => {
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

	it("Botão de salvar sigla", () => {
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

	it("Botão de listar sigla", () => {
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

	it("Botão de salvar servidor", () => {
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

	it("Botão de listar servidor", () => {
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

	it("Botão de salvar unidade", () => {
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

	it("Botão de listar unidade", () => {
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

	it("Botão de salvar tipo de documento", () => {
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

	it("Botão de listar tipo de documento", () => {
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

	it("Botão de salvar status", () => {
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

	it("Botão de listar status", () => {
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

	it("Botão de salvar estante e prateleira", () => {
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

	it("Botão de listar estante e prateleira", () => {
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
