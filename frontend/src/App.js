import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import LoginPage from './screens/LoginPage/LoginPage';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SIngleNote'
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [search, setSearch] = useState("")
  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
        <Routes>
          <Route path='/' element={<LandingPage/>} exact/>
          <Route path='/mynotes' element={<MyNotes search={search}/>} exact/>
          <Route path='/profile' element={<ProfileScreen/>} exact/>
          <Route path='/login' element={<LoginPage/>} exact/>
          <Route path='/register' element={<RegisterPage/>} exact/>
          <Route path='/createnote' element={<CreateNote/>} exact/>
          <Route path='/note/:id' element={<SingleNote/>} exact/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
