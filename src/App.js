import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

const App = () => {

    // Initialising state
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("amd");
    const [to, setTo] = useState("usd");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    // If the user switches the currency then update options and convert
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])

    // Function to convert the currency
    function convert() {
        const rate = info[to];
        setOutput(input * rate);
    }

    // Function to switch between two currencies
    function flip() {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input type="text"
                           placeholder="Enter the amount"
                           onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <select
                            name="select"
                            value={from}
                            onChange={(e) => { setFrom(e.target.value) }}>
                                { options.map(currency => {
                                    return (<option
                                        value={currency}
                                        key={currency}>
                                        {currency}
                                    </option>)
                                }) }
                    </select>
                </div>
                <div className="switch">
                    <button onClick={() => { flip() }}>
                        Switch
                    </button>
                </div>
                <div className="right">
                    <h3>To</h3>
                    <select
                        name="select"
                        value={to}
                        onChange={(e) => { setTo(e.target.value) }}>
                        { options.map(currency => {
                            return (<option
                                value={currency}
                                key={currency}>
                                {currency}
                            </option>)
                        }) }
                    </select>
                </div>
            </div>
            <div className="result">
                <button onClick={()=>{convert()}}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>

            </div>
        </div>
    );
}

export default App;