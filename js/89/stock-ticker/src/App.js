import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import TickerInput from './TickerInput';
import StockInfo from './StockInfo';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <TickerInput />  
        <Route path="/stock/:symbol" >
          <StockInfo />
        </Route>
      </BrowserRouter>
    </div>  
  );
}

export default App;
