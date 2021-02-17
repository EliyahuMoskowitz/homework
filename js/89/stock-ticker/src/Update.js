import React, {useState, useEffect} from 'react';

// let oldPrice;
let intervalId;

function Update({symbol, isDesc}) {
    const api_key = 'OmZjY2QyNmJjMzBmYzE0YTk0YmE3NjJhNjAyYTExNmUy';
    let [info, setInfo] = useState({});
    // oldPrice = info.last_price;
    // let [oldPrice, setOldPrice] = useState(info.last_price);

    useEffect(() => {
        async function getStockInfo(){
            if(symbol){
                // oldPrice = info.last_price;
                try{
                // setOldPrice(info.last_price);
                // oldPrice = info.last_price;
                const r = await fetch(`https://api-v2.intrinio.com/securities/${symbol}/prices/realtime?api_key=${api_key}`);
                if(!r.ok){
                    throw new Error(`Woops! Something went wrong :( ${r.status}: ${r.statusText}`);
                }
                const update = await r.json();
                setInfo(update);
                }catch(err){
                console.info(err);
                }
            }
        }
        getStockInfo();
        intervalId && clearInterval(intervalId);
        intervalId = setInterval(() => {
            console.log('calling ... ');
            getStockInfo();
        }, 5000);
        // eslint-disable-next-line
    }, [symbol/*, info*/])

    const {last_price: oldPrice, open_price: price/*, updated_on: updated*/} = info;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    // const arrow = price > oldPrice ? '&uarr;' : '&darr;';
    const arrow = price >= oldPrice ? "\u2191" : "\u2193"; 
    const colorPrice = price >= oldPrice ? 'green' : 'red';

    let updateReturn = isDesc ? 
        <><span style={{color: colorPrice}}>${price || oldPrice}{arrow}</span>
        <span> &nbsp; Last Updated: {date /*updated*/} &nbsp; {time}</span></>
     : "Unable to access this company's stock-info at the moment. Please try again later.";

// html entities  &uarr; (up), &darr;  (down)
    return (
        <h2> {updateReturn} </h2>
    );
}

export default Update;