#include <WiFiManager.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#define DHTPIN 5
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

IPAddress staticIP(192,168,2,80);
IPAddress gateway(192,168,1,9);
IPAddress subnet(255,255,255,0);

int sensorValue;
//IPAddress server(192,168,2,33);
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
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");// Attempt to connect
    
    if (client.connect("ESP8266Client_TempAndHumid")) {
      Serial.println("connected");  
      // Subscribe or resubscribe to a topic
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

void setup() {
  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP
  Serial.begin(9600);                     // initialize serial

  dht.begin();// initialize sensor library
  WiFiManagerParameter custom_server("server", "Server", "", 40);
  WiFiManagerParameter custom_mqtt_port("port", "MQTT Port", "", 6);
  WiFiManager wm;
  // reset settings - wipe stored credentials for testing
  // these are stored by the esp library
  //wm.resetSettings(); //for next time setup (MUST USE)
  wm.setSTAStaticIPConfig(staticIP, gateway, subnet); // set ip config for lessing power consumption
  wm.addParameter(&custom_server);
  wm.addParameter(&custom_mqtt_port); // adding parameter for configuration
  // Automatically connect using saved credentials,
  // if connection fails, it starts an access point with the specified name ( "AutoConnectAP"),
  // if empty will auto generate SSID, if password is blank it will be anonymous AP (wm.autoConnect())
  // then goes into a blocking loop awaiting configuration and will return success result
  bool res;
  // res = wm.autoConnect(); // auto generated AP name from chipid
  // res = wm.autoConnect("AutoConnectAP"); // anonymous ap
  res = wm.autoConnect("AP-TempAndHumid", "12345678"); // ap-name and ap-password
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

  Serial.println(F("temp and humid test"));
  
  //pinMode(DOOR_SENSOR_PIN, INPUT_PULLUP); // set arduino pin to input pull-up mode for door
}

void loop() {
  //wifi connect
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client_TempAndHumid");
  

  //temperature and humidity sensor
  
  float h = dht.readHumidity();

  float t = dht.readTemperature();//read C* default

  //float hic = dht .computeHeatIndex(t, h ,false);
  char temp[8];
  dtostrf(t, 1, 2, temp);

  char humid[8];
  dtostrf(h, 1, 2, humid);

  Serial.println();

  //delay(5000);
  client.publish("temp", temp);
  client.publish("humid", humid);
  delay(10000); // wait 100ms for next reading
}
