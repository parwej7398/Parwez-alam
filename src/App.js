import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './Componante/Blog';
import BlogDetails from './Componante/BlogDetails';
import Login from './Componante/Login';
import SignUp from './Componante/SignUp';
import ProfileMenu from './ProfileMenu';
import ProfileDetail from './ProfileDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Blog} />
          <Route path='//blog/:blog_id' Component={BlogDetails} />
          <Route path='/sign_up' Component={SignUp} />
          <Route path='/login' Component={Login} />
          <Route path='/profile_details' Component={ProfileDetail} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
