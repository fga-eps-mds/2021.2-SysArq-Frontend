import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateStatus from "./pages/FieldsRegister/CreateStatus";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Main component", () => {
	it("Show page title", () => {
		render(<CreateStatus />);

		expect(screen.getByText("Status")).toBeInTheDocument();
	});
});

describe("Ensure that input fields when unarchived are selected exist", () => {
	it("Status", () => {
		const { getByTestId, getAllByTestId } = render(<CreateStatus />);
		fireEvent.change(getByTestId("statusID"), {
			target: { value: "DESARQUIVADO" },
		});
		let options = getAllByTestId("statusID");
		expect(options[0].value).toBe("DESARQUIVADO");
	});

	it("Eliminated ?", () => {
		const { getByTestId, getAllByTestId } = render(<CreateStatus />);
		fireEvent.change(getByTestId("eliminado"), {
			target: { value: "ELIMINADO" },
		});
		let options = getAllByTestId("eliminado");
		expect(options[0].value).toBe("ELIMINADO");
	});

	describe("Ensure that input fields when UNARCHIVED exist", () => {
		it("Sent by", () => {
			const { getByTestId, getAllByTestId } = render(<CreateStatus />);
			fireEvent.change(getByTestId("statusID"), {
				target: { value: "DESARQUIVADO" },
			});
			let options = getAllByTestId("statusID");
			expect(options[0].value).toBe("DESARQUIVADO");

			const input = getByTestId("enviado-por");
			fireEvent.change(input, { target: { value: "João" } });
			const valor = getByTestId("enviado-por").value;
			expect(valor == "João").toBe(true);
		});

		it("Document that requested the unarchive", () => {
			const { getByTestId, getAllByTestId } = render(<CreateStatus />);
			fireEvent.change(getByTestId("statusID"), {
				target: { value: "DESARQUIVADO" },
			});
			let options = getAllByTestId("statusID");
			expect(options[0].value).toBe("DESARQUIVADO");

			const input = getByTestId("requisitado");
			fireEvent.change(input, { target: { value: "Documento 1" } });
			const valor = getByTestId("requisitado").value;
			expect(valor == "Documento 1").toBe(true);
		});

		it("Send date", () => {
			const { getByTestId, getAllByTestId } = render(<CreateStatus />);
			fireEvent.change(getByTestId("statusID"), {
				target: { value: "DESARQUIVADO" },
			});
			let options = getAllByTestId("statusID");
			expect(options[0].value).toBe("DESARQUIVADO");

			const input = getByTestId("data-envio");
			fireEvent.change(input, { target: { value: "10/07/2021" } });
			const valor = getByTestId("data-envio").value;
			expect(valor == "10/07/2021").toBe(true);
		});
	});
});

describe("Button test", () => {
	it("Save button", () => {
		let mock = new MockAdapter(axios);

		render(<CreateStatus />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);

		mock.onPost(`${process.env.REACT_APP_API_URL}/status`).reply(function () {
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
