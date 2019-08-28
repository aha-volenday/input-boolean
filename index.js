import React, { Component } from 'react';
import InputDate from '@volenday/input-date';
import { Button, Checkbox, Form, Icon, Popover, Switch } from 'antd';

import './styles.css';

export default class InputBoolean extends Component {
	state = { hasChange: false, isPopoverVisible: false };

	renderCheckBox() {
		const { disabled = false, action, id, onChange, value = false } = this.props;
		return (
			<Checkbox
				checked={value}
				name={id}
				onChange={e => {
					onChange(id, e.target.checked);
					this.setState({ hasChange: action === 'add' ? false : true });
				}}
				disabled={disabled}
			/>
		);
	}

	renderSwitch() {
		const { disabled = false, action, id, onChange, value = false } = this.props;
		return (
			<Switch
				checked={value}
				name={id}
				onChange={e => {
					onChange(id, e);
					this.setState({ hasChange: action === 'add' ? false : true });
				}}
				checkedChildren={<Icon type="check" />}
				unCheckedChildren={<Icon type="close" />}
				disabled={disabled}
			/>
		);
	}

	handlePopoverVisible = visible => {
		this.setState({ isPopoverVisible: visible });
	};

	renderPopover = () => {
		const { isPopoverVisible } = this.state;
		const { id, label = '', historyTrackValue = '', onHistoryTrackChange } = this.props;

		return (
			<Popover
				content={
					<InputDate
						id={id}
						label={label}
						required={true}
						withTime={true}
						withLabel={true}
						value={historyTrackValue}
						onChange={onHistoryTrackChange}
					/>
				}
				trigger="click"
				title="History Track"
				visible={isPopoverVisible}
				onVisibleChange={this.handlePopoverVisible}>
				<span class="float-right">
					<Button
						type="link"
						shape="circle-outline"
						icon="warning"
						size="small"
						style={{ color: '#ffc107' }}
					/>
				</span>
			</Popover>
		);
	};

	render() {
		const { hasChange } = this.state;
		const {
			action,
			label = '',
			historyTrack = false,
			required = false,
			type = 'checkbox',
			withLabel = false
		} = this.props;

		const formItemCommonProps = {
			colon: false,
			label: withLabel ? label : false,
			required
		};

		return (
			<Form.Item {...formItemCommonProps}>
				{type == 'checkbox' && this.renderCheckBox()}
				{type == 'switch' && this.renderSwitch()}
				{historyTrack && hasChange && action !== 'add' && this.renderPopover()}
			</Form.Item>
		);
	}
}
