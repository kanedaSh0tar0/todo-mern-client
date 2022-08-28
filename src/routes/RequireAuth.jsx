import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import Loader from '../components/UI/Loader/Loader'

function RequireAuth({ children }) {
    const location = useLocation()
    const user = useSelector(state => state.user)


    if (user.status === 'pending' || user.status === '') return <Loader />

    if (!user.isAuth) return <Navigate to="login" replace state={{ from: location }} />

    return children

}

export default RequireAuth