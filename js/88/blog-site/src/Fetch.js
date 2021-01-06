// import MessageBox from "./MessageBox";
// import React from 'react';
// import {/*Link, */useHistory} from 'react-router-dom';

export default async function Fetch (url, setFunction/*, setMsg*/, setParentUsers) {
    // const history = useHistory();
    // let msgBox;
    //  async () => {
        try{
        const r = await fetch(url);
        if(!r.ok){
            throw new Error(`Woops! Something went wrong :( ${r.status}: ${r.statusText}`);
        }
        const litigant = await r.json();
        setFunction(litigant);
        setParentUsers && setParentUsers(litigant);
        console.log(setParentUsers && 'users', litigant/*, 'msgBox is ', msgBox*/);
    }catch(err){
        console.info(err);
        alert(err);
        // setMsg(err);
        // msgBox = <MessageBox msg={err} />;
        // msgBox = err;
        // history.push('/messagebox');
    }  
    // return {msgBox};
    // return (
    //     <div className="msgBox">
    //         <span className="msg">{msgBox || 'Error Message'}</span>
    //         <section className="buttons"><Link to="/" >OK</Link></section>
    //     </div>
    // );
// })();
}

// export default Fetch;