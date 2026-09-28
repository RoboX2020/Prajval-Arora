/** Copy and structure taken from the Aurelium product concept, edition 1. */

export const EDITION = 'Product concept edition 1';

export const PROMISE =
  'Tell Aurelium what you want to understand or become able to do. It will map the goal, teach the foundations, put you to work, test transfer and retention, and show the evidence behind what you have mastered.';

export const DEFINITION = [
  'Aurelium is a personal learning environment built around one promise: a learner can name a subject or capability, state what they want to be able to do, and receive a structured path from their current level to demonstrated mastery. It combines an AI tutor, adaptive examiner, visual canvas, voice conversation, practical workspace, verified research tools, and a persistent model of the learner’s knowledge.',
  'The product should feel like working with an unusually attentive teacher who can explain an idea five different ways, create an experiment on demand, notice the exact misconception behind a wrong answer, and return later to test whether the learning survived. It should never feel like an answer vending machine.',
];

export const NAME_NOTE =
  'Aurelium, chosen to suggest preserved knowledge, warm gold, and a modern learning instrument.';

export const FACTS = [
  {
    label: 'Primary user',
    value: 'A motivated learner who wants real capability rather than quick answers.',
  },
  {
    label: 'First institutional user',
    value:
      'A university instructor who wants individualized formative assessment without adding grading hours.',
  },
  {
    label: 'Initial wedge',
    value:
      'One STEM chapter, five to ten learning objectives, a fifteen minute adaptive mastery session, and an evidence report.',
  },
  {
    label: 'Long term outcome',
    value:
      'A living competency record based on demonstrated understanding, transfer, application, and retention.',
  },
];

export const PRINCIPLES = [
  {
    title: 'Mastery before completion',
    body: 'Finishing a lesson is not evidence of learning.',
  },
  {
    title: 'Teach through action',
    body: 'Every important concept should lead to a prediction, explanation, calculation, construction, diagnosis, simulation, or real task.',
  },
  {
    title: 'Adapt the path without weakening the standard',
    body: 'Learners may take different routes, but required competencies remain explicit.',
  },
  {
    title: 'Separate help from certification',
    body: 'Tutor mode may scaffold; assessment mode protects the validity of evidence.',
  },
  {
    title: 'Show the evidence',
    body: 'Every mastery judgment must link to learner work, rubric criteria, verification results, and uncertainty.',
  },
  {
    title: 'Use tools deliberately',
    body: 'Research, code, diagrams, files, and simulations serve the learning goal rather than decorate the chat.',
  },
  {
    title: 'Respect human authority',
    body: 'Instructors define outcomes and can inspect, override, or appeal consequential judgments.',
  },
];

export const JOURNEY = [
  'The learner states a goal in natural language, such as I want to understand projectile motion well enough to solve unequal height problems without memorizing cases.',
  'Aurelium asks a few diagnostic questions about prior knowledge, deadline, preferred mode, available tools, and the evidence that would count as success.',
  'The system converts the goal into a competency graph containing concepts, prerequisite relationships, common misconceptions, and practical outcomes.',
  'A short diagnostic locates the learner’s starting point. The system skips what is convincingly known and focuses on uncertain or missing foundations.',
  'The learner enters repeated cycles of explanation, prediction, worked example, independent attempt, feedback, and a new transfer challenge.',
  'Aurelium records evidence for each competency and schedules later checks to measure retention.',
  'The learner and, when permitted, the instructor see an evidence based mastery report instead of a single opaque percentage.',
];

