import React from 'react';
import AppContext from './AppContext';

import {Route,HashRouter} from 'react-router-dom'; 

//screens
import App from './App';
//css
import './App.css'
import mainlogo from './components/images/mainlogo1.png'


function AppLoaded(props) {

    const splash = () => {
        return (
            <div className="mainlogo">
                <div className="logo-bg-outer">
                <div className="logo-bg">
                    <img src={mainlogo}  alt="logo" />
                </div>
                </div>
                <p className="by">by dheeraj gupta</p>
            </div>
        )
    }

    const loadApp = async (context) => {
        setTimeout(() => {
            context.setappLoaded(true);
        }, 1000);
    }

    return (
        <AppContext.Consumer>
            {
                context => {
                    return (
                        context.appLoaded() ?
                            <div>
                                <HashRouter>
                                    <div className="app-content">
                                        <Route path="/" component={App} /> 
                                    </div>
                                </HashRouter>
                            </div>
                            :
                            <AppContext.Consumer>
                                {
                                    context => {
                                        loadApp(context);
                                        return (splash(context))
                                    }
                                }
                            </AppContext.Consumer>
                    )
                }
            }
        </AppContext.Consumer>
    )
}

export default AppLoaded;