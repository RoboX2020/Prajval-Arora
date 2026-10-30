import { Link } from 'react-router-dom';
import { PROJECT_LIBRARY } from '../projectData';
import React from 'react';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import {
  PERSON,
  LAWS,
  READERS,
  NOW,
  PRACTICE,
  COLLISIONS,
  MORE_WORK,
  SKILL_FIELDS,
  RECOGNITION,
  HERO_PHOTO,
  FRAMES,
} from '../content';
import { SiteHeader } from './SiteHeader';
import { Words, WordVariants } from '../intensity';
import { JointLattice } from './JointLattice';
import { PixelSprites } from './PixelSprites';
import { Spread } from './Frame';
import { SignalBoard } from './SignalBoard';
import { VersionHistory } from './VersionHistory';





// Same facts at every level for the Collisions cards, keyed by card id.
// Field tags, titles and stats stay fixed; the hack-play one-liner carries
// a Latin phrase and is exempt like the poetic captions. Types are loose
// here because content.ts owns the card shape.
const COLLISION_TEXT: Record<string, { result?: WordVariants; body: WordVariants }> = {
  axis: {
    result: [
      'One sky. Two pilot views.',
      'One shared sky, two cockpit views.',
      'One shared airspace. Two cockpit perspectives.',
      'One shared airspace. Two cockpit perspectives.',
      'A shared airspace rendered from two cockpit perspectives.',
      'A shared airspace rendered from two distinct cockpit perspectives.',
    ],
    body: [
      'A hackathon team project: pretend planes that might hit each other, advice to climb or descend, a 3D map of flight paths, and pilot views you open with a QR code. It works in a browser. It is a demo, not a real flight-safety system.',
      'A hackathon team prototype: simulated plane conflicts, climb/descend advice, a 3D path explorer, and QR-linked cockpit views. A working browser demo - not a certified flight-safety system.',
      'A hackathon team prototype: simulated aircraft conflicts, climb/descend advisories, a 3D trajectory explorer and QR-linked cockpit views. A working browser demo, not a certified flight-safety system.',
      'A hackathon team prototype: simulated aircraft conflicts, climb/descend advisories, a 3D trajectory explorer and QR-linked cockpit views. A working browser demo, not a certified flight-safety system.',
      'A hackathon team prototype simulating aircraft conflicts, with climb/descend advisories, a 3D trajectory explorer, and QR-linked cockpit views; a functional browser demo rather than a certified flight-safety system.',
      'A hackathon team prototype simulating aircraft conflicts, comprising climb/descend advisories, a three-dimensional trajectory explorer, and QR-linked cockpit views; a functional browser demonstration rather than a certified flight-safety system.',
    ],
  },
  barrow: {
    result: [
      'A wearable that listens, sees, and helps people talk.',
      'A wearable that listens, sees, and coaches speech.',
      'A wearable that listens, sees, and coaches speech in the clinic.',
      'A wearable that listens, sees, and coaches speech in the clinic.',
      'A wearable that perceives and coaches speech within the clinic.',
      'A wearable apparatus that perceives and coaches speech within a clinical setting.',
    ],
    body: [
      "At Barrow Institute: a small computer runs the AI on the device itself, two cameras see depth, and a little display shows tips. It helps people who struggle to find words practice sounds, and it can describe the world out loud. Built with Dr. Catherine's research team. The clinic is testing it now, and it may become a company.",
      "At Barrow Institute: a Jetson Nano runs AI on the device, a stereo camera sees, and an AR display coaches. People with aphasia get pronunciation help; people with apraxia hear their surroundings narrated. Built with Dr. Catherine's research team. The clinic is testing it, moving toward a company.",
      "At Barrow Institute: a Jetson Nano with local LLM inference, a stereo camera, and a birdbath AR display. Aphasia patients get pronunciation guidance. Apraxia patients hear a continuous narration of their surroundings. Built with Dr. Catherine's research team. The clinic tests it now, moving toward an LLC.",
      "At Barrow Institute: a Jetson Nano with local LLM inference, a stereo camera, and a birdbath AR display. Aphasia patients get pronunciation guidance. Apraxia patients hear a continuous narration of their surroundings. Built with Dr. Catherine's research team. The clinic tests it now, moving toward an LLC.",
      "At Barrow Institute: local LLM inference on a Jetson Nano, stereo vision, and a birdbath AR display provide pronunciation guidance for aphasia patients and continuous environmental narration for apraxia patients. Developed with Dr. Catherine's research team; clinical evaluation is underway, with incorporation planned.",
      "At Barrow Institute: local large-language-model inference on a Jetson Nano, stereo vision, and a birdbath AR display furnish pronunciation guidance for patients with aphasia and continuous environmental narration for patients with apraxia. Developed in collaboration with Dr. Catherine's research team; clinical evaluation is underway, with incorporation anticipated.",
    ],
  },
  stellantis: {
    result: [
      'A real robot line and its computer twin, built for Detroit.',
      'A physical line and its digital twin, commissioned for Detroit.',
      'A physical line and its twin, commissioned for Detroit.',
      'A physical line and its twin, commissioned for Detroit.',
      'A physical line and its digital twin, commissioned for Detroit.',
      'A physical production line and its digital twin, commissioned for Detroit.',
    ],
    body: [
      'ASU and a company called Wandelbots asked for a robot demo. Two URSe robot arms, grippers, cameras that see, networking, practice in a simulator, and getting it all running live.',
      'ASU and Wandelbots asked for a demonstrator: two URSe cobot arms, end-effectors, machine vision, cell networking, Isaac Sim validation, and live commissioning.',
      'ASU and Wandelbots asked for a demonstrator. Dual URSe cobots, end-effectors, machine vision, cell networking, Isaac Sim validation, and live commissioning.',
      'ASU and Wandelbots asked for a demonstrator. Dual URSe cobots, end-effectors, machine vision, cell networking, Isaac Sim validation, and live commissioning.',
      'ASU and Wandelbots commissioned a demonstrator comprising dual URSe cobots, end-effectors, machine vision, cell networking, Isaac Sim validation, and live commissioning.',
      'ASU and Wandelbots commissioned a demonstrator comprising dual URSe collaborative robots, end-effectors, machine vision, cell networking, Isaac Sim validation, and live commissioning.',
    ],
  },
  line: {
    result: [
      'Robot arms, PLCs, conveyors, cameras, and air - working together.',
      'UR5, UR3, JAKA, Dobot, FANUC thinking, PLCs, conveyors, vision, air.',
      'UR5, UR3, JAKA, Dobot, FANUC thinking, PLCs, conveyors, vision, air.',
      'UR5, UR3, JAKA, Dobot, FANUC thinking, PLCs, conveyors, vision, air.',
      'UR5, UR3, JAKA, Dobot, FANUC methodologies, PLCs, conveyors, vision, and pneumatics.',
      'UR5, UR3, JAKA, Dobot, and FANUC methodologies with PLCs, conveyors, machine vision, and pneumatics.',
    ],
    body: [
      'A small copy of a factory for a showcase: big and small robot arms working together, PLC logic, factory networking, warehouse steps, and safety rules. It is tiny, but it really has to run.',
      'An Innovation Showcase cell with big and small robot arms in coordination, structured PLC logic, Ethernet/IP, warehouse workflows, and robot-cell safety. A factory in miniature that still has to run.',
      'An Innovation Showcase cell with 6-DOF and 4-DOF coordination, structured PLC logic, Ethernet/IP, warehouse workflows, and robot-cell safety. A factory in miniature that still has to run.',
      'An Innovation Showcase cell with 6-DOF and 4-DOF coordination, structured PLC logic, Ethernet/IP, warehouse workflows, and robot-cell safety. A factory in miniature that still has to run.',
      'An Innovation Showcase cell featuring 6-DOF and 4-DOF coordination, structured PLC logic, Ethernet/IP, warehouse workflows, and robot-cell safety - a factory in miniature that must nevertheless operate.',
      'An Innovation Showcase cell featuring coordinated 6-DOF and 4-DOF manipulators, structured PLC logic, Ethernet/IP, warehouse workflows, and robot-cell safety - a factory in miniature that must nevertheless operate.',
    ],
  },
  go2: {
    result: [
      'Teach the dog in a computer first. Then argue with physics.',
      'Train the dog in a twin, then argue with physics.',
      'Train the dog in a twin, then argue with physics.',
      'Train the dog in a twin, then argue with physics.',
      'Train the quadruped in its twin, then negotiate with physics.',
      'Train the quadruped within its digital twin, then negotiate with physics.',
    ],
    body: [
      "I train a Unitree robot dog inside NVIDIA's simulator first. It learns there. Then the real dog has to do it in the real world, where physics pushes back.",
      'ROS 2, Isaac Sim, and Omniverse for the Unitree Go2. Reinforcement learning and digital twins first; physics when the real dog moves.',
      'ROS 2, Isaac Sim, and Omniverse workflows for Unitree Go2. Reinforcement learning and digital twins first. Physics when the animal actually moves.',
      'ROS 2, Isaac Sim, and Omniverse workflows for Unitree Go2. Reinforcement learning and digital twins first. Physics when the animal actually moves.',
      'ROS 2, Isaac Sim, and Omniverse workflows for the Unitree Go2: reinforcement learning and digital twins first, physical dynamics once the platform actually moves.',
      'ROS 2, Isaac Sim, and Omniverse workflows for the Unitree Go2 platform: reinforcement learning and digital twins precede the physical dynamics encountered once the platform is in motion.',
    ],
  },
  honeywell: {
    result: [
      'Cool the engine with its own air. Then design the factory that builds the part.',
      'Bleed air as a coolant. Then the factory that would make the exchanger.',
      'Bleed air as a coolant. Then the factory that would make the exchanger.',
      'Bleed air as a coolant. Then the factory that would make the exchanger.',
      'Bleed air employed as a coolant; subsequently, the factory that would manufacture the exchanger.',
      'Bleed air employed as a coolant; subsequently, the production facility that would manufacture the exchanger.',
    ],
    body: [
      '2025: second place and $5,000 for cooling jet engines with their own exhaust air. 2026: third place and $2,500 for machines that build engine cooling parts. One year the science. The next year the factory.',
      '2025: 2nd place and $5,000 for cooling jet engines with bleed-air exhaust. 2026: 3rd place and $2,500 for automated manufacturing of engine heat-exchange systems. Thermodynamics one year, production the next.',
      '2025: 2nd place and $5,000, cooling jet engines with bleed-air exhaust. 2026: 3rd place and $2,500, automated manufacturing for engine heat-exchange systems. Thermodynamics one year. Production the next.',
      '2025: 2nd place and $5,000, cooling jet engines with bleed-air exhaust. 2026: 3rd place and $2,500, automated manufacturing for engine heat-exchange systems. Thermodynamics one year. Production the next.',
      '2025: second place and $5,000 for cooling jet engines with bleed-air exhaust; 2026: third place and $2,500 for automated manufacturing of engine heat-exchange systems. Thermodynamics one year, production the next.',
      'In 2025, second place and $5,000 for cooling jet engines with bleed-air exhaust; in 2026, third place and $2,500 for automated manufacturing of engine heat-exchange systems - thermodynamics one year, production the next.',
    ],
  },
  'hack-play': {
    // The result line carries a Latin phrase and is exempt like the captions.
    body: [
      'Honeywell was not a one-time sprint. That season of playing built the winning team - and the photo of me peace-signing in a hall. Having fun got the thermodynamics done.',
      'Honeywell was not a lone sprint. That season of play produced the winning team and the face that still peace-signs in a hall. Fun finished the thermodynamics.',
      'Honeywell was not a lone sprint. That season of play produced the winning team and the face that still peace-signs in a hall. Fun finished the thermodynamics.',
      'Honeywell was not a lone sprint. That season of play produced the winning team and the face that still peace-signs in a hall. Fun finished the thermodynamics.',
      'Honeywell was no solitary sprint: that season of play produced the winning team and the face that still peace-signs in a hall. Fun completed the thermodynamics.',
      'Honeywell was no solitary sprint: that season of play yielded the winning team and the countenance that still peace-signs in a hall. Fun completed the thermodynamics.',
    ],
  },
  riverside: {
    result: [
      'Put the heat where a river already carries it away.',
      'Put the heat where a river already knows how to carry it.',
      'Put the heat where a river already knows how to carry it.',
      'Put the heat where a river already knows how to carry it.',
      'Site the heat where a river already conveys it.',
      'Site the heat where a river already conveys it.',
    ],
    body: [
      'My own research: cool data centers with dam water that already carries heat away. TKS and Microsoft gave a $2,500 grant, and I wrote papers and gave talks about it.',
      'Solo research on dam-based cooling for sustainable data centers. TKS and Microsoft: a $2,500 grant, then papers on the same problem. Spoken at Cronkite.',
      'Solo research on dam-based cooling for sustainable data centers. TKS and Microsoft: a $2,500 grant, then papers on the same problem. Spoken at Cronkite.',
      'Solo research on dam-based cooling for sustainable data centers. TKS and Microsoft: a $2,500 grant, then papers on the same problem. Spoken at Cronkite.',
      'Independent research on dam-based cooling for sustainable data centers, supported by TKS and Microsoft with a $2,500 grant and subsequent publications; presented at Cronkite.',
      'Independent research on dam-based cooling for sustainable data centers, supported by TKS and Microsoft through a $2,500 grant and subsequent publications, and presented at Cronkite.',
    ],
  },
  'air-guitar': {
    result: [
      'No strings. No frets. A wrist, a motion sensor, and real sound.',
      'No strings. No frets. A wrist, an accelerometer, Karplus-Strong.',
      'No strings. No frets. A wrist, an accelerometer, Karplus-Strong.',
      'No strings. No frets. A wrist, an accelerometer, Karplus-Strong.',
      'No strings, no frets: a wrist, an accelerometer, and Karplus-Strong synthesis.',
      'No strings, no frets: a wrist, an accelerometer, and Karplus-Strong synthesis.',
    ],
    body: [
      'A guitar with no strings: a wrist band with an Arduino and a motion sensor makes real sound as you strum the air. 300,000 people watched it on Instagram. The free code grew with no ads.',
      'A wearable instrument with an Arduino, motion sensing, and a real-time sound engine. 300,000 Instagram views; the open-source repo grew with no campaign.',
      'A wearable instrument with Arduino, inertial sensing, and a real-time sound engine. 300,000 Instagram views. The open-source repo grew with no campaign.',
      'A wearable instrument with Arduino, inertial sensing, and a real-time sound engine. 300,000 Instagram views. The open-source repo grew with no campaign.',
      'A wearable instrument built on Arduino, inertial sensing, and a real-time sound engine; 300,000 Instagram views, and an open-source repository that grew without promotion.',
      'A wearable instrument constructed on Arduino with inertial sensing and a real-time sound engine; it garnered 300,000 Instagram views, and its open-source repository grew absent any campaign.',
    ],
  },
  faith: {
    result: [
      'The schools had no labs. Then 200 students could build.',
      'The schools had no labs. Then 200 students could build.',
      'The schools had no labs. Then 200 students could build.',
      'The schools had no labs. Then 200 students could build.',
      'The schools had no laboratories; subsequently, 200 students could build.',
      'The schools had no laboratories; subsequently, 200 students could build.',
    ],
    body: [
      'I started robot labs in schools in Kanpur that had none - kits, lessons, and teaching. My teams won 1st in the region and 10th in the country, and our $100 robot beat $1,000 machines.',
      'Founded robotics labs in Kanpur schools: kits, curriculum, teaching. Coached teams to 1st regional and 10th national at the International Robotics Championship, including a $100 omni-robot that beat $1,000 machines.',
      'Founded robotics labs in Kanpur schools. Kits, curriculum, teaching. Coached teams to 1st regional and 10th national at the International Robotics Championship, including a $100 omni-robot that beat $1,000 machines.',
      'Founded robotics labs in Kanpur schools. Kits, curriculum, teaching. Coached teams to 1st regional and 10th national at the International Robotics Championship, including a $100 omni-robot that beat $1,000 machines.',
      'Established robotics laboratories in Kanpur schools, providing kits, curriculum, and instruction; coached teams to first place regionally and tenth nationally at the International Robotics Championship, including a $100 omnidirectional robot that defeated $1,000 machines.',
      'Established robotics laboratories in Kanpur schools, furnishing kits, curriculum, and instruction; coached teams to first place regionally and tenth nationally at the International Robotics Championship, including a $100 omnidirectional robot that defeated machines costing $1,000.',
    ],
  },
  tapri: {
    result: [
      'A tea stall for people who make things. ASU now charters it.',
      'A tea stall for people who make things. ASU now charters it.',
      'A tea stall for people who make things. ASU now charters it.',
      'A tea stall for people who make things. ASU now charters it.',
      'A tea stall for people who make things, now chartered by ASU.',
      'A tea stall for people who make things, now chartered by ASU.',
    ],
    body: [
      'I started Tapri, a club for people who build things, and I run it. 22,000 people reached, 2,200 members, more than 40 ventures. Its hackathons had over 5,000 people. The old platform is saved in the archive. Now it is an official club at ASU with Professor Aram Chavez.',
      'Founded Tapri and preside over it. 22,000 people, 2,200 members, 40+ ventures, and hackathons with 5,000+ combined participants. The original GoTapri platform is preserved in the archive; restarted as a chartered ASU club with Prof. Aram Chavez.',
      'Founded Tapri. Preside. 22,000 people, 2,200 members, and 40+ ventures (Ideacode, FlexFund, STEMverse). External hackathons with 5,000+ combined participants. The original GoTapri platform is preserved in the project archive. Restarted as a chartered club at ASU with Prof. Aram Chavez.',
      'Founded Tapri. Preside. 22,000 people, 2,200 members, and 40+ ventures (Ideacode, FlexFund, STEMverse). External hackathons with 5,000+ combined participants. The original GoTapri platform is preserved in the project archive. Restarted as a chartered club at ASU with Prof. Aram Chavez.',
      'Founded Tapri and currently preside: 22,000 people reached, 2,200 members, and over 40 ventures (Ideacode, FlexFund, STEMverse), with external hackathons exceeding 5,000 combined participants. The original GoTapri platform is preserved in the project archive; the club has been re-established as a chartered ASU organization with Prof. Aram Chavez.',
      'Founded Tapri and currently preside: 22,000 individuals reached, 2,200 members, and in excess of 40 ventures (Ideacode, FlexFund, STEMverse), with external hackathons exceeding 5,000 combined participants. The original GoTapri platform is preserved in the project archive; the organization has been re-established as a chartered ASU club under Prof. Aram Chavez.',
    ],
  },
  espclaw: {
    result: [
      'Talk to hardware the AI agent could not reach before.',
      "Talk to hardware that Espressif's agent could not reach.",
      "Talk to hardware that Espressif's agent could not reach.",
      "Talk to hardware that Espressif's agent could not reach.",
      "Address hardware that Espressif's agent could not previously reach.",
      "Address hardware that Espressif's agent could not previously reach.",
    ],
    body: [
      "I added code to Espressif's AI agent so it can talk to Arduino boards it could not reach before. Now people can program hardware just by speaking.",
      "A PR to Espressif's ESP-Claw AI agent framework: Arduino support the agent could not reach, plus natural-language control so people program hardware by speaking.",
      "A PR to Espressif's ESP-Claw AI agent framework. Arduino support the agent could not reach, plus natural-language control so people program hardware by speaking.",
      "A PR to Espressif's ESP-Claw AI agent framework. Arduino support the agent could not reach, plus natural-language control so people program hardware by speaking.",
      "A pull request to Espressif's ESP-Claw AI agent framework, adding previously unsupported Arduino targets and natural-language control so hardware can be programmed by speech.",
      "A pull request to Espressif's ESP-Claw AI agent framework, contributing previously unsupported Arduino targets alongside natural-language control such that hardware may be programmed through speech.",
    ],
  },
  champ: {
    result: [
      'First in the country, cheapest build, tenth in the world.',
      'First nationally, most budget-efficient, tenth in the world.',
      'First nationally, most budget-efficient, tenth in the world.',
      'First nationally, most budget-efficient, tenth in the world.',
      'First nationally, most budget-efficient, tenth internationally.',
      'First nationally, most budget-efficient, tenth internationally.',
    ],
    body: [
      'A robot that rolls in any direction, with an arm, and its own Wi-Fi - you drive it from any phone. Built for $100 against teams with thousands.',
      'An omnidirectional robot with a mounted arm and its own local Wi-Fi server - drive it from any phone. Built on $100 against four-figure budgets.',
      'An omnidirectional robot with a mounted arm and its own local Wi-Fi server. Drive it from any phone. Built on $100 against four-figure budgets.',
      'An omnidirectional robot with a mounted arm and its own local Wi-Fi server. Drive it from any phone. Built on $100 against four-figure budgets.',
      'An omnidirectional robot with a mounted arm and an onboard local Wi-Fi server, drivable from any phone, constructed for $100 against four-figure budgets.',
      'An omnidirectional robot with a mounted arm and an onboard local Wi-Fi server, operable from any telephone, constructed for $100 against four-figure budgets.',
    ],
  },
  arms: {
    result: [
      'Treasurer, marketing head, and software lead. Plus a $10k payload project.',
      'Treasurer, marketing head, and software lead. Also a $10k payload conversation.',
      'Treasurer, marketing head, and software lead. Also a $10k payload conversation.',
      'Treasurer, marketing head, and software lead. Also a $10k payload conversation.',
      'Treasurer, marketing head, and software lead; additionally, a $10k payload engagement.',
      'Treasurer, marketing head, and software lead; additionally, a $10k payload engagement.',
    ],
    body: [
      'I handle money, marketing, and software for a flight club at ASU. We are working on a payload project with a drone company under a $10,000 budget, and I build a plane, a boat, and a fast little car with the Drone Devils.',
      'Software and operations for MSN-affiliated projects. Phoenix Drone LLC on a payload system under a $10,000 budget. Engineering with Drone Devils on a plane, a boat, and an FPV car.',
      'Software and operations for MSN-affiliated projects. Phoenix Drone LLC on a payload system under a $10,000 budget. Engineering with Drone Devils on a plane, a boat, and an FPV car.',
      'Software and operations for MSN-affiliated projects. Phoenix Drone LLC on a payload system under a $10,000 budget. Engineering with Drone Devils on a plane, a boat, and an FPV car.',
      'Software and operations for MSN-affiliated projects, including a payload system with Phoenix Drone LLC under a $10,000 budget, and engineering with Drone Devils across a plane, a boat, and an FPV car.',
      'Software and operations for MSN-affiliated projects, encompassing a payload system with Phoenix Drone LLC under a $10,000 budget and engineering with Drone Devils across a plane, a boat, and an FPV car.',
    ],
  },
};

