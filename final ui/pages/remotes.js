import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import remote from '../styles/Remotes.module.scss'
import { Direction } from 'react-range';
import slider from '../components/slider.module.css';
import SliderX from '../util/another_slider'
import submitChange from '../util/submit'
import io from 'socket.io-client'
import useSWR from 'swr';

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

export default function Home() {
  const [pm25, setPM] = useState('false')
  const [temp, setTemp] = useState('')
  const [humid, setHumid] = useState('')

  function handleClick(sensor, state) {

    console.log(sensor, state)
    submitChange(sensor, state)
  }

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
        case ("pm25"):
          setPM(ul)
          break
        case ("temp"):
          setTemp(ul)
          break
        case ("humid"):
          setHumid(ul)
          break
      }
    })
  }

  useEffect(() => {
    socketInitializer()
  }
  );

  //HTML

  return (
    <div className={styles.container} id="mainContainer">
      <Head>
        <title>Smart Home</title>
      </Head>
      <main className={styles.main}>
        <Link href="/">
          <a><div className={remote.backButton} /></a>
        </Link>
        <div className={styles.remotesPanel}>
          <div className={remote.container} id="acRemote">
            <div className={remote.title}>Air Conditioner</div>

            <div className={remote.tempGaugeContainer} id="acTempControl">
              <div className={remote.tempGauge}>
                <h3>Temperature</h3>
                <div className={slider.container}>
                  <SliderX props={<div sensor='AC' />}></SliderX>
                </div>

              </div>

              <div className={remote.readingContainer} id="readingContainer">

                <SensorPanel name={'PM 2.5 Sensor'} html_id={"PM2.5_Sensor"} eid='name=pm25' change={pm25}/>

                <SensorPanel name={'Humidity'} html_id={"Humidity_Sensor"} eid='name=humid' change={humid}/>

                <SensorPanel name={'Temperature'} html_id={"Temperature_Sensor"} eid='name=temp' change={temp} />

              </div>
            </div>

            <div className={remote.speedContainer} id="acSpeeds">
              <div className={remote.speedOptions}>
                <h3 id="acSpeed1" onClick={() => handleClick("AC", "Speed 1")}>1</h3>
              </div>

              <div className={remote.speedOptions}>
                <h3 id="acSpeed2" onClick={() => handleClick("AC", "Speed 2")}>2</h3>
              </div>

              <div className={remote.speedOptions}>
                <h3 id='acSpeed3' onClick={() => handleClick("AC", "Speed 3")}>3</h3>
              </div>

              <div className={remote.speedOptions}>
                <h3 id='acSpeed4' onClick={() => handleClick("AC", "Speed 4")}>4</h3>
              </div>
            </div>

            <div className={remote.modeContainer} id="acModes">

              <div className={remote.acMode_Button} onClick={() => handleClick("AC", "Auto")}>
                <div className={remote.acMode_Auto} />
                <div className={remote.acMode_Label}>Auto</div>
              </div>

              <div className={remote.acMode_Button} onClick={() => handleClick("AC", "Cool")}>
                <div className={remote.acMode_Cool} />
                <div className={remote.acMode_Label} >Cool</div>
              </div>

              <div className={remote.acMode_Button} onClick={() => handleClick("AC", "Dry")}>
                <div className={remote.acMode_Dry} />
                <div className={remote.acMode_Label}>Dry</div>
              </div>

              <div className={remote.acMode_Button} onClick={() => handleClick("AC", "Fan")}>
                <div className={remote.acMode_Fan} />
                <div className={remote.acMode_Label}>Fan</div>
              </div>

              <div className={remote.acMode_Button} onClick={() => handleClick("AC", "Heat")}>
                <div className={remote.acMode_Heat} />
                <div className={remote.acMode_Label}>Heat</div>
              </div>

            </div>
          </div>

          <div className={remote.container} id="tvRemote">
            <div className={remote.title}>Television</div>
            <div className={remote.tvButtons}>

              <div className={remote.tvControls} id="tvControls">
                <div className={remote.up} onClick={() => handleClick("TV", "Up")}></div>
                <div className={remote.centerButtonRow} >
                  <div className={remote.left} onClick={() => handleClick("TV", "Left")}></div>
                  <div className={remote.circle} onClick={() => handleClick("TV", "Ok")}></div>
                  <div className={remote.right} onClick={() => handleClick("TV", "Right")}></div>
                </div>
                <div className={remote.down} onClick={() => handleClick("TV", "Down")} />
              </div>

              <div className={remote.menuRow} id="tvMenu">
                <div className={remote.return} onClick={() => handleClick("TV", "Return")} />
                <div className={remote.menu}>
                  <div className={remote.menuTitle} onClick={() => handleClick("TV", "Menu")}>Menu</div>
                </div>
                <div className={remote.exit} onClick={() => handleClick("TV", "Exit")} />
              </div>

              <div className={remote.tvControls_row} id="tvControls">
                <div className={remote.tvControlContainer} id="volumeControls">
                  <volumeup onClick={() => handleClick("TV", "Volume Up")} />
                  <div className={remote.tvRemoteLabel}>VOL</div>
                  {/*<div className = {remote.tvRemoteValue}>18</div>*/}
                  <volumedown onClick={() => handleClick("TV", "Volume Down")} />
                </div>

                <div className={remote.tvControlContainer} id="channelControls">
                  <channelup onClick={() => handleClick("TV", "Channel Up")}></channelup>
                  <div className={remote.tvRemoteLabel}>CH</div>
                  {/*<div className = {remote.tvRemoteValue}>33</div>*/}
                  <channeldown onClick={() => handleClick("TV", "Channel Down")}></channeldown>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

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
    <div className={remote.readingGauge} id="Humidity_Sensor">
      <div className={remote.readingGaugeLabel}>{name}</div>
      <div className={remote.readingGaugeValue}>{element}</div>
    </div>
  )
}


function State(eid) {
  const { result, isLoading, isError } = FetchState({ eid })
  if (isLoading) return 'Loading...'
  if (isError) return 'Error'
  return (
    result[0].state
  )
}