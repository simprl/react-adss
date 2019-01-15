import React from 'react'
import { Context } from './Context'

export const Provider = ({logic, children}) => (<Context.Provider value={logic} children={children} />)
export default Provider