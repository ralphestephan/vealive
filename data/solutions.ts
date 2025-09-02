// data/solutions.ts
export type SolutionTech = {
  key: string;          // stable id
  label: string;        // short name shown on the card
  icon: string;         // one of the keys we map to lucide icons in the slug page
  blurb: string;        // 1–2 lines that explain why we use it
};

export type Solution = {
  slug: "lighting" | "climate" | "security" | "entertainment" | "utility";
  heading: string;
  description: string;
  image?: string;       // preferred hero/teaser image for this solution
  tech?: SolutionTech[]; // technologies we use (shown inside slug page)
};

const solutions: Solution[] = [
  {
    slug: "lighting",
    heading: "Smart Lighting that feels natural",
    description:
      "Scenes that track time, presence and ambient lux—so mornings are bright and evenings wind down without fiddling.",
    image: "/images/ChatGPT Image Sep 2, 2025, 03_54_09 PM.png", // replace with your own shot later
    tech: [
      {
        key: "tunable-white",
        label: "Tunable white",
        icon: "lightbulb",
        blurb: "Warm to cool control along smooth dimming curves for circadian comfort.",
      },
      {
        key: "sensors",
        label: "Presence & lux sensors",
        icon: "gauge",
        blurb: "Rooms respond to people and daylight, not just timers and switches.",
      },
      {
        key: "scenes",
        label: "Daily scene curves",
        icon: "sun",
        blurb: "Gentle ramps across the day—no harsh jumps at 7pm.",
      },
      {
        key: "control",
        label: "Voice & wall control",
        icon: "speaker",
        blurb: "Physical buttons, app and voice stay in sync with the automations.",
      },
    ],
  },

  {
    slug: "climate",
    heading: "Comfort that optimizes itself",
    description:
      "Smart thermostats, quiet ventilation and air-quality logic that keeps rooms fresh without spikes.",
    image: "/images/ChatGPT Image Sep 2, 2025, 03_56_10 PM.png",
    tech: [
      { key: "thermostat", label: "Smart thermostat", icon: "thermometer", blurb: "Schedules that adapt to occupancy and weather." },
      { key: "vent", label: "Ventilation", icon: "fan", blurb: "Link VOC/CO₂ to fans for silent, automatic air refresh." },
      { key: "aq", label: "Air quality", icon: "droplets", blurb: "Track humidity and particulates to prevent stuffiness." },
      { key: "energy", label: "Energy focus", icon: "gauge", blurb: "Keep comfort stable while trimming waste." },
    ],
  },

  {
    slug: "security",
    heading: "Security that’s discreet but ready",
    description:
      "Smart locks, cameras and presence simulation; local logging and privacy-first defaults.",
    image: "/images/placeholders/solution-security.jpg",
    tech: [
      { key: "cameras", label: "Smart cameras", icon: "camera", blurb: "Clear zones, privacy masks and timely clips." },
      { key: "locks", label: "Smart locks", icon: "lock", blurb: "Per-person access, schedules and guest codes." },
      { key: "alerts", label: "Quiet alerts", icon: "bell", blurb: "Notifications when they’re useful—not noisy." },
      { key: "privacy", label: "Local control", icon: "shield", blurb: "Keep keys local; cloud is convenience, not a requirement." },
    ],
  },

  {
    slug: "entertainment", // (Studio → Entertainment)
    heading: "Entertainment that feels seamless",
    description:
      "Unified control for film, music and gaming—no more juggling inputs and modes.",
    image: "/images/placeholders/solution-entertainment.jpg",
    tech: [
      { key: "av", label: "AV switching", icon: "tv", blurb: "One remote/app to rule the inputs and scenes." },
      { key: "audio", label: "Multi-room audio", icon: "music", blurb: "Group speakers, set zones and keep volumes sane." },
      { key: "gaming", label: "Gaming modes", icon: "gamepad", blurb: "Low-latency presets with the right lights + sound." },
      { key: "ambience", label: "Ambient scenes", icon: "sun", blurb: "Lights follow the mood—movie, music, focus, chill." },
    ],
  },

  {
    slug: "utility",
    heading: "Let the house help with the chores",
    description:
      "Quiet automations for daily tasks—clean, brew, feed and remind without thinking about it.",
    image: "/images/placeholders/solution-utility.jpg",
    tech: [
      { key: "cleaner", label: "Robot cleaner", icon: "bot", blurb: "Scheduled sweeps that avoid bowls and cables." },
      { key: "coffee", label: "Coffee rituals", icon: "coffee", blurb: "Heat, brew and notify—right when you want it." },
      { key: "pet", label: "Pet routines", icon: "dog", blurb: "Feeding and water health with gentle notifications." },
      { key: "water", label: "Leak alerts", icon: "droplets", blurb: "Catch the drip early and shut off if needed." },
    ],
  },
];

export default solutions;