export const LOOP = [
  {
    stage: 'Orient',
    ai: 'Clarifies the goal and defines success',
    learner: 'Goal, constraints, prior experience',
    evidence: 'Learning contract',
  },
  {
    stage: 'Diagnose',
    ai: 'Uses compact probes across prerequisites',
    learner: 'Explanations and attempts',
    evidence: 'Starting knowledge map',
  },
  {
    stage: 'Teach',
    ai: 'Chooses an explanation, analogy, visual, demonstration, or source',
    learner: 'Questions and predictions',
    evidence: 'Misconception notes',
  },
  {
    stage: 'Practice',
    ai: 'Creates scaffolded then independent tasks',
    learner: 'Work on canvas, voice, code, or physical task',
    evidence: 'Attempt trace',
  },
  {
    stage: 'Probe',
    ai: 'Asks why, changes assumptions, and tests edge cases',
    learner: 'Reasoning under variation',
    evidence: 'Depth evidence',
  },
  {
    stage: 'Verify',
    ai: 'Uses deterministic tools where possible',
    learner: 'Final result and method',
    evidence: 'Verification record',
  },
  {
    stage: 'Transfer',
    ai: 'Introduces a novel context or representation',
    learner: 'Independent application',
    evidence: 'Generalization evidence',
  },
  {
    stage: 'Retain',
    ai: 'Returns after a delay with a brief check',
    learner: 'Recall and reconstruction',
    evidence: 'Retention evidence',
  },
];

export const WORKSPACE_INTRO =
  'The main screen should place the conversation, visual reasoning, and the learner’s evolving map in one workspace. The experience must work for a five minute question, a semester course, or a months long practical goal without turning the home screen into a cockpit.';

export const SURFACES = [
  {
    name: 'Conversation',
    purpose: 'Natural interaction by text or voice',
    behavior: 'Supports interruption, clarification, turn taking, and compact citations.',
  },
  {
    name: 'Canvas',
    purpose: 'Shared space for diagrams, equations, timelines, notes, and manipulable models',
    behavior: 'The AI can draw, label, highlight, animate steps, and ask the learner to edit objects.',
  },
  {
    name: 'Workshop',
    purpose: 'Hands on task environment',
    behavior: 'Runs code, opens simulations, accepts files, records experiments, and guides physical builds.',
  },
  {
    name: 'Mastery map',
    purpose: 'Living model of competencies',
    behavior: 'Shows mastered, developing, uncertain, stale, and blocked nodes with linked evidence.',
  },
  {
    name: 'Path',
    purpose: 'Current sequence of learning activities',
    behavior: 'Explains why the next activity was chosen and permits learner or instructor changes.',
  },
  {
    name: 'Evidence',
    purpose: 'Inspectable record of claims about learning',
    behavior: 'Shows response excerpts, rubric decisions, verifier outputs, dates, and confidence.',
  },
  {
    name: 'Instructor view',
    purpose: 'Class level and student level insight',
    behavior: 'Surfaces common misconceptions, unresolved gaps, activity, and review queues.',
  },
];

export const VOICE = [
  'Voice mode should support genuine oral examination rather than convert speech into long chat messages. The AI listens for the learner’s reasoning, asks one question at a time, allows silence, and can interrupt only when requested or when safety requires it. A transcript remains editable, and the learner can pin spoken ideas to the canvas.',
  'The system distinguishes content knowledge from speaking fluency and must not penalize accent, hesitation, or disability.',
  'High stakes evidence requires explicit consent to recording, clear retention rules, and a nonvoice alternative.',
];

export const VOICE_MODES = [
  'Explain to me',
  'Socratic dialogue',
  'Oral exam',
  'Practice presentation',
  'Pronunciation',
  'Hands free workshop guidance',
];

export const VOICE_PHRASES = [
  'Show me',
  'Draw that',
  'Slow down',
  'Give me a hint',
  'Challenge me',
  'Do not help me yet',
];

export const CANVAS_INTRO =
  'The canvas is not a whiteboard beside the lesson. It is where reasoning becomes visible. Objects on the canvas carry semantic meaning, so the AI knows that a line is a force vector, a block is a component, and a curve is a response plot. The learner should be able to manipulate those objects and receive feedback on the model, not merely on the final text answer.';

export const DOING = [
  {
    goal: 'Physics',
    environment: 'Diagram canvas and numerical sandbox',
    task: 'Draw force vectors, predict motion, calculate, then compare with a simulation.',
  },
  {
    goal: 'Programming',
    environment: 'Code editor and test runner',
    task: 'Implement a function, inspect failing tests, explain the bug, and repair it.',
  },
  {
    goal: 'Electronics',
    environment: 'Circuit canvas and component reference',
    task: 'Build a divider, predict measurements, simulate it, then wire a safe physical version.',
  },
  {
    goal: 'Writing',
    environment: 'Outline and revision canvas',
    task: 'Make a claim map, draft evidence, revise structure, and defend editorial choices.',
  },
  {
    goal: 'History',
    environment: 'Timeline and source board',
    task: 'Compare primary sources, mark contradictions, and construct a supported interpretation.',
  },
  {
    goal: 'Robotics',
    environment: 'Kinematics view, code workspace, and hardware checklist',
    task: 'Plan motion, run a simulated test, deploy cautiously, and analyze telemetry.',
  },
];

