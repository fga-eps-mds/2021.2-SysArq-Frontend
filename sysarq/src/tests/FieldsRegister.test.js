import FieldsRegister from "../pages/FieldsRegister/FieldsRegister";

import { render } from "@testing-library/react";

describe("Main component", () => {
	let documentBody;

	beforeEach(() => {
		documentBody = render(<FieldsRegister />);
	});

	it("show document card", () => {
		expect(documentBody.getByText("Assunto do Documento")).toBeInTheDocument();
	});
});
