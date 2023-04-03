import {useState} from 'react';
import useForceUpdate from 'use-force-update';


const Home = () => {

    var [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const forceUpdate = useForceUpdate();


    const saveText = async(e) => {
        await setText(e.target.value);
        console.log("text is here -> ",text);
        forceUpdate();
        setShow(false);
        setData([]);
    }


    const searchWeather = async(e) => {
        await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3451e462d0a4efebff142535230204&q=${text}&days=5`)
        .then(res => res.json())
        .then(apiData => 
            {data.push(apiData)
            console.log('weather data -> ', apiData)}
        )
        console.log('data state is',data.length , data[0]);
        setShow(true);
        forceUpdate();
    }

    return (
        <div className="Home-div">
            <div className="header">
                <h1>
                   <img src="https://cdn-icons-png.flaticon.com/128/9176/9176568.png" alt="header-weather-icon" />
                   Weather Forecast
                </h1>
                <input type="text" 
                 placeholder="Enter City Name"
                 onChange={saveText}
                 required/>
                <button onClick={()=> searchWeather()}>Find Weather</button>
                
            </div>
            { show ? 
            <div className="main-div">
                <div className='current-div'>
                    <div>
                    <img src={data[0].current.condition.icon} alt='weather-icon'/>
                    <p className='weath-condn'>{data[0].current.condition.text}</p>
                    </div>
                    <div className='icon-name-div'>
                        <div>
                            <p className='icon-name'>
                                {data[0].location.name}
                            </p>
                            <p className='region-country'>{data[0].location.region}, {data[0].location.country}</p>
                            <p className='position'><span>lattitude:</span> {data[0].location.lat}</p>
                            <p className='position'><span>longitude:</span> {data[0].location.lon}</p>
                        </div>
                        <div className='temp-div'>
                            <h4>Today, {data[0].location.localtime} </h4>
                            <p><span>Temp in C:</span> {data[0].current.temp_c} </p>
                            <p><span>Temp in F: </span>{data[0].current.temp_f} </p>
                            <p><span>Wind Speed: </span>{data[0].current.wind_kph} <span>km/h</span></p>
                            <p><span>Humidity: </span>{data[0].current.humidity} </p>
                            <p><span>Cloud:</span> {data[0].current.cloud} <span>%</span></p>
                        </div>

                    </div>
                </div>

                <div className='forcast-div'>
                    {data[0].forecast.forecastday.map((item)=> (
                        <div className='forecast-day'>
                            <div>
                                <p className='forecast-date'>{item.date}</p>
                                <img src={item.day.condition.icon} alt="icons-day" />
                                <p className='weath-condn-forecast'>{item.day.condition.text}</p>
                                
                            </div>

                            <div className='day-details'>
                                <p><span>Temperature(C): </span>{item.day.avgtemp_c} </p>
                                <p><span>Temperature(F): </span>{item.day.avgtemp_f} F</p>
                                <p><span>Wind Speed: </span>{item.day.maxwind_kph}</p>
                                <p><span>Humidity: </span>{item.day.avghumidity}</p>
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>
        : null}
        </div>
    )
}

export default Home;