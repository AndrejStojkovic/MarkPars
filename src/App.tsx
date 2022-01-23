import React from 'react';

import Header from './components/header';
import Parser from './components/parser';
import Footer from './components/footer';

const App = () => {
  return (
    <div id="main">
      <Header />
      <Parser />
      <Footer />
    </div>
  );
}

export default App;