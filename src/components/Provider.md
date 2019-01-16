Provider example:

```js
const delay  = (t) => new Promise((resolve) => setTimeout(resolve, t))
const updater = (reducer) => (store) => ({...store, y1: reducer(store.y1)})
const stateAction = (reducer) => ({setState}) => setState(updater(reducer))
const setV2 = (v) => stateAction((state) => ({...state, v2: v}) )
const incrementValue = (v) => stateAction((state) => ({...state, v1: state.v1 + v}) )
const multiplyValue = (v) => stateAction((state) => ({...state, v1: state.v1 * v}) )
const incMultValue = (inc, mult) => async function f({ dispatch }) {
    dispatch(incrementValue(inc))
    await delay(100)
    dispatch(multiplyValue(mult))
}

const incMultValueOnce = (inc, mult) => ({ hold }) => { 
    hold(incMultValue(inc, mult))
}
const MyComponent = (props) => {
  console.log('render')
  return <div>
      {props.v1}
      <button onClick={props.onClickIncMult}>incMultValue</button>
      <button onClick={props.onClickIncMultOnce}>incMultValueOnce</button>
      <input onChange={props.onChangeV2} value={props.v2}/>
   </div>
}


const connect = reactADSS.connect
const logic = adss.createLogic({y1:{v1: 0, v2: 0}})

const stateToProps = (state) => ({
  v1: state.y1.v1,
  v2: state.y1.v2
})

const actionsToProps = {
  onClickIncMult: () => incMultValue(7,2),
  onClickIncMultOnce: () => incMultValueOnce(7,2),
  onChangeV2: ({ target: { value } }) => setV2(value)
}
const MyContainer = connect(stateToProps, actionsToProps)(MyComponent)

;<Provider logic={logic} >
<MyContainer/>
</Provider>
```