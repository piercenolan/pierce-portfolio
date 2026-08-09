export type Figure = {
  src: string;
  caption: string;
  wide?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  status: "Shipped" | "In progress" | "Complete";
  year: string;
  stack: string[];
  // One-line hook for the card grid.
  teaser: string;
  // Opening paragraph on the detail page.
  intro: string;
  // The honest engineering story — what was hard, what was decided, what it cost.
  sections: { heading: string; body: string[] }[];
  // Margin annotations — the site's signature device.
  callouts: { label: string; text: string }[];
  figures?: Figure[];
  hero?: string;
  video?: { url: string; label: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "trajectory-forecasting",
    title: "Multi-Agent Tracking & Trajectory Forecasting",
    kicker: "Perception research",
    status: "Shipped",
    year: "2026",
    stack: ["Python", "PyTorch", "OpenCV", "SAM 3.1", "Modal"],
    featured: true,
    hero: "/images/projects/cv/10_forecast_qualitative_clean.png",
    teaser:
      "An end-to-end perception-to-prediction pipeline that tracks every player on a basketball court and forecasts where they move next \u2014 benchmarked honestly against a physics baseline.",
    intro:
      "Predicting where ten independently-moving agents will be four frames from now is a control problem disguised as a vision problem. I built the full stack: multi-object detection and tracking on raw broadcast video, geometry-free track cleaning, and a residual, rule-conditioned LSTM forecaster \u2014 then measured it against a constant-velocity physics baseline that most published work quietly outperforms on paper and rarely beats in practice.",
    sections: [
      {
        heading: "Pipeline",
        body: [
          "SAM 3.1 handles multi-object player tracking across SportsMOT broadcast clips, producing per-player position tracks with zero ID switches on the primary sequence. Raw tracks are noisy in predictable ways \u2014 dropped detections, momentary duplicates, occlusion gaps \u2014 so a track-cleaning stage runs before anything reaches the forecaster.",
          "The forecaster observes 8 frames of multi-player motion and predicts the next 4. It is a residual model: rather than regressing absolute positions, it learns a correction on top of a constant-velocity physical prediction, conditioned on 15 engineered kinematic, social, and game-state features. Training used scheduled sampling and Adam on GPU via Modal.",
        ],
      },
      {
        heading: "Results, stated plainly",
        body: [
          "The residual rule-conditioned model reached a median forecast ADE of 5.81 px, matching the constant-velocity baseline at 5.81 px. It beat a plain LSTM on 10 of 12 temporal windows and cut error roughly in half versus that plain model (10.68 px). Against the linear baseline specifically, it won on 5 of 12 windows individually and tied overall.",
          "That result is the point, not a disappointment. A deep sequence model that merely ties a two-line physics baseline is a finding worth reporting \u2014 and it directly informed the design of the follow-on hardware system, where a latency budget makes the simple predictor the correct engineering choice.",
        ],
      },
      {
        heading: "Ablations and failure analysis",
        body: [
          "Hard post-hoc rule enforcement on forecasts made every metric worse \u2014 all twelve game-rule constraints increased ADE relative to the unconstrained model. Soft rule conditioning as input features helped; forcing rules onto outputs did not. Track-cleaning ablations showed the same shape: light sanitization and velocity capping held near baseline, while aggressive cohesion and convergence rules degraded ADE by 3\u00D7.",
          "Three of twelve evaluation windows failed on every model tested. Isolating them showed the cause was upstream tracking breakdown, not forecaster error \u2014 a distinction that matters for knowing which half of the system to fix.",
        ],
      },
      {
        heading: "Transfer",
        body: [
          "The model was evaluated across 4 SportsMOT clips, both per-clip trained and as a straight cross-clip transfer with no retraining. Transfer performance held within roughly 0.2 px of per-clip training \u2014 evidence the learned residual captures general motion structure rather than memorizing one sequence.",
        ],
      },
    ],
    callouts: [
      { label: "Measured", text: "5.81 px median ADE \u2014 tied the physics baseline, did not beat it." },
      { label: "Won", text: "10 of 12 windows vs. plain LSTM; ~50% error reduction." },
      { label: "Negative result", text: "Hard rule post-refinement increased error on all 12 rules." },
      { label: "Root cause", text: "3 failure windows traced to tracking, not forecasting." },
      { label: "Evaluated", text: "4 SportsMOT clips; cross-clip transfer held within ~0.2 px of per-clip training." },
    ],
    figures: [
      {
        src: "/images/projects/cv/01_summary_sam_vs_augmented.png",
        caption: "SAM 3.1 raw tracking vs. cleaned tracks across four sampled frames.",
        wide: true,
      },
      {
        src: "/images/projects/cv/10_forecast_qualitative_clean.png",
        caption:
          "Forecast vs. ground truth vs. linear baseline. Observed 8 frames, predicted 4.",
        wide: true,
      },
      {
        src: "/images/projects/cv/05_lstm_forecast_comparison.png",
        caption:
          "Forecast ADE across all 12 windows and the clean-tracking subset, with the linear baseline marked.",
        wide: true,
      },
      {
        src: "/images/projects/cv/08_a2_per_rule_delta_ade.png",
        caption:
          "Per-rule attribution: every hard post-refinement rule increased error versus the plain model.",
        wide: true,
      },
      {
        src: "/images/projects/cv/12_multiseq_train_vs_transfer.png",
        caption:
          "Per-clip training vs. cross-clip transfer against the linear baseline on four sequences.",
        wide: true,
      },
      {
        src: "/images/projects/cv/03_augmentation_ablation_ade.png",
        caption:
          "Track-cleaning ablations. Light sanitization holds; aggressive cohesion rules degrade sharply.",
        wide: true,
      },
    ],
  },
  {
    slug: "tracking-turret",
    title: "Predictive Tracking Turret",
    kicker: "Hardware \u00D7 perception",
    status: "In progress",
    year: "2026",
    stack: ["Python", "OpenCV", "Arduino", "C++", "Serial / UART"],
    featured: true,
    teaser:
      "A two-axis pan-tilt camera rig that tracks a moving target and aims ahead of it \u2014 an independent real-time implementation, built on a conclusion the forecasting research measured.",
    intro:
      "This shares no code with the trajectory research above \u2014 different tracker, different predictor, different runtime. What carries over is the finding: that project measured a residual LSTM against constant-velocity extrapolation and found no advantage, which is what justifies running the cheap predictor here. A pan-tilt camera turret tracks a moving object and drives its servos toward where the target is heading, not where it currently is, under a latency budget, a serial link, and two servos with real inertia.",
    sections: [
      {
        heading: "Architecture",
        body: [
          "A laptop handles perception: webcam capture, OpenCV color-blob tracking, a rolling position history, and constant-velocity extrapolation to a predicted target point. Predicted pixel coordinates convert to pan and tilt angles through a proportional mapping, then travel over USB serial to an Arduino running a lightweight listener that parses angle pairs and drives two SG90 servos.",
          "The split is deliberate. Perception and control logic stay on the host where they are fast to iterate; the microcontroller does exactly one job, which makes hardware faults trivially separable from software faults during bring-up.",
        ],
      },
      {
        heading: "Why the big model is not in the loop",
        body: [
          "SAM 3.1 and the LSTM forecaster are both too heavy for real-time inference on laptop CPU. Running them would add latency directly to the control loop, and a tracking turret that aims accurately 400 ms late is worse than one that aims approximately on time.",
          "So the live system uses classical color tracking and constant-velocity prediction instead. The research justifies this rather than contradicting it: the residual LSTM only tied the constant-velocity baseline at 5.81 px median ADE. Choosing the two-line predictor under a latency constraint is the correct call, backed by my own measurements.",
        ],
      },
      {
        heading: "Build status",
        body: [
          "Perception and prediction are implemented and validated on webcam feed. The Arduino serial listener is written. Mechanical assembly, the pixel-to-angle mapping, and closed-loop tuning are in progress. Servos run off an external 5V supply rather than the board rail \u2014 two servos under load exceed what the Arduino's regulator supplies cleanly.",
        ],
      },
    ],
    callouts: [
      { label: "Design decision", text: "Lightweight tracker chosen over SAM \u2014 latency budget, not capability limit." },
      { label: "Evidence", text: "Backed by measured 5.81 px tie between LSTM and constant velocity." },
      { label: "Status", text: "Perception validated. Mechanical build and loop tuning underway." },
    ],
  },
  {
    slug: "distance-gate",
    title: "Distance-Triggered Servo Gate",
    kicker: "Embedded control",
    status: "Complete",
    year: "2026",
    stack: ["Arduino", "C++", "HC-SR04", "SG90 servo"],
    featured: true,
    hero: "/images/projects/servo-gate/build-01.jpg",
    video: {
      url: "https://www.youtube.com/embed/gyTrw5PYia4",
      label: "Gate actuating on proximity",
    },
    teaser:
      "A closed sense\u2013decide\u2013actuate loop on bare hardware: ultrasonic ranging drives a servo gate in real time.",
    intro:
      "The smallest complete version of the loop that underlies nearly every mechatronic system \u2014 a sensor measures the world, a microcontroller decides, an actuator moves. An HC-SR04 ultrasonic sensor measures distance by timing a returned pulse; when an object crosses a threshold, an SG90 servo drives the gate open and holds position until the path clears.",
    sections: [
      {
        heading: "Implementation",
        body: [
          "The sensor is pulsed on a digital output and the echo duration captured in microseconds, converted to distance by the speed of sound and halved for the round trip. Servo position is commanded by angle through the Servo library rather than raw PWM timing. Threshold, open angle, and closed angle are all isolated as named constants so behavior is tunable without touching the control logic.",
          "Bring-up ran sensor-first: the ultrasonic reading was validated over serial monitor and confirmed responsive before the servo was ever wired in. Isolating each subsystem before integrating them meant the one wiring fault encountered was located in under a minute rather than hunted through a combined system.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Built, wired, debugged, and running in 1.5 hours against a planned three-day estimate. The point was fluency rather than complexity \u2014 establishing hands-on comfort with microcontroller I/O, pulse timing, and actuator control before starting the tracking turret, which needs all three under a real-time constraint.",
        ],
      },
    ],
    callouts: [
      { label: "Build time", text: "1.5 hours against a 3-day estimate." },
      { label: "Method", text: "Sensor validated in isolation before actuator integration." },
    ],
    figures: [
      {
        src: "/images/projects/servo-gate/build-01.jpg",
        caption: "Full circuit: Arduino Uno, HC-SR04 ultrasonic sensor, SG90 servo.",
      },
      {
        src: "/images/projects/servo-gate/build-02.jpg",
        caption: "Breadboard wiring detail \u2014 sensor on digital I/O, servo on a PWM pin.",
      },
    ],
  },
  {
    slug: "heap-allocator",
    title: "Custom Heap Allocator",
    kicker: "Systems programming",
    status: "Complete",
    year: "2025",
    stack: ["C", "Valgrind", "gdb"],
    featured: false,
    hero: "/images/projects/misc/heap-allocator.jpg",
    teaser:
      "Two working implementations of malloc, free, and realloc in C \u2014 implicit and explicit free lists, profiled and tuned.",
    intro:
      "Built for Stanford's CS107 (Computer Organizations and Systems): two complete dynamic memory allocator designs in C, exercised against a test harness simulating real allocation workloads.",
    sections: [
      {
        heading: "What it does",
        body: [
          "The first design threads an implicit free list through heap blocks. The second uses an explicit doubly-linked free list with coalescing, achieving O(1) merge on free and substantially better reuse under fragmentation-heavy workloads.",
          "Block headers pack size and allocation status into shared words using least-significant bits per specification. Correctness and performance were verified with Valgrind and callgrind profiling across simulated workloads.",
        ],
      },
      {
        heading: "Why it still matters here",
        body: [
          "Allocator work is the closest software gets to hardware without leaving the host: manual pointer arithmetic, byte-level layout control, and no runtime safety net. It is the same discipline that embedded and firmware work demands, practiced at a scale where mistakes are debuggable.",
        ],
      },
    ],
    callouts: [
      { label: "Note", text: "Source restricted by academic policy. Available on request." },
    ],
  },
  {
    slug: "huffman-compressor",
    title: "Huffman Compressor",
    kicker: "Algorithms",
    status: "Complete",
    year: "2024",
    stack: ["C++", "Priority queues", "Binary trees"],
    featured: false,
    hero: "/images/projects/misc/huffman.png",
    teaser:
      "Lossless file compression and decompression built from scratch \u2014 frequency analysis to prefix codes to bitstream.",
    intro:
      "Built for Stanford's CS106B (Programming Abstractions): a complete lossless compression and decompression tool implementing Huffman coding end to end.",
    sections: [
      {
        heading: "Implementation",
        body: [
          "Character frequencies are counted into a hash map, then merged into an encoding tree through a priority queue in ascending frequency order. The tree generates a prefix-code map used to emit compressed output, and a decoder reconstructs the original file from the compressed bitstream.",
          "Verified across multiple encode/decode scenarios on both course-provided and custom datasets, with memory safety checked through manual testing and debugging.",
        ],
      },
    ],
    callouts: [
      { label: "Note", text: "Source restricted by academic policy. Available on request." },
    ],
  },
  {
    slug: "warehouse-wreckage",
    title: "Warehouse Wreckage",
    kicker: "Real-time 3D",
    status: "Complete",
    year: "2024",
    stack: ["Unreal Engine 5", "C++", "Blueprints"],
    featured: false,
    hero: "/images/projects/warehouse/thumbnail.png",
    teaser:
      "A physics-driven Unreal Engine 5 build \u2014 first exposure to the engine that later shipped production simulation work at Boeing.",
    intro:
      "A physics-based first-person environment built through the GameDev.tv Unreal Engine 5 C++ course. Twenty projectiles, one warehouse, maximum structural damage.",
    sections: [
      {
        heading: "What it covered",
        body: [
          "Spawning actors and managing meshes at runtime, implementing physics-driven movement with velocity and vector math, and wiring gameplay logic through Blueprints and equivalent C++.",
          "Included here because it is where the Unreal Engine work started. Two years later the same engine, Blueprint system, and event architecture became the basis of a multi-site VR training environment at Boeing \u2014 a straight line from a tutorial project to production simulation work.",
        ],
      },
    ],
    callouts: [
      { label: "Assets", text: "Marketplace assets; screenshots and footage only, no distributed build." },
    ],
    figures: [
      { src: "/images/projects/warehouse/spawn.png", caption: "Spawn environment." },
      { src: "/images/projects/warehouse/chaos.png", caption: "Physics interaction under load." },
      { src: "/images/projects/warehouse/end.png", caption: "End state after projectile impact." },
    ],
    video: {
      url: "https://www.youtube.com/embed/5A-w3V6iNXk",
      label: "Gameplay footage",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
