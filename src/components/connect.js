import React from 'react'
import { Context } from './Context'

export const connect = (stateToProps, actionsToProps) => (Component) => {
    class Consumer extends React.PureComponent {
        constructor(props) {
            super(props)

            const { $$logic: logic } = this.props
            this.state = stateToProps(logic.getState())

            this.dispatches = {}
            for(const [key, value] of Object.entries(actionsToProps)) {
                this.dispatches[key] = this.dispatch.bind(this, value)
            }
        }

        dispatch(getAction, ...args){
            const { $$logic: logic } = this.props
            return logic.dispatch(getAction(...args), (state) => this.setState(stateToProps(state) ))
        }

        render() {
            const { $$logic, ...props } = this.props
            return (<Component {...props} {...this.state} {...this.dispatches} />)
        }
    }
    return (props) => (<Context.Consumer>
        {(logic) => <Consumer {...props} $$logic={logic}/>}
    </Context.Consumer>)
}

export default connect