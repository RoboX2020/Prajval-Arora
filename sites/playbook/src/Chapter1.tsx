import React, { useState } from 'react';
import { ArrowLeft, Battery, Cpu, Lightbulb, Zap, Activity, Code, PenTool, CheckSquare, Play, Terminal } from 'lucide-react';

interface Chapter1Props {
  onBack: () => void;
}

export function Chapter1({ onBack }: Chapter1Props) {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalOutput(['$ arduino-cli compile --fqbn arduino:avr:uno blink.ino', 'Compiling sketch...']);
    
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, 'Sketch uses 924 bytes (2%) of program storage space.', 'Global variables use 9 bytes (0%) of dynamic memory.']);
    }, 1000);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, '$ arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno blink.ino', 'Connecting to programmer...', 'Uploading...']);
    }, 2000);

    setTimeout(() => {
      setTerminalOutput(prev => [...prev, 'Upload successful!', 'avrdude done.  Thank you.', '', 'LED is now blinking! ⚡']);
      setIsRunning(false);
    }, 3500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <header className="mb-12">
        <div className="inline-block bg-[#FFD700] border-4 border-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Chapter 01
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase underline decoration-[#FF6B6B]">The Spark of Life! ⚡</h1>
        <p className="text-lg font-bold">
          Welcome to the world of robotics! Today, we're going to bring our first circuit to life. 
          We'll learn how to make an LED blink using an Arduino. It's the "Hello World" of hardware!
        </p>
      </header>

      {/* Basic Principles */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#4D96FF]" /> Basic Principles
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(77,150,255,1)]">
          <p className="text-lg font-medium mb-4">
            Before we build, we need to understand the big three: <strong>Voltage</strong>, <strong>Current</strong>, and <strong>Resistance</strong>.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">🔋</span>
              <div>
                <strong className="text-xl block">Voltage (V)</strong>
                <span>Think of it as the "push" or pressure that makes electricity flow. Measured in Volts.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">🌊</span>
              <div>
                <strong className="text-xl block">Current (I)</strong>
                <span>The actual flow of tiny electrons moving through the wires. Measured in Amps.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-white p-4 border-4 border-black rounded-xl">
              <span className="text-3xl">🧱</span>
              <div>
                <strong className="text-xl block">Resistance (R)</strong>
                <span>Obstacles that slow down the current. Keeps things from blowing up! Measured in Ohms (Ω).</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Parts & Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <PenTool className="w-6 h-6 text-[#FF6B6B]" /> The Parts List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-blue-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Arduino Uno</h3>
              <p className="text-sm font-medium">The brains! A microcontroller that runs our code.</p>
            </div>
          </div>
          
          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-red-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Lightbulb className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">LED</h3>
              <p className="text-sm font-medium">Light Emitting Diode. It glows when current passes through!</p>
            </div>
          </div>

          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-yellow-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">220Ω Resistor</h3>
              <p className="text-sm font-medium">Limits the flow of electricity so the LED doesn't pop.</p>
            </div>
          </div>

          <div className="doodle-card p-4 flex gap-4 items-center bg-white">
            <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-black flex items-center justify-center shrink-0">
              <Battery className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Breadboard & Wires</h3>
              <p className="text-sm font-medium">For plugging things in without messy soldering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Math & Physics Formulas */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">🧮</span> Math & Physics
        </h2>
        <div className="doodle-card p-6 md:p-8 bg-[#FAFAFA] shadow-[8px_8px_0px_0px_rgba(107,203,119,1)] relative overflow-hidden">
          <div className="absolute -right-8 -top-8 opacity-10">
            <span className="text-9xl">V=IR</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Ohm's Law</h3>
          <p className="text-lg font-medium mb-6">
            Ohm's Law is the most important formula in electronics. It connects Voltage, Current, and Resistance.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="bg-white border-4 border-black p-4 rounded-xl flex-1 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-3xl font-black font-mono">V = I × R</span>
              <p className="mt-2 text-sm font-bold text-gray-600">Voltage = Current × Resistance</p>
            </div>
          </div>

          <div className="bg-white p-6 border-4 border-black rounded-xl border-dashed">
            <h4 className="font-bold text-xl mb-2">Why a 220Ω Resistor?</h4>
            <p className="mb-4">Our Arduino supplies <strong>5V</strong>. A typical red LED needs about <strong>2V</strong> and likes a current of <strong>0.02A</strong> (20mA).</p>
            <div className="font-mono bg-gray-100 p-4 rounded-lg border-2 border-black">
              R = (Supply Voltage - LED Voltage) / Current<br/>
              R = (5V - 2V) / 0.02A<br/>
              R = 3V / 0.02A<br/>
              R = 150 Ohms
            </div>
            <p className="mt-4 font-bold text-green-700">We use 220Ω because it's a common standard size and provides a safe buffer!</p>
          </div>
        </div>
      </section>

      {/* Wiring Diagram */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <span className="text-2xl">🔌</span> The Wiring Diagram
        </h2>
        <div className="doodle-card p-6 bg-white shadow-[8px_8px_0px_0px_rgba(255,215,0,1)]">
          <p className="text-lg font-bold mb-4">Follow these steps carefully!</p>
          <ol className="list-decimal pl-6 space-y-3 font-medium text-lg mb-8">
            <li>Connect a jumper wire from Arduino <strong>GND</strong> to the negative (-) rail of the breadboard.</li>
            <li>Place the LED on the breadboard. Note: The longer leg is Positive (Anode), the shorter is Negative (Cathode).</li>
            <li>Connect the <strong>220Ω Resistor</strong> from the negative (-) rail to the shorter leg of the LED.</li>
            <li>Connect a jumper wire from Arduino <strong>Pin 13</strong> to the longer leg of the LED.</li>
          </ol>
          
          {/* Abstract SVG diagram for doodle style */}
          <div className="bg-white border-4 border-black rounded-xl p-8 relative min-h-[300px] flex items-center justify-center">
             <svg viewBox="0 0 400 200" className="w-full max-w-lg drop-shadow-md">
               {/* Arduino mock */}
               <rect x="20" y="50" width="100" height="100" rx="10" fill="#0ea5e9" stroke="#000" strokeWidth="4" />
               <text x="35" y="105" fontFamily="monospace" fontWeight="bold" fill="#fff" fontSize="16">UNO</text>
               
               {/* Pins */}
               <circle cx="110" cy="70" r="5" fill="#000" />
               <text x="75" y="75" fontSize="12" fontWeight="bold">Pin 13</text>
               
               <circle cx="110" cy="130" r="5" fill="#000" />
               <text x="80" y="135" fontSize="12" fontWeight="bold">GND</text>
               
               {/* Breadboard mock */}
               <rect x="250" y="50" width="120" height="100" rx="5" fill="#f8fafc" stroke="#000" strokeWidth="4" />
               {/* LED */}
               <circle cx="310" cy="70" r="15" fill="#ef4444" stroke="#000" strokeWidth="4" />
               <path d="M300 85 L290 120" stroke="#000" strokeWidth="4" fill="none" />
               <path d="M320 85 L330 110" stroke="#000" strokeWidth="4" fill="none" />
               
               {/* Resistor */}
               <path d="M250 130 L270 130 L275 120 L285 140 L295 120 L305 140 L310 130 L330 130" stroke="#ca8a04" strokeWidth="4" fill="none" strokeLinejoin="round" />
               
               {/* Wires */}
               <path d="M110 70 Q180 30 300 85" stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="5,5" />
               <path d="M110 130 Q180 160 250 130" stroke="#000" strokeWidth="4" fill="none" />
             </svg>
          </div>
        </div>
      </section>

      {/* Program / Code */}
      <section className="mb-12">
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <Code className="w-6 h-6 text-[#6BCB77]" /> The Code
        </h2>
        
        <div className="mb-6 doodle-card p-6 bg-[#4D96FF]/10 border-4 border-black border-dashed">
           <h3 className="text-lg font-black uppercase mb-2">Build with Blocks or AI</h3>
           <p className="font-bold text-sm mb-4">Want to drag-and-drop your code or let AI help you write it? You can design your own logic without typing!</p>
           <a href="https://thestempedia.com/product/pictoblox/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-black text-white font-black uppercase text-xs rounded hover:bg-gray-800 transition-colors">
             Open PictoBlox
           </a>
        </div>

        <div className="doodle-card p-0 bg-[#1A1A1A] text-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          {/* Header */}
          <div className="bg-black p-4 border-b-4 border-black flex items-center justify-between">
             <div className="flex gap-2">
               <div className="w-4 h-4 rounded-full bg-[#FF6B6B] border-2 border-black"></div>
               <div className="w-4 h-4 rounded-full bg-[#FFD700] border-2 border-black"></div>
               <div className="w-4 h-4 rounded-full bg-[#6BCB77] border-2 border-black"></div>
             </div>
             <div className="flex gap-4 items-center">
               <span className="text-[10px] px-2 py-1 bg-white/10 rounded border border-white/20 font-bold uppercase tracking-widest hidden sm:inline-block">blink.ino</span>
               <button 
                 onClick={handleRunCode}
                 disabled={isRunning}
                 className="flex items-center gap-2 bg-[#6BCB77] text-black px-3 py-1.5 rounded font-black text-xs uppercase hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-[1px] active:shadow-none"
               >
                 <Play className="w-3 h-3 fill-black" /> {isRunning ? 'Running...' : 'Run / Upload'}
               </button>
             </div>
          </div>
          
          {/* Code Area */}
          <div className="p-4 overflow-x-auto border-b-4 border-black font-mono text-sm leading-relaxed bg-[#1A1A1A] relative">
            <div className="flex">
              <div className="text-gray-600 text-right select-none pr-4 border-r-2 border-gray-800 flex flex-col mr-4">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i + 1}>{i + 1}</span>
                ))}
              </div>
              <div className="flex-1">
                <pre className="m-0 p-0 overflow-visible"><span className="text-gray-500">// Setup runs once when you power on the Arduino</span>
