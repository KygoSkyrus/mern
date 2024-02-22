import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard.js';
import Orders from './Orders.js'
import Users from './Users.js'
import BagLoader from '../loaders/BagLoader'

const PrivateRoute = ({ isAuthSuccess, route }) => {

    if (isAuthSuccess === null) {
        return <BagLoader /> // still loading
    }
    if (isAuthSuccess) {
        if (route === "dashboard") return <Dashboard />
        if (route === "orders") return <Orders />
        if (route === "users") return <Users />
    } else {
        return <Navigate to={`/admin/login/${route}`} replace={true} />;
    }

};

export default PrivateRoute