import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MessageContextProvider } from './ContextApi/MessagesContextApi.jsx'; 
import { UserContextProvider } from './ContextApi/UserContextApi.jsx';
import { FriendContextProvider } from './ContextApi/FriendContextApi.jsx';

// Import Pages / Routes
import App from './App.jsx'
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';

const router = createBrowserRouter([ 
  {
    path: '/MainApp', 
    element: (
      <>
        <App />
      </>
    )
  },
  {
    path: '/',
    element: (
      <>
        <SignUp />
      </>
    )
  }, 
  {
    path: '/Login', 
    element: (
      <>
        <Login />
      </>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <UserContextProvider>  
    <FriendContextProvider>
      <MessageContextProvider>
          <RouterProvider router={router}/>
        </MessageContextProvider>
    </FriendContextProvider>      
  </UserContextProvider>
)
