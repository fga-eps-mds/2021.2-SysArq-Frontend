import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CreateStatus from "./pages/FieldsRegister/CreateStatus";

describe("Componente principal", () => {
	it("Mostrar o título da página", () => {
		render(<CreateStatus />);

		expect(screen.getByText("Status")).toBeInTheDocument();
	});
});

describe("Garantir que os campos de input quando é selecionado o desarquivado exista", () => {
	it("Status", () => {
		const { getByTestId, getAllByTestId } = render(<CreateStatus />);
		fireEvent.change(getByTestId("statusID"), {
			target: { value: "DESARQUIVADO" },
		});
		let options = getAllByTestId("statusID");
		expect(options[0].value).toBe("DESARQUIVADO");
	});

	it("Eliminado ?", () => {
		const { getByTestId, getAllByTestId } = render(<CreateStatus />);
		fireEvent.change(getByTestId("eliminado"), {
			target: { value: "ELIMINADO" },
		});
		let options = getAllByTestId("eliminado");
		expect(options[0].value).toBe("ELIMINADO");
	});

	describe("Garamtir que os campos de input quando selecionado DESARQUIVADO existam", () => {
		it("Enviado por", () => {
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

		it("Documento que solicito o desarquivamento", () => {
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

		it("Data de envio", () => {
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

describe("Teste do botão", () => {
	it("Botão de salvar", () => {
		render(<CreateStatus />);

		const click = screen.getByTestId("click");
		expect(fireEvent.click(click)).toBe(true);
	});
});