// Same facts at every level for the Practice roles, keyed by role title.
// Titles, places and dates stay fixed; the AMASS poetic caption is exempt.
const PRACTICE_BODIES: Record<string, WordVariants> = {
  'Robotics Software and Electronics Lead': [
    'I was in charge of the robot brain and electronics for a blimp that flies and spots things by itself. Cameras, a Jetson computer, wires, and control code - all one system.',
    'I led the software and electronics for a self-flying blimp that spots objects: ROS 2, cameras, a Jetson computer, and control code in one stack.',
    'I led ROS 2, embedded electronics, computer vision, and perception for an autonomous blimp that detects objects in flight - sensors, Jetson compute, electrical hardware, and control software in one stack.',
    'Led ROS 2, embedded electronics, computer vision, and perception for an autonomous blimp that detects objects in flight. Sensors, Jetson compute, electrical hardware, and control software in one stack.',
    'Led ROS 2, embedded electronics, computer vision, and perception for an autonomous lighter-than-air platform performing in-flight object detection; sensors, Jetson compute, electrical hardware, and control software formed one integrated stack.',
    'Leadership of ROS 2, embedded electronics, computer vision, and perception for an autonomous lighter-than-air platform performing in-flight object detection; sensors, Jetson compute, electrical hardware, and control software constituted a single integrated stack.',
  ],
  'AR Assistant Developer': [
    'I helped build a device that helps people practice talking. A small computer runs the AI on the device itself, two cameras see depth, and the clinic is testing it now.',
    'An AR speech-therapy device: local AI on a Jetson Nano, stereo cameras, an AR display, and speech-guidance software. The clinic is testing it now.',
    'AR speech-therapy device: local LLM inference on a Jetson Nano, stereo vision, a birdbath AR display, and speech-guidance pipelines - hardware, camera calibration, and C++/Python prototypes. The clinic tests it now.',
    'AR speech-therapy device: Jetson Nano local LLM inference, stereo vision, a birdbath AR display, and speech-guidance pipelines. Hardware, camera calibration, and C++/Python prototypes. The clinic tests it now.',
    'AR speech-therapy device encompassing local LLM inference on a Jetson Nano, stereo vision, a birdbath AR display, and speech-guidance pipelines; responsibilities spanned hardware, camera calibration, and C++/Python prototypes. Clinical evaluation is underway.',
    'An augmented-reality speech-therapy device comprising local large-language-model inference on a Jetson Nano, stereo vision, a birdbath AR display, and speech-guidance pipelines; responsibilities spanned hardware, camera calibration, and C++/Python prototypes. Clinical evaluation is presently underway.',
  ],
  'Head of Research and Development': [
    'I ran the building team: robots, internet-connected gadgets, computer designs, 3D printing, putting electronics together, and coaching student teams for competitions.',
    'Led R&D: robotics, IoT, CAD and SolidWorks prototypes, 3D printing, electronics assembly, and mentoring student teams for competitions.',
    'Robotics, IoT, CAD and SolidWorks prototyping, 3D printing, electronics assembly, and student-team mentoring for competitions.',
    'Robotics, IoT, CAD and SolidWorks prototyping, 3D printing, electronics assembly, and student-team mentoring for competitions.',
    'Robotics, IoT, CAD and SolidWorks prototyping, 3D printing, electronics assembly, and mentorship of student competition teams.',
    'Robotics, Internet-of-Things development, CAD and SolidWorks prototyping, additive manufacturing, electronics assembly, and mentorship of student competition teams.',
  ],
};

