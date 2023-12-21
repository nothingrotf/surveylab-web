import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type RouterProps = {
  makeLogin: React.FC
}

export const Router: React.FC<RouterProps> = ({ makeLogin }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={ makeLogin } />
      </Routes>
    </BrowserRouter>
  )
}
