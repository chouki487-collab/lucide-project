

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout  from './pages/Layout'
import Home    from  './pages/Home'
import Nopage  from './pages/Nopage'
import Calculact from './pages/Calculact'
import Createact from './pages/Createact'
import Notaryfinder from './pages/Notaryfinder'
import Iframee from './pages/Iframee'
import Contactt from './pages/Contactt'
import Login from './pages/Login'
import { ContextProvider } from './components/Auth'
import RequireAuth from './components/RequireAth'


function App() {

  
  return ( 


  <BrowserRouter>
      
       <ContextProvider>
       <Routes>      
        <Route  path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path="Calculact" element={<RequireAuth><Calculact /></RequireAuth>} />
           <Route path="Createact" element={<RequireAuth><Createact/></RequireAuth>} />
           <Route path="Notaryfinder" element={<RequireAuth><Notaryfinder/></RequireAuth>} />
           <Route path="Iframee" element={<Iframee/>} />
           <Route path="Contactt" element={<Contactt/>} />
          <Route path="*" element={<Nopage />} />      
        </Route>  
        <Route path="/Login" element={<Login />} /> 
      </Routes>
    </ContextProvider>
   </BrowserRouter> 

   
  )
}
export default App

