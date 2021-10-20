import { screen, render, fireEvent, within } from "@testing-library/react";

import { server } from "../../support/server";

import {
	submitClick,
	input,
	abbreviationSelector,
	shelfSelector,
	rackSelector,
} from "../../support";

import { formatDate, initialPeriod } from "../../../support";

import CreateFrequencySheet from "../../../pages/Documents/Create/CreateFrequencySheet";

jest.setTimeout(60000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const isOnTheScreen = (text) => {
	expect(screen.getByText(text)).toBeInTheDocument();
};

const isNotOnTheScreen = (text) => {
	expect(screen.queryByText(text)).not.toBeInTheDocument();
};

describe("Create Frequency Relation Screen Test", () => {
	it("complete test", async () => {
		render(<CreateFrequencySheet />);
		submitClick();
		isOnTheScreen("Insira um CPF");

		input("CPF*", "13421.53253");
		submitClick();
		isOnTheScreen("Insira um CPF válido");

		input("CPF*", "12345");
		submitClick();
		isOnTheScreen("Insira um CPF válido");

		input("CPF*", "12345678911");
		submitClick();
		isOnTheScreen("Insira o nome");

		input("Nome do Servidor*", "Sandro da Silva");
		submitClick();
		isOnTheScreen("Insira um cargo");

		input("Cargo*", "Chefe");
		submitClick();
		isOnTheScreen("Insira uma lotação");

		input("Lotação*", "lotaçao");
		submitClick();
		isOnTheScreen("Insira um município");

		input("Período de Referencia*", "03/2021");
		submitClick();
		expect(screen.queryByText("Insira um período")).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira um período válido")
		).not.toBeInTheDocument();
		input("Número do Processo Encaminhador", "1");
		input("Nome do Servidor*", "teste");
		input("Cargo*", "teste");
		await abbreviationSelector();

		await shelfSelector();

		await rackSelector();
	});
});
