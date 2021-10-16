import React from "react";
import { render, screen } from "@testing-library/react";

import DocumentType from "../../../pages/Fields/List/DocumentType";

describe("Main component", () => {
	it("Title", () => {
		render(<DocumentType />);

		expect(screen.getByText("Tipo de Documento")).toBeInTheDocument();
	});
});
