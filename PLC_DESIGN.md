# PLC Design
Programmable Logic Controller (PLC) design has two parts: 

    1) custom firmware programming and 
    2) circuit building. 

## ESP8266 NodeMCU
This is our entry level choice of PLC.
![ESP8266 NodeMCU](https://cdn.glitch.com/1a3d0526-b227-48ca-95b7-53e806694f71%2Fesp8266_nodemcu.png)
## Arduino IDE
We introduce you to programming C++ Arduino sketches
![Arduino IDE](https://cdn.glitch.com/1a3d0526-b227-48ca-95b7-53e806694f71%2Farduino-ide.png)

![2 Options](https://cdn.glitch.com/1a3d0526-b227-48ca-95b7-53e806694f71%2F2-Options.png)
### Example Arduino Sketch

The sketch shown below enables buzzer and LED control via direct client login to the ESP8266 and via Firebase database values which can be changed by a remote administrative application.
```
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#define FIREBASE_HOST "YOUR_FIREBASE_PROJECT.firebaseio.com"
#define FIREBASE_AUTH "YOUR FIREBASE AUTHORIZATION KEY"
#define WIFI_SSID "YOUR_SSID"
#define WIFI_PASSWORD "YOUR_PASSWORD"
#define buzzerPin D2
ESP8266WebServer server;
//password must be at least 8 characters
const char WiFiAPPSK[] = "yhaiot2018";

const char INDEX_HTML[] =
  "<!DOCTYPE HTML>"
  "<html>"
  "<head>"
  "<meta name = \"viewport\" content = \"width = device-width, initial-scale = 1.0, maximum-scale = 1.0, user-scalable=0\">"
  "<title>ESP8266</title>"
  "<style>"
    "body { background-color: #808080; font-family: Arial, Helvetica, Sans-Serif; Color: Maroon; }"
  "</style>"
  "</head>"
  "<body>"
  "<h1>ESP8266 Direct Access Demo</h1>"
  "<button onclick='toggleLED()'>Toggle LED</button>"
  "<button onclick='buzzBuzzer()'>Buzz Buzzer</button>"
  "<script>"
    "function toggleLED(){"
      "fetch('/toggleLED').then(stream=>stream.text()).then(text=>console.log(text))"
    "}"
    "function buzzBuzzer(){"
      "fetch('/buzzBuzzer').then(stream=>stream.text()).then(text=>console.log(text))"
    "}"
  "</script>"
  "</body>"
  "</html>";

void setup()
{
  Serial.begin(9600);
  setupWiFi();
  
  pinMode(LED_BUILTIN, OUTPUT); 
  digitalWrite(LED_BUILTIN,LOW);

  server.on("/",sendIndex);
  server.on("/toggleLED", toggleLED);
  server.on("/buzzBuzzer", buzzBuzzer);
  server.begin();
  Serial.println("");
  Serial.println("");
  Serial.print("Server running on http://192.168.4.1/");

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setString("buzz", "false");
}

int timePassed (int time) {
  int diff = 0;
  if (millis() <= time) {
    diff = (69666 - time) + millis();
  } else {
    diff = millis() - time;
  }
  return diff;
}

int checkFirebaseTime = 0;
String buzz = "false";
void loop()
{
  if (timePassed (checkFirebaseTime) >= 2000) {
    buzz = Firebase.getString("buzz");
    if(buzz == "true") buzzBuzzer();
    checkFirebaseTime = millis();
  }
  server.handleClient();
}

void sendIndex(){
  server.send(200,"text/html",INDEX_HTML);  
}

void toggleLED(){
  digitalWrite(LED_BUILTIN,!digitalRead(LED_BUILTIN));
  //server.send(204,"");
  server.send(200,"text/plain","Toggle LED!\n");
}

void buzzBuzzer(){
  //server.send(204,"");
  server.send(200,"text/plain","Buzz Buzzer!\n");
  //tone( pin number, frequency in hertz, duration in milliseconds);
  tone(buzzerPin,2000,1000);
  delay(3000);
  tone(buzzerPin,0);
  Firebase.setString("buzz", "false");
}

void setupWiFi()
{
  WiFi.mode(WIFI_AP_STA);
  //Set up Access Point
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  // Set up Station
  // Do a little work to get a unique-ish name. Append the
  // last two bytes of the MAC (HEX'd) to "Thing-":
  uint8_t mac[WL_MAC_ADDR_LENGTH];
  WiFi.softAPmacAddress(mac);
  String macID = String(mac[WL_MAC_ADDR_LENGTH - 2], HEX) +
                 String(mac[WL_MAC_ADDR_LENGTH - 1], HEX);
  macID.toUpperCase();
  String AP_NameString = "YHA ESP8266 " + macID;

  char AP_NameChar[AP_NameString.length() + 1];
  memset(AP_NameChar, 0, AP_NameString.length() + 1);

  for (int i=0; i<AP_NameString.length(); i++)
    AP_NameChar[i] = AP_NameString.charAt(i);
  //AP_NameChar is the SSID for the Wireless Access Point
  WiFi.softAP(AP_NameChar, WiFiAPPSK);
}
```
## Circuit Building
You will learn fundamentals of electricity, electrical circuits, and electrical components as you build PLC circuits.
### Example Circuit
![Example Circuit](https://cdn.glitch.com/1a3d0526-b227-48ca-95b7-53e806694f71%2Fbuzzer-circuit_.png)
```
This circuit is designed to work with the Arduino sketch shown above.
```