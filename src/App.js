import React from 'react';
// import React, {useState} from 'react';
// import logo from './logo.svg';
import {
    Switch,
    Route
} from "react-router-dom";
import Form from "./components/Form";
import Chart from "./chart";
import './App.css';

function App() {
    // let history = useHistory();
    // const [count, setCount] = useState(0);
    // const [something, setSomething] = useState("");



    // function hendler() {
    //     history.push("/home");
    // }

  return (
    <div className="App">
        {/*<div onClick={hendler}>dfsfdsfsdf</div>*/}
        {/*<button onClick={() => setCount(count + 1)}>*/}
            {/*Click me*/}
        {/*</button>*/}
      {/*<header className="App-header">*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
          {/*Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
          {/*className="App-link"*/}
          {/*href="https://reactjs.org"*/}
          {/*target="_blank"*/}
          {/*rel="noopener noreferrer"*/}
        {/*>*/}
          {/*Learn React*/}
        {/*</a>*/}
      {/*</header>*/}

      <Switch>
            <Route exact path="/">
                <Form/>
            </Route>
            <Route exact path="/chart">
                <Chart/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
