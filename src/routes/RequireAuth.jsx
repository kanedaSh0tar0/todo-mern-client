import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
    const location = useLocation()
    const user = useSelector(state => state.user)

    if (!user.isAuth && user.status !== 'pending') return <Navigate to="login" replace state={{ from: location }} />

    return children
}

export default RequireAuth