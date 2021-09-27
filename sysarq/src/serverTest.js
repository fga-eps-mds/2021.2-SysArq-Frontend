import { screen, fireEvent} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";


export const startServer = (axiosArchives) => {
    const server = setupServer(
        rest.post(axiosArchives, (req, res, ctx) => {
            if (req.body.number === "201") {
                return res(ctx.status(201));
            } else {
                return res(ctx.status(404));
            }
        })
    );
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    jest.useFakeTimers();
}



export const inputChange = (title, targetValue) => {
	const inputReference = screen.getByLabelText(title);
	fireEvent.change(inputReference, {
		target: { value: targetValue },
	});
};