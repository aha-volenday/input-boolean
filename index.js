import React from 'react';
import { Col, Form, Radio, Row, Skeleton } from 'antd';

import './styles.css';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

export default ({
	disabled = false,
	error = null,
	extra = null,
	id,
	label = '',
	onChange,
	required = false,
	value = null,
	withLabel = false
}) => {
	const renderRadio = () => {
		return (
			<Radio.Group disabled={disabled} name={id} onChange={e => onChange(e, id, e.target.value)} value={value}>
				<Row gutter={[16, 16]}>
					<Radio value={true}>YES</Radio>
				</Row>
				<Row gutter={[16, 16]}>
					<Radio value={false}>NO</Radio>
				</Row>
			</Radio.Group>
		);
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
