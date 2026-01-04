
export interface ShopItem {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string; // Emoji/Icon for small view
    banner: string; // Banner Image URL
    link: string;
    tags: string[];
    isPopular?: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
    {
        id: 's_euler',
        title: "Euler Ai",
        description: "Animation Agent. Generate Desmos-quality visualizations from text. Used by math educators.",
        price: "Contact",
        image: "📐",
        banner: "/banner_code_4.png", // Has graph image
        link: "https://animationagent.vercel.app/",
        tags: ["AI", "Math", "SaaS"],
        isPopular: true
    },
    {
        id: 's_air_guitar',
        title: "Air Guitar",
        description: "Viral IoT Product. Strum in the air, play music. 108k+ Views on Instagram.",
        price: "$29",
        image: "🎸",
        banner: "/banner_robot_3.png", // Has guitar image
        link: "https://www.instagram.com/reel/DSCGBcPEbnW/?igsh=dG81emo1d2Z6OHU0",
        tags: ["IoT", "Consumer Tech", "Viral"],
        isPopular: true
    },
    {
        id: 's_vibe',
        title: "Vibe Coding IDE",
        description: "AI-first IDE that understands your 'vibe'. Just ask, build, upload.",
        price: "Support ($2k)",
        image: "💻",
        banner: "/banner_code_4.png", // Has code editor
        link: "https://github.com/RoboX2020",
        tags: ["DevTools", "AI"]
    },
    {
        id: 's_celia',
        title: "Celia Life",
        description: "AI Health Prediction. Records medical status and predicts diseases before they happen.",
        price: "HealthTech",
        image: "🧬",
        banner: "/banner_social_2.png", // Has DNA
        link: "https://celialife.com/",
        tags: ["AI", "Health", "Startup"]
    },
    {
        id: 's_kalki',
        title: "Kalki App",
        description: "Social Activism Platform. Raise voices against bad societal norms and gather support.",
        price: "Non-Profit",
        image: "🔥",
        banner: "/banner_social_2.png", // Has protest
        link: "https://kalki-app.vercel.app/",
        tags: ["Social", "App"]
    },
    {
        id: 's_gotapri',
        title: "GoTapri",
        description: "Startup Networking. Connected 2,200+ entrepreneurs over chai.",
        price: "Acquired",
        image: "☕",
        banner: "/banner_social_2.png", // Has Tea Stall
        link: "https://gotapri.com",
        tags: ["Startup", "Community"]
    },
    {
        id: 's_startup_world',
        title: "Startup World",
        description: "Global community for founders and builders.",
        price: "Community",
        image: "🌍",
        banner: "/banner_social_2.png", // Has map
        link: "https://startupworld.online",
        tags: ["Startup", "Network"]
    },
    {
        id: 's_ai_buddy',
        title: "AI Buddy",
        description: "Your personal AI companion for daily tasks.",
        price: "Free",
        image: "🤖",
        banner: "/banner_robot_3.png", // Has AI face
        link: "https://www.instagram.com/reel/DSyhRm6CeOL/?igsh=MXMxZTJ1MWdlOWF6YQ==",
        tags: ["AI", "Assistant"]
    },
    {
        id: 's_air_mouse',
        title: "Air Mouse",
        description: "Wearable mouse interface. Control your digital world with hand movements.",
        price: "Prototype",
        image: "🖱️",
        banner: "/banner_robot_3.png", // Has mouse cursor
        link: "https://www.instagram.com/reel/DReO46_EdtP/?igsh=anIwYnhwMmhkd21i",
        tags: ["HCI", "Hardware"]
    },
    {
        id: 's_buddy_worker',
        title: "Buddy Worker Robot",
        description: "Autonomous worker robot for repetitive tasks.",
        price: "Robotics",
        image: "🦾",
        banner: "/banner_robot_3.png", // Has worker bot
        link: "https://www.instagram.com/p/DAojHutz0g4/?igsh=cmYxa3VpMjZ0dzNt",
        tags: ["Robotics", "Automation"]
    },
    {
        id: 's_ms_research',
        title: "Riverside Datacenters",
        description: "Microsoft Scholarship Research Paper on underwater/riverside datacenter cooling.",
        price: "Research",
        image: "❄️",
        banner: "/banner_code_4.png", // Has server rack
        link: "https://www.linkedin.com/posts/prajvaldesignsmachines_microsoft-researchpaper-culture-activity-7340222850680688640-kP--",
        tags: ["Research", "Microsoft", "Green Tech"],
        isPopular: true
    },
    {
        id: 's_clumsy',
        title: "Clumsy Spider-Man",
        description: "Chrome Extension. A cute, clumsy Spider-Man that lives in your browser.",
        price: "Free",
        image: "🕷️",
        banner: "/banner_code_4.png", // Has spider-man
        link: "https://github.com/RoboX2020",
        tags: ["Extension", "Fun"]
    },
    {
        id: 's_tic_tac',
        title: "AI Tic-Tac-Toe",
        description: "Robotic Arm that plays physical Tic-Tac-Toe using computer vision.",
        price: "Open Source",
        image: "❌",
        banner: "/banner_tech_1.png", // Has arm playing tic tac toe
        link: "https://github.com/RoboX2020",
        tags: ["Robotics", "CV", "AI"]
    },
    {
        id: 's_blimp',
        title: "Autonomous Blimp",
        description: "Flying blimp that plays aerial football autonomously.",
        price: "Research",
        image: "🎈",
        banner: "/banner_tech_1.png", // Has blimp
        link: "https://github.com/RoboX2020/shape-blimp-detector",
        tags: ["Aerial", "Robotics", "ASU"]
    },
    {
        id: 's_spider',
        title: "Mind-Controlled Spider",
        description: "Controlling a spider robot with brain signals/AI commands.",
        price: "Prototype",
        image: "🕷️",
        banner: "/banner_tech_1.png", // Has spider robot
        link: "https://github.com/RoboX2020/esp32-ai-robot",
        tags: ["BCI", "Robotics", "AI"]
    },
    {
        id: 's_glasses',
        title: "Meta Glasses",
        description: "Holo-Lens style smart glasses for augmented reality HUD.",
        price: "Prototype",
        image: "👓",
        banner: "/banner_tech_1.png", // Has smart glasses
        link: "https://github.com/RoboX2020",
        tags: ["AR", "Wearables"]
    },
    {
        id: 's_bot_champ',
        title: "Intl. Robotics Champ",
        description: "Winner of International Robotics Championship with Omni-directional arm robot.",
        price: "Award",
        image: "🏆",
        banner: "/banner_robot_3.png", // Generic robot
        link: "https://github.com/RoboX2020",
        tags: ["Robotics", "Winner"]
    },
    {
        id: 's_hackathon',
        title: "Honeywell Rocket Science",
        description: "Award-winning engineering hackathon project.",
        price: "$1,000 Prize",
        image: "🚀",
        banner: "/banner_tech_1.png", // Generic tech
        link: "https://github.com/RoboX2020",
        tags: ["Hackathon", "Engineering"]
    },
    {
        id: 's_paper_1',
        title: "Research: IJSDR2504023",
        description: "Advanced Robotics Control Systems.",
        price: "Paper",
        image: "📄",
        banner: "/garage_banner.png", // Fallback to garage
        link: "https://ijsdr.org/viewpaperforall.php?paper=IJSDR2504023",
        tags: ["Publication", "Science"]
    },
    {
        id: 's_paper_2',
        title: "Research: IJSDR2504056",
        description: "AI in Medical Diagnostics.",
        price: "Paper",
        image: "📄",
        banner: "/garage_banner.png",
        link: "https://ijsdr.org/viewpaperforall.php?paper=IJSDR2504056",
        tags: ["Publication", "Science"]
    },
    {
        id: 's_gesture',
        title: "Gesture Controller",
        description: "Computer Vision project to control OS via webcam gestures.",
        price: "Open Source",
        image: "✋",
        banner: "/banner_robot_3.png",
        link: "https://github.com/RoboX2020/gesture-controller",
        tags: ["CV", "Python"]
    },
    {
        id: 's_walkthrough',
        title: "Website Walkthrough",
        description: "AI Agent that guides users through any website visually.",
        price: "SaaS",
        image: "💡",
        banner: "/banner_code_4.png",
        link: "https://github.com/RoboX2020",
        tags: ["AI", "UX"]
    }
];
