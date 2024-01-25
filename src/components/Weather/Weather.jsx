import React from 'react'
import styles from'./Weather.module.scss'
import { Card } from 'react-bootstrap'
import PositionSvg from '../Svgs/PositionSvg'
import DefaultWeather from '../Svgs/DefaultWeather'
import Thermometer from '../Svgs/Thermometer'
import Time from '../Svgs/Time'
import Wind from '../Svgs/Wind'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import SpeedoMeter from '../Svgs/SpeedoMeter'
import Humidity from '../Svgs/Humidity'
import { Switch } from '@mui/material'

export default function Weather() {
   const weather = useSelector(({weather})=>weather)
   return (
      <>
         <Card className={styles.container}>
            {
               weather.isLoaded ? 
               <Card.Body>
               <Card.Title>
                  {weather.name} , {weather.sys.country}<PositionSvg width={25} height={25} color= {'blue'} />
                  <div className={styles.date}>
                     <div>
                        <Moment format='MMM Do ddd YY , HH:mm'/>
                        </div>
                     <div>
                        <Time width='15px' height='15px'/>
                     </div>
                  </div>
               </Card.Title>
               <Card.Text as={'div'} className={styles.weather_info}>
               
                  <div>
                     <DefaultWeather width={'250px'} height={'250px'} />
                  </div>
                  <div className={styles.temperature}>
                     <div>{weather.main.feels_like}°C</div>
                     <div>
                        <Thermometer/>
                     </div>
                  </div>
                  <div>
                     Good Morning Casablanca
                     <div className={styles.separator}></div>
                  </div>
                  <div className={styles.info}>
                     <div className={styles.border_right}>
                        <div><DefaultWeather color/></div>
                        <div>SUNRISE</div>
                        <div>
                           <Moment unix={true} format='HH:mm'>
                           {weather.sys.sunrise}
                           </Moment>
                        </div>
                     </div>
                     <div className={styles.border_right}>
                        <div><Wind/></div>
                        <div>WIND</div>
                        <div>
                           {weather.wind.speed}m/s
                        </div>
                     </div>
                     <div className={styles.border_right}>
                        <div><SpeedoMeter color='#fff' height='25px' width='25px'/></div>
                        <div>SpeedoMeter</div>
                        <div>
                           {weather.main.pressure}
                        </div>
                     </div>
                     <div className={styles.border_right}>
                        <div><Humidity color='#fff'  height='25px' width='25px'/></div>
                        <div>Humidity</div>
                        <div>
                           {weather.main.humidity}
                        </div>
                     </div>
                     <div>
                        <div><Thermometer  color='#fff' height='25px' width='25px'/></div>
                        <div>TEMP</div>
                        <div>{weather.main.temp_max}° C</div>
                     </div>
                  </div>
                  </Card.Text>
               </Card.Body>
                  :  <Card.Body>
                  <Card.Title>Please choose your city.</Card.Title>
               </Card.Body>

            }
            
         </Card>
      </>
   )
}
