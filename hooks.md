# React Hooks

## useState

useState() is a JavaScript function defined in the React library. When we call this function, it returns an array with two values:

- current state - the current value of this state
- state setter - a function that we can use to update the value of this state

Hooks:

```tsx
import React, { useState } from 'react';

function Toggle() {
  const [toggle, setToggle] = useState();

  return (
    <div>
      <p>The toggle is {toggle}</p>
      <button onClick={() => setToggle('On')}>On</button>
      <button onClick={() => setToggle('Off')}>Off</button>
    </div>
  );
}
```

class:

```tsx
import { Component } from 'react';

class App extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      toggle: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(toggle: string) {
    this.setState({
      toggle
    });
  }

  render() {
    return (
      <div>
        <p>The toggle is {toggle}</p>
        <button onClick={this.handleChange('On')}>On</button>
        <button onClick={this.handleChange('Off')}>Off</button>
      </div>
    );
  }
}
```

No need to worry about binding functions to class instances, working with constructors, or dealing with the this keyword. With the State Hook, updating state is as simple as calling a state setter function.

**Calling the state setter signals to React that the component needs to re-render, so the whole function defining the component is called again. The magic of useState() is that it allows React to keep track of the current value of state from one render to the next!**

### Note

There are three ways in which this code affects our component:

- During the first render, the initial state argument is used.

- When the state setter is called, React ignores the initial state argument and uses the new value.

- When the component re-renders for any other reason, React continues to use the same value from the previous render.

If we don’t pass an initial value when calling useState(), then the current value of the state during the first render will be undefined. Often, this is perfectly fine for the machines, but it can be unclear to the humans reading our code.

**So, we prefer to explicitly initialize our state. If we don’t have the value needed during the first render, we can explicitly pass null instead of just passively leaving the value as undefined.**
