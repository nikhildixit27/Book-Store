import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
// import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import { SingleBook } from './pages/Shop/SingleBook';

import DashboardLayout from './pages/DashBoard/DashboardLayout';
import { UploadBook } from './pages/DashBoard/UploadBook';
import { Dashboard } from './pages/DashBoard/Dashboard';
import { ManageBook } from './pages/DashBoard/ManageBook';
import { EditBook } from './pages/DashBoard/EditBook';

import { Signup } from './pages/Auth/Signup';
import { Login } from './pages/Auth/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './Context/AuthProvider';
import Cart from './components/Cart';
// import { PrivateRoute } from './PrivateRoute/PrivateRoute';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <div className=''>

          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/about' element={<About />} /> */}
            <Route path='/shop' element={<Shop />} />
            <Route
              path='/book/:id'
              element={<SingleBook />
              }
            />

            <Route path='/cart' element={<Cart />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

            {/* Admin Routes */}
            <Route path='/admin' element={<DashboardLayout />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='dashboard/upload' element={<UploadBook />} />
              <Route path='dashboard/manage' element={<ManageBook />} />
              <Route path='dashboard/edit/:id' element={<EditBook />} />
            </Route>
          </Routes>
          
        </div>
      </Router>
      <ToastContainer />

      {/* <Router>
        <Routes>
          
        </Routes>
      </Router> */}
    </>
  );
}

export default App;