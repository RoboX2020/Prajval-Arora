
export type InteractionType = 'project' | 'tea-stall' | 'history' | 'link';

export interface Project {
  id: string;
  type: InteractionType;
  title: string;
  description: string;
  details?: string; // Long form content
  tech: string[];
  xPosition: number;
  color: string;
  link?: string;
  stats?: string; // e.g. "108k Views"
}

export interface HistoryMarker {
  id: string;
  title: string;
  text: string;
  xPosition: number;
  isPoster?: boolean; // If true, drawn big in background (for achievements)
}

// Massive world for a long journey
export const WORLD_WIDTH = 40000;

export const HISTORY: HistoryMarker[] = [
  {
    id: 'h2',
    title: "Grade 7-9: Deep Dive",
    text: "IoT, microcontrollers, coding, and breaking things to understand them.",
    xPosition: 5000,
    isPoster: false
  },
  {
    id: 'h_network',
    title: "The Network",
    text: "Harvard Undergraduate Ventures-TECH program. Internship at a VC-backed startup. Mentored by Harvard faculty. Spotify Podcast feature.",
    xPosition: 34000,
    isPoster: true
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'h1_poster',
    type: 'history', // Drawn as a big poster billboard via GameCanvas logic
    title: "Grade 3: The Spark",
    description: "Started robotics early — RC cars, LED banks, and homemade coolers.",
    tech: [],
    xPosition: 2500,
    color: "#FF5722"
  },
  {
    id: 'p_faith',
    type: 'tea-stall',
    title: "FAITH Labs",
    description: "Founder. Built robotics labs in Kanpur schools and taught 200+ students.",
    details: "FAITH Labs is where it started: I established robotics labs at schools in Kanpur, procured the kits, designed the curriculum from scratch, and personally taught over 200 students.\n\nI led a team to 1st place at Regionals and 10th place Nationally at the International Robotics Championship. A separate team I mentored placed 28th Nationally.",
    tech: ["Robotics Education", "Curriculum Design", "Mentorship"],
    xPosition: 5500,
    color: "#16A34A",
    stats: "200+ Students Taught"
  },
  {
    id: 'p_champ',
    type: 'project',
    title: "Intl. Robotics Champ",
    description: "1st National + Most Budget-Efficient award — built on a $100 budget.",
    details: "An omnidirectional robot with a mounted robotic arm, hosting its own local WiFi server so it could be controlled from any smartphone.\n\nWon 1st place at the National level of the International Robotics Championship — plus a special award for the Most Budget-Efficient Design, built on a $100 budget against teams running $1,000+ budgets. Qualified to represent at the International round, placing 10th.",
    tech: ["C++", "WiFi Server", "Omni-Wheels", "Robotic Arm"],
    xPosition: 7500,
    color: "#FFD700", // Gold for winner
    stats: "1st National • $100 Budget"
  },
  {
    id: 'link_honeywell25',
    type: 'link',
    title: "Honeywell Hackathon '25",
    description: "2nd Place • $5,000 — jet cooling via bleed air exhaust.",
    details: "2nd place and a $5,000 prize at the Honeywell Hackathon 2025 for an engineering solution that cools jet engines using bleed air exhaust.",
    tech: ["Hackathon Winner", "Aerospace", "Thermal Engineering"],
    xPosition: 9000,
    color: "#0077B5",
    link: "https://www.linkedin.com/posts/prajvaldesignsmachines_engineering-hackathon-rocketscience-activity-7382467243932086272-1mfM?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADgjLrgBdPmhjjAibSH_8k53-pURcnvmnyE",
    stats: "$5,000 Prize"
  },
  {
    id: 'link_honeywell26',
    type: 'link',
    title: "Honeywell Hackathon '26",
    description: "3rd Place • $2,500 — automated manufacturing for engine heat exchangers.",
    details: "3rd place and a $2,500 prize at the Honeywell Hackathon 2026 for an automated manufacturing solution for engine heat exchange systems.",
    tech: ["Hackathon Winner", "Manufacturing", "Automation"],
    xPosition: 10500,
    color: "#005A8C",
    link: "https://www.linkedin.com/in/prajvaldesignsmachines/",
    stats: "$2,500 Prize"
  },
  {
    id: 'p_pitch',
    type: 'project',
    title: "Startup Pitch Wins",
    description: "1st @ Shark Technic (ASU). Round 2 @ Masters Union CEO Challenge.",
    details: "Shark Technic Challenge, ASU — 1st place, Best Startup Pitch.\n\nCEO Challenge by Masters Union — advanced to Round 2.\n\nTurning engineering chaos into clear, fundable stories.",
    tech: ["Pitching", "Entrepreneurship", "Strategy"],
    xPosition: 12000,
    color: "#E11D48",
    stats: "Best Startup Pitch"
  },
  {
    id: 'p_tapri',
    type: 'tea-stall',
    title: "Tapri Builder Club",
    description: "Founder. 2,200+ members, 22k+ reach, 40+ ventures built inside it.",
    details: "Tapri Builder Club is a community for builders. It reached 22,000 people across LinkedIn and Instagram, grew to 2,200 members, and saw over 40 ventures built inside it — including Ideacode, FlexFund, and STEMverse.\n\nWe hosted external hackathons from teams like Maximally and IdeaCode, drawing over 5,000 combined participants. It has now restarted officially as a chartered club at ASU under advisor Prof. Aram Chavez. The platform behind it lives at gotapri.com.",
    tech: ["Community", "Startup", "Networking"],
    xPosition: 13500,
    color: "#795548",
    link: "https://gotapri.com",
    stats: "2,200+ Members"
  },
  {
    id: 'link_riverside',
    type: 'link',
    title: "Riverside Data Centers",
    description: "Solo research paper • $2,500 Microsoft scholarship via TKS.",
    details: "\"Riverside Data Centers\" — a solo-authored research paper on data-center cooling, recognized with a $2,500 Microsoft scholarship through The Knowledge Society (TKS).",
    tech: ["Research", "Green Tech", "Microsoft"],
    xPosition: 15000,
    color: "#00A4EF",
    link: "https://www.linkedin.com/posts/prajvaldesignsmachines_microsoft-researchpaper-culture-activity-7340222850680688640-kP--",
    stats: "$2,500 Scholarship"
  },
  {
    id: 'p_asu_start',
    type: 'history',
    title: "Arizona State Univ.",
    description: "Moved to the US to study Robotics & Autonomous Systems.",
    tech: [],
    xPosition: 16500,
    color: "#8C1D40"
  },
  {
    id: 'p_air_piano',
    type: 'project',
    title: "Air Piano & Vision Mouse",
    description: "Computer vision that turns any flat surface into an input device.",
    details: "Two computer-vision projects that need nothing but a camera. Air Piano maps hand position onto piano keys so you can play on any surface. Vision Mouse maps hand movement to a mouse cursor for fully hands-free control.",
    tech: ["Computer Vision", "MediaPipe", "HCI"],
    xPosition: 18000,
    color: "#22D3EE"
  },
  {
    id: 'p_air_guitar',
    type: 'project',
    title: "The Air Guitar",
    description: "Viral wearable instrument — no strings, no frets. 300k views.",
    details: "A wearable instrument that turns a wrist sensor into a guitar — no strings, no frets. Built with an accelerometer, an Arduino, and a real-time sound engine using Karplus-Strong synthesis.\n\nThe demo reached 300,000 views on Instagram, and the open-source repo has picked up organic traction with zero marketing.",
    tech: ["Accelerometer", "Arduino", "Karplus-Strong DSP"],
    xPosition: 19500,
    color: "#9C27B0",
    link: "https://github.com/RoboX2020/Air-Guitar",
    stats: "300k Views"
  },
  {
    id: 'p_tic_tac',
    type: 'project',
    title: "AI Tic-Tac-Toe",
    description: "A robot arm that plays you on paper using vision.",
    details: "A robotic arm that plays Tic-Tac-Toe with you physically on paper — using AI vision to read your moves and inverse kinematics to draw its counter-moves.",
    tech: ["Computer Vision", "Inverse Kinematics", "AI"],
    xPosition: 21000,
    color: "#F44336"
  },
  {
    id: 'p_caricature',
    type: 'project',
    title: "Caricature Drawing Robot",
    description: "A robot arm that sketches your portrait in pencil.",
    details: "A robot-arm pipeline that converts an input image into motor commands, so the arm draws it with a pencil on paper — turning pixels into physical strokes.",
    tech: ["Robotic Arm", "Image Processing", "Motion Planning"],
    xPosition: 22000,
    color: "#EF6C00"
  },
  {
    id: 'p_dobot',
    type: 'project',
    title: "Dobot Drawing Pipeline",
    description: "OpenCV edge detection → stroke paths for a Dobot arm.",
    details: "A separate drawing pipeline that uses OpenCV edge detection to convert any image into stroke paths, then drives a Dobot Magician Lite arm to draw it.",
    tech: ["OpenCV", "Dobot Magician Lite", "Path Planning"],
    xPosition: 23000,
    color: "#FB8C00"
  },
  {
    id: 'p_barrow',
    type: 'project',
    title: "AR Speech Assistant",
    description: "AR-assisted speech therapy device — in clinical testing at Barrow Institute.",
    details: "An AR-assisted speech therapy device built from the ground up at the Barrow Institute, Arizona: a Jetson Nano running local LLM inference, a stereo camera, and a birdbath AR display worn by the patient.\n\nFor aphasia patients it listens to attempted speech and guides pronunciation correction in real time. For apraxia patients it continuously narrates the patient's surroundings to support context and comprehension.\n\nI built the hardware integration, the vision pipeline, and the speech-correction logic, developed alongside Dr. Catherine's research team. It's currently in clinical testing and moving toward forming an LLC.",
    tech: ["Jetson Nano", "Local LLM", "Stereo Vision", "AR Display"],
    xPosition: 24500,
    color: "#2563EB",
    stats: "In Clinical Testing"
  },
  {
    id: 'p_celia',
    type: 'project',
    title: "CeliaLife & Kalki",
    description: "AI medical-history prediction & a social-change platform.",
    details: "CeliaLife: upload your medical history and AI surfaces potential disease risks for doctors to review. Kalki: a platform for people to raise local problems and gather support for change.",
    tech: ["AI Prediction", "Web Dev", "Social Impact"],
    xPosition: 26000,
    color: "#00BCD4"
  },
  {
    id: 'link_espclaw',
    type: 'link',
    title: "ESP-Claw Contribution",
    description: "Open-source PR to Espressif's AI agent framework — Arduino + voice control.",
    details: "An open-source contribution to Espressif's ESP-Claw AI agent framework. I extended it to support Arduino hardware that was previously incompatible, and added natural-language control — so anyone can program hardware just by talking to it.",
    tech: ["Open Source", "Espressif", "Arduino", "LLM Agents"],
    xPosition: 27500,
    color: "#E7352C",
    link: "https://github.com/espressif/esp-claw/pull/11"
  },
  {
    id: 'p_spider',
    type: 'project',
    title: "AI Hardware Link",
    description: "Controlling a spider robot directly with an LLM.",
    details: "A system that links LLMs directly to hardware: AI parses natural-language commands and autonomously drives a spider robot's complex, multi-leg movements.",
    tech: ["LLM", "Robotics", "Hardware Interface"],
    xPosition: 28500,
    color: "#212121"
  },
  {
    id: 'p_blimp',
    type: 'project',
    title: "Autonomous Blimp",
    description: "ASU research under Dr. Yu — live object detection while airborne.",
    details: "Led software and electronics for an autonomous blimp at ASU under Dr. Yu — originally built for a competition at George Mason University and extended into research on practical aerial autonomy.\n\nBuilt the ROS2 control systems and a computer-vision pipeline, achieving live object detection and tracking while airborne.",
    tech: ["ROS2", "Computer Vision", "Aerial Autonomy"],
    xPosition: 30000,
    color: "#FF9800",
    stats: "ASU Research Lab"
  },
  {
    id: 'p_asu_programs',
    type: 'project',
    title: "ASU Programs",
    description: "Drone Devils (lead engineer), Venture Devils & Changemaker Central.",
    details: "Drone Devils, ASU — Lead Engineer. Personally built a plane, a boat, and an FPV car.\n\nVenture Devils, ASU — currently developing my startup through ASU's venture accelerator.\n\nChangemaker Central, ASU — helped organize and judge competition rounds for students across campus.",
    tech: ["Drone Devils", "Venture Devils", "Changemaker Central"],
    xPosition: 31500,
    color: "#8C1D40"
  },
  {
    id: 'p_meta',
    type: 'project',
    title: "Meta-Glasses",
    description: "Control your screen with your eyes.",
    details: "A wearable glasses interface where the cursor follows your gaze, allowing fully hands-free computer control.",
    tech: ["Eye Tracking", "Wearables", "HCI"],
    xPosition: 33000,
    color: "#607D8B"
  },
  {
    id: 'link_vibeverse',
    type: 'link',
    title: "VibeVerse",
    description: "A marketplace for builders to share & discover AI-generated projects.",
    details: "VibeVerse is a marketplace where builders share and discover AI-generated projects. Launched on Product Hunt.",
    tech: ["Marketplace", "AI", "Product Hunt"],
    xPosition: 35000,
    color: "#7C3AED",
    link: "https://vibeverseai.com"
  },
  {
    id: 'link_linkedin',
    type: 'link',
    title: "My LinkedIn",
    description: "Let's connect. I'm always building something new.",
    details: "Visit Profile",
    tech: ["Contact", "Hire Me"],
    xPosition: 36500,
    color: "#0077B5",
    link: "https://www.linkedin.com/in/prajvaldesignsmachines/"
  }
];

export const EXPERIENCE = [];
