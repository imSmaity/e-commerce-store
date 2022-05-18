import React from 'react'

const Button = ({onclick,children}) => {
    return<button onClick={onclick}>{children}</button>
}

export default Button