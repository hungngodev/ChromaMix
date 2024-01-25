import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import PaletteZoom from './components/PaletteZoom';

import TintShade from './components/TintShade';
import './sass/App.scss';


function App() {

  return (
    <div className="App">

      <Navbar />
      {/* <div className="container"></div> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/palette-zoom' element={<PaletteZoom />} />
        <Route path='/palette/:id' element={<PaletteZoom />} />
        <Route path='/tint-and-shade-generator/:colorHex' element={<TintShade />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* <Loader /> */}
      {/* <Loader2 /> */}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
