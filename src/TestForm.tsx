import React from "react";
import { Form, Input, Col, Row } from "antd";
import Location, { LocationTooltipText } from "./TryTestingUpload";
interface TestType {
	id?: string;
	name?: string;
}

const TestForm: React.FC<TestType> = () => {
	const [form] = Form.useForm();
	return (
		<Form
			data-testid="testid"
			form={form}
			layout="vertical"
			style={{ paddingLeft: 50 }}
		>
			<Row>
				<Col span={11}>
					<Form.Item label="Name" name="name">
						<Input placeholder="A name to describe this activity"></Input>
					</Form.Item>
				</Col>
			</Row>
			<Row justify="space-between">
				<Col span={11}>
					<Location></Location>
				</Col>
				<Col
					span={11}
					style={{
						padding: 12,
						background: "#fafafa",
					}}
				>
					<div>
						<strong>
							<em>Land Location</em>
						</strong>
						<div
							style={{
								fontSize: "0.75rem",
								fontWeight: 400,
							}}
						>
							<LocationTooltipText />
						</div>
					</div>
				</Col>
			</Row>
		</Form>
	);
};
export default TestForm;
