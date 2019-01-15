# React-ADSS
Action->Dispatch->Services->Store flow connected to React
## Installation
```sh
npm install --save react-adss
```
## Usage
Create logic object:
```js
import { createLogic } from 'adss'
const logic = createLogic()
```
Set logic to provider:
```jsx harmony
<Provider logic={logic}>
    <MyContainer />
</Provider>
```
Create Container:
```jsx harmony
const MyComponent = (props) => {
  return <div>
      {props.value}
      <button onClick={props.onClick}>click</button>
      <input onChange={props.onChangeV2} value={props.v2}/>
   </div>
}

const stateToProps = (state) => ({
  value: state.y1.value,
  v2: state.y1.v2
})
const actionsToProps = {
  onClick: () => incdec(7,2),
  onChangeV2: ({ target: { value } }) => setV2(value)
}
const MyContainer = connect(stateToProps, actionsToProps)(MyComponent)
```
## License
MIT