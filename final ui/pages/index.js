import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import sceneControl from '../styles/Scenes.module.css'
import deviceControl from '../styles/Devices.module.css'
import cameraControl from '../styles/Cameras.module.css'
import sensorReadings from '../styles/sensorReadings.module.scss'
import useSWR from 'swr';
import io from 'socket.io-client'
import DbConnect from "../util/dbconnect"
import submitChange from "../util/submit"




let socket;


const fetcher = (...args) => fetch(...args).then((res => res.json()))

//fetch state of sensor based on id and pass to query url on the beginning
function FetchState({ eid }) {

  const { data, error } = useSWR(`./api/findOnStartup/?${eid}`, fetcher)
  return {
    result: data,
    isLoading: !error && !data,
    isError: error
  }

}


export default function Home(props) {
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  const [CO2, setCo2] = useState('')
  const [temp, setTemp] = useState('')
  const [humid, setHumid] = useState('')
  const [door, setDoor] = useState('')
  const [kitdoor, setkitDoor] = useState('')
  const [hallway, setHallway] = useState('false')
  const [living, setLiving] = useState('false')
  const [dining, setDining] = useState('false')
  const [tv, setTv] = useState('false')
  const [pm25, setPM] = useState('false')
  const [aqi, setAQI] = useState('false')
  const [scene, setScene] = useState('defaultS')



  const socketInitializer = async () => {
    //dbConnect()
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('changeData', result => {
      const re = result.sensor
      const ul = result.state
      switch (re) {
        case ("co2"):
          setCo2(ul)
          break
        case ("temp"):
          setTemp(ul)
          break
        case ("humid"):
          setHumid(ul)
          break
        case ("door"):
          setDoor(ul)
          break
        case ("kitdoor"):
          setkitDoor(ul)
          break
        case ("hallway"):
          setHallway(ul)
          break
        case ("living"):
          setLiving(ul)
          break
        case ("dining"):
          setDining(ul)
          break
        case ("tv"):
          setTv(ul)
          break
        case ("aqi"):
          setAQI(ul)
          break
        case ("pm25"):
          setPM(ul)
          break
      }
    })
  }

  useEffect(() => {
    socketInitializer()
  }
  );

  //Scene Control




  //Device Control

  function handleClick_camera1() {
    /*Active*/
    document.getElementById("camera1").style.opacity = "1";

    /*Inactive*/
    document.getElementById("camera2").style.opacity = "0.5";
    document.getElementById("camera3").style.opacity = "0.5";
    document.getElementById("camera4").style.opacity = "0.5";
  }

  function handleClick_camera2() {
    /*Active*/
    document.getElementById("camera2").style.opacity = "1";

    /*Inactive*/
    document.getElementById("camera1").style.opacity = "0.5";
    document.getElementById("camera3").style.opacity = "0.5";
    document.getElementById("camera4").style.opacity = "0.5";
  }

  function handleClick_camera3() {
    /*Active*/
    document.getElementById("camera3").style.opacity = "1";

    /*Inactive*/
    document.getElementById("camera1").style.opacity = "0.5";
    document.getElementById("camera2").style.opacity = "0.5";
    document.getElementById("camera4").style.opacity = "0.5";
  }

  function handleClick_camera4() {
    /*Active*/
    document.getElementById("camera4").style.opacity = "1";

    /*Inactive*/
    document.getElementById("camera1").style.opacity = "0.5";
    document.getElementById("camera2").style.opacity = "0.5";
    document.getElementById("camera3").style.opacity = "0.5";
  }


  

  const sceneArr = ['morningS', 'nightS', 'arrivingS', 'leavingS', 'defaultS']
  //Handle Scene Change
  const handleSceneChange = b => {
    const html_id = b.currentTarget.id
    const element = document.getElementById(html_id)
    if (scene != html_id) {
      setScene(html_id)
      element.style.opacity = "1"
      for (let i = 0; i < sceneArr.length; i++) {
        const a = sceneArr[i]
        if (a != html_id) {
          const b = document.getElementById(a)
          b.style.opacity = 0.5
        }
      }
      submitChange("mode", html_id)
    }
  }

  //HTML

  return (

    <div className={styles.container} id="mainContainer">

      <Head>
        <title>Smart Home</title>
        <meta name="description" content="Created as part of a final project" />
      </Head>

      <Link href="/remotes">
        <a>
          <div className={cameraControl.remotesLink} id="remotesButton">
            Remotes <arrow></arrow>
          </div>
        </a>
      </Link>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>WELCOME HOME</h1>
        </div>


        <section className={styles.scenesControlPanel}>
          <div className={sceneControl.scenesCP}>
            <h1>scenes</h1>
          </div>

          <div className={sceneControl.morningCard} id="morningS" onClick={handleSceneChange} />

          <div className={sceneControl.nightTCard} id="nightS" onClick={handleSceneChange} />

          <div className={sceneControl.arrivingTCard} id="arrivingS" onClick={handleSceneChange} />

          <div className={sceneControl.leavingTCard} id="leavingS" onClick={handleSceneChange} />

          <div className={sceneControl.defaultTCard} id="defaultS" onClick={handleSceneChange} />
        </section>

        <section className={styles.devicesControlPanel}>
          <div className={deviceControl.devicesCP}>
            <h1>Devices</h1>
          </div>

          <div className={styles.devicesControlPanelTopRow}>
            <DeviceButton property={<div className={deviceControl.hallwayLightsCard} id="hallwayLightButton" sensor_name='hallway_light' eid='name=hallway' change={hallway} />} />
            <DeviceButton property={<div className={deviceControl.livingRoomLightsCard} id="livingRoomButton" sensor_name='livingroom_light' eid='name=living' change={living} />} />
            <DeviceButton property={<div className={deviceControl.diningRoomLightsCard} id='diningRoomButton' sensor_name="diningroom_light" eid='name=dining' change={dining} />} />

          </div>


          <div className={styles.devicesControlPanelBottomRow}>
            <IRButton property ={<div className={deviceControl.acCard} id="airConditionerButton" sensor_name="ac"/>}/>
            <IRButton property={<div className={deviceControl.tvCard} id="tvButton" sensor_name="tv" eid='name=tv' change={tv} />} />


          </div>

        </section>

        <section className={styles.sensorReadingsPanel} id="sensorReadings">
          <SensorPanel name={'Air Quality Index'} html_id={"AQI_Sensor"} eid='name=aqi' change={aqi} />
          <SensorPanel name={'Temperature'} html_id={"Temperature_Sensor"} eid='name=temp' change={temp} />
          {/*<SensorPanel name={'PM 2.5 Sensor'} html_id={"PM2.5_Sensor"} eid='name=pm25' change={pm25} />
          <SensorPanel name={'Humidity'} html_id={"Humidity_Sensor"} eid='name=humid' change={humid} />
          
          <SensorPanel name={'CO2 Level'} html_id={"CO2_Sensor"} eid='name=CO2' change={CO2} />*/}
          <SensorPanel name={'Front Door Sensor'} html_id={"FrontDoor_Sensor"} eid='name=door' change={door} />
          <SensorPanel name={'Kitchen Door Sensor'} html_id={"KitchenDoor_Sensor"} eid='name=kitdoor' change={kitdoor} />

        </section>




        <section className={cameraControl.cameraPanel}>
          <div className={cameraControl.camera1Button} id="camera1" onClick={handleClick_camera1} />
          <div className={cameraControl.camera2Button} id="camera2" onClick={handleClick_camera2} />
          <div className={cameraControl.camera3Button} id="camera3" onClick={handleClick_camera3} />
          <div className={cameraControl.camera4Button} id="camera4" onClick={handleClick_camera4} />
          <div className={cameraControl.cameraFeed} />
        </section>

      </main>

      <div>

      </div>
    </div>
  )
}

