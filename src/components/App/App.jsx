import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { authUser } from '../../store/user'

import NotFound from '../NotFound/NotFound'
import MainLayout from '../MainLayout/MainLayout'
import Registration from '../Auth/Registration'
import Login from '../Auth/Login'
import Todos from '../MainLayout/Todos/Todos'
import CreateTodo from '../MainLayout/CreateTodo/CreateTodo'

import Alert from '../UI/Alert/Alert'
import Loader from '../UI/Loader/Loader'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const location = useLocation()

  useEffect(() => {
    dispatch(authUser())
  }, [])

  useEffect(() => {
    if (user.isAuth) navigate(location.state?.from?.pathname || '/', { replace: true })
  }, [user])

  return (
    <>

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Todos />} />
          <Route path="create" element={<CreateTodo />} />
        </Route>

        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Alert />
      <Loader />
    </>

  )
}

export default App