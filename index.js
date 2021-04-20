import React from 'react';
import { Col, Form, Radio, Row, Skeleton, Tooltip } from 'antd';

const browser = typeof window !== 'undefined' ? true : false;

if (browser) require('./styles.css');

export default ({
	disabled = false,
	error = null,
	extra = null,
	id,
	label = '',
	onChange,
	required = false,
	toolTip = {},
	value = null,
	withLabel = false
}) => {
	const renderRadio = () => {
		const radio = (
			<Radio.Group disabled={disabled} name={id} onChange={e => onChange(e, id, e.target.value)} value={value}>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Radio value={true}>YES</Radio>
					</Col>
					<Col span={24}>
						<Radio value={false}>NO</Radio>
					</Col>
				</Row>
			</Radio.Group>
		);

		return Object.keys(toolTip).length === 0 ? radio : <Tooltip {...toolTip}>{radio}</Tooltip>;
	};

	const formItemCommonProps = {
		colon: false,
		help: error ? error : '',
		label: withLabel ? (
			<>
				<div style={{ float: 'right' }}>{extra}</div> <span class="label">{label}</span>
			</>
		) : (
			false
		),
		required,
		validateStatus: error ? 'error' : 'success'
	};

	return (
		<Form.Item {...formItemCommonProps}>
			{browser ? renderRadio() : <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={false} />}
		</Form.Item>
	);
};
