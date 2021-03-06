import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import theme from './theme/mui-theme';
import {SoldiersProvider} from './context/soldiers-context';
import {StationsProvider} from './context/stations-context';

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const ContextProvider = ({children}) => (
  <SoldiersProvider>
    <StationsProvider>{children}</StationsProvider>
  </SoldiersProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <ContextProvider>
              <App />
            </ContextProvider>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
