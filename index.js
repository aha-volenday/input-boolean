import React, { Component } from 'react';
import { Form, Radio } from 'antd';

import './styles.css';

export default class InputBoolean extends Component {
	renderRadio() {
		const { disabled = false, id, onChange, value = null } = this.props;

		return (
			<Radio.Group disabled={disabled} onChange={e => onChange(e, id, e.target.value)} value={value}>
				<Radio value={true}>
					<i class="fa fa-check-circle" style={{ color: '#55b65c' }} />
				</Radio>
				<Radio value={false}>
					<i class="fa fa-times-circle" style={{ color: '#dc3545' }} />
				</Radio>
			</Radio.Group>
		);
	}

	render() {
		const { error = null, extra = null, label = '', required = false, withLabel = false } = this.props;

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

		return <Form.Item {...formItemCommonProps}>{this.renderRadio()}</Form.Item>;
	}
}
