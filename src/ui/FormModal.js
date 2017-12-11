import React from 'react';
import Form, { Item as FormItem } from 'antd/lib/form';
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Modal from 'antd/lib/modal'

class FormModal extends React.Component {

    _handleCancel = () => {
        const { form, closeForm } = this.props

        form.resetFields()
        closeForm()
    }

    _handleOk = () => {
        const { form, closeForm, submit, employeeValue } = this.props

        form.validateFields((err, value) => {
            if (!err) {
                submit(value)
                this._handleCancel()
            }
            
        })
    }
    componentDidMount() {
        this.props.form.getFieldDecorator('id', {
            initialValue: undefined
        })
    }
    componentWillReceiveProps(newProps) {
        if (newProps.employeeValue !== this.props.employeeValue) {
            this.props.form.setFieldsValue(newProps.employeeValue)
        }
    }


    render() {
        const { visible, onCancel, onAdd, form, ...restProps } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Add New Employee"
                okText="Add"
                onCancel={this._handleCancel}
                onOk={this._handleOk}
            >
                <Form layout="vertical">
                    <FormItem label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input a valid name', min: 5 }],
                            initialValue: ''
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem label="Age">
                        {getFieldDecorator('age', {
                            rules: [
                                { type: 'number' },
                                { required: true, message: 'Please input a valid name' },
                                {
                                    validator: (rule, value, cb) => {
                                        if (value < 21) {
                                            cb('Please input age greater than 21')
                                        } else if (value > 59) {
                                            cb('Please input age less than 59')
                                        } else {
                                            cb()
                                        }
                                    },
                                }
                            ],
                            initialValue: ''
                        })(
                            <InputNumber min="21" max="59" step="1" style={{ width: '100%' }} />
                            )}
                    </FormItem>
                    <FormItem label="Salary">
                        {getFieldDecorator('salary', {
                            rules: [
                                { required: true, message: 'Please input a valid salary', },
                                { type: 'number' },
                            ],
                            initialValue: ''
                        })(
                            <InputNumber step="100" style={{ width: '100%' }} />
                            )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(FormModal)