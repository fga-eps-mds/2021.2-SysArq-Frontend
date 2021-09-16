import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import CreateFrequencyDocument from '../pages/DocumentsRegister/CreateFrequencyDocument';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const testFrequencyDocument = (title, valueTest) => {
	expect(screen.getByPlaceholderText(title)).toBeInTheDocument();

	const input = screen.getByPlaceholderText(title);
	fireEvent.change(input, { target: { value: valueTest } });
	const value = screen.getByPlaceholderText(title).value;
	expect(value === valueTest).toBe(true);
};

describe('Main component', () => {
    it('Title', () => {
        render(<CreateFrequencyDocument />);

        expect(screen.getByText("Arquivo Geral da Polícia Civil de Goiás")).toBeInTheDocument();
        expect(screen.getByText("Cadastrar documento")).toBeInTheDocument();
    });
});

describe('Ensure that the frequency document input fields exist', () => {
    it('test', () => {
        render(<CreateFrequencyDocument />);

        testFrequencyDocument("Nome do servidor:*", "João");
    });
});

const hostApi = `${process.env.REACT_APP_URL_API}administrative_process`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

		render(<CreateFrequencyDocument />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({ person_name: 0, cpf: "", role: "", category: "", workplace: "", municipal_area: "", notes: "", process_number: "", reference_period: "", abbreviation_id: "", shelf_id: 0 })
		);
	});
});