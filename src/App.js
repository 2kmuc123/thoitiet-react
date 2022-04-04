import Reac, { useEffect, useState } from 'react';
import './App.css';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import loading1 from './loading.gif';


function App() {
  const appid = 'b1ac492954c5e04bdb2ff86ca85b8de7';

  const [location, setLocation] = useState('vinh');
  const [city, setCity] = useState([]);
  const [cloud, setCloud] = useState([]);
  const [temp, setTemp] = useState(0);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [hum, setHum] = useState();
  const [wind, setWind] = useState();

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}&lang=vi&units=metric`)
      .then((Res) => Res.json())
      .then((data) => {
        setCity(data.name)
        setCloud(data.weather[0])
        setTemp(data.main.temp.toFixed());
        setSunrise(moment.unix(data.sys.sunrise).format('H:mm'))
        setSunset(moment.unix(data.sys.sunset).format('H:mm'))
        setHum(data.main.humidity);
        setWind((data.wind.speed * 3.6).toFixed(2));
        setLoading(false);
      })
  }, [location])

  return (
    <div className="App">
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-6 py-5 my-5 muc shadow-lg'>
            <div className='input-group md-3'>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
              <input type="text" className='input-seach mx-auto' placeholder='Tìm Kiếm' onChange={(e) => { setLocation(e.target.value) }}></input>
            </div>
            <hr className='m-4 shadow' />
            {loading ? <img src={loading1} className='mx-auto d-block' /> :
              <div className='my-5'>
                <h1 className="city-name text-center py-5">{city ? city : 'loading.. '}</h1>
                <img src={`http://openweathermap.org/img/wn/${cloud ? cloud.icon : '10d'}@2x.png`} alt="wether-icon" className="wether-icon" />
                <h3 className="wether-state text-center pt-5">{cloud ? cloud.description : 'loading...'}</h3>
                <h1 className="temp text-center pt-4">{temp ? temp : 0}</h1>
              </div>
            }
            <hr className='m-4' />
            <div className='row m-5'>
              <div className='col-6 item1'>
                <div>
                  <h4 className='text-center'>Mặt trời mọc : {sunrise ? sunrise : 'loading ..'} </h4>
                </div>
                <hr className='m-4 shadow' />
                <div>
                  <h4 className='text-center'>Mặt trời Lặn : {sunset ? sunset : 'loading..'}</h4>
                </div>
              </div>

              <div className='col-6'>
                <div>
                  <h4 className='text-center'>Độ ẩm :{hum ? hum : 'loading..'} %</h4>
                </div>
                <hr className='m-4' />
                <div>
                  <h4 className='text-center'>Gió : {wind ? wind : 'loading ..'} km/h</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
