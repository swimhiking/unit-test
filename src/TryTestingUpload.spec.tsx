import React from "react";
import Location from "./TryTestingUpload";
import {
	act,
	fireEvent,
	render,
	waitFor,
	screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JSZip from "jszip";

const testZip = new JSZip();
testZip.file("1-test.zip", "Test file one");
const testFilePromise = testZip.generateAsync({ type: "arraybuffer" });

describe("Location component has activity label", () => {
	it("should render label", () => {
		render(<Location />);
		expect(
			screen.getByText("This activity is located on")
		).toBeVisible();
	});

	it("change attached file should update upload information", async () => {
		render(<Location />);
		const landLocationChbox =
			screen.getByTestId("land-location-ckg");
		expect(landLocationChbox).toBeInTheDocument();

		await waitFor(() => {
			const freeholdChBox = screen.getByText("Freehold");
			expect(freeholdChBox).toBeInTheDocument();
			userEvent.click(freeholdChBox);

			const questItem = screen.getByText(
				"Are you the owner of the land in the undertaking",
				{ exact: false }
			);
			expect(questItem).toBeInTheDocument();
			act(async () => {
				fireEvent.change(questItem, {
					target: { value: "No" },
				});
				fireEvent.click(questItem);
				const consentUpload =
					screen.getByTestId("writtenConsent");
				expect(consentUpload).toBeInTheDocument();

				const testFile = await testFilePromise;

				await waitFor(() => {
					act(() => {
						fireEvent.change(
							consentUpload,
							{
								target: {
									files: [
										testFile,
									],
								},
							}
						);
						fireEvent.click(consentUpload);

						expect(
							screen.getByTestId(
								"consentfilesize"
							)
						).not.toBe(null);

						fireEvent.change(
							consentUpload,
							{
								target: {
									files: [],
								},
							}
						);
						fireEvent.click(consentUpload);

						expect(
							screen.getByTestId(
								"consentfilesize"
							)
						).toBe(null);
					});
				});
			});
		});
	});
});
