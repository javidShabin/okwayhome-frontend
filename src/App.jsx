import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  )
}

export default App
