import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from "redux-promise"
import ReduxThunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import reducers from "./reducers";
import Landing from "./components/Landing";
import Chat from "./components/Chat";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/" component={Landing}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector(".container")
);