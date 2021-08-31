import React from "react";
import TestForm from "./TestForm";
import { render } from "@testing-library/react";

describe("Test Form", () => {
	it('should render "Activity Name" field', () => {
		const { getByPlaceholderText } = render(<TestForm />);
		expect(
			getByPlaceholderText("A name to describe this activity")
		).toBeVisible();
	});

	it('should render "This activity is located on" field', () => {
		const { getByText } = render(<TestForm />);
		expect(getByText("This activity is located on")).toBeVisible();
	});
});
