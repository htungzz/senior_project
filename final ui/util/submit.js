async function submitChange(sensor_name, stateSubmit) {
    //console.log(sensor_name)
    const res = await fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "state": stateSubmit,
        "sensor": sensor_name
      }),
    });
    const data = await res.json();
    //console.log(data);
}  

export default submitChange