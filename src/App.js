import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import SingleCocktail from './pages/SingleCocktail';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path='/cocktail/:id' element={<SingleCocktail></SingleCocktail>}></Route>
      </Routes>
    </div>
  );
}

export default App;
