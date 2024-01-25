import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styles from './SearchBar.module.scss'
import { Autocomplete, Switch, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { resetData, setData } from '../../features/weather/WeatherSlice'
import PositionSvg from '../Svgs/PositionSvg'
export default function SearchBar() {
   const GEOAPIKEY = process.env.REACT_APP_GEO_API_KEY
   const WEATHERAPIKEY = process.env.REACT_APP_WEATHER_API
   const [cities, setCities] = useState([])
   const [unity, setUnity] = useState('metric')
   const [geoLocation, setGeoLocation] = useState(undefined)
   const [isCurrentLocation, setIsCurrentLocation] = useState(false)


   const getGeoLocation = ()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
         setIsCurrentLocation(true)
         setGeoLocation(
            {
               lon:  position.coords.longitude,
               lat: position.coords.latitude
            }
         )
        
      })
   }
   
   useEffect(()=>{

         getGeoLocation()

   },[])

   useEffect(() => {
      getData()
  }, [geoLocation]);

   const dispatch = useDispatch()

   const handleInputChange = (e)=>{
      const {value} = e.currentTarget
      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEOAPIKEY}`)
            .then(response => response.json())
            .then(json => setCities(
                json.results?.map(data => {
                const {lat, lon, city, country, formatted} = data
                return {lat, lon, city, country, formatted}
            })))
   }

   const getData = ()=>{
      if (geoLocation) {
         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHERAPIKEY}`)
             .then(response => response.json())
             .then(json => {
                 const {clouds, main, name, sys, weather, wind} = json
                 dispatch(setData({clouds, main, name, sys, weather, wind}))
             })
     }
   }
   const handleAutoCompleteSelect =(e,value)=>{
      // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
      if(value !== null){
         const {lon, lat} = value
         setIsCurrentLocation(false)
         setGeoLocation(
            {
               lon,
               lat
            }
         )
      }else{
         dispatch(resetData())
      }
   }
   
   return (
      <>
         {/* {}<Switch /> */}
         {/* <Form> */}
            {/* <Form.Group className={styles.searchContainer}> */}
               <div className={styles.searchContainer}>
               <Autocomplete className={styles.searchInput}
                     clearOnBlur ={false}
                     onChange={handleAutoCompleteSelect}
                     getOptionLabel={options=> options.formatted} 
                     renderInput={ (params)=>
                     <TextField onChange={handleInputChange} {...params} label={ 'Entery your city...' }/>} options={cities || []}/>
                     <Button disabled={geoLocation === undefined || isCurrentLocation === true} variant="primary"
                        onClick={() => getGeoLocation()}><PositionSvg color={'#fff'}/></Button>
               </div>
            {/* </Form.Group> */}
         {/* </Form> */}
      </>
   )
}
