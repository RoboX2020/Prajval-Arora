export const PERSON = {
  name: 'Prajval Arora',
  first: 'Prajval',
  role: 'Robotics and Autonomous Systems, Arizona State University',
  seeking: 'Summer 2027 internship in robotics, automation, industrial robotics, or electromechanical engineering',
  email: 'parora24@asu.edu',
  phone: '(480) 937-8658',
  phoneHref: 'tel:+14809378658',
  linkedin: 'https://www.linkedin.com/in/prajvaldesignsmachines',
  linkedinLabel: 'linkedin.com/in/prajvaldesignsmachines',
  github: 'https://github.com/RoboX2020',
  calendly: 'https://calendly.com/prajval-2029/30min',
  resume: '/Prajval_Arora_Resume.pdf',
  tapri: 'https://gotapri.com',
  education: {
    school: 'Arizona State University',
    degree: 'B.S.E. Robotics and Autonomous Systems Engineering',
    when: 'Expected 2029',
    extra: 'Harvard Certificate of Internship and Entrepreneurship, Summer 2025',
  },
};

export const LAWS = [
  { law: 'Stay in one major.', break: 'Robotics is the meeting of mechanics, code, people, and plants that should not exist yet.' },
  { law: 'Hire creativity.', break: 'You work with an independent mind. Creativity is the byproduct, not the job title.' },
  { law: 'Prototype or ship.', break: 'Build the lab, the curriculum, the cell, and the community that makes the next thing possible.' },
  { law: 'Keep art away from industry.', break: 'A guitar with no strings, a robot that draws faces, a line that thinks in vision and air.' },
];

export const READERS = [
  {
    who: 'If you build teams',
    body: 'I am a RAS sophomore at ASU looking toward Summer 2027. I already train robots in Isaac Sim, commission industrial cells, teach PLC technicians, and take hardware from CAD to a live network. Read Currently, Practice, and Collisions. Then write me as a peer, not a vacancy.',
  },
  {
    who: 'If you want to make something',
    body: 'I connect branches that usually refuse each other: speech therapy and on-device LLMs, bleed-air thermodynamics and manufacturing, DSP and wearables, warehouses and cobots. Start with Collisions, then book time or email.',
  },
  {
    who: 'If you already know me',
    body: 'This is the map of what I have been doing since the last tea stall conversation. Skip to Now, Tapri, FAITH, and Connect. The older websites still live under Version history.',
  },
];

export const NOW = [
  {
    title: 'Research Assistant',
    place: 'Arizona State University',
    when: 'Jul 2026 – Present',
    points: [
      'Train robots in simulation with PhD researchers using ROS 2, NVIDIA Isaac Sim, Omniverse digital twins, C++, Python, and reinforcement learning.',
      'Co-author an Isaac Sim lab manual for RAS 545 covering simulation, robot articulation, perception, and validation.',
    ],
  },
  {
    title: 'Automation and PLC Co-Instructor',
    place: 'TSMC Training Program (volunteer)',
    when: 'Jul 2026 – Present',
    points: [
      'Train technicians on Allen-Bradley PLCs, structured text, sensors, conveyors, pneumatics, and robot-cell safety.',
      'Demonstrate troubleshooting across Ethernet, USB, EtherCAT, digital I/O, IP communications, and commissioning.',
    ],
  },
  {
    title: 'Stellantis Industrial Robotics Demonstrator',
    place: 'ASU × Wandelbots',
    when: 'Aug 2026 – Present',
    points: [
      'Dual-URSe industrial automation cell for the Stellantis Detroit event.',
      'Hardware, end-effectors, machine vision, network configuration, Isaac Sim digital-twin validation, and commissioning.',
    ],
  },
];

export const PRACTICE = [
  {
    title: 'Robotics Software and Electronics Lead',
    place: 'AMASS Lab, Arizona State University',
    when: 'Aug 2025 – Mar 2026',
    body: 'Led ROS 2, embedded electronics, computer vision, and perception for an autonomous blimp with live airborne object detection. Integrated sensors, Jetson compute, electrical hardware, and control software.',
  },
  {
    title: 'AR Assistant Developer',
    place: 'Barrow Institute, Arizona',
    when: 'Sept 2025 – Mar 2026',
    body: 'Built an AR speech-therapy device: Jetson Nano local LLM inference, stereo vision, birdbath AR display, and speech-guidance pipelines. Hardware integration, camera calibration, C++/Python prototyping. In clinical testing.',
  },
  {
    title: 'Head of Research and Development',
    place: 'Tinker India Labs',
    when: 'Sept 2024 – Jan 2025',
    body: 'Led robotics, IoT, CAD/SolidWorks prototyping, 3D printing, electronics assembly, and student-team mentoring for competitions.',
  },
];

export type Collision = {
  id: string;
  fields: [string, string];
  title: string;
  result: string;
  body: string;
  link?: string;
  stat?: string;
};

export const COLLISIONS: Collision[] = [
  {
    id: 'barrow',
    fields: ['Medicine', 'On-device AI'],
    title: 'AR speech therapy',
    result: 'A wearable that listens, sees, and coaches speech in the clinic.',
    body: 'At Barrow Institute: Jetson Nano running local LLM inference, stereo camera, birdbath AR display. Aphasia patients get pronunciation guidance; apraxia patients get a continuous narration of their surroundings. Built with Dr. Catherine’s research team. In clinical testing, moving toward an LLC.',
    stat: 'Clinical testing',
  },
  {
    id: 'stellantis',
    fields: ['Automotive', 'Digital twins'],
    title: 'Stellantis dual-URSe cell',
    result: 'A physical line and its twin, commissioned for Detroit.',
    body: 'ASU × Wandelbots demonstrator: dual URSe cobots, end-effector integration, machine vision, cell networking, Isaac Sim validation, and live commissioning.',
    stat: 'In build',
  },
  {
    id: 'line',
    fields: ['Warehouses', 'Industrial robots'],
    title: 'Manufacturing line replica',
    result: 'UR5, UR3, JAKA, Dobot, FANUC thinking, PLCs, conveyors, vision, air.',
    body: 'Innovation Showcase cell: 6-DOF and 4-DOF coordination, structured PLC logic, Ethernet/IP, warehouse workflows, and robot-cell safety — a factory in miniature that still has to run.',
    stat: 'Showcase',
  },
  {
    id: 'go2',
    fields: ['Physical AI', 'Sim-to-real'],
    title: 'Unitree Go2 in Isaac Sim',
    result: 'Train the dog in a twin, then argue with physics.',
    body: 'ROS 2 + Isaac Sim + Omniverse workflows for Unitree Go2: reinforcement learning, digital twins, and the messy path from a perfect sim to a moving animal.',
    stat: 'Ongoing research',
  },
  {
    id: 'honeywell',
    fields: ['Aerospace', 'Heat'],
    title: 'Honeywell jet cooling & heat exchangers',
    result: 'Bleed air as a coolant. Then the factory that would make the exchanger.',
    body: '2025: 2nd place, $5,000 — cooling jet engines with bleed-air exhaust. 2026: 3rd place, $2,500 — automated manufacturing for engine heat-exchange systems. Thermodynamics one year, production the next.',
    link: 'https://www.linkedin.com/posts/prajvaldesignsmachines_engineering-hackathon-rocketscience-activity-7382467243932086272-1mfM',
    stat: '$7,500 across two years',
  },
  {
    id: 'riverside',
    fields: ['Climate', 'Compute'],
    title: 'Riverside data centers',
    result: 'Put the heat where a river already knows how to carry it.',
    body: 'Solo research on dam-based cooling for sustainable data centers. $2,500 Microsoft Research grant through TKS, plus published papers on the same problem.',
    link: 'https://www.linkedin.com/posts/prajvaldesignsmachines_microsoft-researchpaper-culture-activity-7340222850680688640-kP--',
    stat: '$2,500 Microsoft grant',
  },
  {
    id: 'air-guitar',
    fields: ['Music', 'DSP'],
    title: 'Air guitar',
    result: 'No strings. No frets. A wrist, an accelerometer, Karplus–Strong.',
    body: 'Wearable instrument: Arduino, inertial sensing, and a real-time sound engine. 300,000 Instagram views and an open-source repo that grew with no campaign.',
    link: 'https://github.com/RoboX2020/Air-Guitar',
    stat: '300k views',
  },
  {
    id: 'faith',
    fields: ['Education', 'Robotics'],
    title: 'FAITH Labs',
    result: 'School labs that did not exist, then 200 students who could build.',
    body: 'Founded robotics labs in Kanpur schools: kits, curriculum, teaching. Coached teams to 1st regional and 10th national at the International Robotics Championship — including a $100 omni-robot that beat $1,000 machines.',
    stat: '200+ students',
  },
  {
    id: 'tapri',
    fields: ['Community', 'Ventures'],
    title: 'Tapri Builder Club',
    result: 'A tea stall for people who make things, now chartered at ASU.',
    body: 'Founder and president. 22,000+ reach, 2,200+ members, 40+ ventures launched (Ideacode, FlexFund, STEMverse). External hackathons with 5,000+ combined participants. Lives at gotapri.com; restarted as a chartered club at ASU with Prof. Aram Chavez.',
    link: 'https://gotapri.com',
    stat: '40+ ventures',
  },
  {
    id: 'espclaw',
    fields: ['Open source', 'Voice'],
    title: 'ESP-Claw contribution',
    result: 'Talk to hardware that Espressif’s agent could not reach.',
    body: 'PR to Espressif’s ESP-Claw AI agent framework: Arduino support that was previously incompatible, plus natural-language control so people program hardware by speaking.',
    link: 'https://github.com/espressif/esp-claw/pull/11',
  },
  {
    id: 'champ',
    fields: ['Constraint', 'Mechanics'],
    title: 'International Robotics Championship',
    result: 'First nationally, most budget-efficient, tenth in the world.',
    body: 'Omnidirectional robot with a mounted arm and its own local Wi-Fi server, driven from any phone. Built on $100 against four-figure budgets.',
    stat: '1st national · $100',
  },
  {
    id: 'arms',
    fields: ['Flight', 'Payloads'],
    title: 'A R M S at ASU',
    result: 'Treasurer, marketing head, software lead — and a $10k payload conversation.',
    body: 'Lead software and operations for MSN-affiliated projects. In talks with Phoenix Drone LLC for a payload system under a $10,000 budget. Also lead engineer with Drone Devils: plane, boat, FPV car.',
    stat: '2026 – Present',
  },
];

export const MORE_WORK = [
  { title: 'Air piano & vision mouse', body: 'Computer vision that turns any flat surface into keys or a cursor — MediaPipe, no extra hardware.' },
  { title: 'Caricature & Dobot drawing', body: 'Pixels to pencil: image-to-motor pipelines and OpenCV stroke paths for robot arms.' },
  { title: 'AI tic-tac-toe on paper', body: 'A physical arm that sees your mark and draws its reply with inverse kinematics.' },
  { title: 'LLM-driven spider robot', body: 'Natural language parsed into multi-leg motion — intelligence wired straight into hardware.' },
  { title: 'Gaze glasses', body: 'A wearable where the cursor follows your eyes.' },
  { title: 'CeliaLife & Kalki', body: 'Medical-history risk surfaces for doctors, and a platform for people to raise local problems.' },
  { title: 'VibeVerse', body: 'Marketplace for AI-generated projects, launched on Product Hunt — vibeverseai.com.' },
  { title: 'Euler Ai', body: 'Animation agent that turns text into Desmos-quality visualizations for math educators.' },
];

export const SKILL_FIELDS = [
  {
    name: 'Robotics & physical AI',
    items: ['ROS 2', 'NVIDIA Isaac Sim', 'Omniverse', 'Digital twins', 'RL', 'Kinematics', 'UR5 / UR3 / URSe', 'JAKA', 'Dobot', 'Unitree Go2', 'FANUC', 'Cobots'],
  },
  {
    name: 'Automation & cells',
    items: ['Allen-Bradley PLC', 'Structured text', 'SCADA / HMI', 'Conveyors', 'Pneumatics', 'Commissioning', 'Warehouse logic', 'Industrial sensors'],
  },
  {
    name: 'Networks & embedding',
    items: ['Ethernet', 'EtherCAT', 'USB', 'Digital I/O', 'IP cells', 'Jetson', 'C++', 'Python', 'MATLAB / Simulink'],
  },
  {
    name: 'Make & see',
    items: ['SolidWorks', 'GD&T', '3D printing', 'End-effectors', 'Computer vision', 'Local LLM inference', 'Agentic systems'],
  },
  {
    name: 'Safety',
    items: ['Industrial safety', 'LOTO', 'Forklift awareness', 'Robot-cell practice'],
  },
];

export const RECOGNITION = [
  { title: 'Honeywell Hackathon 2025', detail: '2nd place · $5,000 · jet cooling via bleed air' },
  { title: 'Honeywell Hackathon 2026', detail: '3rd place · $2,500 · automated heat-exchanger manufacturing' },
  { title: 'Microsoft Research grant', detail: '$2,500 · dam-based data-center cooling' },
  { title: 'International Robotics Championship', detail: '1st national, most budget-efficient, 10th international' },
  { title: 'Shark Technic, ASU', detail: '1st · best startup pitch' },
  { title: 'Masters Union CEO Challenge', detail: 'Round 2' },
  { title: 'BrainOBrain', detail: 'State topper' },
  { title: 'Harvard', detail: 'Certificate of Internship and Entrepreneurship, 2025 · UV-TECH, VC-backed internship, faculty mentors, Spotify podcast' },
];

export const VERSIONS = [
  {
    version: 'v2',
    title: 'This page',
    blurb: 'The current field: interdisciplinary collisions, a guide for people who want to know me, and a door to work together.',
    href: '/',
    current: true,
  },
  {
    version: 'v1.1',
    title: 'Circuit atlas',
    blurb: 'A PCB of every project, wired to a central processor. Pan, zoom, or take the guided walkthrough.',
    href: '/v1',
    current: false,
  },
  {
    version: 'v1.0',
    title: 'Driving home',
    blurb: 'The original road: a long horizontal journey past tea stalls, posters, and machines.',
    href: '/v1/journey',
    current: false,
  },
  {
    version: 'v1.garage',
    title: 'Internet garage',
    blurb: 'The workshop listing — every prototype, paper, and community artifact as a stall.',
    href: '/v1/garage',
    current: false,
  },
];
