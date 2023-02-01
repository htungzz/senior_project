import React from 'react';
import { Range,getTrackBackground } from 'react-range';
import slider from '../components/slider.module.css';
import remote from '../styles/Remotes.module.scss'

const STEP = 1;
const MIN = 16;
const MAX = 30;

class Slider extends React.Component {
    state = {
      values: [24]
    };
    render() {
      return (
        <div>
          <output className ={remote.acMode_TempValue} id="output">
            {this.state.values[0].toFixed(1)}
          </output>
          <Range
            values={this.state.values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => this.setState({ values })}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "56px",
                  display: "flex",
                  width: "282px"
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "56px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: this.state.values,
                      colors: ["#FDE0F8", "#ccc"],
                      min: MIN,
                      max: MAX
                    }),
                    alignSelf: "center"
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  width: '56px',
                  height: '56px',
                  opacity: '1',
    
                  background: '#5F8493',
                  borderRadius: '15px'
                }}
              >
                <div
                  style={{
                    height: "20px",
                    width: "5px",
                    margin: 'auto',
                    marginTop: '30%',
                    backgroundColor: isDragged ? "#548BF4" : "#CCC"
                  }}
                />
              </div>
            )}
          />
          
        </div>
      );
    }
  }

export default Slider


