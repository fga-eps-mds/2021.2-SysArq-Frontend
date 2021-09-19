import React, { Component } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import Login from "../pages/Login/index";
import MockAdapter from "axios-mock-adapter"
import { axiosProfile } from "../Api";


describe("Main component", () => {
    it("Show page title", () => {
        render(<Login />);

        expect(screen.getByText("Entrar")).toBeInTheDocument();
    });

    it("Test input fields", () => {
        render(<Login />);

        const inputLogin = screen.getByLabelText(/Nome/);
        fireEvent.change(inputLogin, { target: { value: "teste" } });
        const valueLogin = screen.getByLabelText("Nome de Usuário").value;
        expect(valueLogin === "teste").toBe(true);
        expect(valueLogin.length === 5).toBe(true);

        const inputPassword = screen.getByLabelText("Senha");
        fireEvent.change(inputPassword, { target: { value: "teste123" } });
        const valuePassword = screen.getByLabelText("Senha");
        expect(valuePassword.value === "teste123").toBe(true);
        expect(valuePassword.type === "password").toBe(true);

        const clickShow = screen.getByTestId("showPass");
        expect(fireEvent.mouseDown(clickShow)).toBe(false);
        expect(fireEvent.click(clickShow)).toBe(true);


        const clickSend = screen.getByTestId("send");
        expect(fireEvent.click(clickSend)).toBe(true);
    })
});

    describe("validation", () => {
        it("Test login fields", () => {
            render(<Login />);

            const inputLogin = screen.getByLabelText("Nome de Usuário");
            fireEvent.change(inputLogin, { target: { value: "te" } });
            const valueLogin = screen.getByLabelText("Nome de Usuário").value;
            expect(valueLogin === "te").toBe(true);
            expect(valueLogin.length === 2).toBe(true);

            const clickSend = screen.getByTestId("send");
            expect(fireEvent.click(clickSend)).toBe(true);

            expect(screen.getByText("Digite um nome de usuário válido"))

        })

        it("Test password fields", () => {
            render(<Login />);

            const inputLogin = screen.getByLabelText("Nome de Usuário");
            fireEvent.change(inputLogin, { target: { value: "teste" } });
            const valueLogin = screen.getByLabelText("Nome de Usuário").value;
            expect(valueLogin === "teste").toBe(true);
            expect(valueLogin.length === 5).toBe(true);

            const inputPassword = screen.getByLabelText("Senha");
            fireEvent.change(inputPassword, { target: { value: "teste" } });
            const valuePassword = screen.getByLabelText("Senha");
            expect(valuePassword.value === "teste").toBe(true);
            expect(valuePassword.type === "password").toBe(true);

            const clickSend = screen.getByTestId("send");
            expect(fireEvent.click(clickSend)).toBe(true);
            expect(screen.getByText("Digite uma senha válida"))
            // screen.debug()

        })
        

    });
const hostApi = `${process.env.REACT_APP_URL_API_PROFILE}api/token/`;

describe("axios test", () => {
    it("Save button", () => {
        const mock = new MockAdapter(axiosProfile);
        
        render(<Login/>);
        act(()=>{

            const inputLogin = screen.getByLabelText("Nome de Usuário");
            fireEvent.change(inputLogin, { target: { value: "teste" } });
            
            const inputPassword = screen.getByLabelText("Senha");
            fireEvent.change(inputPassword, { target: { value: "teste123" } });
        })

        
        const click = screen.getByTestId("send");
        expect(fireEvent.click(click)).toBe(true);
        
        mock.onPost(hostApi).reply(function () {
            return [200];
        });
        
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].data).toBe(
            JSON.stringify({ username: "teste", password: "teste123" })
        );
    });

    it("error catch", () => {
        const mock = new MockAdapter(axiosProfile);
        
        render(<Login/>);
        act(()=>{

            const inputLogin = screen.getByLabelText("Nome de Usuário");
            fireEvent.change(inputLogin, { target: { value: "testando" } });
            
            const inputPassword = screen.getByLabelText("Senha");
            fireEvent.change(inputPassword, { target: { value: "testa123" } });
        })

        
        // const click = screen.getByTestId("send");
        // expect(fireEvent.click(click)).toBe(true);
        
        // mock.onPost(hostApi).replyOnce(401)
        // console.log(mock)
        
        // expect(mock.history.post.length).toBe(1);
        // expect(mock.history.post[0].data).toBe(
        //     JSON.stringify({ username: "testando", password: "testa123" })
        // );
    });
    it('testing the api post method', async () => {
        const ads = jest.spyOn(axiosProfile, 'post').mockRejectedValue(new Error('error'));
        await console.log(ads.mockRejectedValue)
        // await expect(post()).rejects.toThrow('error');  // Success!
    });
});

let mock;

beforeAll(() => {
    mock = new MockAdapter(axiosProfile);
});

afterEach(() => {
    mock.reset();
});

describe("when API call fails", () => {
    it("should return empty users list", async () => {
        render(<Login/>);
        // given
        mock.onPost(`${axiosProfile}api/token/`).networkErrorOnce();

        // when
        // const result = await fetchUsers();

        // then
        // console.log(mock)
        // expect(mock.history.post[0].url).toEqual(${ BASE_URL } / users);
        // expect(result).toEqual([]);
    });
});

