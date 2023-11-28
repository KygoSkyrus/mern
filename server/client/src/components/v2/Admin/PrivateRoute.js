import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard.js';
import Orders from './Orders.js'
import Users from './Users.js'
import BagLoader from '../BagLoader.jsx';

const PrivateRoute = ({ isAuthSuccess, route }) => {
    console.log('isAuthSuccess', isAuthSuccess, route)


    if (isAuthSuccess === null) {
        // Still loading, show a loader or any loading indicator
        return <BagLoader />;
    }
    if (isAuthSuccess) {
        if (route === "dashboard") return <Dashboard />
        if (route === "orders") return <Orders />
        if (route === "users") return <Users />
    } else {
        return <Navigate to={`/admin/login/${route}`} state={isAuthSuccess} />;
    }

};

export default PrivateRoute