import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
	render(<App />);
	const strBtn = screen.getByText("Change Text Btn", {
		selector: "button",
	});
	expect(strBtn).toBeInTheDocument();

	userEvent.click(strBtn);
	expect(screen.getByText("new string")).toBeInTheDocument();
});
