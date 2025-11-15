// Firmware za Carbo Tyla V1.0
// Last edited: 5.11.2025.

// LED PIN -> 2

//#include <PMS.h>
//#include <SoftwareSerial.h>

#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

#define ssid "bojinovic"
#define password "dmnkb2023"

//SoftwareSerial Serial_1(2, 1);

//PMS pms(Serial_1);
//PMS::DATA data;

WebSocketsServer webSocket = WebSocketsServer(81);

#define MOT_1_PIN 15
#define MOT_2_PIN 13
#define MOT_3_PIN 12
#define MOT_4_PIN 14

int mot_1, mot_2, mot_3, mot_4;

int delay_time = 0;

bool f_time = false;

/*
  if (msg == "run" || msg == "true") {
    if (f_time == false) {
      for (int i = 0; i < 255; i++) {
        analogWrite(MOT_1_PIN, i);
        analogWrite(MOT_2_PIN, i);
        analogWrite(MOT_3_PIN, i);
        analogWrite(MOT_4_PIN, i);
        delay(10);
        f_time = true;
      }
    } else return;
  } else if (msg == "stop" || msg == "false") {
    if (f_time == true) {
      for (int j = 255; j > 0; j--) {
        analogWrite(MOT_1_PIN, j);
        analogWrite(MOT_2_PIN, j);
        analogWrite(MOT_3_PIN, j);
        analogWrite(MOT_4_PIN, j);
        delay(10);
      }
      f_time = false;
      analogWrite(MOT_1_PIN, 0);
      analogWrite(MOT_2_PIN, 0);
      analogWrite(MOT_3_PIN, 0);
      analogWrite(MOT_4_PIN, 0);
    } else return;
  }
*/


void runMotors(String msg) {
  if (msg == "") return;
  

  if (msg.startsWith("m1")) {
    mot_1 = msg.substring(3).toInt();
    //Serial.print("mot_1: ");
    //Serial.println(mot_1);
    analogWrite(MOT_1_PIN, map(mot_1, 0, 100, 0, 255));
  } else if (msg.startsWith("m2")) {
    mot_2 = msg.substring(3).toInt();
    //Serial.print("mot_2: ");
    //Serial.println(mot_2);
    analogWrite(MOT_2_PIN, map(mot_2, 0, 100, 0, 255));
  } else if (msg.startsWith("m3")) {
    mot_3 = msg.substring(3).toInt();
    //Serial.print("mot_3: ");
    //Serial.println(mot_3);
    analogWrite(MOT_3_PIN, map(mot_3, 0, 100, 0, 255));
  } else if (msg.startsWith("m4")) {
    mot_4 = msg.substring(3).toInt();
    //Serial.print("mot_4: ");
    //Serial.println(mot_4);
    analogWrite(MOT_4_PIN, map(mot_4, 0, 100, 0, 255));
  } else {
    char delimiter = ',';  // character to split by

    int start = 0;
    int end = msg.indexOf(delimiter);

    while (end != -1) {
      String part = msg.substring(start, end);
      //Serial.println(part); // print each part
      start = end + 1;
      end = msg.indexOf(delimiter, start);
      mot_1 = map(part.toInt(), 0, 100, 0, 255);
      mot_2 = map(part.toInt(), 0, 100, 0, 255);
      mot_3 = map(part.toInt(), 0, 100, 0, 255);
      mot_4 = map(part.toInt(), 0, 100, 0, 255);
    }

    String lastPart = msg.substring(start);
    //Serial.println(lastPart);
    
    if (mot_1 > 5) {
      analogWrite(MOT_1_PIN, mot_1);
      analogWrite(MOT_2_PIN, mot_2);
      analogWrite(MOT_3_PIN, mot_3);
      analogWrite(MOT_4_PIN, mot_4);
    } else {
      analogWrite(MOT_1_PIN, 0);
      analogWrite(MOT_2_PIN, 0);
      analogWrite(MOT_3_PIN, 0);
      analogWrite(MOT_4_PIN, 0);
    }
  }
}

void checkMessage(String msg) {
  Serial.println(msg);
  runMotors(msg);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length) {
  if (type == WStype_TEXT) {
    String message = String((char*)payload);
    webSocket.sendTXT(num, message);
    checkMessage(message);
  }
}

void setup() {
  //Serial_1.begin(9600);
  Serial.begin(115200);

    pinMode(MOT_1_PIN, OUTPUT);
    pinMode(MOT_2_PIN, OUTPUT);
    pinMode(MOT_3_PIN, OUTPUT);
    pinMode(MOT_4_PIN, OUTPUT);

    analogWrite(MOT_1_PIN, 0);
    analogWrite(MOT_2_PIN, 0);
    analogWrite(MOT_3_PIN, 0);
    analogWrite(MOT_4_PIN, 0);


  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    //Serial.println(".");
    delay(500);
  }

  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
  //if (pms.read(data)) {
  //  Serial.println("PM1.0 :" + String(data.PM_AE_UG_1_0) + "(ug/m3)");
  //  Serial.println("PM2.5 :" + String(data.PM_AE_UG_2_5) + "(ug/m3)");
  //  Serial.println("PM10  :" + String(data.PM_AE_UG_10_0) + "(ug/m3)");
  //}
}
