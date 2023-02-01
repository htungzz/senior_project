#include <WiFiManager.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>


const int DOOR_SENSOR_PIN = 13; // Arduino pin connected to door sensor's pin

int doorState1;
int doorState2;


IPAddress staticIP(192,168,1,87);
IPAddress gateway(192,168,1,9);
IPAddress subnet(255,255,255,0);

//IPAddress server(192,168,1,42);
IPAddress server;
int mqtt_port;
char temp_port[5];

WiFiClient espClient;
PubSubClient client(espClient);


void callback(String topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic room/lamp, you check if the message is either on or off. Turns the lamp GPIO according to the message
  /*if(topic=="led"){
      Serial.print("Changing led to ");
      if(messageTemp == "on"){
        digitalWrite(lamp, HIGH);
        Serial.print("On");
      }
      else if(messageTemp == "off"){
        digitalWrite(lamp, LOW);
        Serial.print("Off");
      }
  }*/
  //Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    /*
     YOU MIGHT NEED TO CHANGE THIS LINE, IF YOU'RE HAVING PROBLEMS WITH MQTT MULTIPLE CONNECTIONS
     To change the ESP device ID, you will have to give a new name to the ESP8266.
     Here's how it looks:
       if (client.connect("ESP8266Client")) {
     You can do it like this:
       if (client.connect("ESP1_Office")) {
     Then, for the other ESP:
       if (client.connect("ESP2_Garage")) {
      That should solve your MQTT multiple connections problem
    */
    if (client.connect("ESP8266Client_Door")) {
      Serial.println("connected");  
      // Subscribe or resubscribe to a topic
      // You can subscribe to more topics (to control more LEDs in this example)
      client.subscribe("door");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {

  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP

  
  Serial.begin(9600);                     // initialize serial
   WiFiManagerParameter custom_server("server", "Server", "", 40);
  WiFiManagerParameter custom_mqtt_port("port", "MQTT Port", "", 6);
  WiFiManager wm;

  // reset settings - wipe stored credentials for testing
  // these are stored by the esp library
  //wm.resetSettings(); //for next time setup (MUST USE)
  
  wm.setSTAStaticIPConfig(staticIP, gateway, subnet); // set ip config for lessing power consumption
  wm.addParameter(&custom_server);
  wm.addParameter(&custom_mqtt_port);
  // Automatically connect using saved credentials,
  // if connection fails, it starts an access point with the specified name ( "AutoConnectAP"),
  // if empty will auto generate SSID, if password is blank it will be anonymous AP (wm.autoConnect())
  // then goes into a blocking loop awaiting configuration and will return success result

  bool res;
  // res = wm.autoConnect(); // auto generated AP name from chipid
  // res = wm.autoConnect("AutoConnectAP"); // anonymous ap
  res = wm.autoConnect("AP-Door", "12345678"); // ap-name and ap-password

  if(!res) {
      Serial.println("Failed to connect");
      ESP.restart();
  } 
  else {
      //if you get here you have connected to the WiFi    
      Serial.println("connected...yeey :)");
  }
  server.fromString(custom_server.getValue());
  mqtt_port = atoi(strcpy(temp_port, custom_mqtt_port.getValue()));
  //Serial.println(WiFi.localIP());
  client.setServer(server, mqtt_port);
  client.setCallback(callback);

  Serial.println(F("door test"));
  
  pinMode(DOOR_SENSOR_PIN, INPUT_PULLUP); // set arduino pin to input pull-up mode for door
}

void loop() {
  //wifi connect
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client_Door");
  

  //door sensor
  doorState1 = digitalRead(DOOR_SENSOR_PIN);
  
  if (doorState2 == HIGH && doorState1 != doorState2 ) {
    //Serial.println("The door is closed");
    send_mqtt("closed");
  } 
  if (doorState2 == LOW && doorState1 != doorState2){
    //Serial.println("The door is open");
    send_mqtt("open");
  }
  
  doorState2 = doorState1;
}

void send_mqtt(String message){
  int a = message.length();
  char door[a];
  for (int i = 0 ; i < a; i++){
    door[i] = message[i];
  }
  client.publish("door", door);
  Serial.println(message);
}
