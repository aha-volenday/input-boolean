import React, { Component } from 'react';
import { Checkbox, Form, Icon, Switch } from 'antd';

import './styles.css';

export default class InputBoolean extends Component {
	renderCheckBox() {
		const { disabled = false, id, onChange, value = false } = this.props;
		return (
			<Checkbox checked={value} name={id} onChange={e => onChange(e, id, e.target.checked)} disabled={disabled} />
		);
	}

	renderSwitch() {
		const { disabled = false, id, onChange, value = false } = this.props;
		return (
			<Switch
				checked={value}
				name={id}
				onChange={e => onChange({ target: { name: id, value: e } }, id, e)}
				checkedChildren={<Icon type="check" />}
				unCheckedChildren={<Icon type="close" />}
				disabled={disabled}
			/>
		);
	}

	render() {
		const { label = '', required = false, type = 'checkbox', withLabel = false } = this.props;

		const formItemCommonProps = {
			colon: false,
			label: withLabel ? label : false,
			required
		};

		return (
			<Form.Item {...formItemCommonProps}>
				{type == 'checkbox' && this.renderCheckBox()}
				{type == 'switch' && this.renderSwitch()}
			</Form.Item>
		);
	}
}
