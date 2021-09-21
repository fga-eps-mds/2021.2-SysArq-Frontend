import React from "react";
import { render, screen } from "@testing-library/react";

import DocumentsRegister from "../pages/DocumentsRegister/DocumentsRegister";

describe("Main component", () => {
    it("Title", () => {
        render(<DocumentsRegister />);

        expect(screen.getByText("Arquivo Geral da Polícial Civil de Goiás")).toBeInTheDocument();
        expect(screen.getByText("Tipos de documentos para cadastro")).toBeInTheDocument();
    });
});
