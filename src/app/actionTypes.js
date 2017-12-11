export const types = {

    ADD_EMPLOYEE: 'addEmployee',

    EDIT_EMPLOYEE: 'editEmployee',

    DELETE_EMPLOYEE: 'deleteEmployee'

}

export default {
    [types.ADD_EMPLOYEE]: ({ employeeArr, ...restOfState }, employee) => {
        return {
            ...restOfState,
            employeeArr: [
                ...employeeArr,
                {
                    ...employee,
                    id: employeeArr.length + 1
                }
            ]
        }
    },

    [types.EDIT_EMPLOYEE]: ({ employeeArr, ...restOfState }, employeeId) => {
        const employeeIndex = employeeArr.findIndex((editedEmployee) => {
            return employeeId.id === editedEmployee.id
        })
        console.log(employeeId)
        return {
            ...restOfState,
            employeeArr: [
                ...employeeArr.slice(0, employeeIndex),
                employeeId,
                ...employeeArr.slice(employeeIndex + 1)
            ]
        }
    },

    [types.DELETE_EMPLOYEE]: ({ employeeArr, ...restOfState }, employeeId) => {
        const employeeIndex = employeeArr.findIndex((employee) => {
            return employeeId.id === employee.id
        })
        console.log('==== index ====', employeeIndex)
        return {
            ...restOfState,
            employeeArr: [
                ...employeeArr.slice(0, employeeIndex),
                ...employeeArr.slice(employeeIndex + 1)
            ]
        }
    }
}
