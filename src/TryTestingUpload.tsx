import React, { useState } from "react";
import { Checkbox, Form, Select, Upload, Button } from "antd";
import { RcFile } from "antd/lib/upload";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import convertSize from "./utils/convert-file-size";

const Location = () => {
	const [state, setState] = useState([]);
	const { Option } = Select;
	const [ownerSelect, setOwnerSelect] = useState(false);
	const [displayConsent, setDisplayConsent] = useState(false);
	const [consentFileSize, setConsentSize] = useState("");
	const writtenConsentProps = {
		name: "writtenConsentProps",
		action: "http://attachment.upload.api/upload",
		maxCount: 1,
		//to handle upload file
		//   customRequest: (options: OptionType) =>
		//     handleCustomUploadRequest(options, {
		//       id: '43a0f483-11d4-47a0-8210-bfd43526965d', 		//
		//       file: options.file,
		//     }),
		beforeUpload: (file: RcFile) => {
			//If need to allow only certain type of files
			//   if (!supportedTypes.includes(file.type)) {
			//     message.error(`${file.type} is not a zip file`);
			//     return false;
			//   }
			const exactSize = convertSize(file.size);
			setConsentSize(`  File Size:  ${exactSize.toString()}`);
			return true;
		},
		onChange: (info: any) => {
			if (!info.fileList[0]) {
				setConsentSize("");
			}
		},
		"data-testid": "consent-file-upload",
	};
	const ownerHandler = (value: string) => {
		if (value && value === "No") {
			setDisplayConsent(true);
		} else {
			setDisplayConsent(false);
		}
	};
	const onChkboxChange = (selected: any) => {
		setState(selected);
		if (selected && selected.indexOf("Option 2") >= 0) {
			setOwnerSelect(true);
			ownerHandler(selected);
		} else {
			setOwnerSelect(false);
			ownerHandler(selected);
		}
	};
	return (
		<>
			<Form.Item required label="This activity is located on">
				<Checkbox.Group
					options={locationOptions}
					value={state}
					onChange={onChkboxChange}
					data-testid="land-location-ckg"
				/>
			</Form.Item>
			{ownerSelect && (
				<>
					<Form.Item
						required
						label="Select 'No' to display attachment compoenet"
					>
						<Select
							placeholder="Select from dropdown"
							onChange={ownerHandler}
							data-testid="ownerSelect"
						>
							<Option value="Yes">
								Yes
							</Option>
							<Option value="No">
								No
							</Option>
						</Select>
					</Form.Item>
					{displayConsent && (
						<Form.Item
							label="Attach one file"
							required
						>
							<Upload
								{...writtenConsentProps}
							>
								<Button
									icon={
										<UploadOutlined />
									}
									data-testid="writtenConsent"
								>
									{
										"Upload Attachment"
									}
								</Button>
								<span data-testid="consentfilesize">
									{
										consentFileSize
									}
								</span>
							</Upload>
						</Form.Item>
					)}
				</>
			)}
		</>
	);
};
Location.displayName = "Display Location";

export default Location;

export const LocationTooltipText = () => (
	<ul>
		<li>
			<strong>Option 1</strong>: No other data needed when
			check this option.
		</li>
		<li>
			<strong>Option 2</strong>: Check this option to display
			dropdown selection.
		</li>
	</ul>
);

export const locationList = ["Option 1", "Option 2"];

export const locationOptions = locationList.map((value) => ({
	value,
	label: value,
}));
