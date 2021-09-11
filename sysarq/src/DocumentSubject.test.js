import React from "react";
import { render, screen } from "@testing-library/react";

import DocumentSubject from "./pages/FieldsRegister/DocumentSubject";

describe('Main component', () => {
	it('Title', () => {
		render(<DocumentSubject />);

		expect(screen.getByText("Assunto do Documento")).toBeInTheDocument();
	});
});
