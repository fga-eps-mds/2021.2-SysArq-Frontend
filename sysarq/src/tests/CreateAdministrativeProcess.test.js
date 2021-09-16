import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import CreateAdministrativeProcess from '../pages/DocumentsRegister/CreateAdministrativeProcess';

const testAdministrativeProcess = (title, valueTest) => {
	expect(screen.getByPlaceholderText(title)).toBeInTheDocument();

	const input = screen.getByPlaceholderText(title);
	fireEvent.change(input, { target: { value: valueTest } });
	const value = screen.getByPlaceholderText(title).value;
	expect(value === valueTest).toBe(true);
};

describe('Main component', () => {
    it('Title', () => {
        render(<CreateAdministrativeProcess />);

        expect(screen.getByText("Arquivo Geral da Polícia Civil de Goiás")).toBeInTheDocument();
        expect(screen.getByText("Cadastrar documento")).toBeInTheDocument();
    });
});

describe('Ensure that the administrative process input fields exist', () => {
    it('test', () => {
        render(<CreateAdministrativeProcess />);

        testAdministrativeProcess("Número do processo:*", "7");
    });
});