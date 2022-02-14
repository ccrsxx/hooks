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

**Often, the next value of our state is calculated using the current state. In this case, it is best practice to update state with a callback function. If we do not, we risk capturing outdated, or “stale”, state values.**

When our state setter calls the callback function, this state setter callback function takes our previous count as an argument. The value returned by this state setter callback function is used as the next value of count (in this case prevCount + 1). Note: We can just call setCount(count +1) and it would work the same in this example… but for reasons that are out of scope for this lesson, it is safer to use the callback method.

We like to define static data models outside of our function components since they don’t need to be recreated each time our component re-renders. In our JSX, we use the map method to render a button for each of the toppings in our options array.

Always simplify your state setter callback functions. If you are using a callback function, you can always use an arrow function.

Always simplify your state by dividing it into smaller pieces. If you have a state that is too large, you can always break it into smaller pieces. Don't nest too many levels of state. Only exception is if you are using form data.

### useState hook Review

- With React, we feed static and dynamic data models to JSX to render a view to the screen
- Use Hooks to “hook into” internal component state for managing dynamic data in function components
- We employ the State Hook by using the code below:
- currentState to reference the current value of state
- stateSetter to reference a function used to update the value of this state
- the initialState argument to initialize the value of state for the component’s first render

  ```tsx
  const [currentState, stateSetter] = useState(initialState);
  ```

- Call state setters in event handlers
- Define simple event handlers inline with our JSX event listeners and define complex event handlers outside of our JSX
- Use a state setter callback function when our next value depends on our previous value
- Use arrays and objects to organize and manage related data that tends to change together
- Use the spread syntax on collections of dynamic data to copy the previous state into the next state like so: setArrayState((prev) => [ ...prev ]) and setObjectState((prev) => ({ ...prev }))
- Split state into multiple, simpler variables instead of throwing it all into one state object

## useEffect Hook

Most interesting components will re-render multiple times throughout their lifetime and these key moments present the perfect opportunity to execute these “side effects”.

There are three key moments when the Effect Hook can be utilized:

- When the component is first added, or mounted, to the DOM and renders
- When the state or props change, causing the component to re-render
- When the component is removed, or unmounted, from the DOM.

Notice how we use the current state inside of our effect. Even though our effect is called after the component renders, we still have access to the variables in the scope of our function component!

When React renders our component, it will update the DOM as usual, and then run our effect after the DOM has been updated. This happens for every render, including the first and last one.

If second parameter is not provided, the effect will run every time the component renders.

If our effect didn’t return a cleanup function, then a new event listener would be added to the DOM’s document object every time that our component re-renders. Not only would this cause bugs, but it could cause our application performance to diminish and maybe even crash!

Because effects run after every render and not just once, React calls our cleanup function before each re-render and before unmounting to clean up each effect call.

If our effect returns a function, then the useEffect() Hook always treats that as a cleanup function. React will call this cleanup function before the component re-renders or unmounts. Since this cleanup function is optional, it is our responsibility to return a cleanup function from our effect when our effect code could create memory leaks.

## useEffect Part Two (componentDidMount and componentDidUpdate)

The useEffect() function calls its first argument (the effect) after each time a component renders. We’ve learned how to return a cleanup function so that we don’t create performance issues and other bugs, but sometimes we want to skip calling our effect on re-renders altogether.

It is common, when defining function components, to run an effect only when the component mounts (renders the first time), but not when the component re-renders. The Effect Hook makes this very easy for us to do! If we want to only call our effect after the first render, we pass an empty array to useEffect() as the second argument. This second argument is called the dependency array.

The dependency array is used to tell the useEffect() method when to call our effect and when to skip it. Our effect is always called after the first render but only called again if something in our dependency array has changed values between renders.

We will continue to learn more about this second argument over the next few exercises, but for now, we’ll focus on using an empty dependency array to call an effect when a component first mounts, and if a cleanup function is returned by our effect, calling that when the component unmounts.

```tsx
useEffect(() => {
  alert('component rendered for the first time');
  return () => {
    alert('component is being removed from the DOM');
  };
}, []);

// same as
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    alert('component rendered for the first time');
  }

  componentWillUnmount() {
    alert('component is being removed from the DOM');
  }
}
```

Without passing an empty array as the second argument to the useEffect() above, those alerts would be displayed before and after every render of our component, which is clearly not when those messages are meant to be displayed. Simply, passing [] to the useEffect() function is enough to configure when the effect and cleanup functions are called!

Use empty dependency, if you want to implement add first and remove at the very end when component is being unmounted, similiar to the componentDidMount and componentWillUnmount in the previous example.

If you're using the event listeners, you need to remove its effect everytime the component is being re-rendered.

## Note Effect Hook

When the data that our components need to render doesn’t change, we can pass an empty dependency array, so that the data is fetched after the first render. When the response is received from the server, we can use a state setter from the State Hook to store the data from the server’s response in our local component state for future renders. Using the State Hook and the Effect Hook together in this way is a powerful pattern that saves our components from unnecessarily fetching new data after every render!

An empty dependency array signals to the Effect Hook that our effect never needs to be re-run, that it doesn’t depend on anything. Specifying zero dependencies means that the result of running that effect won’t change and calling our effect once is enough.

