import { useEffect } from "react";
import remote from '../styles/Remotes.module.scss'
import sliderX from '../components/sliderX.module.css'
import submitChange from "./submit";

export default function SliderX(props) {
    const sensor = props.props.props.sensor
    useEffect(() => {
      var slider = document.getElementById("Range");
      var output = document.getElementById("demo");
      output.innerHTML = slider.defaultValue; // Display the default slider value
  
      // Update the current slider value (each time you drag the slider handle)
      slider.oninput = function () {
        output.innerHTML = this.value;
  
        //console.log(sensor, this.value)
        submitChange(sensor, this.value)
      }
    })
    return (
      <div >
        <a className={remote.acMode_TempValue} id='demo'></a>
        <div className={sliderX.slidecontainer}>
            <input type="range" min="16" max="30" defaultValue="24" id="Range" className={sliderX.slider}/>
        </div>
      </div>
  
    )
  }