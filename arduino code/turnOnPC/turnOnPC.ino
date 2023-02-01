#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
//#include <LiquidCrystal.h>

WiFiServer test_server(1883);

WiFiClient test_client;
bool client_flag=0;



#define RST_PIN D0
#define SS_PIN D8

byte readCard[4];
String MasterTag = "9384BC";	// REPLACE this Tag ID with your Tag ID!!!
String tagID = "";

int Relaypin = D2;

// Create instances
MFRC522 mfrc522(SS_PIN, RST_PIN);


void setup() 
{
  Serial.begin(115200);
  // Initiating
  SPI.begin(); // SPI bus
  mfrc522.PCD_Init(); // MFRC522
  //mfrc522.PCD_DumpVersionToSerial();	// Show details of PCD - MFRC522 Card Reader details
  //erial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));

  pinMode(Relaypin, OUTPUT);
  Serial.println();

  WiFi.begin("CasinoDuongHang", "nhapbuadi");

  Serial.println("Connecting....");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.println(".");
  }

  Serial.println();

  Serial.print("Connected, IP address: " );
  Serial.print(WiFi.localIP());
}

void loop() 
{
  
  //Wait until new tag is available
  while (getID()) 
  {
    digitalWrite(Relaypin, HIGH);
    if (tagID == MasterTag) 
    {
        Serial.println("card selected");
        digitalWrite(Relaypin,LOW);
        Serial.println("on");
        delay(500);
        digitalWrite(Relaypin, HIGH);
        Serial.println("off");
    }
    else
    {
      Serial.println("card didnt ");
    }
    
  
  }
  if (client_flag){
    if (test_client.connected()){
      
    }
    else{
      client_flag = 0;
      Serial.println("Client disconnected");
    }
  }
  else{
    test_client = test_server.available();

    if(test_client){

      client_flag = 1;
      Serial.println("Client connected");
    }
  }
  
  
}

//Read new tag if available
boolean getID() 
{
  // Getting ready for Reading PICCs
  if ( ! mfrc522.PICC_IsNewCardPresent()) { //If a new PICC placed to RFID reader continue
  return false;
  }
  if ( ! mfrc522.PICC_ReadCardSerial()) { //Since a PICC placed get Serial and continue
  return false;
  }
  tagID = "";
  for ( uint8_t i = 0; i < 4; i++) { // The MIFARE PICCs that we use have 4 byte UID
  //readCard[i] = mfrc522.uid.uidByte[i];
  tagID.concat(String(mfrc522.uid.uidByte[i], HEX)); // Adds the 4 bytes in a single String variable
  }
  tagID.toUpperCase();
  mfrc522.PICC_HaltA(); // Stop reading
  return true;
}