export const AGENT_INTRO =
  'Aurelium should use an orchestrated agent rather than a single giant prompt. A session controller selects the current learning state, passes only the relevant context to the model, chooses permitted tools, and records structured evidence. Deterministic services verify calculations, code, citations, and rubric constraints whenever possible.';

export const AGENT_PARTS = [
  {
    name: 'Goal interpreter',
    responsibility: 'Turns the learner’s request into outcomes, constraints, and proof of success',
    output: 'Learning contract',
  },
  {
    name: 'Curriculum mapper',
    responsibility: 'Builds and revises the prerequisite and competency graph',
    output: 'Concept graph',
  },
  {
    name: 'Session planner',
    responsibility: 'Chooses the next activity from evidence and time available',
    output: 'Session plan',
  },
  {
    name: 'Tutor',
    responsibility: 'Explains, demonstrates, scaffolds, and responds to questions',
    output: 'Learning interaction',
  },
  {
    name: 'Examiner',
    responsibility: 'Elicits independent performance without leaking answers',
    output: 'Assessment interaction',
  },
  {
    name: 'Evaluator',
    responsibility: 'Scores evidence against explicit criteria and states uncertainty',
    output: 'Evidence judgment',
  },
  {
    name: 'Verifier',
    responsibility: 'Checks math, code, sources, data, or simulator results',
    output: 'Independent check',
  },
  {
    name: 'Memory manager',
    responsibility: 'Stores durable preferences and learning evidence with consent',
    output: 'Learner model',
  },
  {
    name: 'Safety controller',
    responsibility: 'Restricts tools, monitors risky tasks, and enforces boundaries',
    output: 'Permission decision',
  },
  {
    name: 'Report generator',
    responsibility: 'Creates learner and instructor summaries with evidence links',
    output: 'Mastery report',
  },
];

export const TOOL_INTRO =
  'The agent should connect to tools through a standard capability layer such as Model Context Protocol. Each tool receives the minimum required context, operates under explicit permissions, and returns structured results that can be audited. The platform should treat tool access as a controlled capability, not as a blanket license for the model to act.';

export const TOOLS = [
  {
    name: 'Web and source research',
    use: 'Retrieve current facts, papers, manuals, examples, and counterarguments',
    control:
      'Citations, source quality filters, freshness checks, and a visible distinction between retrieved fact and model inference.',
  },
  {
    name: 'Document and file reading',
    use: 'Learn from textbooks, slides, assignments, lab manuals, images, and datasets',
    control: 'Course scoped retrieval, access control, prompt injection defenses, and provenance.',
  },
  {
    name: 'Code execution',
    use: 'Run examples, tests, notebooks, numerical checks, and simulations',
    control: 'Sandboxing, time and resource limits, network controls, and reproducible outputs.',
  },
  {
    name: 'Math and symbolic verification',
    use: 'Validate equations, units, intermediate values, and equivalent forms',
    control: 'Show assumptions and avoid treating a correct number as proof of correct reasoning.',
  },
  {
    name: 'Canvas and diagram tools',
    use: 'Generate and manipulate exact visual models',
    control: 'Semantic objects, accessible descriptions, undo history, and learner edit tracking.',
  },
  {
    name: 'Image generation',
    use: 'Create illustrative scenes, visual analogies, and practice stimuli',
    control: 'Do not use for precise scientific diagrams; label synthetic images.',
  },
  {
    name: 'Speech services',
    use: 'Speech recognition, conversational turn taking, text to speech, and pronunciation',
    control: 'Consent, captioning, accent fairness, transcript correction, and voice privacy.',
  },
  {
    name: 'LMS and classroom systems',
    use: 'Import objectives and rosters; export assignments and reports',
    control: 'Least privilege, FERPA aligned handling, instructor approval, and clear grade boundaries.',
  },
  {
    name: 'Calendar and reminders',
    use: 'Schedule practice and spaced retention checks',
    control: 'User controlled cadence, quiet hours, easy cancellation, and no hidden monitoring.',
  },
  {
    name: 'Hardware and laboratory tools',
    use: 'Read sensors, guide safe experiments, or control approved devices',
    control:
      'Simulation first, explicit arming, physical safety limits, emergency stop, and no unsupervised hazardous action.',
  },
];

