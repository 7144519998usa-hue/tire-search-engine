import { buildGoUrl } from "./redirects.js";
import { buildAmazonUrl } from "./tireData.js";

export const amazonStorefrontSections = [
  {
    id: "popular-sizes",
    eyebrow: "Most searched tire sizes",
    title: "Popular Amazon tire searches",
    summary: "Fast Amazon marketplace searches for common replacement sizes. Confirm fitment, load rating, speed rating, seller, shipping, and installation before buying.",
    items: [
      { label: "225/65R17 tires", query: "225/65R17 tires", size: "225/65R17", intent: "RAV4, CR-V, Rogue, Forester" },
      { label: "205/55R16 tires", query: "205/55R16 tires", size: "205/55R16", intent: "Civic, Corolla, commuter cars" },
      { label: "215/55R17 tires", query: "215/55R17 tires", size: "215/55R17", intent: "Sedans and compact crossovers" },
      { label: "225/60R18 tires", query: "225/60R18 tires", size: "225/60R18", intent: "SUV and crossover replacements" },
      { label: "195/65R15 tires", query: "195/65R15 tires", size: "195/65R15", intent: "Compact cars and value replacements" },
      { label: "235/45R18 tires", query: "235/45R18 tires", size: "235/45R18", intent: "Touring and performance sedans" }
    ]
  },
  {
    id: "truck-tires",
    eyebrow: "Pickup and SUV",
    title: "Truck and all-terrain tire searches",
    summary: "Amazon search paths for pickup, SUV, all-terrain, highway-terrain, towing, and work-truck tire shoppers.",
    items: [
      { label: "275/60R20 all-terrain tires", query: "275/60R20 all terrain tires", size: "275/60R20", intent: "F-150, Silverado, Ram, Tundra" },
      { label: "265/70R17 all-terrain tires", query: "265/70R17 all terrain tires", size: "265/70R17", intent: "Tacoma, 4Runner, Jeep, midsize trucks" },
      { label: "285/70R17 truck tires", query: "285/70R17 truck tires", size: "285/70R17", intent: "Lifted trucks and all-terrain builds" },
      { label: "245/75R16 truck tires", query: "245/75R16 light truck tires", size: "245/75R16", intent: "Work trucks and vans" },
      { label: "BFGoodrich KO2 tires", query: "BFGoodrich All Terrain T/A KO2 tires", size: "", intent: "Popular all-terrain model search" },
      { label: "Falken Wildpeak tires", query: "Falken Wildpeak all terrain tires", size: "", intent: "All-terrain truck tire search" }
    ]
  },
  {
    id: "commercial-support",
    eyebrow: "Commercial support",
    title: "Semi, trailer, and fleet tire searches",
    summary: "Amazon may have limited commercial tire availability, but these searches are useful for trailer, work-truck, and support equipment shopping.",
    items: [
      { label: "11R22.5 tires", query: "11R22.5 truck tires", size: "11R22.5", intent: "Commercial truck tire search" },
      { label: "295/75R22.5 tires", query: "295/75R22.5 truck tires", size: "295/75R22.5", intent: "Semi truck replacement search" },
      { label: "trailer tires", query: "trailer tires", size: "", intent: "Utility, RV, and trailer replacements" },
      { label: "commercial van tires", query: "commercial van tires", size: "", intent: "Cargo van and delivery van searches" },
      { label: "tire chains for semi trucks", query: "semi truck tire chains", size: "", intent: "Winter fleet equipment" },
      { label: "commercial tire pressure gauge", query: "commercial truck tire pressure gauge", size: "", intent: "Fleet maintenance tool" }
    ]
  },
  {
    id: "winter-ev",
    eyebrow: "Seasonal and EV",
    title: "Winter, EV, and quiet tire searches",
    summary: "Search Amazon for winter traction, EV replacement, quiet ride, and all-weather tire options before comparing fitment elsewhere.",
    items: [
      { label: "winter tires", query: "winter tires", size: "", intent: "Snow and cold-weather searches" },
      { label: "all-weather tires", query: "all weather tires", size: "", intent: "Year-round severe-weather alternatives" },
      { label: "Tesla Model 3 tires", query: "Tesla Model 3 tires", size: "235/45R18", intent: "EV tire replacement search" },
      { label: "quiet EV tires", query: "quiet EV tires", size: "", intent: "Low-noise EV replacement search" },
      { label: "235/45R18 winter tires", query: "235/45R18 winter tires", size: "235/45R18", intent: "Sedan and EV winter size" },
      { label: "255/40R20 performance tires", query: "255/40R20 performance tires", size: "255/40R20", intent: "Performance and EV tire search" }
    ]
  },
  {
    id: "wheels",
    eyebrow: "Wheels",
    title: "Amazon wheel searches",
    summary: "Wheel fitment is strict. Use these searches as a starting point, then confirm bolt pattern, offset, center bore, load rating, and brake clearance.",
    items: [
      { label: "truck wheels 6x135", query: "truck wheels 6x135", size: "", intent: "Ford F-150 wheel pattern search" },
      { label: "truck wheels 6x139.7", query: "truck wheels 6x139.7", size: "", intent: "Toyota, GM, and Nissan truck wheel search" },
      { label: "17 inch truck wheels", query: "17 inch truck wheels", size: "", intent: "All-terrain and work-truck wheels" },
      { label: "20 inch truck wheels", query: "20 inch truck wheels", size: "", intent: "Pickup and SUV wheel search" },
      { label: "trailer wheels", query: "trailer wheels", size: "", intent: "Trailer wheel replacement search" },
      { label: "wheel and tire packages", query: "wheel and tire packages", size: "", intent: "Package research search" }
    ]
  },
  {
    id: "accessories",
    eyebrow: "Accessories",
    title: "Tire tools and accessories",
    summary: "Useful add-ons for buyers who need inflation, repair, TPMS, chains, jacks, storage, or emergency tire tools.",
    items: [
      { label: "portable tire inflator", query: "portable tire inflator", size: "", intent: "Emergency and daily-driver accessory" },
      { label: "TPMS sensors", query: "TPMS sensors", size: "", intent: "Replacement tire pressure sensors" },
      { label: "tire repair kit", query: "tire repair kit", size: "", intent: "Emergency puncture repair" },
      { label: "floor jack", query: "floor jack", size: "", intent: "Garage and tire change tool" },
      { label: "torque wrench for lug nuts", query: "torque wrench lug nuts", size: "", intent: "Wheel installation support" },
      { label: "tire storage bags", query: "tire storage bags", size: "", intent: "Seasonal tire storage" },
      { label: "snow chains", query: "snow chains for tires", size: "", intent: "Winter traction accessory" },
      { label: "commercial tire inflator", query: "commercial tire inflator", size: "", intent: "Truck and fleet maintenance" }
    ]
  }
];

export const homepageAmazonPicks = [
  amazonStorefrontSections[0].items[0],
  amazonStorefrontSections[0].items[1],
  amazonStorefrontSections[1].items[0],
  amazonStorefrontSections[3].items[0],
  amazonStorefrontSections[4].items[3],
  amazonStorefrontSections[5].items[0],
  amazonStorefrontSections[5].items[1],
  amazonStorefrontSections[5].items[2]
];

export function amazonStorefrontHref(item, placement = "amazon-storefront") {
  return buildGoUrl({
    merchant: "Amazon",
    href: buildAmazonUrl({ query: item.query }),
    placement,
    tireSize: item.size || item.label
  });
}
