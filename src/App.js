import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import weatherIcon from "./logoIcon.jpg"
import {  useEffect, useState } from "react";
import {AutoComplete} from 'antd'
import axios from "axios";
function App() {

  const apiKey = "144fa213aa56f004b846e62f63114cb4";

  const [inputCity, setInputCity] = useState("")
  const [data,setData] = useState()
  const getWeatherDetails = (cityName) => {

    if(!cityName) return
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey 
    axios.get(apiUrl).then((res) => {
      console.log("response",res);
      setData(res.data);
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
  }

  useEffect(() => {
    getWeatherDetails("delhi")
  }, [])

  const handleSearch = () =>{
    getWeatherDetails(inputCity)
  }
  return (
    <div className="col-mid-12">
       <div className="weatherbg">
          
          <h1 className="heading">weatherApp</h1>
          <div className="d-grid col-3 mt-4 gap-3">

             <AutoComplete
             placeholder="Search your city" 
             type="text" 
             className="form-control"
             value={inputCity}
             onSearch={handleChangeInput}
             />

             <button className="btn-primary" type="button" onClick = {handleSearch}>Search</button>

          </div>
  
         <div className="col-mid-12 text-center mt-5">
            <div className="shadow weatherResultBox">
                <img className="weatherIcon" src={weatherIcon} alt="weatherIcon"/>        
                <h5 className="weatherCity"> {data?.name} </h5>
              <hr/>
              
              <div>
                <div className="weatherComponents"><h5 className="weatherNames" >Temparature</h5></div>
                <div className="weatherDetails"><h5 className="weatherValues"> {((data?.main?.temp)-273).toFixed(1)}°c</h5></div>
              </div>

              <hr/>
              <div>
                <div className="weatherComponents"><h5 className="weatherNames">WindSpeed</h5></div>
                <div className="weatherDetails"><h5 className="weatherValues">{data?.wind?.speed} km/h</h5></div>
              </div>

              <hr/>

              <div>
                <div className="weatherComponents"><h5  className="weatherNames">Visibility</h5></div>
                <div className="weatherDetails"><h5 className="weatherValues">{data?.visibility} mi</h5></div>               
              </div>
            </div>
         </div>
   
       </div>
    
    </div>
  );
}

export default App;
