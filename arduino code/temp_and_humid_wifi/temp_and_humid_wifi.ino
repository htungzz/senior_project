#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include "DHT.h"

#define DHTPIN 5 

#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "CasinoDuongHang";
const char* password = "nhapbuadi";

IPAddress server(192, 168, 2, 39);

WiFiClient espClient;
PubSubClient client(espClient);

int sensorValue;
//int digitalValue;

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
  Serial.println();
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
    if (client.connect("ESP8266Client_DHT")) {
      Serial.println("connected");  
      // Subscribe or resubscribe to a topic
      // You can subscribe to more topics (to control more LEDs in this example)
      client.subscribe("temp");
      client.subscribe("humid");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(9600); // sets the serial port to 9600
  //pinMode(13, OUTPUT);
  //pinMode(5, INPUT);
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected - ESP IP address: ");
  Serial.println(WiFi.localIP());
  client.setServer(server, 1883);
  client.setCallback(callback);

  Serial.println(F("DHT11 test"));

  dht.begin();
}

void loop()
{ 
  //wifi connect
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client_DHT");

    
  float h = dht.readHumidity();

  float t = dht.readTemperature();//read C* default

  //float hic = dht .computeHeatIndex(t, h ,false);
  char temp[8];
  dtostrf(t, 1, 2, temp);

  char humid[8];
  dtostrf(h, 1, 2, humid);

  
  
  
  Serial.println();

  delay(5000);
  client.publish("temp", temp);
  client.publish("humid", humid);
  delay(1000); // wait 100ms for next reading
  
}


