import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
      <Routes>
        <Route path='/' element={<LandingPage/>} exact/>
        <Route path='/mynotes' element={<MyNotes/>}/>
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