export const ASSESSMENT_RULE =
  'Assessment mode may call probe, verify, evaluate, and transfer. It may clarify a question, but it may not teach the missing answer.';

export const EVIDENCE_INTRO =
  'A mastery state is a claim supported by dated observations, not a number invented by the language model. Each evidence item should include the competency, task, learner response, assistance level, rubric criteria, verifier outputs, evaluator rationale, uncertainty, and whether the task tested recall, application, transfer, or retention.';

export const MASTERY_STATES = [
  {
    state: 'Unseen',
    meaning: 'No meaningful evidence',
    promotion: 'Any valid attempt',
  },
  {
    state: 'Emerging',
    meaning: 'Can respond with substantial support',
    promotion: 'Repeated partial performance',
  },
  {
    state: 'Developing',
    meaning: 'Can solve familiar tasks with limited help',
    promotion: 'Independent familiar task plus sound explanation',
  },
  {
    state: 'Mastered',
    meaning: 'Can perform independently and explain why',
    promotion: 'At least two independent demonstrations using distinct tasks',
  },
  {
    state: 'Transfer demonstrated',
    meaning: 'Can use the idea in a materially different context',
    promotion: 'Novel task with no answer revealing assistance',
  },
  {
    state: 'Retained',
    meaning: 'Can reconstruct or apply after a delay',
    promotion: 'Successful delayed probe',
  },
  {
    state: 'Stale',
    meaning: 'Earlier evidence may no longer represent current ability',
    promotion: 'New assessment required',
  },
];

export const EXAMPLE_GOAL =
  'Understand projectile motion well enough to solve unequal height problems and explain every modeling choice.';

export const EXAMPLE_TURNS = [
  {
    speaker: 'Aurelium',
    text: 'Before calculating, draw the velocity components and tell me which quantities change during flight.',
    learns: 'Elicits a model rather than formula recall.',
    focus: 'components' as const,
  },
  {
    speaker: 'Learner',
    text: 'Horizontal velocity stays the same and vertical velocity becomes zero when it lands.',
    learns: 'Likely confusion between the apex and landing.',
    focus: 'misconception' as const,
  },
  {
    speaker: 'Aurelium',
    text: 'Mark the one instant at which vertical velocity is zero. What is the ball doing one second later?',
    learns: 'A targeted probe tests the misconception without announcing the answer.',
    focus: 'apex' as const,
  },
  {
    speaker: 'Learner',
    text: 'It is moving downward, so vertical velocity is negative. Zero was only at the top.',
    learns: 'The learner repairs the model with limited assistance.',
    focus: 'descent' as const,
  },
  {
    speaker: 'Aurelium',
    text: 'New case. The ball lands fifteen metres below launch. Choose the vertical displacement and justify its sign.',
    learns: 'A changed context tests transfer and sign convention.',
    focus: 'transfer' as const,
  },
  {
    speaker: 'System',
    text: 'Record apex condition as developing, not mastered. Schedule an independent mixed problem later.',
    learns: 'Evidence state reflects assistance and uncertainty.',
    focus: 'record' as const,
  },
];

