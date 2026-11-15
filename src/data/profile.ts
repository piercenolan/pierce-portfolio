export const profile = {
  name: "Nolan Pierce",
  role: "Mechatronics & Hardware-Software Integration",
  school: "B.S. Computer Science, Stanford University — Visual Computing, 2027",
  gradSchool:
    "M.S. Computer Science, Stanford University — Artificial Intelligence (coterminal, admitted)",
  email: "63npierce@gmail.com",
  linkedin: "https://www.linkedin.com/in/piercenolan",
  github: "https://github.com/piercenolan",
  resume: "/PierceResume_Rotational.pdf",

  // Hero thesis — states the pivot as a capability, not an apology for it.
  thesis:
    "I build systems where software has to survive contact with hardware — perception pipelines that drive real actuators, real-time 3D environments built from physical installations, and closed sensor-to-motion control loops.",

  positioning:
    "Computer science student specializing in visual computing, moving deliberately toward mechatronics integration and manufacturing engineering. I write the code, wire the board, and measure whether it actually worked.",

  // Real, verifiable numbers pulled from shipped work.
  specs: [
    { value: "3", label: "Hardware + perception builds" },
    { value: "3", label: "Software builds" },
  ],
};

// About-page bio, one string per paragraph.
export const about = [
  "I’m a computer science student at Stanford specializing in visual computing, currently focused on the layer where software meets physical hardware — perception pipelines, real-time control loops, and the embedded code that drives actuators.",
  "What draws me to this work is the feedback loop. Writing code is most rewarding to me when its output is something I can observe directly: a servo that responds to a sensor reading, a camera rig that tracks a moving target, an environment that behaves the way a physical installation does. Engineering a system end to end — and then measuring whether it actually performs — is the part of the work I pursue on my own time.",
  "That interest has shaped what I build. I’ve developed a multi-object tracking and trajectory forecasting pipeline benchmarked against a physics baseline, closed sensor-to-actuator control loops on microcontroller hardware, and a two-axis pan-tilt tracking rig currently in assembly. Each one required the same combination: write the perception software, program the microcontroller, wire the hardware, and validate the result against a measurement rather than an impression.",
  "At Boeing this past summer I built a real-time 3D environment that scaled a single physical showcase into a virtual showroom reachable from any site — translating a physical installation into an interactive system, and presenting it live to Boeing leadership.",
  "I’ve been accepted to Stanford’s coterminal master’s program in Computer Science, where I’ll concentrate in artificial intelligence. I’m targeting mechatronics integration, computer engineering, and test engineering roles — work that takes a design and makes it real, reliable, and repeatable, and where a software background is an asset rather than a detour.",
  "I’m currently studying abroad in Berlin, where I’m pursuing hands-on time in production engineering and robotics labs.",
];

export const experience = [
  {
    org: "Boeing Global Services",
    role: "Systems Engineering Intern — Data & Analytics, VR Simulation & Modeling",
    location: "Seattle, WA",
    dates: "06/2026 – 09/2026",
    summary:
      "Built a real-time 3D environment that scaled a single-site physical showcase into a virtual showroom accessible from anywhere.",
    bullets: [
      "Engineered a virtual reality showroom in Unreal Engine 5 presenting employee-developed and patented safety and ergonomics solutions, extending a single physical \u201CDojo\u201D showcase into a scalable environment reachable from any site.",
      "Architected interactive Blueprint systems \u2014 custom UI widgets, interface classes, event dispatchers, and parent/child blueprint hierarchies \u2014 to streamline integration of new showcase content into the existing simulation architecture.",
      "Presented live demos of the environment to Boeing leadership.",
    ],
    note: "Work product is proprietary; no media from this project is shown.",
    tags: ["Unreal Engine 5", "Real-time simulation", "Systems integration", "Aerospace"],
  },
  {
    org: "Mission Malama",
    role: "Founding Engineer",
    location: "Remote",
    dates: "07/2025 – 09/2025",
    summary:
      "First engineer on an early-stage environmental impact platform. Owned backend architecture from schema to auth.",
    bullets: [
      "Designed and implemented backend architecture including REST API endpoints, database schema, and CRUD operations using Node.js, Express.js, and Supabase (Postgres, Auth/RLS).",
      "Implemented JWT-based authentication and role-based access control to secure handling of sensitive user data.",
      "Worked directly with founders to translate product requirements into scalable, production-ready systems.",
    ],
    tags: ["Node.js", "PostgreSQL", "Backend architecture", "Authentication"],
  },
  {
    org: "Washington Technology Student Association",
    role: "Alumni Representative · Candidate & Entertainment Manager",
    location: "Remote",
    dates: "03/2023 – Present",
    summary:
      "Program leadership across a 150+ person alumni network and a 2,000+ attendee statewide conference.",
    bullets: [
      "Manage a network of 150+ alumni, running mentorship programs, event planning, and volunteer recruitment.",
      "Serve on the interview committee, narrowing 15 applicants to a Top 12, then manage that candidate pool on-site through the state conference.",
      "Plan and execute entertainment logistics for a 2,000+ attendee state conference across 3 event nights, coordinating vendors, floor plans, and volunteer staffing.",
    ],
    tags: ["Program leadership", "Logistics", "Candidate selection"],
  },
  {
    org: "Newport School District",
    role: "IT Support Specialist",
    location: "Newport, WA",
    dates: "06/2022 – 08/2022",
    summary:
      "Hands-on hardware diagnosis and repair across a district-wide device fleet.",
    bullets: [
      "Diagnosed and repaired hardware and software faults on 100+ laptops, minimizing downtime for faculty and staff.",
      "Established troubleshooting and software installation procedures that improved turnaround on repeat issues.",
    ],
    tags: ["Hardware repair", "Diagnostics", "Fleet support"],
  },
];

export const skillGroups = [
  {
    title: "Hardware & Robotics",
    items: [
      "Arduino / microcontroller programming",
      "Sensor\u2013actuator control loops",
      "Servo & PWM actuation",
      "Circuit prototyping & debugging",
      "Serial communication (UART)",
      "Robotics fundamentals \u2014 kinematics, control",
    ],
  },
  {
    title: "Computer Vision & ML",
    items: [
      "PyTorch",
      "OpenCV",
      "Multi-object tracking (SAM 3.1)",
      "LSTM / sequence forecasting",
      "CNNs, Vision Transformers",
      "GPU training (Modal)",
    ],
  },
  {
    title: "Simulation & Graphics",
    items: [
      "Unreal Engine 5",
      "Blueprint visual scripting",
      "Event dispatchers & interface classes",
      "Real-time 3D environments",
      "Human-machine interface design",
    ],
  },
  {
    title: "Software & Systems",
    items: [
      "Python, C, C++",
      "Node.js, Express.js",
      "PostgreSQL, Supabase",
      "Git, Unix, gdb",
      "REST APIs, JWT auth",
      "Low-level memory management",
    ],
  },
];

export const coursework = [
  { code: "CS223A", name: "Introduction to Robotics" },
  { code: "ENGR40M", name: "Introduction to Electrical Engineering" },
  { code: "CS107", name: "Computer Organizations and Systems" },
  { code: "CS231N", name: "Deep Learning for Computer Vision" },
];
