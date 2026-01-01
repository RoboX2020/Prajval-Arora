
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
export const WORLD_WIDTH = 34000;

export const HISTORY: HistoryMarker[] = [
  {
    id: 'h2',
    title: "Grade 7-9: Deep Dive",
    text: "IoT, Microcontrollers, coding, & breaking things.",
    xPosition: 5000,
    isPoster: false
  },
  {
    id: 'h4',
    title: "The Network",
    text: "Mentored by Harvard Startups. Met Mark Cuban. Spotify Podcast feature.",
    xPosition: 26000,
    isPoster: true
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'h1_poster',
    type: 'history', // Using history type but it will be drawn as a big poster now via GameCanvas logic modification or just big billboard
    title: "Grade 3: The Spark",
    description: "Started Robotics! RC Cars, LED Banks, Coolers.",
    tech: [],
    xPosition: 3500, // Moved far right of Hollywood sign
    color: "#FF5722"
  },
  {
    id: 'p_champ',
    type: 'project',
    title: "Intl. Robotics Champ",
    description: "Grade 11: Omni-directional robot with a robotic arm.",
    details: "I created my first full robot in Grade 11. It was an omnidirectional robot with a robotic arm mounted on top. It hosted a local WiFi server and could be controlled via any smartphone. I won 1st Place National Level at the International Robotics Championship.",
    tech: ["C++", "WiFi Server", "Omni-Wheels", "Robotic Arm"],
    xPosition: 7000,
    color: "#FFD700" // Gold for winner
  },
  {
    id: 'link_honeywell',
    type: 'link',
    title: "Honeywell Hackathon",
    description: "WINNER: Engineering Rocket Science Hackathon.",
    details: "Check out the post on LinkedIn.",
    tech: ["Hackathon Winner", "Engineering"],
    xPosition: 9500,
    color: "#0077B5",
    link: "https://www.linkedin.com/posts/prajvaldesignsmachines_engineering-hackathon-rocketscience-activity-7382467243932086272-1mfM?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADgjLrgBdPmhjjAibSH_8k53-pURcnvmnyE"
  },
  {
    id: 'p_gotapri',
    type: 'tea-stall',
    title: "GoTapri.com",
    description: "A startup connecting entrepreneurs over chai.",
    details: "Before coming to the US, I launched GoTapri.com. It helped new entrepreneurs find team members through active networking events globally. Over 40 startups registered, 2,200 people joined, and we hit 22k+ impressions. Partnered with Conquer the Crown for funding.",
    tech: ["Startup", "Community", "Networking"],
    xPosition: 12500, // The Tea Stall
    color: "#795548",
    stats: "2,200+ Members"
  },
  {
    id: 'p_asu_start',
    type: 'history', 
    title: "Arizona State Univ.",
    description: "2025: Moved to US to pursue Robotics & Autonomous Systems.",
    tech: [],
    xPosition: 15000,
    color: "#8C1D40" 
  },
  {
    id: 'p_tic_tac',
    type: 'project',
    title: "AI Tic-Tac-Toe",
    description: "A robot arm that plays against you on paper.",
    details: "A robot with arms that plays Tic-Tac-Toe with you physically on paper using AI vision detection to see your moves and counter them.",
    tech: ["Computer Vision", "Inverse Kinematics", "AI"],
    xPosition: 17500,
    color: "#F44336"
  },
  {
    id: 'p_air_guitar',
    type: 'project',
    title: "The Air Guitar",
    description: "Viral Project: Strum in the air, hear the music.",
    details: "A tiny device held like a pick. When you strum in the air, it plays actual guitar chords based on your movement. This went viral with 108,000+ views and high demand for the repo.",
    tech: ["Accelerometers", "Sound Synthesis", "Viral Engineering"],
    xPosition: 20000,
    color: "#9C27B0",
    stats: "108k Views"
  },
  {
    id: 'p_celia',
    type: 'project',
    title: "CeliaLife & Kalki",
    description: "AI Medical history prediction & Social Change platform.",
    details: "CeliaLife: Upload medical history, AI predicts potential diseases for doctors. Kalki: A platform for users to raise concerns about local problems and gather support for change.",
    tech: ["AI Prediction", "Web Dev", "Social Impact"],
    xPosition: 22500,
    color: "#00BCD4"
  },
  {
    id: 'p_spider',
    type: 'project',
    title: "AI Hardware Link",
    description: "Controlling a Spider Robot with ChatGPT.",
    details: "I found a way to link LLMs directly to hardware. I built a system where AI analyzes natural language commands and autonomously controls a spider robot's complex movements.",
    tech: ["LLM", "Robotics", "Hardware Interface"],
    xPosition: 25000,
    color: "#212121"
  },
  {
    id: 'p_blimp',
    type: 'project',
    title: "Autonomous Blimp",
    description: "Playing football in the air with Dr. Shiyu.",
    details: "Working at the ASU Lab to create an autonomous flying blimp that plays aerial football. It detects balloons, catches them, and pushes them into a goal.",
    tech: ["Aerial Robotics", "Autonomous Systems", "ASU Lab"],
    xPosition: 27500,
    color: "#FF9800"
  },
  {
    id: 'p_meta',
    type: 'project',
    title: "Meta-Glasses",
    description: "Control your screen with your eyes.",
    details: "A wearable glass interface where the cursor follows your gaze, allowing hands-free computer control.",
    tech: ["Eye Tracking", "Wearables", "HCI"],
    xPosition: 30000,
    color: "#607D8B"
  },
  {
    id: 'link_linkedin',
    type: 'link',
    title: "My LinkedIn",
    description: "Let's connect. I'm always building something new.",
    details: "Visit Profile",
    tech: ["Contact", "Hire Me"],
    xPosition: 32500,
    color: "#0077B5",
    link: "https://www.linkedin.com/in/prajvaldesignsmachines/"
  }
];

export const EXPERIENCE = []; 
