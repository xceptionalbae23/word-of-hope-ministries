import React from "react";
import "./App.css";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Leadership from './components/Leadership';
import Sermons from './components/Sermons';
import Ministries from './components/Ministries';
import Events from './components/Events';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Donate from './components/Donate';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Leadership />
      <Sermons />
      <Ministries />
      <Events />
      <Testimonials />
      <Blog />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;