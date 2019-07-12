import React, { Component, Fragment } from 'react';
import InputDate from '@volenday/input-date';

// ant design
import { Button, Checkbox, Icon, Popover, Switch } from 'antd';

export default class InputBoolean extends Component {
	state = { hasChange: false, isPopoverVisible: false };

	renderCheckBox() {
		const { disabled = false, id, onChange, value = false } = this.props;
		return (
			<Checkbox
				checked={value}
				name={id}
				onChange={e => {
					onChange(id, e.target.checked);
					this.setState({ hasChange: true });
				}}
				disabled={disabled}
			/>
		);
	}

	renderSwitch() {
		const { disabled = false, id, onChange, value = false } = this.props;
		return (
			<Switch
				checked={value}
				name={id}
				onChange={e => {
					onChange(id, e);
					this.setState({ hasChange: true });
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
			id,
			label = '',
			required = false,
			type = 'checkbox',
			withLabel = false,
			historyTrack = false
		} = this.props;

		if (withLabel) {
			if (historyTrack) {
				return (
					<div className="form-group">
						<label for={id}>
							{type == 'checkbox' && this.renderCheckBox()}
							{type == 'switch' && this.renderSwitch()}
							<span>&nbsp;{required ? `*${label}` : label}</span>
						</label>
						{hasChange && this.renderPopover()}
					</div>
				);
			}

			return (
				<div className="form-group">
					<label for={id}>
						{type == 'checkbox' && this.renderCheckBox()}
						{type == 'switch' && this.renderSwitch()}
						<span>&nbsp;{required ? `*${label}` : label}</span>
					</label>
				</div>
			);
		} else {
			if (historyTrack) {
				<div class="form-group">
					{type == 'checkbox' && this.renderCheckBox()}
					{type == 'switch' && this.renderSwitch()}
					{hasChange && this.renderPopover()}
				</div>;
			}

			return (
				<Fragment>
					{type == 'checkbox' && this.renderCheckBox()}
					{type == 'switch' && this.renderSwitch()}
				</Fragment>
			);
		}

		return null;
	}
}