// Same facts at every level for the "Now" job bullets, keyed by the exact
// bullet text in content.ts. Job titles, places and dates stay fixed.
const NOW_POINTS: Record<string, WordVariants> = {
  "Support Prof. Sangram Redkar's TSMC PLC and automation training cohorts through hands-on instruction.": [
    'I help Professor Sangram Redkar teach factory PLC and automation classes.',
    "I help Prof. Sangram Redkar teach TSMC's PLC and automation classes, hands-on.",
    "I support Prof. Sangram Redkar's TSMC PLC and automation training cohorts with hands-on instruction.",
    "Support Prof. Sangram Redkar's TSMC PLC and automation training cohorts through hands-on instruction.",
    "Hands-on instructional support for Prof. Sangram Redkar's TSMC PLC and automation training cohorts.",
    'Provision of hands-on instructional support to the TSMC PLC and automation training cohorts led by Prof. Sangram Redkar.',
  ],
  'Allen-Bradley PLCs, HMI, Dobot and conveyor integration, UR programming, color sorting, pneumatics, and circuits.': [
    'The work: Allen-Bradley PLCs, touch screens, a Dobot robot arm with conveyor belts, UR robots, sorting by color, air-powered parts, and circuits.',
    'Allen-Bradley PLCs, HMI screens, Dobot arm plus conveyor integration, UR robot programming, color sorting, pneumatics, and circuits.',
    'Allen-Bradley PLCs, HMI, Dobot and conveyor integration, UR programming, color sorting, pneumatics, and circuits.',
    'Allen-Bradley PLCs, HMI, Dobot and conveyor integration, UR programming, color sorting, pneumatics, and circuits.',
    'Allen-Bradley PLCs, HMI, Dobot-conveyor integration, UR programming, color sorting, pneumatics, and circuits.',
    'Allen-Bradley programmable logic controllers, human-machine interfaces, Dobot and conveyor integration, UR manipulator programming, color sorting, pneumatics, and circuits.',
  ],
  'Ongoing Isaac Sim and reinforcement-learning work with a Unitree robot dog.': [
    "Right now I'm also teaching a Unitree robot dog in NVIDIA's Isaac Sim, using trial-and-error learning.",
    'Ongoing Isaac Sim and reinforcement-learning work with a Unitree robot dog.',
    'Ongoing Isaac Sim and reinforcement-learning work with a Unitree robot dog.',
    'Ongoing Isaac Sim and reinforcement-learning work with a Unitree robot dog.',
    'Continuing Isaac Sim and reinforcement-learning work on a Unitree quadruped.',
    'Ongoing work in Isaac Sim and reinforcement learning with a Unitree quadruped platform.',
  ],
  'Building a dual-URSe industrial automation cell for the Stellantis Detroit event.': [
    "I'm building a two-robot factory demo for a Stellantis event in Detroit.",
    'Building a dual-URSe automation cell for the Stellantis Detroit event.',
    'Building a dual-URSe industrial automation cell for the Stellantis Detroit event.',
    'Building a dual-URSe industrial automation cell for the Stellantis Detroit event.',
    'Construction of a dual-URSe industrial automation cell for the Stellantis Detroit event.',
    'Development of a dual-URSe industrial automation cell in preparation for the Stellantis Detroit event.',
  ],
  'Hardware, end-effectors, machine vision, networking, Isaac Sim twins, and commissioning in one cell.': [
    'All of it in one setup: hardware, robot grippers, cameras that see, networking, a computer twin in Isaac Sim, and getting it running.',
    'Hardware, grippers, machine vision, networking, Isaac Sim digital twins, and commissioning - all in one cell.',
    'Hardware, end-effectors, machine vision, networking, Isaac Sim twins, and commissioning in one cell.',
    'Hardware, end-effectors, machine vision, networking, Isaac Sim twins, and commissioning in one cell.',
    'Hardware, end-effectors, machine vision, networking, Isaac Sim digital twins, and commissioning within a single cell.',
    'Hardware, end-effectors, machine vision, networking, Isaac Sim digital twins, and commissioning within a single integrated cell.',
  ],
};

