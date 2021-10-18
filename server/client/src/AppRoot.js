import React,{useState} from 'react';
import AppContext from './AppContext';

function AppRoot(props){

    const [debug, setdebug] = useState(true);
    const [appLoaded, setappLoaded] = useState(false); 

    return (
        <AppContext.Provider value={{
            getDebug: () => {return debug; },
            setdebug: setdebug,
            appLoaded : ()=>{return appLoaded;},
            setappLoaded: mod => {setappLoaded(mod)}
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppRoot;