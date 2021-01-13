import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Update from './Update';
import './StockInfo.css';

function StockInfo () {
    const api_key = 'OmZjY2QyNmJjMzBmYzE0YTk0YmE3NjJhNjAyYTExNmUy';
    let [stockInfo, setStockInfo] = useState({});
    let {symbol} = useParams();

    useEffect(() => {
        (async function getStockInfo(){
            if(symbol){
                try{
                const r = await fetch(`https://api-v2.intrinio.com/companies/${symbol}?api_key=${api_key}`);
                if(!r.ok){
                    throw new Error(`Woops! Something went wrong :( ${r.status}: ${r.statusText}`);
                }
                const info = await r.json();
                setStockInfo(info);
                }catch(err){
                console.info(err);
                }
            }
        })();
    }, [symbol])

    const {ticker, name, short_description: desc} = stockInfo;
        return (
            <div id="compInfo" >
                <h1>{ticker} - {name}</h1>
                <p>{desc}</p>
                <Update symbol={symbol} />
            </div>
        );
    }


export default StockInfo;