// Same facts at every level for the "Conventional law" cards. The struck
// law lines stay fixed (they are rhetorical devices, like the captions);
// only the plain-language answer under each one follows the slider.
const LAW_BREAKS: Record<string, WordVariants> = {
  'Stay in one major.': [
    'Robots need metal, code, and people. I work with all three - plus factories that have not been built yet.',
    'Robotics mixes mechanics, code, and people - and factories that do not exist yet.',
    'Robotics here mixes mechanics, code, and people - and the plants (factories) that do not exist yet.',
    'Robotics combines mechanics, code, and people - and the industrial plants that have yet to be built.',
    'The discipline integrates mechanics, computation, and human factors, extending to industrial plants not yet constructed.',
    'The discipline integrates mechanics, computation, and human factors, with application targets including industrial plants not yet constructed.',
  ],
  'Hire creativity.': [
    'I think for myself. That is where new ideas come from.',
    'You work with someone who thinks for himself. New ideas come with that.',
    'When you work with me you get someone who thinks for himself. New ideas follow - creativity is not a job title.',
    'You work with an independent mind; creativity follows from that rather than from a job title.',
    'Engagement is with an independent mind; creativity is an emergent property thereof, not a job title.',
    'Engagement is with an independent mind; creativity is construed as an emergent property thereof rather than a purchasable job function.',
  ],
  'Prototype or ship.': [
    'I do both. School labs, classwork, factory robots, and my clubs all help the next thing get built.',
    'Both. Labs, classes, factory cells, and communities all feed the next build.',
    'Both - labs, coursework, factory cells, and the communities around them all feed the next build.',
    'Both. Labs, curriculum, cells, and communities each make the next thing possible.',
    'Both. Laboratories, curriculum, cells, and communities collectively enable the next iteration.',
    'Both imperatives are satisfied: laboratories, curriculum, cells, and communities collectively furnish the preconditions for the next artifact.',
  ],
  'Keep art away from industry.': [
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
  ],
};