<span className="text-[#FF6B6B]">void</span> <span className="text-[#4D96FF]">setup</span>() {'{'}
  <span className="text-gray-500">// Tell Pin 13 to act as an OUTPUT (sending electricity out)</span>
  <span className="text-[#FFD700]">pinMode</span>(<span className="text-purple-400">13</span>, <span className="text-[#6BCB77]">OUTPUT</span>);
{'}'}

<span className="text-gray-500">// Loop runs over and over forever</span>
<span className="text-[#FF6B6B]">void</span> <span className="text-[#4D96FF]">loop</span>() {'{'}
  <span className="text-gray-500">// Turn LED ON (HIGH = full voltage)</span>
  <span className="text-[#FFD700]">digitalWrite</span>(<span className="text-purple-400">13</span>, <span className="text-[#6BCB77]">HIGH</span>);
  <span className="text-gray-500">// Wait for 1000 milliseconds (1 full second)</span>
  <span className="text-[#FFD700]">delay</span>(<span className="text-purple-400">1000</span>);
  
  <span className="text-gray-500">// Turn LED OFF (LOW = 0 voltage)</span>
  <span className="text-[#FFD700]">digitalWrite</span>(<span className="text-purple-400">13</span>, <span className="text-[#6BCB77]">LOW</span>);
  <span className="text-gray-500">// Wait another second before repeating</span>
  <span className="text-[#FFD700]">delay</span>(<span className="text-purple-400">1000</span>);
{'}'}</pre>
              </div>
            </div>
          </div>

          {/* Terminal Area */}
          <div className="bg-black p-4 font-mono text-xs h-48 overflow-y-auto">
            <div className="flex items-center gap-2 text-gray-500 mb-3 border-b border-gray-800 pb-2">
              <Terminal className="w-4 h-4" />
              <span className="uppercase font-bold tracking-widest text-[10px]">Terminal Output</span>
            </div>
            {terminalOutput.length === 0 ? (
              <div className="text-gray-600 flex items-center h-full justify-center pb-8 opacity-50">
                Click "Run / Upload" to simulate compiling and flashing the Arduino.
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className={`${line.includes('Error') ? 'text-red-400' : line.includes('successful') || line.includes('blinking') ? 'text-[#6BCB77]' : 'text-gray-300'}`}>
                    {line}
                  </div>
                ))}
                {isRunning && <div className="text-gray-500 animate-pulse mt-1">_</div>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Exercises */}
      <section>
        <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-black" /> Your Turn! (Exercises)
        </h2>
        <div className="space-y-6">
          <div className="doodle-card p-6 bg-[#6BCB77] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
              <span className="text-2xl">🐇</span> Exercise 1: Speed it up!
            </h3>
            <p className="font-bold text-sm">
              Modify the code so the LED blinks twice as fast. 
              (Hint: change the numbers inside the <code>delay()</code> function).
            </p>
          </div>

          <div className="doodle-card p-6 bg-[#FF6B6B] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
              <span className="text-2xl">🆘</span> Exercise 2: S.O.S.
            </h3>
            <p className="font-bold text-sm">
              Morse code time! Write a program that blinks S.O.S. 
              (3 short blinks, 3 long blinks, 3 short blinks). Use a 200ms delay for short, and 600ms for long.
            </p>
          </div>

          <div className="doodle-card p-6 bg-[#4D96FF] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
              <span className="text-2xl">🚦</span> Exercise 3: Police Lights
            </h3>
            <p className="font-bold text-sm">
              Add a second LED (maybe blue?) to pin 12. Wire it up with its own resistor. 
              Then, change your code so Pin 13 blinks, turns off, and then Pin 12 blinks!
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16 text-center">
        <button 
          onClick={onBack}
          className="doodle-button w-full"
        >
          Finish Chapter 01
        </button>
      </div>
    </div>
  );
}
