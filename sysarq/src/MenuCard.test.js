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

const obj = [
	{
		icon: "icone-assunto",
		title: "Assunto do Documento",
		createUrl: "/create-document-subject",
		listUrl: "/fields-register/document-subject",
	},
	{
		icon: "icone-sigla-da-caixa",
		title: "Sigla da Caixa",
		createUrl: "/create-box-abbreviation",
		listUrl: "/fields-register/box-abbreviation",
	},
	{
		icon: "icone-servidor",
		title: "Servidor",
		createUrl: "/create-public-worker",
		listUrl: "/fields-register/public-worker",
	},
	{
		icon: "icone-unidade",
		title: "Unidade",
		createUrl: "/create-unity",
		listUrl: "/fields-register/unity",
	},
	{
		icon: "icone-tipo-de-documento",
		title: "Tipo de Documento",
		createUrl: "/create-document-type",
		listUrl: "/fields-register/document-type",
	},
	{
		icon: "icone-status",
		title: "Status",
		createUrl: "/create-status",
		listUrl: "/fields-register/status",
	},
	{
		icon: "icone-estante-prateleira",
		title: "Estante e Prateleira",
		createUrl: "/create-shelf",
		listUrl: "/fields-register/shelf",
	},
];
describe("Button test", () => {
	obj.forEach((element) => {
		it(element.icon, () => {
			renderMenuCard(
				element.icon,
				element.title,
				element.createUrl,
				element.listUrl
			);
			testClick(element.title);
		});
	});
});
