import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, Popconfirm, Icon, Menu, Dropdown, Button, Row, Col, Modal, notification } from 'antd';
import FormModal from './FormModal'
import './index.css';
import { connect } from 'react-redux';
import { types } from '../app/actionTypes'
const confirm = Modal.confirm;

class App extends React.PureComponent {
  // static myMember = {}
  state = {
    visible: false,
    employee: {}
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary, record, index) => {
        if (salary < 2500) {
          return <span style={{ color: 'red' }}>{salary}</span>
        } else if (salary > 5000) {
          return <span style={{ color: 'green' }}>{salary}</span>
        } else {
          return <span style={{ color: 'black' }}>{salary}</span>
        }
      }
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (text, record, index) => (
        <Dropdown
          overlay={(
            <Menu onClick={(...args) => this.handleAction(...args, index, record)}>
              <Menu.Item key="edit">
                <Icon type="edit" />Edit Row
              </Menu.Item>
              <Menu.Item key="delete"  >
                <Icon style={{ color: 'red' }} type="delete" />Delete Row
              </Menu.Item>
            </Menu>
          )}
          trigger={['click']}
          placement="bottomLeft"
        >
          <a><Icon type="caret-down" className="ant-dropdown-link" />
          </a>
        </Dropdown>
      )
    },
  ]

  setEmployee = employee => this.setState(() => ({ employee }))


  toggle = () =>
    this.setState(({ visible, employee }) => ({
      visible: !visible,
      employee: !visible ? employee : {}
    }))
  // static myStaticMethod = () => {}
  handleAction = ({ key }, index, record) => {

    switch (key) {
      case "edit":
        this.setState(({ visible }) => ({
          visible: !visible
        }))
        this.setEmployee(record)
        break

      case "delete":
        confirm({
          title: 'Are you sure delete this task?',
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
            this.props.deleteEmployee(record)
          },
        });
        break
    }
  }



  submitEmployee = employee => {
    if (employee.id) {
      this.props.editEmployee(employee)
    } else {
      this.props.addEmployee(employee)
    }
  }




  _renderTitle = () => (
    <Row type="flex" justify="space-between" align="middle">
      <Col span={6}>
        <h4 style={{ margin: '0' }}>Employess</h4>
      </Col>
      <Col span={6}>
        <Button type="primary" onClick={this.toggle}>Add New Employee</Button>
      </Col>
    </Row>
  )

  // Life Cycle Methods of React Component
  // componentWillMount() {}

  // componentDidMount() {}

  // componentWillRecieveProps () {}

  // componentWillUpdate() {}

  // componentDidUpdate() {}

  // componentWillUnmount() {}

  render() {
    return (
      <Fragment>
        <Table
          title={this._renderTitle}
          bordered
          dataSource={this.props.employeeArr}
          rowKey="id"
          columns={this.columns}
        />
        <FormModal
          visible={this.state.visible}
          closeForm={this.toggle}
          submit={this.submitEmployee}
          employeeValue={this.state.employee}
        />
      </Fragment>
    )
  }
}
// const mapStateToProps = (state) => {
//     let props = Object.assign({}, state.searchpage)
//     props.content = state.language.content.search
//     return props
// }

const mapStateToProps = (state) => {
  return {
    employeeArr: state.employeeArr,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployee: (employee) => {
      dispatch({
        type: types.ADD_EMPLOYEE,
        payload: employee
      })
    },
    editEmployee: (employeeId) => {
      dispatch({
        type: types.EDIT_EMPLOYEE,
        payload: employeeId
      })
    },
    deleteEmployee : (employeeId) => {
      dispatch({
        type: types.DELETE_EMPLOYEE,
        payload: employeeId
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
