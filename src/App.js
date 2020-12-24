import './App.css';
import React from 'react';
import AddAppointment from './components/AddAppointment';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';

const Component2 = () => <div>2</div>;
const Component3 = () => <div>3</div>;
const Component4 = () => <div>4</div>;

function App() {
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route exact path="/" component={AddAppointment} />
          <Route path="/2" component={Component2} />
          <Route path="/3" component={Component3} />
          <Route path="/4" component={Component4} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
