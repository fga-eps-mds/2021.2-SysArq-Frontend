import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateStatus from "../pages/FieldsRegister/CreateStatus";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const testStatus = (title, value) => {
	const { getByTestId, getAllByTestId } = render(<CreateStatus />);
	fireEvent.change(getByTestId("statusID"), {
		target: { value: "DESARQUIVADO" },
	});
	let options = getAllByTestId("statusID");
	expect(options[0].value).toBe("DESARQUIVADO");

	const input = getByTestId(title);
	fireEvent.change(input, { target: { value: value } });
	const valueTest = getByTestId(title).value;
	expect(valueTest === value).toBe(true);
};

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateStatus />);

		expect(screen.getByText("Status")).toBeInTheDocument();
	});
});

describe("Ensure that input fields when unarchived are selected exist", () => {
	it("Status", () => {
		testStatus("enviado-por", "João");
	});
	it("Status", () => {
		testStatus("requisitado", "Documento 1");
	});
	it("Status", () => {
		testStatus("data-envio", "10/07/2021");
	});
});

describe("Ensure that input fields when unarchived are selected exist", () => {
	it("Status", () => {
		const { getByTestId, getAllByTestId } = render(<CreateStatus />);
		fireEvent.change(getByTestId("statusID"), {
			target: { value: "DESARQUIVADO" },
		});
		const options = getAllByTestId("statusID");
		expect(options[0].value).toBe("DESARQUIVADO");
	});

	it("Eliminated ?", () => {
		const { getByTestId, getAllByTestId } = render(<CreateStatus />);
		fireEvent.change(getByTestId("eliminado"), {
			target: { value: "ELIMINADO" },
		});
		const options = getAllByTestId("eliminado");
		expect(options[0].value).toBe("ELIMINADO");
	});
});

const hostApi = `${process.env.REACT_APP_URL_API}status`;

describe("Button test", () => {
	it("Save button", () => {
		const mock = new MockAdapter(axios);

		render(<CreateStatus />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(hostApi).reply(function () {
			return [201];
		});

		expect(mock.history.post.length).toBe(1);
		expect(mock.history.post[0].data).toBe(
			JSON.stringify({
				filed: true,
				eliminated: true,
				unity_that_forwarded: "",
				document_requested: "",
				send_date: "",
			})
		);
	});
});
