import convertSize from "./convert-file-size";

describe("convertSize", () => {
	it("should dynamically convert byte size to KB, MB, and GB", () => {
		const kbSize = 1564;
		const mbSize = 1564000;
		const gbSize = 1654000000;
		expect(
			convertSize(kbSize).indexOf("KB")
		).toBeGreaterThanOrEqual(0);
		expect(
			convertSize(mbSize).indexOf("MB")
		).toBeGreaterThanOrEqual(0);
		expect(
			convertSize(gbSize).indexOf("GB")
		).toBeGreaterThanOrEqual(0);
	});
});
