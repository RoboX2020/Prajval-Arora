import React from 'react';
import { ArrowLeft, Wifi, Zap, Cpu, Activity, Wrench, CheckSquare, AlertTriangle, Code } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

const codeChapter3 = `/*Nodemcu ESP8266 WIFI control car with the New Blynk app.*/

// Include the library files
#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

// Define the motor pins
#define ENA D0
#define IN1 D1
#define IN2 D2
#define IN3 D3
#define IN4 D4
#define ENB D5

// Variables for the Blynk widget values
int x = 50;
int y = 50;
int Speed;

char auth[] = ""; //Enter your Blynk auth token
char ssid[] = ""; //Enter your WIFI name
char pass[] = ""; //Enter your WIFI passowrd

void setup() {
  Serial.begin(9600);
  //Set the motor pins as output pins
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);

  // Initialize the Blynk library
  Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);
}

// Get the joystick values
BLYNK_WRITE(V0) {
  x = param[0].asInt();
}
// Get the joystick values
BLYNK_WRITE(V1) {
  y = param[0].asInt();
}
//Get the slider values
BLYNK_WRITE(V2) {
  Speed = param.asInt();
}

// Check these values using the IF condition
void smartcar() {
  if (y > 70) {
    carForward();
    Serial.println("carForward");
  } else if (y < 30) {
    carBackward();
    Serial.println("carBackward");
  } else if (x < 30) {
    carLeft();
    Serial.println("carLeft");
  } else if (x > 70) {
    carRight();
    Serial.println("carRight");
  } else if (x < 70 && x > 30 && y < 70 && y > 30) {
    carStop();
    Serial.println("carstop");
  }
}

void loop() {
  Blynk.run();// Run the blynk function
  smartcar();// Call the main function
}

/**************Motor movement functions*****************/
void carForward() {
  analogWrite(ENA, Speed);
  analogWrite(ENB, Speed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}
void carBackward() {
  analogWrite(ENA, Speed);
  analogWrite(ENB, Speed);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}
void carLeft() {
  analogWrite(ENA, Speed);
  analogWrite(ENB, Speed);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}
void carRight() {
  analogWrite(ENA, Speed);
  analogWrite(ENB, Speed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}
void carStop() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}`;

interface Chapter3Props {
  onBack: () => void;
}

