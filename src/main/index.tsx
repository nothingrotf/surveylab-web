import React from 'react'
import { Router } from '@/presentation/components'
import { createRoot } from 'react-dom/client'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/pages/login/login-factory'

const container = document.getElementById('main')
const root = createRoot(container)
root.render(
  <Router
    makeLogin={makeLogin}
  />
)
