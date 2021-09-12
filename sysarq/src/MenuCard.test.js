import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MenuCard from "./pages/components/MenuCard";

const renderMenuCard = (icon, title, createUrl, listUrl) => {
	render(
		<MenuCard
			icon={icon}
			title={title}
			createUrl={createUrl}
			listUrl={listUrl}
		/>
	);
};

const testClick = (testText) => {
	const clickCreate = screen.getByTestId("click-criar");
	expect(fireEvent.click(clickCreate)).toBe(true);
	expect(screen.getByText(testText)).toBeInTheDocument();

	const clickList = screen.getByTestId("click-listar");
	expect(fireEvent.click(clickList)).toBe(true);
	expect(screen.getByText(testText)).toBeInTheDocument();
};

describe("Button test", () => {
	it("Document subject", () => {
		renderMenuCard(
			"icone-assunto",
			"Assunto do Documento",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Assunto do Documento");
	});

	it("Box abbreviation", () => {
		renderMenuCard(
			"icone-sigla-da-caixa",
			"Sigla da Caixa",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Sigla da Caixa");
	});

	it("Publick worker", () => {
		renderMenuCard(
			"icone-servidor",
			"Servidor",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Servidor");
	});

	it("Unity", () => {
		renderMenuCard(
			"icone-unidade",
			"Unidade",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Unidade");
	});

	it("Document type", () => {
		renderMenuCard(
			"icone-tipo-de-documento",
			"Tipo de Documento",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Tipo de Documento");
	});

	it("Status", () => {
		renderMenuCard(
			"icone-status",
			"Status",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Status");
	});

	it("Shelf", () => {
		renderMenuCard(
			"icone-estante-prateleira",
			"Estante e Prateleira",
			"/create-document-subject",
			"/fields-register/document-subject"
		);

		testClick("Estante e Prateleira");
	});
});
