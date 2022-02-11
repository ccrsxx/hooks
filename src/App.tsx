import { Component } from 'react';

interface AppStates {}

class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    const x = [1, 2, 3];
    return (
      <div className='App'>
        <h1>
          horny {x} {JSON.stringify(this.props)}
        </h1>
      </div>
    );
  }
}

export default App;
