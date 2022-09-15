import filterInput from "../inputs/filterInput"

const filterArg = {
    type: filterInput,
    description: 'Filter values',
    defaultValue: {
        start: 0,
        count: 20,
    },
}

export default filterArg