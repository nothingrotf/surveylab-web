import React from 'react'
import { Router } from '@/presentation/components'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('main')
const root = createRoot(container)
root.render(<Router />)