export const MODES = [
  {
    mode: 'Explore',
    permitted: 'Answer broad questions, build maps, recommend paths, and show examples',
    prohibited: 'Pretending exploration is evidence of mastery',
  },
  {
    mode: 'Tutor',
    permitted: 'Explain, hint, demonstrate, correct, and personalize',
    prohibited: 'Doing all work while marking the concept mastered',
  },
  {
    mode: 'Practice',
    permitted: 'Generate tasks, allow tools, give graduated feedback',
    prohibited: 'Reusing the same surface wording until the learner memorizes it',
  },
  {
    mode: 'Assessment',
    permitted: 'Probe independently, clarify wording, verify, and record evidence',
    prohibited: 'Hints, leading feedback, answer disclosure, or silent mode switching',
  },
  {
    mode: 'Project',
    permitted: 'Plan, supervise, inspect artifacts, and conduct reviews',
    prohibited: 'Claiming authorship or competence solely from an AI generated artifact',
  },
  {
    mode: 'Reflect',
    permitted: 'Summarize progress, compare current and prior models, plan review',
    prohibited: 'Treating self report as the only mastery evidence',
  },
];

export const PROMPT_INTRO =
  'The following is the behavioral core for the learning agent. Production deployment should combine it with a session state, course policy, tool policy, learner profile, competency graph, and machine readable output schema rather than relying on the prompt alone.';

export const PROMPT_RULES = [
  'Begin with the learner’s desired ability, deadline, constraints, and current level.',
  'Convert the goal into explicit competencies and prerequisites. Explain the path briefly.',
  'Diagnose before teaching. Ask compact questions that reveal reasoning, not trivia.',
  'Teach one conceptual step at a time. Prefer questions, examples, visuals, demonstrations, and analogies that match the learner’s current model.',
  'Require active work. Ask the learner to predict, calculate, draw, explain, build, debug, compare, or decide. Do not complete every meaningful step for them.',
  'When an answer is wrong, identify the likely misconception. Do not merely reveal the answer. Offer the smallest useful hint, then let the learner try again.',
  'Adapt the route, not the standard. Do not skip a required competency because it is difficult.',
  'Distinguish modes explicitly. Tutor mode may explain, hint, scaffold, and correct. Assessment mode may clarify wording but must not disclose the missing concept or solution.',
  'After teaching, use a different problem or context to test transfer. Later, test retention.',
  'Treat mastery as an evidence claim. Cite the learner’s work, assistance level, rubric criteria, verifier results, and uncertainty. Never invent precise confidence.',
  'Use tools when they improve accuracy or create a genuine learning activity. State what a tool established and what remains an inference. Cite external sources.',
  'For calculations, code, data, and factual claims, verify with deterministic tools when possible.',
  'Never confuse verbal fluency, speed, accent, confidence, or agreement with understanding.',
  'If the learner asks for an answer that would defeat an active assessment, preserve assessment integrity and offer to switch to tutor mode, with the mode change recorded.',
  'For dangerous physical, medical, legal, financial, or security tasks, apply the relevant safety policy, state limitations, and require appropriate supervision or professional review.',
  'Keep the conversation natural. Ask one high value question at a time. Be concise unless depth is useful. Never shame the learner.',
];

export const STATE_UPDATE = [
  'Competencies addressed',
  'Evidence created',
  'Assistance used',
  'Misconceptions observed',
  'Unresolved uncertainty',
  'Recommended next activity',
  'Retention date if appropriate',
];

export const DATA_MODEL = [
  {
    entity: 'Learner',
    fields: 'Identity, consent, accessibility preferences, durable learning preferences, and data controls',
  },
  {
    entity: 'Goal',
    fields: 'Desired capability, target date, constraints, success evidence, and owner',
  },
  {
    entity: 'Competency',
    fields: 'Definition, prerequisites, rubric, common misconceptions, and allowed evidence types',
  },
  {
    entity: 'Activity',
    fields: 'Mode, prompt, assets, tool permissions, expected output, and difficulty',
  },
  {
    entity: 'Attempt',
    fields: 'Learner response, timing, edits, assistance, tools used, and linked artifacts',
  },
  {
    entity: 'Evidence',
    fields: 'Competency, criterion, evaluator decision, verifier result, uncertainty, provenance, and timestamp',
  },
  {
    entity: 'Mastery state',
    fields: 'Current status, supporting evidence, counterevidence, decay policy, and review date',
  },
  {
    entity: 'Course policy',
    fields: 'Outcomes, grading boundaries, accommodations, allowed tools, retention, and appeal process',
  },
];

