
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
        id: 's_barrow',
        title: "AR Speech Assistant",
        description: "AR-assisted speech therapy for aphasia & apraxia patients. Jetson Nano + local LLM + stereo camera + birdbath AR display. In clinical testing at Barrow Institute.",
        price: "Clinical Testing",
        image: "🧠",
        banner: "/banner_tech_1.png",
        link: "https://www.linkedin.com/in/prajvaldesignsmachines/",
        tags: ["AR", "HealthTech", "Local LLM", "Robotics"],
        isPopular: true
    },
    {
        id: 's_esp_claw',
        title: "ESP-Claw (Espressif)",
        description: "Open-source PR to Espressif's AI agent framework. Added Arduino support + natural-language hardware control — program hardware by talking to it.",
        price: "Open Source",
        image: "🦾",
        banner: "/banner_robot_3.png",
        link: "https://github.com/espressif/esp-claw/pull/11",
        tags: ["Open Source", "Espressif", "LLM", "Arduino"],
        isPopular: true
    },
    {
        id: 's_air_guitar',
        title: "Air Guitar",
        description: "Wearable instrument — strum in the air, hear guitar. Accelerometer + Arduino + Karplus-Strong synthesis. 300k+ views, organic repo traction.",
        price: "$29",
        image: "🎸",
        banner: "/banner_robot_3.png",
        link: "https://github.com/RoboX2020/Air-Guitar",
        tags: ["IoT", "DSP", "Viral"],
        isPopular: true
    },
    {
        id: 's_tapri',
        title: "Tapri Builder Club",
        description: "Founder. A builder community: 22k+ reach, 2,200 members, 40+ ventures built inside (Ideacode, FlexFund, STEMverse). Now a chartered club at ASU.",
        price: "Community",
        image: "☕",
        banner: "/banner_social_2.png",
        link: "https://gotapri.com",
        tags: ["Startup", "Community", "ASU"],
        isPopular: true
    },
    {
        id: 's_faith_labs',
        title: "FAITH Labs",
        description: "Founder. Built robotics labs in Kanpur schools — procured kits, designed curriculum, taught 200+ students. Led a team to 1st Regionals / 10th Nationals.",
        price: "Education",
        image: "🔬",
        banner: "/banner_robot_3.png",
        link: "https://www.linkedin.com/in/prajvaldesignsmachines/",
        tags: ["Robotics", "Education", "Mentorship"]
    },
    {
        id: 's_vibeverse',
        title: "VibeVerse",
        description: "A marketplace for builders to share and discover AI-generated projects. Launched on Product Hunt.",
        price: "Live",
        image: "🌐",
        banner: "/banner_code_4.png",
        link: "https://vibeverseai.com",
        tags: ["Marketplace", "AI", "Product Hunt"]
    },
    {
        id: 's_blimp',
        title: "Autonomous Blimp",
        description: "ASU research under Dr. Yu (built for a George Mason competition). ROS2 control + CV pipeline achieving live object detection & tracking while airborne.",
        price: "Research",
        image: "🎈",
        banner: "/banner_tech_1.png",
        link: "https://github.com/RoboX2020/shape-blimp-detector",
        tags: ["ROS2", "Computer Vision", "ASU"]
    },
    {
        id: 's_bot_champ',
        title: "Intl. Robotics Champ",
        description: "1st National + Most Budget-Efficient award at the International Robotics Championship — omni-directional arm robot built on a $100 budget. 10th Intl.",
        price: "Award",
        image: "🏆",
        banner: "/banner_robot_3.png",
        link: "https://www.linkedin.com/in/prajvaldesignsmachines/",
        tags: ["Robotics", "Winner", "$100 Budget"]
    },
    {
        id: 's_honeywell_25',
        title: "Honeywell '25",
        description: "2nd place • $5,000. Jet engine cooling solution via bleed air exhaust.",
        price: "$5,000 Prize",
        image: "🚀",
        banner: "/banner_tech_1.png",
        link: "https://www.linkedin.com/posts/prajvaldesignsmachines_engineering-hackathon-rocketscience-activity-7382467243932086272-1mfM",
        tags: ["Hackathon", "Aerospace", "Winner"]
    },
    {
        id: 's_honeywell_26',
        title: "Honeywell '26",
        description: "3rd place • $2,500. Automated manufacturing solution for engine heat exchange systems.",
        price: "$2,500 Prize",
        image: "⚙️",
        banner: "/banner_tech_1.png",
        link: "https://www.linkedin.com/in/prajvaldesignsmachines/",
        tags: ["Hackathon", "Manufacturing", "Winner"]
    },
    {
        id: 's_shark_technic',
        title: "Shark Technic — Best Pitch",
        description: "1st place, Best Startup Pitch at ASU's Shark Technic Challenge. Also reached Round 2 of the Masters Union CEO Challenge.",
        price: "Award",
        image: "🦈",
        banner: "/banner_social_2.png",
        link: "https://www.linkedin.com/in/prajvaldesignsmachines/",
        tags: ["Pitch", "Entrepreneurship", "ASU"]
    },
    {
        id: 's_ms_research',
        title: "Riverside Datacenters",
        description: "Solo-authored research paper on data-center cooling. Recognized with a $2,500 Microsoft scholarship through The Knowledge Society (TKS).",
        price: "Research",
        image: "❄️",
        banner: "/banner_code_4.png",
        link: "https://www.linkedin.com/posts/prajvaldesignsmachines_microsoft-researchpaper-culture-activity-7340222850680688640-kP--",
        tags: ["Research", "Microsoft", "Green Tech"],
        isPopular: true
    },
    {
        id: 's_air_piano',
        title: "Air Piano",
        description: "Computer vision project — maps hand position to piano keys, turning any flat surface into a keyboard using only a camera.",
        price: "Open Source",
        image: "🎹",
        banner: "/banner_code_4.png",
        link: "https://github.com/RoboX2020",
        tags: ["Computer Vision", "HCI", "Music"]
    },
    {
        id: 's_air_mouse',
        title: "Air Mouse",
        description: "Wearable mouse interface — control your digital world with hand movements via a camera.",
        price: "Prototype",
        image: "🖱️",
        banner: "/banner_robot_3.png",
        link: "https://www.instagram.com/reel/DReO46_EdtP/?igsh=anIwYnhwMmhkd21i",
        tags: ["HCI", "Computer Vision"]
    },
    {
        id: 's_caricature',
        title: "Caricature Robot",
        description: "A robot-arm pipeline that converts an image into motor commands and draws it in pencil on paper.",
        price: "Robotics",
        image: "✏️",
        banner: "/banner_tech_1.png",
        link: "https://github.com/RoboX2020",
        tags: ["Robotic Arm", "Image Processing"]
    },
    {
        id: 's_dobot',
        title: "Dobot Drawing Pipeline",
        description: "OpenCV edge detection that converts images into stroke paths for a Dobot Magician Lite arm to draw.",
        price: "Open Source",
        image: "🖊️",
        banner: "/banner_tech_1.png",
        link: "https://github.com/RoboX2020",
        tags: ["OpenCV", "Dobot", "Robotics"]
    },
    {
        id: 's_tic_tac',
        title: "AI Tic-Tac-Toe",
        description: "Robotic arm that plays physical Tic-Tac-Toe using computer vision and inverse kinematics.",
        price: "Open Source",
        image: "❌",
        banner: "/banner_tech_1.png",
        link: "https://github.com/RoboX2020",
        tags: ["Robotics", "CV", "AI"]
    },
    {
        id: 's_spider',
        title: "AI Hardware Link",
        description: "Controlling a spider robot directly with an LLM — natural-language commands drive complex multi-leg movement.",
        price: "Prototype",
        image: "🕷️",
        banner: "/banner_tech_1.png",
        link: "https://github.com/RoboX2020/esp32-ai-robot",
        tags: ["LLM", "Robotics", "AI"]
    },
    {
        id: 's_celia',
        title: "Celia Life",
        description: "AI health prediction — records medical status and surfaces potential disease risks for doctors.",
        price: "HealthTech",
        image: "🧬",
        banner: "/banner_social_2.png",
        link: "https://celialife.com/",
        tags: ["AI", "Health", "Startup"]
    },
    {
        id: 's_kalki',
        title: "Kalki App",
        description: "Social activism platform — raise voices against bad societal norms and gather support.",
        price: "Non-Profit",
        image: "🔥",
        banner: "/banner_social_2.png",
        link: "https://kalki-app.vercel.app/",
        tags: ["Social", "App"]
    },
    {
        id: 's_euler',
        title: "Euler Ai",
        description: "Animation Agent. Generate Desmos-quality visualizations from text. Used by math educators.",
        price: "Contact",
        image: "📐",
        banner: "/banner_code_4.png",
        link: "https://animationagent.vercel.app/",
        tags: ["AI", "Math", "SaaS"]
    },
    {
        id: 's_vibe',
        title: "Vibe Coding IDE",
        description: "AI-first IDE that understands your 'vibe'. Just ask, build, upload.",
        price: "Support ($2k)",
        image: "💻",
        banner: "/banner_code_4.png",
        link: "https://github.com/RoboX2020",
        tags: ["DevTools", "AI"]
    },
    {
        id: 's_meta_glasses',
        title: "Meta Glasses",
        description: "Smart glasses with a gaze-controlled cursor for hands-free AR computer control.",
        price: "Prototype",
        image: "👓",
        banner: "/banner_tech_1.png",
        link: "https://github.com/RoboX2020",
        tags: ["AR", "Wearables", "Eye Tracking"]
    },
    {
        id: 's_gesture',
        title: "Gesture Controller",
        description: "Computer Vision project to control your OS via webcam gestures.",
        price: "Open Source",
        image: "✋",
        banner: "/banner_robot_3.png",
        link: "https://github.com/RoboX2020/gesture-controller",
        tags: ["CV", "Python"]
    },
    {
        id: 's_ai_buddy',
        title: "AI Buddy",
        description: "Your personal AI companion for daily tasks.",
        price: "Free",
        image: "🤖",
        banner: "/banner_robot_3.png",
        link: "https://www.instagram.com/reel/DSyhRm6CeOL/?igsh=MXMxZTJ1MWdlOWF6YQ==",
        tags: ["AI", "Assistant"]
    },
    {
        id: 's_walkthrough',
        title: "Website Walkthrough",
        description: "AI agent that guides users through any website visually.",
        price: "SaaS",
        image: "💡",
        banner: "/banner_code_4.png",
        link: "https://github.com/RoboX2020",
        tags: ["AI", "UX"]
    },
    {
        id: 's_startup_world',
        title: "Startup World",
        description: "Global community for founders and builders.",
        price: "Community",
        image: "🌍",
        banner: "/banner_social_2.png",
        link: "https://startupworld.online",
        tags: ["Startup", "Network"]
    },
    {
        id: 's_buddy_worker',
        title: "Buddy Worker Robot",
        description: "Autonomous worker robot for repetitive tasks.",
        price: "Robotics",
        image: "🦿",
        banner: "/banner_robot_3.png",
        link: "https://www.instagram.com/p/DAojHutz0g4/?igsh=cmYxa3VpMjZ0dzNt",
        tags: ["Robotics", "Automation"]
    },
    {
        id: 's_clumsy',
        title: "Clumsy Spider-Man",
        description: "Chrome Extension. A cute, clumsy Spider-Man that lives in your browser.",
        price: "Free",
        image: "🕸️",
        banner: "/banner_code_4.png",
        link: "https://github.com/RoboX2020",
        tags: ["Extension", "Fun"]
    },
    {
        id: 's_paper_1',
        title: "Research: IJSDR2504023",
        description: "Advanced Robotics Control Systems.",
        price: "Paper",
        image: "📄",
        banner: "/garage_banner.png",
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
    }
];
