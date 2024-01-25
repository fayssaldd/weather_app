import React from 'react';
import './App.module.scss';
import { Button, Container } from 'react-bootstrap';
import SearchBar from './components/SearchBar/SearchBar';
import Wallpaper from './components/Wallpaper/Wallpaper';
import Weather from './components/Weather/Weather';
import { Provider } from 'react-redux';
import { store } from './app/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Wallpaper/>
        <Container>
          <SearchBar/>
          <Weather/>
        </Container>
      </Provider>
      
    </div>
  );
}

export default App;