export const STACK = [
  {
    layer: 'Web client',
    choice: 'Next.js with React and TypeScript',
    reason: 'Fast product iteration, strong component ecosystem, and server rendering where useful.',
  },
  {
    layer: 'Canvas',
    choice: 'tldraw or Excalidraw as a base with custom semantic learning objects',
    reason: 'Proven interaction patterns and extensibility.',
  },
  {
    layer: 'Voice',
    choice: 'Streaming speech recognition and speech synthesis with interruption handling',
    reason: 'Low latency conversation and accessible transcripts.',
  },
  {
    layer: 'Backend',
    choice: 'FastAPI or TypeScript services',
    reason: 'Clear APIs, streaming support, and practical tool orchestration.',
  },
  {
    layer: 'Data',
    choice: 'PostgreSQL with vector search only where retrieval needs it',
    reason: 'Relational integrity for evidence and flexible retrieval for course content.',
  },
  {
    layer: 'Orchestration',
    choice: 'Explicit state machine plus model calls',
    reason: 'Prevents the model from silently changing mode or skipping required checks.',
  },
  {
    layer: 'Verification',
    choice: 'Symbolic math, unit checks, code runner, test harness, and source validators',
    reason: 'Moves objective checks outside the language model.',
  },
  {
    layer: 'Observability',
    choice: 'Trace each model call, tool call, rubric decision, and state transition',
    reason: 'Required for debugging, instructor review, and appeals.',
  },
];

export const TRUST = [
  'The learner owns personal study data and can inspect, export, correct, and delete it subject to institutional retention rules.',
  'Course documents, student records, and external sources retain provenance. Retrieved text is treated as untrusted input and cannot rewrite system policy.',
  'The system never sends messages, changes grades, controls hardware, or publishes work without a clear permission boundary.',
  'High stakes mastery decisions require transparent criteria, retained evidence, human review, and an appeal path.',
  'Accommodation settings affect interaction and timing, not the competency standard unless the instructor explicitly defines an alternative standard.',
  'Model quality is evaluated across accents, dialects, disability related speech patterns, language backgrounds, and differing levels of verbal confidence.',
  'The product distinguishes generated examples from retrieved facts and flags uncertainty when a verifier is unavailable.',
];

export const RISKS = [
  {
    risk: 'False mastery',
    failure: 'The model rewards polished wording or one lucky answer',
    mitigation: 'Require repeated evidence, changed contexts, assistance tracking, and verifier checks.',
  },
  {
    risk: 'False weakness',
    failure: 'Language, anxiety, or interface friction hides understanding',
    mitigation: 'Offer multiple response modes and separate fluency from content criteria.',
  },
  {
    risk: 'Assessment leakage',
    failure: 'Tutoring and certification blur together',
    mitigation: 'Use explicit mode transitions, immutable logs, and fresh transfer tasks.',
  },
  {
    risk: 'Hallucinated teaching',
    failure: 'The tutor explains incorrect information confidently',
    mitigation: 'Ground in approved sources, retrieve current material, verify objective claims, and expose citations.',
  },
  {
    risk: 'Dependency',
    failure: 'The learner waits for hints instead of struggling productively',
    mitigation: 'Delay help, meter hints, ask for a plan first, and track assistance.',
  },
  {
    risk: 'Surveillance',
    failure: 'Continuous evidence becomes continuous monitoring',
    mitigation:
      'Collect only learning relevant signals, require consent, define retention, and prohibit covert behavior scoring.',
  },
  {
    risk: 'Instructor distrust',
    failure: 'A black box produces scores without reasons',
    mitigation: 'Show evidence, criteria, uncertainty, and manual review controls.',
  },
  {
    risk: 'Scope explosion',
    failure: 'The first version tries to teach every subject and replace the LMS',
    mitigation: 'Pilot one unit with a narrow workflow and measurable outcomes.',
  },
];

export const MVP_INTRO =
  'The first testable product should prove one narrow claim: an adaptive conversation can identify meaningful concept level gaps and produce a useful evidence report without adding instructor grading time. It does not need autonomous curriculum design, hardware control, every MCP connector, or high stakes grading.';

