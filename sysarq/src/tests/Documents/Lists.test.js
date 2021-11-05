import React from "react";
import { render, screen } from "@testing-library/react";

import AdministrativeProcess from "../../pages/Documents/List/AdministrativeProcess";
import FrequencyRelation from "../../pages/Documents/List/FrequencyRelation";
import FrequencySheet from "../../pages/Documents/List/FrequencySheet";
import BoxArchiving from "../../pages/Documents/List/BoxArchiving";


describe("Documents Lists", () => {
	it("AdministrativeProcess List", () => {
		render(<AdministrativeProcess />);

		expect(screen.getByText("Número do Processo")).toBeInTheDocument();
        expect(screen.getByText("Data de Autuação")).toBeInTheDocument();
        expect(screen.getByText("Interessado")).toBeInTheDocument();
        expect(screen.getByText("Assunto")).toBeInTheDocument();
	});

	it("FrequencyRelation List", () => {
		render(<FrequencyRelation />);

		expect(screen.getByText("Número do Processo")).toBeInTheDocument();
        expect(screen.getByText("Data do Documento")).toBeInTheDocument();
        expect(screen.getByText("Data de Recebimento")).toBeInTheDocument();
        expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});

	it("FrequencySheet List", () => {
		render(<FrequencySheet />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
        expect(screen.getByText("CPF")).toBeInTheDocument();
        expect(screen.getByText("Cargo")).toBeInTheDocument();
        expect(screen.getByText("Período de Referência")).toBeInTheDocument();
	});

    it("BoxArchiving List", () => {
		render(<BoxArchiving />);

		expect(screen.getByText("Número do Processo")).toBeInTheDocument();
        expect(screen.getByText("Data de Recebimento")).toBeInTheDocument();
        expect(screen.getByText("Unidade que Encaminhou")).toBeInTheDocument();
        expect(screen.getByText("Tipos do Documento")).toBeInTheDocument();
	});
});
