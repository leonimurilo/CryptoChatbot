import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from "redux-promise"
import ReduxThunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Link} from "react-router-dom";

import reducers from "./reducers";
import Landing from "./components/Landing";
import Chat from "./components/Chat";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <header>
                    <nav className="nav has-shadow">
                        <div className="container">
                            <div className="nav-left">
                                <span className="nav-item">
                                    <Link className="button is-inverted is-info is-2" to="/">Home</Link>
                                </span>
                                <span className="nav-item">
                                    <Link className="button is-inverted is-info is-2" to="/chat">Chat</Link>
                                </span>
                            </div>
                            <div className="nav-right nav-menu">
                                <span className="nav-item">
                                    <a className="button is-inverted is-info"
                                       target="_blank"
                                       href="https://github.com/leonimurilo/CryptoChatbot">
                                      <span>GitHub</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </nav>
                </header>
                <section className="section">
                    <Switch>
                        <Route path="/chat" component={Chat}/>
                        <Route path="/" component={Landing}/>
                    </Switch>
                </section>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector("#main")
);