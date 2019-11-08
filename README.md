# Mini Redux

This is a simple example showing how to create a similar API to modern Redux using only React built-in hooks.

## Run locally

1. Clone this repo and `cd` into the directory
1. Run `npm install`
1. Run `npm start`

## How it works

### Creating our state

We use React's `useReducer` hook to manage our state globally. This gives us back our state object and a `dispatch` function for updating the state.

```js
const initialState = {}

function reducer(state, action) {
  switch (action.type) {
    case default:
      return state
  }
}
```

Our `initalState` is a normal object. Our `reducer` is a Redux-style reducer function that takes our state and an action object as arguments, and returns the new state value.

### Providing state

We want to avoid passing the state and `dispatch` as props, as we could need them in a very deep component. So we'll use React context to make them accessible to any component anywhere in the tree.

It's a good idea to pass the state and `dispatch` separately, for performance reasons. `dispatch` will never change, which means a component that _only_ accesses it will not update needlessly. If we passed state and `dispatch` together then every component would update when the state changed, even if it didn't access the state.

```js
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <StateProvider value={state}>
      <DispatchProvider value={dispatch}>
        {/* our components */}
      </DispatchProvider>
    </StateProvider>
  );
}
```

### Accessing state

We can access state using the `useSelector` hook provided by `"./not-redux.js"`. It works like the Redux hook, taking a selector function that receives the whole state object and returns just the bit you need.

```js
import { useSelector } from "./not-redux";

function Thing() {
  const example = useSelector(state => state.example);
  return <div>{example}</div>;
}
```

Under-the-hood this hook grabs the whole state object from context, calls your selector with it, then returns the result.

```js
function useSelector(selector) {
  const state = React.useContext(StateContext);
  const slice = selector(state);
  return slice;
}
```

### Updating state

We can update state by getting the `dispatch` function from context with the `useDispatch` hook. It returns the `dispatch` function from `React.useReducer`.

```js
import { useDispatch } from "./not-redux";

function Update() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch({ type: "do_thing" })}>Update</button>;
}
```

Under-the-hood this hook just gets `dispatch` from context and returns it.

```js
function useDispatch() {
  const dispatch = React.useContext(DispatchContext);
  return dispatch;
}
```
