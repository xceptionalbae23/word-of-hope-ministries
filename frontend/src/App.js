import React from "react";
import "./App.css";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      {/* More sections will be added */}
    </div>
  );
}

export default App;