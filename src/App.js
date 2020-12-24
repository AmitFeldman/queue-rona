import './App.css';
import AddAppointment from './components/AddAppointment';
import Container from '@material-ui/core/Container';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <body dir="rtl">
        <Container>
          <Switch>
            <Route exact path="/" component={AddAppointment} />
          </Switch>
        </Container>
      </body>
    </div>
  );
}

export default App;
