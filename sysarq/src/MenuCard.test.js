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
});
