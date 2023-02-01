function handleClick_hallwayLights() {
    var element = document.getElementById("hallwayLightButton");

    if (state == "on"){
      setState("off")
      element.style.opacity = "0.5";
    }
    if (state == "off"){
      setState("on")
      element.style.opacity = "1";
    }
  }

  function handleClick_livingRoomLights() {
    var element = document.getElementById("livingRoomButton");

    if (state == "on"){
      setState("off")
      element.style.opacity = "0.5";
    }
    if (state == "off"){
      setState("on")
      element.style.opacity = "1";
    }
  }

  function handleClick_diningRoomLights() {
    var element = document.getElementById("diningRoomButton");

    if (state == "on"){
      setState("off")
      element.style.opacity = "0.5";
    }
    if (state == "off"){
      setState("on")
      element.style.opacity = "1";
    }
  }

  function handleClick_airConditionerLights() {
    var element = document.getElementById("airConditionerButton");

    if (state == "on"){
      setState("off")
      element.style.opacity = "0.5";
    }
    if (state == "off"){
      setState("on")
      element.style.opacity = "1";
    }
  }

  function handleClick_tvLights() {
    var element = document.getElementById("tvButton");

    if (state == "on"){
      setState("off")
      element.style.opacity = "0.5";
    }
    if (state == "off"){
      setState("on")
      element.style.opacity = "1";
    }
  }