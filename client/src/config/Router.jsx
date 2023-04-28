import { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Create from '../pages/Create'
import Edit from '../pages/Edit'

const Router = () => {
  return (
    <Fragment>
        <Routes>
            <Route path='/' element={<Navigate to='/register' replace='true' />} />
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addproduct' element={<Create />} />
            <Route path='/editproduct/:id' element={<Edit />} />
        </Routes>
    </Fragment>
  )
}

export default Router