//(Beginning State) connecting database, ...

export async function getServerSideProps() {
  await DbConnect()
  return { props: { msg: "sucess" } }
}


//jsx for State section
function SensorPanel({ name, html_id, eid, change }) {
  const [element, setChange] = useState('')
  const a = State(eid) //loading at start
  useEffect(
    () => { setChange(a) }, [a]
  )
  useEffect(
    () => {
      if (change != element && change != '') {
        setChange(change) //change on update
      }
    }
  )

  return (
    <div className={sensorReadings.container} >
      <h2>{name}</h2>
      <h1>{element}</h1>
      {/*wait for adding back end additional discription h2 */}
      <h2> </h2>
    </div>
  )
}

//Loading state from FetchState either gotten or error
function State(eid) {
  const { result, isLoading, isError } = FetchState({ eid })
  if (isLoading) return 'Loading...'
  if (isError) return 'Error'
  return (
    result[0].state
  )
}



function DeviceButton(property) {
  var classe = property.property.props
  var change = classe.change
  //console.log(classe)
  const [state1, setChangestate] = useState(true);
  function uichange(a) {
    var element = document.getElementById(classe.id);
    if (String(a) == 'true') {
      setChangestate('true')
      element.style.opacity = "1";
      return 'on'
    }
    if (String(a) == 'false') {
      setChangestate('false')
      element.style.opacity = "0.5";
      return 'off'
    }
  }
  // const a recieve data on first data fetch from database
  const a = State(classe.eid)
  //console.log('hello ',typeof(a), ' ', a)
  useEffect(
    () => { uichange(a) }, [a]
  )

  //change from database updata here
  useEffect(
    () => {
      if (change != `${state1}`) {
        uichange(change) //change on update
      }
    }
  )

  const handleChange = () => {
    const stateSubmit = ''
    if (state1 == 'true') {
      stateSubmit = uichange('false')
    }
    if (state1 == 'false') {
      stateSubmit = uichange('true')
    }
    submitChange(classe.sensor_name, stateSubmit);
  };
  //console.log(state1)
  return (
    <div className={classe.className} id={classe.id} onClick={handleChange} />
  )
}

function IRButton(property) {
  var classe = property.property.props
  
  //console.log(classe)
  const [state1, setChangestate] = useState('false');
  function uichange(a) {
    var element = document.getElementById(classe.id);
    if (String(a) == 'true') {
      setChangestate('true')
      element.style.opacity = "1";
      return 'on'
    }
    if (String(a) == 'false') {
      setChangestate('false')
      element.style.opacity = "0.5";
      return 'off'
    }
  }
  
  const handleChange = () => {
    const stateSubmit = ''
    if (state1 == 'true') {
      stateSubmit = uichange('false')
    }
    if (state1 == 'false') {
      stateSubmit = uichange('true')
    }
    submitChange(classe.sensor_name, stateSubmit);
  };
  //console.log(state1)
  return (
    <div className={classe.className} id={classe.id} onClick={handleChange} />
  )
}