export const MVP_STEPS = [
  'Instructor uploads one chapter, objectives, sample problems, and a rubric.',
  'Instructor reviews the generated competency map and misconceptions before launch.',
  'Ten to twenty students complete a fifteen minute text or voice session.',
  'The agent uses tutor mode for practice or assessment mode for the controlled pilot.',
  'The system produces concept level findings with linked transcript evidence.',
  'The instructor blindly reviews a sample and records agreement, disagreement, and missing evidence.',
];

export const PHASES = [
  {
    phase: 'Prototype',
    capability: 'Single chapter, chat, simple graph, manual prompt tuning',
    gate: 'Do users feel that the system found the real gap?',
  },
  {
    phase: 'Pilot',
    capability: 'Instructor setup, assessment mode, evidence report, basic voice',
    gate: 'Do instructors agree with concept judgments often enough to continue?',
  },
  {
    phase: 'Learning loop',
    capability: 'Canvas, tool verification, targeted remediation, transfer tasks',
    gate: 'Does targeted remediation improve later independent performance?',
  },
  {
    phase: 'Retention',
    capability: 'Scheduled checks and mastery decay',
    gate: 'Does the record predict what learners retain?',
  },
  {
    phase: 'Course product',
    capability: 'LMS integration, class dashboard, accommodations, review workflow',
    gate: 'Does it save time and improve actionable teaching information?',
  },
  {
    phase: 'Platform',
    capability: 'Cross course learner graph, projects, broad tool ecosystem',
    gate: 'Can standards remain reliable across subjects and institutions?',
  },
];

export const METRICS = [
  {
    metric: 'Instructor agreement',
    measure: 'Blind review of AI competency judgments and cited evidence',
    why: 'Tests whether reports deserve attention.',
  },
  {
    metric: 'Misconception precision',
    measure: 'Confirmed misconceptions divided by all misconceptions flagged',
    why: 'Penalizes confident but wrong diagnosis.',
  },
  {
    metric: 'Misconception recall',
    measure: 'Confirmed misconceptions found by AI divided by those found in expert review',
    why: 'Shows what the system misses.',
  },
  {
    metric: 'Transfer improvement',
    measure: 'Performance on a new task before and after targeted remediation',
    why: 'Tests learning rather than immediate repetition.',
  },
  {
    metric: 'Retention',
    measure: 'Performance on a delayed probe',
    why: 'Tests durability.',
  },
  {
    metric: 'Instructor time',
    measure: 'Setup and review minutes compared with the existing activity',
    why: 'Determines practical adoption.',
  },
  {
    metric: 'Learner agency',
    measure: 'Hint use, independent attempts, perceived control, and qualitative interviews',
    why: 'Detects dependence or frustration.',
  },
  {
    metric: 'Fairness',
    measure: 'Error analysis across relevant learner groups and response modes',
    why: 'Finds systematic misclassification.',
  },
];

export const BUILD_PLAN = [
  'Choose one course unit with clear prerequisites and verifiable answers. Projectile motion is a strong first candidate.',
  'Write five to ten competencies, rubrics, common misconceptions, and two transfer tasks per competency with an instructor or teaching assistant.',
  'Build the session state machine before polishing the chat interface. The model must know when it is diagnosing, teaching, practicing, or assessing.',
  'Store every evidence judgment in a structured schema and link it to the exact learner work and assistance level.',
  'Add one deterministic verifier, such as numerical and unit checking, so the first pilot does not rely entirely on model judgment.',
  'Create the instructor report and review workflow. The product is valuable only if its conclusions are easy to inspect.',
  'Run the prototype with the founder and five peers, observe sessions, and fix the interaction before involving a course.',
  'Recruit one professor for a voluntary, nongraded pilot and preregister the comparison metrics.',
];

export const MILESTONE =
  'The first milestone is not a beautiful universal tutor. It is a session in which a learner thinks, this system found exactly what I misunderstood, and an instructor can verify why.';

export const NAV = [
  { href: '#promise', label: 'Promise' },
  { href: '#principles', label: 'Principles' },
  { href: '#journey', label: 'Journey' },
  { href: '#loop', label: 'Loop' },
  { href: '#workspace', label: 'Workspace' },
  { href: '#practice', label: 'Practice' },
  { href: '#agent', label: 'Agent' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#trust', label: 'Trust' },
  { href: '#first', label: 'First step' },
];
