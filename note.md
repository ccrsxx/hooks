# React Code Academy

## Using Object for Element Atribute JSX

Here’s an example of how that might work:

```tsx
// Use a variable to set the `height` and `width` attributes:

const sideLength = '200px';

const panda = (
  <img
    src='images/panda.jpg'
    alt='panda'
    height={sideLength}
    width={sideLength}
  />
);
```

Notice how in this example, the <img />‘s attributes each get their own line. This can make your code more readable if you have a lot of attributes on one element.

Object properties are also often used to set attributes:

```tsx
const pics = {
  panda: 'http://bit.ly/1Tqltv5',
  owl: 'http://bit.ly/1XGtkM3',
  owlCat: 'http://bit.ly/1Upbczi'
};

const panda = <img src={pics.panda} alt='Lazy Panda' />;

const owl = <img src={pics.owl} alt='Unimpressed Owl' />;

const owlCat = <img src={pics.owlCat} alt='Ghastly Abomination' />;
```

## Component Naming Conventions

JSX elements can be either HTML-like, or component instances. JSX uses capitalization to distinguish between the two! That is the React-specific reason why component class names must begin with capital letters. In a JSX element, that capitalized first letter says, “I will be a component instance and not an HTML tag.”

## Naming Event Listener When Passing it to a Component

One major source of confusion is the fact that names like onClick have special meaning, but only if they’re used on HTML-like elements.

Look at Button.js. When you give a \<button></button> an attribute named onClick, then the name onClick has special meaning. As you’ve learned, this special onClick attribute creates an event listener, listening for clicks on the \<button></button>:

```tsx
// Button.js

// The attribute name onClick
// creates an event listner:
<button onClick={this.props.onClick}>Click me!</button>
```

Now look at Talker.js. Here, when you give \<Button /> an attribute named onClick, then the name onClick doesn’t do anything special. The name onClick does not create an event listener when used on \<Button /> - it’s just an arbitrary attribute name:

```tsx
// Talker.js

// The attribute name onClick
// is just a normal attribute name:
<Button onClick={this.handleClick} />
```

The reason for this is that \<Button /> is not an HTML-like JSX element; it’s a component instance.

Names like onClick only create event listeners if they’re used on HTML-like JSX elements. Otherwise, they’re just ordinary prop names.

## Component Children

this.props.children
Every component’s props object has a property named children.

this.props.children will return everything in between a component’s opening and closing JSX tags.

So far, all of the components that you’ve seen have been self-closing tags, such as \<MyComponentClass />. They don’t have to be! You could write \<MyComponentClass></MyComponentClass>, and it would still work.

this.props.children would return everything in between \<MyComponentClass> and \</MyComponentClass>.

Look at BigButton.js. In Example 1, \<BigButton>‘s this.props.children would equal the text, “I am a child of BigButton.”

In Example 2, \<BigButton>‘s this.props.children would equal a \<LilButton /> component.

In Example 3, \<BigButton>‘s this.props.children would equal undefined.

If a component has more than one child between its JSX tags, then this.props.children will return those children in an array. However, if a component has only one child, then this.props.children will return the single child, not wrapped in an array.

## Component Life Cycle

Remember, the component lifecycle has three high-level parts:

1. Mounting, when the component is being initialized and put into the DOM for the first time
1. Updating, when the component updates as a result of changed state or changed props
1. Unmounting, when the component is being removed from the DOM

## Component WIll Unmout

Our clock is working, but it has an important problem. We never told the interval to stop, so it’ll keep running that function forever (or at least, until the user leaves/refreshes the page).

When the component is unmounted (in other words, removed from the page), that timer will keep on ticking, trying to update the state of a component that’s effectively gone. This means your users will have some JavaScript code running unnecessarily, which will hurt the performance of your app.

React will log a warning that looks something like this:

Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
Imagine if the clock gets mounted and unmounted hundreds of times—eventually, this will cause your page to become sluggish because of all of the unnecessary work. You’ll also see warnings in your browser console. Even worse, this can lead to subtle, annoying bugs.

All this bad stuff can happen if we fail to clean up a side-effect of a component. In our case this is a call to setInterval(), but components can have lots of other side-effects: loading external data with AJAX, doing manual tweaking of the DOM, setting a global value, and more. We try to limit our side-effects, but it’s difficult to build an interesting app with truly zero side-effects.

In general, when a component produces a side-effect, you should remember to clean it up.

JavaScript gives us the clearInterval() function. setInterval() can return an ID, which you can then pass into clearInterval() to clear it. Here’s the code we’ll want to use:

```tsx
const oneSecond = 1000;
this.intervalID = setInterval(() => {
  this.setState({ date: new Date() });
}, oneSecond);

// Some time later...
clearInterval(this.intervalID);
```

At a high level, we want to continue to set up our setInterval() in componentDidMount(), but then we want to clear that interval when the clock is unmounted.

Let’s introduce a new lifecycle method: componentWillUnmount(). componentWillUnmount() is called in the unmounting phase, right before the component is completely destroyed. It’s a useful time to clean up any of your component’s mess.

In our case, we’ll use it to clean up the clock’s interval.

## Component Life Cycle

We’ve come to the end of the lesson. We’ve learned about the three major phases of a component’s lifecycle:

1. Mounting, when the component is being initialized and put into the DOM for the first time. We saw that the constructor, render(), and componentDidMount() are called during this phase.
2. Updating, when the component updates as a result of changed state or changed props. We saw that render() and componentDidUpdate() are called during this phase.
3. Unmounting, when the component is being removed from the DOM. We saw that componentWillUnmount() was called here, which was a good time to clean things up.

## Note

- You can get prevProps and state with componetDidUpdate(), it's not necessarily limit to shouldCompoentUpdate()