A dependency array that is not empty signals to the Effect Hook that it can skip calling our effect after re-renders unless the value of one of the variables in our dependency array has changed. If the value of a dependency has changed, then the Effect Hook will call our effect again!

Here’s a nice example from the official React docs:

```tsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if the value stored by count changes
```

It's best practice to put a function inside of the useEffect.

## Rules of Hooks

There are two main rules to keep in mind when using Hooks:

- only call Hooks at the top level
- only call Hooks from React functions

As we have been practicing with the State Hook and the Effect Hook, we’ve been following these rules with ease, but it is helpful to keep these two rules in mind as you take your new understanding of Hooks out into the wild and begin using more Hooks in your React applications.

When React builds the Virtual DOM, the library calls the functions that define our components over and over again as the user interacts with the user interface. React keeps track of the data and functions that we are managing with Hooks based on their order in the function component’s definition. For this reason, we always call our Hooks at the top level; we never call hooks inside of loops, conditions, or nested functions.

Instead of confusing React with code like this:

```tsx
if (userName !== '') {
  useEffect(() => {
    localStorage.setItem('savedUserName', userName);
  });
}
```

We can accomplish the same goal, while consistently calling our Hook every time:

```tsx
useEffect(() => {
  if (userName !== '') {
    localStorage.setItem('savedUserName', userName);
  }
});
```

Secondly, Hooks can only be used in React Functions. We cannot use Hooks in class components and we cannot use Hooks in regular JavaScript functions. We’ve been working with useState() and useEffect() in function components, and this is the most common use. The only other place where Hooks can be used is within custom hooks. Custom Hooks are incredibly useful for organizing and reusing stateful logic between function components. For more on this topic, head to the React Docs.

**Always put dependency in useEffect(), don't leave it empty.**

## Separate Hooks for Separate Effects

When multiple values are closely related and change at the same time, it can make sense to group these values in a collection like an object or array. Packaging data together can also add complexity to the code responsible for managing that data. Therefore, it is a good idea to separate concerns by managing different data with different Hooks.

Compare the complexity here, where data is bundled up into a single object:

```tsx
// Handle both position and menuItems with one useEffect hook.
const [data, setData] = useState({ position: { x: 0, y: 0 } });
useEffect(() => {
  get('/menu').then((response) => {
    setData((prev) => ({ ...prev, menuItems: response.data }));
  });
  const handleMove = (event) =>
    setData((prev) => ({
      ...prev,
      position: { x: event.clientX, y: event.clientY }
    }));
  window.addEventListener('mousemove', handleMove);
  return () => window.removeEventListener('mousemove', handleMove);
}, []);
```

To the simplicity here, where we have separated concerns:

```tsx
// Handle menuItems with one useEffect hook.
const [menuItems, setMenuItems] = useState(null);
useEffect(() => {
  get('/menu').then((response) => setMenuItems(response.data));
}, []);

// Handle position with a separate useEffect hook.
const [position, setPosition] = useState({ x: 0, y: 0 });
useEffect(() => {
  const handleMove = (event) =>
    setPosition({ x: event.clientX, y: event.clientY });
  window.addEventListener('mousemove', handleMove);
  return () => window.removeEventListener('mousemove', handleMove);
}, []);
```

It is not always obvious whether to bundle data together or separate it, but with practice, we get better at organizing our code so that it is easier to understand, add to, reuse, and test!

## Best Practice

```tsx
import React, { useState, useEffect } from 'react';
import { get } from './mockBackend/fetch';

export default function SocialNetwork() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    get('/menu').then((response) => {
      setMenu(response.data);
    })
  }, []);

  const [newsFeed, setNewsFeed] = useState(null);

  useEffect(() => {
    get('/news-feed').then((response) => {
      setNewsFeed(response.data);
    })
  }, []);

  const [friends, setFriends] = useState(null);

  useEffect(() => {
    get('/friends').then((response) => {
      setFriends(response.data);
    })
  }, []);
```

## Hooks Summary

In this lesson, we learned how to write effects that manage timers, manipulate the DOM, and fetch data from a server. In earlier versions of React, we could only have executed this type of code in the lifecycle methods of class components, but with the Effect Hook, we can perform these types of actions in function components with ease!

Let’s review the main concepts from this lesson:

- useEffect() - we can import this function from the 'react' library and call it in our function components
- effect - refers to a function that we pass as the first argument of the useEffect() function. By default, the Effect Hook calls this effect after each render
- cleanup function - the function that is optionally returned by the effect. If the effect does anything that needs to be cleaned up to prevent memory leaks, then the effect returns a cleanup function, then the Effect Hook will call this cleanup function before calling the effect again as well as when the component is being unmounted
- dependency array - this is the optional second argument that the useEffect() function can be called with in order to prevent repeatedly calling the effect when this is not needed. This array should consist of all variables that the effect depends on.
  The Effect Hook is all about scheduling when our effect’s code gets executed. We can use the dependency array to configure when our effect is called in the following ways:

Dependency Array Effect called after first render & …
undefined every re-render
Empty array no re-renders
Non-empty array when any value in the dependency array changes
Hooks gives us the flexibility to organize our code in different ways, grouping related data as well as separating concerns to keep code simple, error-free, reusable, and testable!
