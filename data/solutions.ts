// data/solutions.ts
export type SolutionTech = {
  key: string;          // stable id
  label: string;        // short name shown on the card
  icon: string;         // one of the keys we map to lucide icons in the slug page
  blurb: string;        // 1–2 lines that explain why we use it
};

export type Solution = {
  slug:
    | "home-automation"
    | "device-tailoring"
    | "energy-monitoring"
    | "utility-integration"; 
  heading: string;
  description: string;
  image?: string;       // preferred hero/teaser image for this solution
  tech?: SolutionTech[]; // technologies we use (shown inside slug page)
};

const solutions: Solution[] = [
  // HOME AUTOMATION
  {
    slug: "home-automation",
    heading: "Home Automation that just works",
    description:
      "Unified scenes, sensors and controls across lighting, climate and security—simple on the surface, powerful underneath.",
    image: "/images/original-34e3648b2660753f76e823904d07dd90.gif",
    tech: [
      {
        key: "automation-engine",
        label: "Automation engine",
        icon: "cpu",
        blurb: "Event- and state-driven logic ties rooms, devices and routines together without conflicts.",
      },
      {
        key: "presence-graph",
        label: "Presence graph",
        icon: "gauge",
        blurb: "Combines motion, phones and schedules so automations react to people, not just timers.",
      },
      {
        key: "multi-control",
        label: "Multi-control",
        icon: "smartphone",
        blurb: "Wall switches, app and voice stay perfectly in sync with automations and scenes.",
      },
      {
        key: "mesh-backbone",
        label: "Reliable mesh",
        icon: "wifi",
        blurb: "Thread/Zigbee/Wi-Fi mesh ensures fast, local control with graceful cloud fallbacks.",
      },
    ],
  },

  // ENERGY MONITORING
  {
    slug: "energy-monitoring",
    heading: "Energy Monitoring you can act on",
    description:
      "Live and historical usage per circuit, appliance and room—with alerts and automations to cut waste.",
    image: "/images/homeenergydashboard.png",
    tech: [
      { key: "ct-clamps", label: "CT clamps & meters", icon: "bolt", blurb: "Granular consumption by phase/circuit without rewiring." },
      { key: "smart-plugs", label: "Smart plugs", icon: "plug", blurb: "Appliance-level tracking and remote cut-off for standbys." },
      { key: "dashboards", label: "Actionable dashboards", icon: "bar-chart-3", blurb: "Daily/weekly KPIs, device ranks and anomaly flags." },
      { key: "auto-savings", label: "Auto-savings rules", icon: "gauge", blurb: "Tie peak pricing to scenes: shed loads, pre-cool, shift tasks." },
    ],
  },

  // DEVICE TAILORING
  {
    slug: "device-tailoring",
    heading: "Device Tailoring for your space",
    description:
      "We customize hardware, firmware and integrations so devices fit your rooms, habits and aesthetics.",
    image: "/images/Raspi-Enclosure-1.webp",
    tech: [
      { key: "firmware-profiles", label: "Firmware profiles", icon: "code", blurb: "Fine-tuned behaviours, safe defaults and OTA updates." },
      { key: "custom-enclosures", label: "Custom enclosures", icon: "package", blurb: "3D-printed or CNC housings that blend in and protect." },
      { key: "sensor-kits", label: "Sensor kits", icon: "wrench", blurb: "Right mix of motion, lux, VOC/CO₂ and contact sensors per room." },
      { key: "protocol-bridges", label: "Protocol bridges", icon: "bluetooth", blurb: "Bridge Zigbee/Thread, BLE, Modbus and IP gear into one brain." },
    ],
  },

  // UTILITY E-SHOP INTEGRATION
  {
    slug: "utility-integration",
    heading: "Utility E-Shop Integration end-to-end",
    description:
      "From cart to commissioning: buy, provision and maintain devices in one flow—no guesswork.",
    image: "/images/Smart-Home-Technology.jpg",
    tech: [
      { key: "catalog-mapping", label: "Catalog mapping", icon: "shopping-cart", blurb: "Products map to rooms, scenes and compatible hubs automatically." },
      { key: "auto-provision", label: "Auto-provisioning", icon: "cog", blurb: "Secure pairing, naming and room assignment right after checkout." },
      { key: "payments-warranty", label: "Payments & warranty", icon: "credit-card", blurb: "Receipts, serials and coverage tied to each installed device." },
      { key: "fulfillment", label: "Install & support", icon: "truck", blurb: "Scheduling, on-site setup and remote diagnostics in one place." },
    ],
  },
];

export default solutions;
