#include "DHT.h"

#define DHTPIN 5 

#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.println(F("DHT11 test"));

  dht.begin();

}

void loop() {
  // put your main code here, to run repeatedly:
  float h = dht.readHumidity();

  float t = dht.readTemperature();//read C* default

  float hic = dht .computeHeatIndex(t, h ,false);

  
  
  //convert to int value to char array
  
  char temp[8];
  dtostrf(t, 1, 2, temp);

  char humid[8];
  dtostrf(h, 1, 2, humid);
  
  
  
  Serial.print(temp + humid);
  Serial.println();

  delay(5000);


  
}
String convertToString(char* a, int size)
{
    int i;
    String s = "";
    for (i = 0; i < size; i++) {
        s = s + a[i];
    }
    return s;
}
