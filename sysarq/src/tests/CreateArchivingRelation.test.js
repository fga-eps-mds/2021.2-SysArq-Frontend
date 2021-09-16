import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import CreateArchivingRelation from '../pages/DocumentsRegister/CreateArchivingRelation';

const testArchivingRelation = (title, valueTest) => {
	expect(screen.getByPlaceholderText(title)).toBeInTheDocument();

	const input = screen.getByPlaceholderText(title);
	fireEvent.change(input, { target: { value: valueTest } });
	const value = screen.getByPlaceholderText(title).value;
	expect(value === valueTest).toBe(true);
};

describe('Main component', () => {
    it('Title', () => {
        render(<CreateArchivingRelation />);

        expect(screen.getByText("Arquivo Geral da Polícia Civil de Goiás")).toBeInTheDocument();
        expect(screen.getByText("Cadastrar documento")).toBeInTheDocument();
    });
});

describe('Ensure that the archiving relation input fields exist', () => {
    it('test', () => {
        render(<CreateArchivingRelation />);

        testArchivingRelation("Número do processo:*", "11");
    });
});