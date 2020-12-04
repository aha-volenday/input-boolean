import React from 'react';
import { Form, Radio, Skeleton } from 'antd';

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
				<Radio value={true}>
					<i class="fa fa-check-circle" style={{ color: '#55b65c' }} />
				</Radio>
				<Radio value={false}>
					<i class="fa fa-times-circle" style={{ color: '#dc3545' }} />
				</Radio>
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
