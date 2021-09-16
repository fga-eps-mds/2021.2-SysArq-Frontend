import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import CreateFrequencyRelation from '../pages/DocumentsRegister/CreateFrequencyRelation';

const testFrequencyRelation = (title, valueTest) => {
	expect(screen.getByPlaceholderText(title)).toBeInTheDocument();

	const input = screen.getByPlaceholderText(title);
	fireEvent.change(input, { target: { value: valueTest } });
	const value = screen.getByPlaceholderText(title).value;
	expect(value === valueTest).toBe(true);
};

describe('Main component', () => {
    it('Title', () => {
        render(<CreateFrequencyRelation />);

        expect(screen.getByText("Arquivo Geral da Polícia Civil de Goiás")).toBeInTheDocument();
        expect(screen.getByText("Cadastrar documento")).toBeInTheDocument();
    });
});

describe('Ensure that the frequency relation input fields exist', () => {
    it('test', () => {
        render(<CreateFrequencyRelation />);

        testFrequencyRelation("Número do processo:*", "21");
    });
});