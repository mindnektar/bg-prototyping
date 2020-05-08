import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'polyfills';
import history from 'hashHistory';
import App from './components/App';
import '../style/app.sass';

const render = (AppComponent) => {
    ReactDOM.render(
        <Router history={history}>
            <AppComponent />
        </Router>,
        document.getElementById('app'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}
