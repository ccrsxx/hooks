import React from 'react';
import ReactDOM from 'react-dom';

const fiftyFifty = Math.random() < 0.5;

// New component class starts here:

class TonightsPlan extends React.Component {
  render() {
    return <h1>{`Tonight I'm going ${fiftyFifty ? 'out' : 'to bed'} WOO`}</h1>;
  }
}

ReactDOM.render(<TonightsPlan />, document.getElementById('root'));

export default undefined;
