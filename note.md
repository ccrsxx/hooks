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
