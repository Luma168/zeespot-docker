import { BrowserRouter, Route } from 'react-router-dom';
import React from "react"
import Layout from './components/Layout';
import Home from './views/Home';
import Gallery from './views/Galleries/Gallery';
import FirstGallery from './views/Galleries/FirstGallery';
import GalleryForm from './views/Galleries/GalleryForm';
import Test from './components/galleries/GalleryLayoutSelect'
import AuthProvider from './provider/AuthProvider';
import Routes from "./routes";

function App() {
  return (
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path='/' element={<Layout />}>
    //         <Route index element={<Home />} />
    //         <Route path="first-gallery" element={<FirstGallery />} />
    //         <Route path="first-gallery/gallery-form" element={<GalleryForm />} />
    //         <Route path="gallery" element={<Gallery />} />
    //         {/* <Route path="test" element={<Test />} /> */}
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
