import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './TickerInput.css';

function TickerInput () {
    const api_key = 'OmZjY2QyNmJjMzBmYzE0YTk0YmE3NjJhNjAyYTExNmUy';
    const [symbol, setSymbol] = useState('');
    const [companies, setCompanies] = useState([]);

    (async function getCompanies(){
        if(!companies.length > 0){
                try{
                const r = await fetch(`https://api-v2.intrinio.com/companies?has_stock_prices=true&api_key=${api_key}`);
                if(!r.ok){
                    throw new Error(`Woops! Something went wrong :( ${r.status}: ${r.statusText}`);
                }
                const info = await r.json();
                setCompanies(info.companies);
                }catch(err){
                console.info(err);
                }
            }
        })()

        return (
            <aside>
                <label id="enterSymbol">
                    Enter Stock-Ticker Symbol
                    <input id="symbolInput" list="comp" placeholder="click to see list of companies" value={symbol} onChange={({target: t}) => setSymbol(t.value)}/>
                </label>
                <datalist id="comp" >
                    {companies.map(c => <option key={c.id} value={/*`${c.ticker} - ${c.name}`*/c.ticker} />)}
                </datalist>
                <Link to={`/stock/${symbol}`} >UPDATE</Link>
            </aside>
        );
    }

export default TickerInput; 