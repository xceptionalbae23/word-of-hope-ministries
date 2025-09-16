import React from "react";
import "./App.css";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Sermons from './components/Sermons';
import Ministries from './components/Ministries';
import Events from './components/Events';
import Blog from './components/Blog';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Sermons />
      <Ministries />
      <Events />
      <Blog />
    </div>
  );
}

export default App;