// Same facts at every level for the three reader cards. Card titles stay
// fixed (they act like navigation); only the body follows the slider.
const READER_BODIES: Record<string, WordVariants> = {
  'If you build teams': [
    "I'm in my second year of robot college at ASU. I teach robots in a simulator, set up factory robots, teach factory workers about PLCs, and turn computer drawings into real machines. Read Currently, Practice, and Work. Then write to me like a person, not a job ad.",
    'RAS sophomore at ASU. I train robots in Isaac Sim, set up industrial cells, teach PLC technicians, and take hardware from CAD onto a live network. Read Currently, Practice, and Collisions - then write as a peer, not a vacancy.',
    'RAS sophomore at ASU. I train robots in Isaac Sim, commission industrial cells, teach PLC technicians, and take hardware from CAD onto a live network. Read Currently, Practice, and Collisions - then write to me as a peer, not a vacancy.',
    'RAS sophomore at ASU, already training robots in Isaac Sim, commissioning industrial cells, teaching PLC technicians, and taking hardware from CAD onto a live network. Read Currently, Practice, and Collisions, then write as a peer rather than a vacancy.',
    'A second-year RAS undergraduate at ASU, presently training robotic policies in Isaac Sim, commissioning industrial cells, instructing PLC technicians, and carrying hardware from CAD onto a live network. See Currently, Practice, and Collisions; correspondence in a peer register is preferred.',
    'The author is a second-year undergraduate in Robotics and Autonomous Systems at ASU, presently engaged in training robotic policies in Isaac Sim, commissioning industrial cells, instructing PLC technicians, and transitioning hardware from CAD to a live network. The reader is directed to Currently, Practice, and Collisions; correspondence is welcomed in a peer register rather than that of a vacancy announcement.',
  ],
  'If you want to make something': [
    "My projects mix things that don't usually go together: helping people speak with small AI, airplane air systems with manufacturing, signals with wearables, warehouses with helper robots. Start with Work. Then book time or write to me on LinkedIn.",
    'The projects mix fields that usually stay apart: speech therapy with on-device AI, bleed-air physics with manufacturing, signal processing with wearables, warehouses with cobots. Start with Collisions, then book time or write on LinkedIn.',
    'The projects mix fields that usually stay apart: speech therapy with on-device LLMs, bleed-air thermodynamics with manufacturing, DSP with wearables, warehouses with cobots. Start with Collisions - then book time or write on LinkedIn.',
    'Branches that usually refuse each other: speech therapy and on-device LLMs, bleed-air thermodynamics and manufacturing, DSP and wearables, warehouses and cobots. Start with Collisions, then book time or write on LinkedIn.',
    'Domain pairings that typically remain disjoint: speech therapy with on-device LLMs, bleed-air thermodynamics with manufacturing, DSP with wearables, and warehouses with cobots. Begin with Collisions; subsequently book time or correspond via LinkedIn.',
    'The work spans domain pairings that typically remain disjoint: speech therapy with on-device large language models, bleed-air thermodynamics with manufacturing, digital signal processing with wearables, and warehouse logistics with collaborative robots. The reader is directed to begin with Collisions and subsequently to book time or correspond via LinkedIn.',
  ],
  'If you already know me': [
    "This shows what I've done since we last talked. Look at Now, Tapri, FAITH, and Connect. Old websites are in Version history.",
    "A map of what's happened since we last talked. Skip to Now, Tapri, FAITH, and Connect. Older sites live under Version history.",
    "A map of what's happened since the last tea stall conversation. Skip to Now, Tapri, FAITH, and Connect. Older sites live under Version history.",
    'A map of what has happened since the last tea stall conversation. Skip to Now, Tapri, FAITH, and Connect. Older websites live under Version history.',
    'A record of activity since the last tea stall conversation. Proceed to Now, Tapri, FAITH, and Connect; prior site iterations reside under Version history.',
    'A record of activity since the most recent tea stall conversation. The reader is directed to Now, Tapri, FAITH, and Connect; prior iterations of this site reside under Version history.',
  ],
};

