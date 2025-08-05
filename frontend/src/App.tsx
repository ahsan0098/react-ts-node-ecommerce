import { RouterProvider } from 'react-router-dom'
import './App.css'
import AppRouter from './lib/routers/app-router'
import { GlobalContextApi } from './contexts/Global'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <div className="max-w-full bg-gray-50 dark:bg-white text-gray-900 dark:text-gray-100 text-sm dark:border-gray-600 border-gray-900">

      <GlobalContextApi>
        <RouterProvider router={AppRouter} />
      </GlobalContextApi>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}

export default App
