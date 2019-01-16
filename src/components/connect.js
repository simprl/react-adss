import React from 'react'
import { Context } from './Context'

export const connect = (stateToProps, actionsToProps) => (Component) => {
    return (props) => (<Context.Consumer>
        {(logic) => {
            const getDispatch = (getAction) => (...atrs) => logic.dispatch(getAction(...atrs))

            const dispatches = {}
            for (const [key, getAction] of Object.entries(actionsToProps)) {
                dispatches[key] = getDispatch(getAction)
            }
            class PureComponent extends React.PureComponent {
                constructor(props) {
                    super(props)

                    this.state = stateToProps(logic.getState())

                    this.onLogicStateChange = (state) => {
                        this.setState(stateToProps(state))
                    }
                    logic.subscribe(this.onLogicStateChange)
                }

                componentWillUnmount() {
                    logic.unsubscribe(this.onLogicStateChange)
                }

                render() {
                    return (<Component {...this.props} {...this.state} {...dispatches} />)
                }
            }
            return <PureComponent {...props}/>}
        }
    </Context.Consumer>)
}

export default connect