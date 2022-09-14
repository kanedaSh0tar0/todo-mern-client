import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { checkAuth } from '../../store/user'

import NotFound from '../NotFound/NotFound'
import MainLayout from '../MainLayout/MainLayout'
import Registration from '../Auth/Registration'
import Login from '../Auth/Login'
import Todos from '../MainLayout/Todos/Todos'
import CreateTodo from '../MainLayout/CreateTodo/CreateTodo'

import { getTodos } from '../../store/todos'
import { getFolders } from '../../store/folders'

import Alert from '../UI/Alert/Alert'
import Loader from '../UI/Loader/Loader'

import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

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