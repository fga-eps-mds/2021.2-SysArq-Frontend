import { render, screen, fireEvent } from "@testing-library/react";

import Login from "../../pages/Login";

import { rest } from "msw";
import { setupServer } from "msw/node";

const hostApi = `${process.env.REACT_APP_URL_API_PROFILE}api/token/`;

const server = setupServer(
	rest.post(hostApi, (req, res, ctx) => {
		if (req.body.username === "teste201") {
			return res(ctx.status(201));
		} else if (req.body.username === "teste401") {
			return res(ctx.status(401));
		} else {
			return res(ctx.status(404));
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const test = (psw) => {
	const usernameInput = screen.getByLabelText("Nome de Usuário");
	fireEvent.change(usernameInput, { target: { value: "teste" } });

	const usernameValue = screen.getByLabelText("Nome de Usuário").value;
	expect(usernameValue === "teste").toBe(true);

	const passwordInput = screen.getByLabelText("Senha");
	fireEvent.change(passwordInput, { target: { value: psw } });

	const password = screen.getByLabelText("Senha");
	expect(password.value === psw).toBe(true);
	expect(password.type === "password").toBe(true);
};

const test2 = async (userName, psw, msgError) => {
	const usernameInput = screen.getByLabelText("Nome de Usuário");
	fireEvent.change(usernameInput, { target: { value: userName } });

	const passwordInput = screen.getByLabelText("Senha");
	fireEvent.change(passwordInput, { target: { value: psw } });

	const clickLogIn = screen.getByRole("button", { name: /Entrar/ });
	expect(fireEvent.click(clickLogIn)).toBe(true);

	await screen.findByText(msgError);
};

describe("Login Screen Test", () => {
	it("showPass button test", () => {
		render(<Login />);

		test("teste123");
		const clickShow = screen.getByTestId("showPass");
		expect(fireEvent.mouseDown(clickShow)).toBe(false);
		expect(fireEvent.click(clickShow)).toBe(true);

		const visiblePassword = screen.getByLabelText("Senha");
		expect(visiblePassword.type === "text").toBe(true);
	});

	it("test username field validation", () => {
		render(<Login />);

		const usernameInput = screen.getByLabelText("Nome de Usuário");
		fireEvent.change(usernameInput, { target: { value: "te" } });

		const usernameValue = screen.getByLabelText("Nome de Usuário").value;
		expect(usernameValue === "te").toBe(true);

		const clickLogIn = screen.getByRole("button", { name: /Entrar/ });
		expect(fireEvent.click(clickLogIn)).toBe(true);

		expect(screen.getByText("Digite um nome de usuário válido"));
	});

	it("test password field validation", () => {
		render(<Login />);
		test("test");

		fireEvent.keyUp(screen.getByLabelText("Senha"), {
			key: "Escape",
			code: "Escape",
			keyCode: 27,
			charCode: 27,
		});

		fireEvent.keyUp(screen.getByLabelText("Senha"), {
			key: "Enter",
			keyCode: 13,
			which: 13,
		});

		expect(screen.getByText("Digite uma senha válida"));
	});

	it("axios success", async () => {
		render(<Login />);

		const usernameInput = screen.getByLabelText("Nome de Usuário");
		fireEvent.change(usernameInput, { target: { value: "teste201" } });

		const passwordInput = screen.getByLabelText("Senha");
		fireEvent.change(passwordInput, { target: { value: "teste201" } });

		const clickLogIn = screen.getByRole("button", { name: /Entrar/ });
		expect(fireEvent.click(clickLogIn)).toBe(true);
	});

	it("axios error 404", async () => {
		render(<Login />);
		await test2("teste", "teste123", "Erro de conexão!");
	});

	it("axios error 401", async () => {
		render(<Login />);
		await test2(
			"teste401",
			"teste123",
			"Nome de Usuário e/ou Senha incorreto!"
		);
	});
});