const nav = [
  { href: '#guide', label: 'Guide' },
  { href: '#now', label: 'Now' },
  { href: '#collisions', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '#practice', label: 'Practice' },
  { href: '/playbook', label: 'Playbook' },
  { href: '#signals', label: 'Traces' },
  { href: '#connect', label: 'Connect' },
];

export const OriginPage: React.FC = () => {
  React.useEffect(() => {
    if (window.location.hash === '#collisions') {
      document.getElementById('collisions')?.scrollIntoView({ block: 'start' });
    }
  }, []);
  const featured = COLLISIONS.filter((c) => c.photo || c.gallery);
  const rest = COLLISIONS.filter((c) => !c.photo && !c.gallery);

  return (
    <div className="origin-root relative min-h-screen bg-[#1c1814] text-[#e6d9c4]">
      <JointLattice />
      <PixelSprites />

      <SiteHeader nav={nav} />

      <main id="top" className="relative z-10" style={{ zIndex: 10 }}>
        <section className="mx-auto site-shell hero-section px-5 pb-8 pt-14 md:pt-20">
          <Spread media={HERO_PHOTO} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">
              Independent thought · interdisciplinary build
            </p>
            <h1 className="mt-5 font-display font-wordy text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.88] tracking-tight text-[#f0e6d4]">
              Prajval
              <br />
              Arora
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#d8cbb6] md:text-xl font-wordy">
              <Words v={[
                "Hi, I'm Prajval. I work with robots. I help a robot dog see and move. I make a robot arm work with factory controls. I built a tiny make-believe town inside a computer. This site shows them.",
                "I work with robots: I help a robot dog see and move, I connect a robot arm to factory controls, and I built a make-believe town in a computer for a hackathon. Most of my projects mix two fields that don't usually meet.",
                "I work with robots and the systems around them - a robot dog that sees, a robot arm wired into factory controls, a make-believe town running in a browser. Most of my projects start where two fields meet that usually don't.",
                'I work on robotic systems and their supporting software: a quadruped with camera feedback in the loop, a robot arm integrated with PLC controls, and a browser-based simulation built at a hackathon. Most projects begin where two fields that rarely meet overlap.',
                'My projects span a quadruped platform with camera feedback in its control loop, a robot arm integrated with a PLC in a staged process, and a browser-based multi-agent simulation. Most sit at the intersection of two fields that rarely interact.',
                "The author's projects encompass a quadruped platform incorporating camera feedback within its control loop, a robotic manipulator integrated with a programmable logic controller in a staged process, and a browser-based multi-agent simulation; each is characteristically situated at the intersection of domains that infrequently interact.",
              ]} />
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#b8a894] font-wordy">
              <Words v={[
                'I go to college at Arizona State University. I learn how robots work. After class, I build my own.',
                "I study robotics at Arizona State University. After class I build my own projects - that's most of this site.",
                "I study Robotics and Autonomous Systems at Arizona State University, class of 2029. When I'm not in class I'm usually building one of the projects below.",
                'I study Robotics and Autonomous Systems at Arizona State University, expecting to graduate in 2029. Outside coursework I build the projects shown below.',
                'I am an undergraduate in Robotics and Autonomous Systems at Arizona State University (expected 2029); independent projects constitute the majority of this site.',
                'The author is an undergraduate student of Robotics and Autonomous Systems at Arizona State University (anticipated conferral 2029); the independent projects documented herein constitute the majority of this site.',
              ]} />
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b87a]">Currently</p>
            <p className="mt-2 font-display text-2xl leading-tight text-[#f0e6d4]">{PERSON.role}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#connect"
                className="inline-flex items-center gap-2 bg-[#c4a35a] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1c1814] hover:bg-[#d4b87a]"
              >
                Work with me
              </a>
              <a
                href={PERSON.resume}
                className="inline-flex items-center gap-2 border border-[#c4a35a]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e6d9c4] hover:border-[#d4b87a]"
              >
                <FileText size={14} /> Resume
              </a>
              <a
                href="mailto:prajval.2029@gmail.com"
                className="inline-flex items-center gap-2 border border-[#c4a35a]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e6d9c4] hover:border-[#d4b87a]"
              >
                <Mail size={14} /> Contact me
              </a>
            </div>
          </Spread>
        </section>

        <section className="border-y border-[#3d3228] bg-[#241c16]/80">
          <div className="mx-auto grid site-shell gap-px md:grid-cols-2">
            {LAWS.map((item) => (
              <article key={item.law} className="px-5 py-8 md:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a7a68]">Conventional law</p>
                <p className="mt-2 font-display text-2xl text-[#9a8a76] line-through decoration-[#c4a35a]/80 decoration-2">
                  {item.law}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[#d8cbb6] font-wordy"><Words v={LAW_BREAKS[item.law]} /></p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto site-shell space-y-10 px-5 py-24">
          <Spread media={FRAMES.sky} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">A reading</p>
            <h2 className="mt-3 font-display font-wordy text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
              <Words v={[
                'Who are you? Pick one: you give people jobs, you want to build something together, or you already know me.',
                'This site works three ways: if you hire people, if you want to build together, or if you already know me.',
                'Three ways to read this site - hiring me, building with me, or you already know me.',
                'This site reads three ways, depending on whether you are hiring, collaborating, or already know me.',
                'This site supports three reading paths, indexed by visitor intent: hiring, collaboration, or prior acquaintance.',
                'This site admits three reading paths, indexed by visitor intent: prospective employment, prospective collaboration, or prior acquaintance.',
              ]} />
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#b8a894] font-wordy">
              <Words v={[
                'Tap the card that sounds like you.',
                'Pick the card below that sounds like you.',
                'Pick the card below that fits why you came.',
                'Select the card below that matches your reason for visiting.',
                'Select the entry card corresponding to your intent.',
                'The reader is directed to the entry card corresponding to their intent.',
              ]} />
            </p>
          </Spread>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {READERS.map((r) => (
              <article key={r.who} className="border border-[#3d3228] bg-[#241c16] p-6">
                <h3 className="font-display font-wordy text-2xl text-[#d4b87a]">{r.who}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#b8a894] font-wordy"><Words v={READER_BODIES[r.who]} /></p>
              </article>
            ))}
          </div>
        </section>

        <section id="guide" className="mx-auto site-shell px-5 pb-24">
          <Spread media={FRAMES.walk}>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Friends first</p>
            <h2 className="mt-3 font-display font-wordy text-4xl text-[#f0e6d4]">The walk, not the pitch.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6] font-wordy">
              <Words v={[
                'Know me already? This is the short version. Old websites are in Version history.',
                'If you already know me, this is the short version - no resume talk. Older sites live under Version history.',
                'Already know me? This section is the short version, no resume talk. Older versions of this site are under Version history.',
                'If we already know each other, what follows is the informal short version; earlier iterations of this site remain under Version history.',
                'For prior acquaintances: an informal summary follows. Previous iterations of this site are archived under Version history.',
                'For prior acquaintances, the ensuing summary adopts an informal register; antecedent iterations of this site remain accessible under Version history.',
              ]} />
            </p>
          </Spread>
        </section>

        <section id="now" className="mx-auto site-shell px-5 pb-24">
          <Spread media={FRAMES.quest} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Now</p>
            <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">The live experiments</h2>
            <p className="mt-4 text-sm text-[#b8a894] font-wordy">
              <Words v={[
                'Robot simulations, teaching technicians, and a Stellantis robot demo - all at the same time. The side projects became the main thing.',
                'Simulation, technician training, and a Stellantis cell in the same season. The side quests stopped being side quests.',
                'Simulation, technician training, and a Stellantis cell in the same season. Side quests that refused to stay side quests.',
                'Simulation, technician training, and a Stellantis cell within a single season; the side quests did not remain side quests.',
                'Simulation, technician training, and a Stellantis cell concurrently; ancillary pursuits that declined to remain ancillary.',
                'Simulation, technician training, and a Stellantis cell within a single season - ancillary pursuits that declined, ultimately, to remain ancillary.',
              ]} />
            </p>
          </Spread>
          <div className="mt-10 space-y-10">
            <Spread media={FRAMES.blimp}>
              <div className="space-y-4">
                {NOW.map((job) => (
                  <article key={job.title}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">{job.when}</p>
                    <h3 className="mt-1 font-display text-2xl text-[#f0e6d4]">{job.title}</h3>
                    <p className="text-sm text-[#8a7a68]">{job.place}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#d8cbb6]">
                      {job.points.map((p) => (
                        <li key={p} className="border-l border-[#c4a35a]/50 pl-4 font-wordy">
                          <Words v={NOW_POINTS[p] ?? [p, p, p, p, p, p]} />
                        </li>
                      ))}
                    </ul>
                    {job.title === 'Lab Assistant' && <a href="/lab-assistant" className="mt-4 inline-flex min-h-11 items-center border border-[#d4b87a] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">Explore my lab work ↗</a>}
                  </article>
                ))}
              </div>
            </Spread>
          </div>
        </section>

        <section id="collisions" className="border-t border-[#3d3228] bg-[#241c16]/50 py-24">
          <div className="mx-auto site-shell px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Collisions</p>
            <h2 className="mt-3 max-w-3xl font-display font-wordy text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
              <Words v={[
                'Projects that mix two different things.',
                'Work that only happens when two fields meet.',
                'Work that only exists when two fields share a room.',
                'Work that exists only where two fields meet.',
                'Work realizable only at the conjunction of two fields.',
                'Work realizable exclusively at the conjunction of two distinct fields.',
              ]} />
            </h2>

            <div className="mt-16 space-y-10">
              {featured.map((c, i) => (
                <Spread key={c.id} media={c.photo!} reverse={i % 2 === 1}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d4b87a]">
                    {c.fields[0]} × {c.fields[1]}
                    {c.stat ? ` · ${c.stat}` : ''}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-[#f0e6d4] md:text-4xl">{c.title}</h3>
                  <p className="mt-3 text-base italic text-[#c4b49a]"><Words v={COLLISION_TEXT[c.id]?.result ?? [c.result,c.result,c.result,c.result,c.result,c.result]} /></p>
                  <p className="mt-4 text-sm leading-relaxed text-[#d8cbb6] font-wordy"><Words v={COLLISION_TEXT[c.id].body} /></p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a] hover:text-[#f0e6d4]"
                    >
                      Open the trail <ArrowUpRight size={14} />
                    </a>
                  )}
                </Spread>
              ))}
            </div>

            <Link to="/projects" className="mt-12 inline-flex items-center gap-2 border border-[#d4b87a] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">Explore the project library <ArrowUpRight size={14} /></Link>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {rest.map((c) => (
                <article key={c.id} className="flex flex-col border border-[#3d3228] bg-[#1c1814] p-6">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#d4b87a]">
                    <span>{c.fields[0]}</span>
                    <span className="text-[#8a7a68]">×</span>
                    <span>{c.fields[1]}</span>
                    {c.stat && <span className="ml-auto text-[#8a7a68]">{c.stat}</span>}
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-[#f0e6d4]">{c.title}</h3>
                  <p className="mt-2 text-base italic text-[#c4b49a]"><Words v={COLLISION_TEXT[c.id]?.result ?? [c.result,c.result,c.result,c.result,c.result,c.result]} /></p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#b8a894] font-wordy"><Words v={COLLISION_TEXT[c.id].body} /></p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]"
                    >
                      Open the trail <ArrowUpRight size={14} />
                    </a>
                  )}
                  {c.id === 'axis' && (
                    <a href="https://axis.prajvalarora.com/" target="_blank" rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">
                      Try the live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-display text-2xl text-[#f0e6d4]">From the public workbench</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROJECT_LIBRARY.filter(p => ['partyplay','aether','esp32-ai-robot','life','skydrift'].includes(p.slug)).map(p => (
                  <Link key={p.slug} to={'/projects/' + p.slug} className="border border-[#3d3228] bg-[#1c1814] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#d4b87a]">{p.category}</p>
                    <h4 className="mt-3 font-display text-2xl text-[#f0e6d4]">{p.title}</h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#b8a894]">{p.summary}</p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-[#d4b87a]">Read the build ↗</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-16">
              <h3 className="font-display text-2xl text-[#f0e6d4]">Other instruments</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MORE_WORK.map((w) => (
                  <article key={w.title} className="border-t border-[#3d3228] pt-4">
                    <h4 className="font-medium text-[#e6d9c4]"><Link to={w.link}>{w.title} ↗</Link></h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#8a7a68]">{w.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="mx-auto site-shell space-y-24 px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Practice</p>
          <h2 className="font-display font-wordy text-4xl text-[#f0e6d4]"><Words v={[
            'My jobs so far',
            'The work so far',
            'Hands on the work',
            'Hands on the work',
            'Applied practice',
            'Documented professional practice',
          ]} /></h2>

          <Spread media={FRAMES.airport}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d4b87a]">{PRACTICE[0].when}</p>
            <h3 className="mt-2 font-display text-3xl text-[#f0e6d4]">{PRACTICE[0].title}</h3>
            <p className="text-sm text-[#d4b87a]">{PRACTICE[0].place}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#d8cbb6] font-wordy"><Words v={PRACTICE_BODIES[PRACTICE[0].title]} /></p>
          </Spread>

          {PRACTICE.slice(1).map((job) => (
            <article key={job.title} className="grid gap-2 border-b border-[#3d3228] pb-8 md:grid-cols-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a7a68] md:col-span-3">{job.when}</p>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl text-[#f0e6d4]">{job.title}</h3>
                <p className="text-sm text-[#d4b87a]">{job.place}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8a894] font-wordy"><Words v={PRACTICE_BODIES[job.title]} /></p>
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto site-shell px-5 pb-24">
          <Spread media={FRAMES.cinema} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Offstage</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Play is not a footnote.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              Bollywood, a wall of live news, arms open. The same person who commissions a cell also likes to act. Independent thought includes joy.
            </p>
          </Spread>
        </section>

        <section id="field" className="border-y border-[#3d3228] bg-[#241c16]/70 py-24">
          <div className="mx-auto site-shell px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Field kit</p>
            <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">Tools, not a personality</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SKILL_FIELDS.map((field) => (
                <div key={field.name}>
                  <h3 className="font-display text-xl text-[#d4b87a]">{field.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#b8a894]">{field.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto site-shell px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Proof, not a plea</p>
          <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">What remains after the work</h2>
          <ul className="mt-10 divide-y divide-[#3d3228] border-y border-[#3d3228]">
            {RECOGNITION.map((r) => (
              <li key={r.title} className="grid gap-1 py-5 md:grid-cols-12 md:items-baseline">
                <h3 className="font-display text-xl text-[#f0e6d4] md:col-span-5">{r.title}</h3>
                <p className="text-sm text-[#b8a894] md:col-span-7">{r.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <SignalBoard />

        <section id="connect" className="border-t border-[#3d3228] py-24">
          <div className="mx-auto site-shell space-y-10 px-5">
            <Spread media={FRAMES.blazer}>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Connect</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
                Write if you want a mind in the room, not a creative you can procure.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#b8a894]">
                Research, industrial cells, education, and strange prototypes. Friends, skip the formality.
              </p>
            </Spread>

            <Spread media={FRAMES.walkway} reverse>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">In transit, still the main character</p>
              <h3 className="mt-2 font-display text-3xl text-[#f0e6d4]">The public trail</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8a894]">
                Write on LinkedIn or GitHub. Book thirty minutes on the calendar in Traces.
              </p>
              <div className="mt-6 grid gap-4">
                <a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="border border-[#3d3228] bg-[#1c1814] p-5 hover:border-[#c4a35a]/60">
                  <ArrowUpRight size={18} className="text-[#d4b87a]" />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">LinkedIn</span>
                  <span>prajvaldesignsmachines</span>
                </a>
                <a href={PERSON.github} target="_blank" rel="noreferrer" className="border border-[#3d3228] bg-[#1c1814] p-5 hover:border-[#c4a35a]/60">
                  <ArrowUpRight size={18} className="text-[#d4b87a]" />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">GitHub</span>
                  <span>RoboX2020</span>
                </a>
              </div>
            </Spread>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#3d3228] px-5 py-10">
        <div className="mx-auto flex site-shell flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a7a68]">
            © {new Date().getFullYear()} {PERSON.name} · Independence of thought
          </p>
          <VersionHistory />
        </div>
      </footer>
    </div>
  );
};
