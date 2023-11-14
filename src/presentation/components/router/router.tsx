import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import '@/presentation/styles/global.scss'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={ Login } />
      </Routes>
    </BrowserRouter>
  )
}