export function Chapter3({ onBack }: Chapter3Props) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* ───────── HEADER ───────── */}
      <header className="mb-12">
        <div className="inline-block bg-[#FF6B6B] text-white border-4 border-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Chapter 03
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase underline decoration-[#FF6B6B]">Move It! 🚗</h1>
        <p className="text-lg font-bold">
          Welcome to Chapter 3! Now that you've mastered the basics of electronics, it's time to build something that moves. In this chapter, we will build a smart, wireless-controlled car. 
        </p>
        <div className="mt-4 p-4 bg-yellow-100 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3">
           <AlertTriangle className="w-6 h-6 shrink-0 text-yellow-600" />
           <p className="font-medium text-sm">
             <strong>A Quick Note on Wireless Tech:</strong> Many beginner robotic cars use Bluetooth for local control. However, for this project, we are stepping into the world of <strong>IoT (Internet of Things)</strong>! We will use the <strong>ESP8266 NodeMCU</strong> microcontroller and the <strong>Blynk</strong> platform to control our car via <strong>WiFi</strong>. This means you can control your car from anywhere in the world, as long as both your phone and the car have internet access!
           </p>
        </div>
      </header>

      {/* Parts List */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Wrench className="w-6 h-6 text-[#FF6B6B]" /> The Parts List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-blue-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">ESP8266 NodeMCU</h3>
              <p className="text-sm font-medium">The brain of our car, featuring built-in WiFi capabilities.</p>
            </div>
          </div>
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-red-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Activity className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">L298N Motor Driver</h3>
              <p className="text-sm font-medium">Takes weak signals and uses them to switch high-power electricity to the motors.</p>
            </div>
          </div>
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-yellow-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">DC Gear Motors</h3>
              <p className="text-sm font-medium">Convert electrical energy into mechanical movement.</p>
            </div>
          </div>
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-green-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <span className="text-2xl">🔋</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">Li-ion Batteries</h3>
              <p className="text-sm font-medium">Two 3.7V batteries in series (7.4V) to power the motors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Circuit Diagram */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#FFD700]" /> Circuit Diagram and Wiring
        </h2>
        <div className="doodle-card p-6 bg-white overflow-hidden">
          <img 
            src={`${import.meta.env.BASE_URL}circuit-diagram.png`} 
            alt="Circuit Diagram" 
            className="w-full rounded-xl border-4 border-black mb-6"
          />
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Power Connections</h3>
              <ul className="list-disc list-inside font-medium space-y-1">
                <li>Connect the two Li-ion batteries in series (7.4V total).</li>
                <li>Connect the <strong>Positive (Red)</strong> wire to the <strong>12V</strong> terminal on the L298N.</li>
                <li>Connect the <strong>Negative (Black)</strong> wire to the <strong>GND</strong> terminal on the L298N.</li>
                <li>Connect a wire from the <strong>5V</strong> terminal on the L298N to the <strong>Vin</strong> pin on the NodeMCU.</li>
                <li>Connect another wire from the <strong>GND</strong> terminal on the L298N to a <strong>GND</strong> pin on the NodeMCU.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Motor Connections</h3>
              <ul className="list-disc list-inside font-medium space-y-1">
                <li><strong>Motor 1 (Left):</strong> Connect to the <strong>OUT1</strong> and <strong>OUT2</strong> terminals.</li>
                <li><strong>Motor 2 (Right):</strong> Connect to the <strong>OUT3</strong> and <strong>OUT4</strong> terminals.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-2 uppercase">Logic Connections (ESP8266 to L298N)</h3>
              <ul className="list-disc list-inside font-medium space-y-1">
                <li><strong>ENA</strong> &rarr; <strong>D0</strong></li>
                <li><strong>IN1</strong> &rarr; <strong>D1</strong></li>
                <li><strong>IN2</strong> &rarr; <strong>D2</strong></li>
                <li><strong>IN3</strong> &rarr; <strong>D3</strong></li>
                <li><strong>IN4</strong> &rarr; <strong>D4</strong></li>
                <li><strong>ENB</strong> &rarr; <strong>D5</strong></li>
              </ul>
            </div>
            <div className="p-4 bg-blue-100 border-4 border-black rounded-xl">
              <p className="font-bold">How does it go in reverse?</p>
              <p className="text-sm">The L298N uses an internal circuit called an <strong>H-Bridge</strong>. By changing the logic signals on IN1 and IN2 (e.g., from HIGH/LOW to LOW/HIGH), the H-Bridge flips the polarity of the electricity going to the motor, making it spin backward!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blynk App Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Wifi className="w-6 h-6 text-[#4D96FF]" /> Setting Up Blynk
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(77,150,255,1)]">
           <p className="font-medium mb-4">Blynk makes it easy to build apps that talk to microcontrollers over the internet using <strong>Virtual Pins</strong>.</p>
           
           <h3 className="text-lg font-black uppercase mb-2">Step 1: Web Dashboard</h3>
           <ol className="list-decimal list-inside font-medium space-y-2 mb-6">
             <li>Create an account on the Blynk website.</li>
             <li>Create a <strong>New Template</strong> named "WiFi control car" (Hardware: ESP8266).</li>
             <li>Create three <strong>Virtual Pin</strong> datastreams:
                <ul className="list-disc list-inside ml-6 mt-1 text-sm text-gray-700">
                  <li><code>X</code> on pin <code>V0</code> (0-100)</li>
                  <li><code>Y</code> on pin <code>V1</code> (0-100)</li>
                  <li><code>Speed</code> on pin <code>V2</code> (0-255)</li>
                </ul>
             </li>
             <li>Create a <strong>New Device</strong> from this template and save your <code>BLYNK_AUTH_TOKEN</code>.</li>
           </ol>

           <h3 className="text-lg font-black uppercase mb-2">Step 2: Mobile App</h3>
           <ol className="list-decimal list-inside font-medium space-y-2">
             <li>Install the Blynk IoT app and log in.</li>
             <li>Open your device and tap the setup icon.</li>
             <li>Add a <strong>Slider</strong> and link it to <code>Speed (V2)</code>.</li>
             <li>Add a <strong>Joystick</strong> and link X to <code>X (V0)</code> and Y to <code>Y (V1)</code>.</li>
           </ol>
        </div>
      </section>

      {/* Code Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Code className="w-6 h-6 text-[#4D96FF]" /> The Code
        </h2>
        <CodeBlock code={codeChapter3} />
      </section>

      {/* Student Assignments */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-[#FFD700]" /> Student Assignments: Unleash Creativity!
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,215,0,1)] space-y-6">
          <div>
            <h3 className="text-xl font-black mb-2 uppercase text-pink-600">Assignment 1: Design a Custom Car Body</h3>
            <p className="font-medium">
              Your primary assignment is to design the most unique and creative body for your car. Let your imagination run wild!
              Use foamboards, cardboard, LEGO bricks, balsa wood, or even 3D-print your own chassis. Ensure you leave room to access the NodeMCU's USB port and the battery pack.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-black mb-2 uppercase text-blue-600">Assignment 2: Code Modifications</h3>
            <ul className="list-disc list-inside font-medium space-y-1">
              <li><strong>Headlights:</strong> Add two LEDs to the front of the car and a virtual Switch in Blynk.</li>
              <li><strong>Horn:</strong> Connect a piezo buzzer and add a push-button widget to honk.</li>
              <li><strong>Speed Limits:</strong> Modify the code so reversing automatically halves the speed.</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
