import React from 'react'
import { Login } from '@/presentation/pages'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('main')
const root = createRoot(container)
root.render(<Login />)
