import { formatTireSize, normalizeTireSize, parseTireSize } from "./tireSizeParser.js";
import { getRelatedSizes, isCommercialTireSize } from "./getRelatedSizes.js";

const tireRackClickBase = process.env.TSE_TIRE_RACK_CJ_CLICK_BASE || "https://www.anrdoezrs.net/click-101740681-13697786";
const tireRackQuickLink = process.env.TSE_TIRE_RACK_CJ_TEXT_LINK || "";
const defaultTireRackTemplate = `${tireRackClickBase}?url=https%3A%2F%2Fwww.tirerack.com%2Ftires%2Fresults.jsp%3Fwidth%3D{width}%26ratio%3D{ratio}%26diameter%3D{diameter}`;
const tireRackTemplate = process.env.TSE_TIRE_RACK_AFFILIATE_URL_TEMPLATE || defaultTireRackTemplate;
const mavisQuickLink = process.env.TSE_MAVIS_CJ_TEXT_LINK || "https://www.dpbolvw.net/click-101740681-15765842";
const simpleTireBase = process.env.TSE_SIMPLETIRE_SEARCH_BASE || "https://simpletire.com/tire-sizes";
const priorityTireBase = process.env.TSE_PRIORITYTIRE_SEARCH_BASE || "https://www.prioritytire.com/catalogsearch/result/";
const amazonTag = process.env.TSE_AMAZON_ASSOCIATE_TAG || "";

export const priorityPages = [
  "/tires/225-65-r17",
  "/tires/205-55-r16",
  "/tires/275-55-r20",
  "/tires/245-60-r18",
  "/tires/235-60-r18",
  "/tires/265-60-r18",
  "/tires/275-60-r20",
  "/tires/285-45-r22"
];

export const commercialPriorityPages = [
  "/tires/11r22-5",
  "/tires/295-75-r22-5",
  "/tires/285-75-r24-5",
  "/tires/445-50-r22-5"
];

export const vehicleFitments = [
  {
    make: "tesla",
    model: "model-3",
    year: "2025",
    label: "Tesla Model 3 2025",
    size: "235/45R18",
    intent: "all-season",
    focus: "EV-friendly replacement tires, quiet commuting, and retailer checkout options"
  },
  {
    make: "tesla",
    model: "model-3",
    year: "2026",
    label: "Tesla Model 3 2026",
    size: "235/45R18",
    intent: "all-season",
    focus: "EV tire replacement options and marketplace choices"
  },
  {
    make: "tesla",
    model: "model-y",
    year: "2025",
    label: "Tesla Model Y 2025",
    size: "255/45R19",
    intent: "all-season",
    focus: "EV tire replacement, quiet highway driving, and long-wear options"
  },
  {
    make: "tesla",
    model: "cybertruck",
    year: "2024",
    label: "Tesla Cybertruck 2024",
    size: "285/65R20",
    intent: "all-terrain",
    focus: "truck-capable EV replacement tires and all-terrain options"
  },
  {
    make: "toyota",
    model: "prius",
    year: "2026",
    label: "Toyota Prius 2026",
    size: "195/65R15",
    intent: "all-season",
    focus: "commuter tire options, all-season value, and simple retailer choices"
  },
  {
    make: "toyota",
    model: "camry",
    year: "2024",
    label: "Toyota Camry 2024",
    size: "235/45R18",
    intent: "all-season",
    focus: "commuter touring tires, quiet ride, and installed options"
  },
  {
    make: "toyota",
    model: "corolla",
    year: "2024",
    label: "Toyota Corolla 2024",
    size: "195/65R15",
    intent: "all-season",
    focus: "commuter all-season replacement tires and value-focused retailer paths"
  },
  {
    make: "toyota",
    model: "rav4",
    year: "2021",
    label: "Toyota RAV4 2021",
    size: "225/65R17",
    intent: "all-season",
    focus: "SUV replacement tires with trim and wheel-package confirmation"
  },
  {
    make: "toyota",
    model: "rav4",
    year: "2024",
    label: "Toyota RAV4 2024",
    size: "225/65R17",
    intent: "all-season",
    focus: "SUV all-season and all-weather replacement options"
  },
  {
    make: "toyota",
    model: "highlander",
    year: "2024",
    label: "Toyota Highlander 2024",
    size: "245/60R18",
    intent: "all-season",
    focus: "three-row SUV touring tires and all-season replacement options"
  },
  {
    make: "honda",
    model: "civic",
    year: "2024",
    label: "Honda Civic 2024",
    size: "235/45R18",
    intent: "all-season",
    focus: "daily-driver all-season tires and winter tire paths"
  },
  {
    make: "honda",
    model: "accord",
    year: "2020",
    label: "Honda Accord 2020",
    size: "225/50R17",
    intent: "all-season",
    focus: "touring comfort, commuter value, and installed tire choices"
  },
  {
    make: "honda",
    model: "cr-v",
    year: "2024",
    label: "Honda CR-V 2024",
    size: "235/60R18",
    intent: "all-season",
    focus: "SUV replacement tires, touring comfort, and all-weather options"
  },
  {
    make: "ford",
    model: "f-150",
    year: "2018",
    label: "Ford F-150 2018",
    size: "275/60R20",
    intent: "all-terrain",
    focus: "pickup truck all-terrain, highway, and towing tire options"
  },
  {
    make: "ford",
    model: "explorer",
    year: "2024",
    label: "Ford Explorer 2024",
    size: "255/55R20",
    intent: "all-season",
    focus: "SUV replacement tires for highway comfort and year-round use"
  },
  {
    make: "chevrolet",
    model: "silverado",
    year: "2024",
    label: "Chevrolet Silverado 2024",
    size: "275/60R20",
    intent: "all-terrain",
    focus: "pickup tire options for highway, towing, and all-terrain use"
  },
  {
    make: "chevrolet",
    model: "equinox",
    year: "2024",
    label: "Chevrolet Equinox 2024",
    size: "225/65R17",
    intent: "all-season",
    focus: "crossover tire replacement, touring comfort, and all-weather options"
  },
  {
    make: "nissan",
    model: "altima",
    year: "2024",
    label: "Nissan Altima 2024",
    size: "215/55R17",
    intent: "all-season",
    focus: "sedan replacement tires, commuter comfort, and retailer choices"
  },
  {
    make: "nissan",
    model: "rogue",
    year: "2023",
    label: "Nissan Rogue 2023",
    size: "225/65R17",
    intent: "all-season",
    focus: "crossover touring and all-weather tire replacement paths"
  },
  {
    make: "hyundai",
    model: "santa-fe",
    year: "2024",
    label: "Hyundai Santa Fe 2024",
    size: "235/60R18",
    intent: "all-season",
    focus: "SUV tire replacement options and installed tire paths"
  },
  {
    make: "hyundai",
    model: "tucson",
    year: "2024",
    label: "Hyundai Tucson 2024",
    size: "235/60R18",
    intent: "all-season",
    focus: "crossover touring tires and all-weather replacement choices"
  },
  {
    make: "kia",
    model: "sportage",
    year: "2024",
    label: "Kia Sportage 2024",
    size: "235/60R18",
    intent: "all-season",
    focus: "SUV all-season replacement tires and retailer checkout paths"
  },
  {
    make: "subaru",
    model: "outback",
    year: "2024",
    label: "Subaru Outback 2024",
    size: "225/65R17",
    intent: "all-weather",
    focus: "all-weather and touring replacement tires for crossover use"
  },
  {
    make: "jeep",
    model: "wrangler",
    year: "2024",
    label: "Jeep Wrangler 2024",
    size: "265/70R17",
    intent: "all-terrain",
    focus: "all-terrain and mud-terrain tire paths for Wrangler shoppers"
  },
  {
    make: "ram",
    model: "1500",
    year: "2024",
    label: "Ram 1500 2024",
    size: "275/60R20",
    intent: "all-terrain",
    focus: "pickup all-terrain, highway, and towing tire options"
  }
];

export const tireSizes = [
  "295/75R22.5",
  "445/50R22.5",
  "11R22.5",
  "12R22.5",
  "10R22.5",
  "385/65R22.5",
  "315/80R22.5",
  "275/80R22.5",
  "215/75R17.5",
  "245/70R17.5",
  "235/60R18",
  "245/60R18",
  "225/65R17",
  "225/60R18",
  "225/45R17",
  "225/40R18",
  "205/60R16",
  "205/55R16",
  "215/55R17",
  "215/65R16",
  "235/45R18",
  "235/55R18",
  "235/55R19",
  "235/35R20",
  "235/80R17",
  "195/65R15",
  "195/55R16",
  "225/50R17",
  "275/60R20",
  "275/55R20",
  "285/55R20",
  "275/65R20",
  "285/50R20",
  "255/55R20",
  "255/70R22.5",
  "265/70R17",
  "265/70R19.5",
  "265/60R18",
  "235/40R19",
  "245/45R19",
  "255/40R20",
  "255/45R20",
  "255/45R19",
  "245/45R20",
  "285/45R22",
  "245/75R16",
  "245/75R17",
  "255/55R18",
  "245/55R18",
  "235/65R18",
  "255/60R18",
  "285/75R24.5",
  "11R24.5",
  "285/65R20"
];

export const commercialPositions = {
  steer: {
    title: "Commercial Steer Tires",
    subtitle: "Compare steer-position truck tires for highway stability, tread life, casing value, and fleet uptime.",
    size: "295/75R22.5",
    intent: "steer"
  },
  drive: {
    title: "Semi Truck Drive Tires",
    subtitle: "Compare drive tires for traction, long-haul mileage, regional freight, and cost-per-mile planning.",
    size: "295/75R22.5",
    intent: "drive"
  },
  trailer: {
    title: "Semi Trailer Tires",
    subtitle: "Compare trailer tires for spread axle use, retread planning, casing value, and fleet replacement timing.",
    size: "445/50R22.5",
    intent: "trailer"
  }
};

export const productCatalog = [
  {
    id: "michelin-x-line-energy-z",
    brand: "Michelin",
    model: "X Line Energy Z",
    size: "295/75R22.5",
    category: "Commercial steer",
    position: "steer",
    bestFor: "Long-haul steer axle mileage and fuel-conscious fleets",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "bridgestone-r284-ecopia",
    brand: "Bridgestone",
    model: "R284 Ecopia",
    size: "295/75R22.5",
    category: "Commercial steer",
    position: "steer",
    bestFor: "Regional and highway steer applications where casing value matters",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "goodyear-endurance-lhs",
    brand: "Goodyear",
    model: "Endurance LHS",
    size: "11R22.5",
    category: "Commercial steer",
    position: "steer",
    bestFor: "Highway steer replacement for line-haul trucks",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "michelin-xdn2",
    brand: "Michelin",
    model: "XDN2",
    size: "295/75R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Drive axle traction with strong snow and mixed-weather capability",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "bridgestone-m726-ela",
    brand: "Bridgestone",
    model: "M726 ELA",
    size: "295/75R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Regional drive axle use and retread-focused fleets",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "goodyear-fuel-max-rsd",
    brand: "Goodyear",
    model: "Fuel Max RSD",
    size: "295/75R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Fuel-conscious drive axle replacement",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "michelin-x-one-line-energy-t",
    brand: "Michelin",
    model: "X One Line Energy T",
    size: "445/50R22.5",
    category: "Commercial trailer",
    position: "trailer",
    bestFor: "Wide-base trailer replacement and long-haul efficiency",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "bridgestone-r197",
    brand: "Bridgestone",
    model: "R197",
    size: "445/50R22.5",
    category: "Commercial trailer",
    position: "trailer",
    bestFor: "Trailer axle durability and casing value",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "michelin-crossclimate2",
    brand: "Michelin",
    model: "CrossClimate2",
    size: "225/65R17",
    category: "All-weather passenger",
    position: "all-season",
    bestFor: "RAV4, Rogue, CR-V, and daily drivers needing all-weather confidence",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "bridgestone-weatherpeak",
    brand: "Bridgestone",
    model: "WeatherPeak",
    size: "245/60R18",
    category: "All-weather passenger",
    position: "all-season",
    bestFor: "SUV and crossover shoppers comparing year-round traction",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "bfgoodrich-ko2",
    brand: "BFGoodrich",
    model: "All-Terrain T/A KO2",
    size: "275/60R20",
    category: "All-terrain truck",
    position: "all-terrain",
    bestFor: "Tacoma, F-150, Jeep, towing, and trail-capable trucks",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "continental-procontact-rx",
    brand: "Continental",
    model: "ProContact RX",
    size: "235/45R18",
    category: "Touring passenger",
    position: "all-season",
    bestFor: "Camry, Civic, commuter cars, and quiet daily driving",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "michelin-primacy-tour-as",
    brand: "Michelin",
    model: "Primacy Tour A/S",
    size: "235/45R18",
    category: "Touring passenger",
    position: "all-season",
    bestFor: "Tesla Model 3, Camry, Civic, and daily-driver replacement searches",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "yokohama-avid-ascend-gt",
    brand: "Yokohama",
    model: "AVID Ascend GT",
    size: "195/65R15",
    category: "Touring passenger",
    position: "all-season",
    bestFor: "Commuter cars comparing value, comfort, and all-season tire options",
    priceSnapshot: "Check current retailer price",
    image: "https://www.tirerack.com/content/dam/tirerack/desktop/homepage/tireRackLogo.png"
  },
  {
    id: "continental-extremecontact-dws06-plus",
    brand: "Continental",
    model: "ExtremeContact DWS06 Plus",
    size: "235/45R18",
    category: "EV-compatible performance all-season",
    position: "all-season",
    bestFor: "Tesla Model 3 drivers comparing wet grip, quiet ride, and all-season performance",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "pirelli-p-zero-all-season-plus-elect",
    brand: "Pirelli",
    model: "P Zero All Season Plus Elect",
    size: "235/45R18",
    category: "EV touring all-season",
    position: "all-season",
    bestFor: "Tesla Model 3 replacement searches where EV fitment and road noise matter",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "michelin-pilot-sport-all-season-4-255-40r20",
    brand: "Michelin",
    model: "Pilot Sport All Season 4",
    size: "255/40R20",
    category: "EV-compatible performance all-season",
    position: "all-season",
    bestFor: "Tesla Model 3 Performance, EV tire searches, and responsive all-season driving",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "continental-procontact-rx-235-40r19",
    brand: "Continental",
    model: "ProContact RX",
    size: "235/40R19",
    category: "EV touring all-season",
    position: "all-season",
    bestFor: "Tesla Model 3 19-inch replacement tire searches and quiet commuting",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "michelin-primacy-mxm4-255-45r19",
    brand: "Michelin",
    model: "Primacy MXM4",
    size: "255/45R19",
    category: "EV touring all-season",
    position: "all-season",
    bestFor: "Tesla Model Y replacement tire searches focused on ride comfort and EV range",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "pirelli-scorpion-ms-elect-255-45r19",
    brand: "Pirelli",
    model: "Scorpion MS Elect",
    size: "255/45R19",
    category: "EV SUV all-season",
    position: "all-season",
    bestFor: "Tesla Model Y drivers comparing EV-focused SUV replacement tires",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "goodyear-wrangler-territory-rt-285-65r20",
    brand: "Goodyear",
    model: "Wrangler Territory RT",
    size: "285/65R20",
    category: "EV truck all-terrain",
    position: "all-terrain",
    bestFor: "Cybertruck-style truck tire searches, mixed road use, and all-terrain stance",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "falken-wildpeak-at4w-285-65r20",
    brand: "Falken",
    model: "Wildpeak A/T4W",
    size: "285/65R20",
    category: "All-terrain truck",
    position: "all-terrain",
    bestFor: "Truck and EV pickup searches needing severe-weather all-terrain capability",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "continental-hdr2-11r22-5",
    brand: "Continental",
    model: "HDR2",
    size: "11R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Regional and line-haul drive tire searches with traction and retread value in mind",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "yokohama-712l-11r22-5",
    brand: "Yokohama",
    model: "712L",
    size: "11R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Semi truck drive tire shoppers comparing long-haul mileage and casing value",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "michelin-x-line-energy-d-11r22-5",
    brand: "Michelin",
    model: "X Line Energy D",
    size: "11R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Fuel-efficient drive tire replacement for line-haul trucks",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "bridgestone-r196-11r22-5",
    brand: "Bridgestone",
    model: "R196",
    size: "11R22.5",
    category: "Commercial trailer",
    position: "trailer",
    bestFor: "Trailer tire searches where casing value, wear, and fleet uptime matter",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "goodyear-endurance-lht-445-50r22-5",
    brand: "Goodyear",
    model: "Endurance LHT",
    size: "445/50R22.5",
    category: "Commercial trailer",
    position: "trailer",
    bestFor: "Wide-base trailer replacement and long-haul commercial trailer searches",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "continental-htr2-445-50r22-5",
    brand: "Continental",
    model: "HTR2",
    size: "445/50R22.5",
    category: "Commercial trailer",
    position: "trailer",
    bestFor: "Wide-base trailer tire shoppers comparing durability and fleet service life",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "firestone-fs591-295-75r22-5",
    brand: "Firestone",
    model: "FS591",
    size: "295/75R22.5",
    category: "Commercial steer",
    position: "steer",
    bestFor: "Steer axle replacement where predictable wear and highway stability matter",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "continental-hsr2-295-75r22-5",
    brand: "Continental",
    model: "HSR2",
    size: "295/75R22.5",
    category: "Commercial steer",
    position: "steer",
    bestFor: "Regional steer tire searches for fleets balancing durability and casing value",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "bfgoodrich-route-control-d-295-75r22-5",
    brand: "BFGoodrich",
    model: "Route Control D",
    size: "295/75R22.5",
    category: "Commercial drive",
    position: "drive",
    bestFor: "Commercial drive tire shoppers comparing traction and value",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "cooper-procontrol-235-60r18",
    brand: "Cooper",
    model: "ProControl",
    size: "235/60R18",
    category: "Touring all-season",
    position: "all-season",
    bestFor: "SUV and crossover shoppers comparing 235/60R18 all-season value",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "bridgestone-weatherpeak-235-60r18",
    brand: "Bridgestone",
    model: "WeatherPeak",
    size: "235/60R18",
    category: "All-weather passenger",
    position: "all-season",
    bestFor: "235/60R18 all-weather tire searches for SUVs and commuters",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "goodyear-assurance-weatherready2-225-65r17",
    brand: "Goodyear",
    model: "Assurance WeatherReady 2",
    size: "225/65R17",
    category: "All-weather passenger",
    position: "all-season",
    bestFor: "RAV4, CR-V, Rogue, and SUV shoppers comparing 225/65R17 all-season tires",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "firestone-destination-le3-225-65r17",
    brand: "Firestone",
    model: "Destination LE3",
    size: "225/65R17",
    category: "SUV touring all-season",
    position: "all-season",
    bestFor: "SUV replacement tire searches focused on daily driving and value",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "general-altimax-365aw-195-65r15",
    brand: "General",
    model: "AltiMAX 365 AW",
    size: "195/65R15",
    category: "All-weather passenger",
    position: "all-season",
    bestFor: "195/65R15 commuter searches needing all-weather traction and simple checkout options",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "goodyear-assurance-all-season-195-65r15",
    brand: "Goodyear",
    model: "Assurance All-Season",
    size: "195/65R15",
    category: "Touring all-season",
    position: "all-season",
    bestFor: "Budget-minded commuter tire shoppers comparing 195/65R15 options",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "bfgoodrich-ko2-265-70r17",
    brand: "BFGoodrich",
    model: "All-Terrain T/A KO2",
    size: "265/70R17",
    category: "All-terrain truck",
    position: "all-terrain",
    bestFor: "Tacoma, Jeep, and light-truck shoppers comparing all-terrain tire deals",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "falken-wildpeak-at4w-265-70r17",
    brand: "Falken",
    model: "Wildpeak A/T4W",
    size: "265/70R17",
    category: "All-terrain truck",
    position: "all-terrain",
    bestFor: "265/70R17 all-terrain searches for towing, winter, and truck stance",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "mickey-thompson-baja-boss-at-265-60r18",
    brand: "Mickey Thompson",
    model: "Baja Boss A/T",
    size: "265/60R18",
    category: "Rugged all-terrain truck",
    position: "all-terrain",
    bestFor: "265/60R18 truck and SUV shoppers comparing rugged all-terrain Tire Rack pricing",
    price: 295.49,
    priceCurrency: "USD",
    priceSnapshot: "$295.49 at Tire Rack",
    sku: "66TR8BBATXL",
    cjsku: "66TR8BBATXL",
    tireRackUrl: "https://www.anrdoezrs.net/click-101740681-13697786?url=https%3A%2F%2Fwww.tirerack.com%2Ftires%2Ftires.jsp%3FtireMake%3DMickey+Thompson%26tireModel%3DBaja+Boss+A%2FT%26partnum%3D66TR8BBATXL%26GCID%3DC13674x012-tire%26KEYWORD%3Dtires.jsp_Mickey+Thompson_Baja+Boss+A%2FT_Tire%26code%3Dyes&cjsku=66TR8BBATXL",
    image: "https://www.tirerack.com/content/dam/tires/mickey_thompson/mt_baja_boss_at_full.jpg"
  },
  {
    id: "goodyear-wrangler-workhorse-at-275-60r20",
    brand: "Goodyear",
    model: "Wrangler Workhorse AT",
    size: "275/60R20",
    category: "All-terrain truck",
    position: "all-terrain",
    bestFor: "F-150 and full-size truck shoppers comparing 275/60R20 all-terrain options",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "cooper-discoverer-at3-4s-275-60r20",
    brand: "Cooper",
    model: "Discoverer AT3 4S",
    size: "275/60R20",
    category: "All-terrain truck",
    position: "all-terrain",
    bestFor: "Daily-driven trucks needing all-terrain traction without giving up highway comfort",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "pirelli-scorpion-all-season-plus-3-255-55r20",
    brand: "Pirelli",
    model: "Scorpion All Season Plus 3",
    size: "255/55R20",
    category: "SUV touring all-season",
    position: "all-season",
    bestFor: "255/55R20 SUV tire searches for quiet ride, wet grip, and long-wear touring",
    priceSnapshot: "Live price at retailer checkout"
  },
  {
    id: "continental-crosscontact-lx25-255-55r20",
    brand: "Continental",
    model: "CrossContact LX25",
    size: "255/55R20",
    category: "SUV touring all-season",
    position: "all-season",
    bestFor: "SUV shoppers comparing 255/55R20 comfort, wet braking, and touring value",
    priceSnapshot: "Live price at retailer checkout"
  }
];

function encode(value = "") {
  return encodeURIComponent(String(value || "").trim());
}

export function sizeToSlug(size = "") {
  const normalized = normalizeTireSize(size);
  return normalized || String(size || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function normalizeSize(size = "") {
  return sizeToSlug(size);
}

export function slugToSize(slug = "") {
  return formatTireSize(slug);
}

function normalizedProductSize(product) {
  return normalizeSize(product?.size || "");
}

function intentMatchesProduct(product, intent = "") {
  const normalizedIntent = String(intent || "").toLowerCase();
  if (!normalizedIntent || normalizedIntent === "best" || normalizedIntent === "price" || normalizedIntent === "comparison") {
    return true;
  }

  if (normalizedIntent === "budget") {
    return true;
  }

  if (normalizedIntent === "commercial") {
    return `${product.category} ${product.position}`.toLowerCase().includes("commercial");
  }

  if (["steer", "drive", "trailer"].includes(normalizedIntent)) {
    const position = String(product.position || "").toLowerCase();
    const category = String(product.category || "").toLowerCase();
    return position === normalizedIntent && category.includes("commercial");
  }

  const haystack = [
    product.position,
    product.category,
    product.bestFor
  ].join(" ").toLowerCase();

  return haystack.includes(normalizedIntent);
}

export function validateProductForPage(product, pageContext = {}) {
  if (!product) return false;

  const expectedSize = pageContext.size ? normalizeSize(pageContext.size) : "";
  if (expectedSize && normalizedProductSize(product) !== expectedSize) {
    return false;
  }

  if (pageContext.commercialOnly && !`${product.category} ${product.position}`.toLowerCase().includes("commercial")) {
    return false;
  }

  if (pageContext.intent && !intentMatchesProduct(product, pageContext.intent)) {
    return false;
  }

  if (pageContext.position && String(product.position || "").toLowerCase() !== String(pageContext.position).toLowerCase()) {
    return false;
  }

  return true;
}

function parseSize(size = "") {
  const parsed = parseTireSize(size);
  if (!parsed || parsed.commercial) return { formatted: parsed?.display || slugToSize(size), width: "", ratio: "", diameter: "" };

  return {
    formatted: parsed.display,
    width: parsed.width,
    ratio: parsed.aspectRatio,
    diameter: parsed.rimDiameter
  };
}

function buildTireRackFallbackSearchUrl(query = "") {
  const destination = `https://www.tirerack.com/tires/index.jsp?search=${encode(query || "tires")}`;
  return `${tireRackClickBase}?url=${encodeURIComponent(destination)}`;
}

export function buildTireRackUrl({ query = "", size = "" } = {}) {
  if (tireRackTemplate) {
    const parsed = parseSize(size);

    if (!parsed.width || !parsed.ratio || !parsed.diameter) {
      if (tireRackTemplate === defaultTireRackTemplate) {
        return buildTireRackFallbackSearchUrl(query);
      }

      return tireRackTemplate
        .replaceAll("{query}", encode(query))
        .replaceAll("{rawQuery}", query)
        .replaceAll("{size}", encode(parsed.formatted || size))
        .replaceAll("{rawSize}", parsed.formatted || size);
    }

    return tireRackTemplate
      .replaceAll("{query}", encode(query))
      .replaceAll("{rawQuery}", query)
      .replaceAll("{size}", encode(parsed.formatted || size))
      .replaceAll("{rawSize}", parsed.formatted || size)
      .replaceAll("{width}", parsed.width)
      .replaceAll("{ratio}", parsed.ratio)
      .replaceAll("{aspectRatio}", parsed.ratio)
      .replaceAll("{diameter}", parsed.diameter);
  }

  return tireRackQuickLink;
}

export function buildAmazonUrl({ query = "" } = {}) {
  const params = new URLSearchParams({ k: query || "tires" });
  if (amazonTag) {
    params.set("tag", amazonTag);
  }
  return `https://www.amazon.com/s?${params.toString()}`;
}

export function buildSimpleTireUrl({ query = "", size = "" } = {}) {
  const parsed = parseTireSize(size);
  if (parsed?.display) {
    return `${simpleTireBase}/${encode(parsed.display.toLowerCase().replace("/", "-").replace("r", "-r"))}`;
  }
  return `${simpleTireBase}?q=${encode(query || "tires")}`;
}

export function buildPriorityTireUrl({ query = "", size = "" } = {}) {
  const search = parseTireSize(size)?.display || query || "tires";
  return `${priorityTireBase}?q=${encode(search)}`;
}

export function buildMavisUrl({ query = "", size = "" } = {}) {
  return mavisQuickLink || `https://www.mavis.com/search?q=${encode(parseTireSize(size)?.display || query || "tires")}`;
}

export function getMerchantOffers(product) {
  const query = `${product.brand} ${product.model} ${product.size} tire`.trim();
  const tireRackUrl = product.tireRackUrl || buildTireRackUrl({ query, size: product.size });
  const offers = [];

  if (tireRackUrl) {
    offers.push({
      merchant: "Tire Rack",
      label: typeof product.price === "number" ? "Check Tire Rack Price" : "Check Tire Rack Price",
      href: tireRackUrl,
      type: "primary",
      note: "Tire-focused retailer"
    });
  }

  offers.push({
    merchant: "SimpleTire",
    label: "Compare SimpleTire",
    href: buildSimpleTireUrl({ query, size: product.size }),
    type: tireRackUrl ? "secondary" : "primary",
    note: "Online tire retailer"
  });

  offers.push({
    merchant: "Priority Tire",
    label: "See Priority Tire",
    href: buildPriorityTireUrl({ query, size: product.size }),
    type: "secondary",
    note: "Value-focused tire retailer"
  });

  offers.push({
    merchant: "Mavis",
    label: "Installed at Mavis",
    href: buildMavisUrl({ query, size: product.size }),
    type: tireRackUrl ? "secondary" : "primary",
    note: "Installed and local service"
  });

  offers.push({
    merchant: "Amazon",
    label: "Search Amazon",
    href: buildAmazonUrl({ query }),
    type: "secondary",
    note: "Marketplace selection"
  });

  return offers;
}

export function getProducts({ size = "", intent = "", commercialOnly = false, limit = 24 } = {}) {
  const normalizedSize = size ? slugToSize(sizeToSlug(size)).toLowerCase() : "";
  const normalizedIntent = String(intent || "").toLowerCase();

  return productCatalog
    .filter((product) => {
      if (commercialOnly && !product.category.toLowerCase().includes("commercial")) {
        return false;
      }
      if (normalizedSize && product.size.toLowerCase() !== normalizedSize) {
        return false;
      }
      if (normalizedIntent && ![product.position, product.category, product.bestFor].join(" ").toLowerCase().includes(normalizedIntent)) {
        return false;
      }
      return true;
    })
    .slice(0, limit);
}

export function getStrictProducts({ size = "", intent = "", commercialOnly = false, position = "", limit = 24 } = {}) {
  return productCatalog
    .filter((product) => validateProductForPage(product, { size, intent, commercialOnly, position }))
    .slice(0, limit);
}

export function getRelatedProducts({ size = "", commercialOnly = false, limit = 8 } = {}) {
  const normalizedCurrent = normalizeSize(size);
  const commercialPage = commercialOnly || isCommercialTireSize(size);
  const relatedSizeSet = new Set(getRelatedSizes({
    currentSize: size,
    sizes: tireSizes,
    type: commercialPage ? "commercial" : "passenger",
    limit: Math.max(limit * 3, 12)
  }).map((relatedSize) => normalizeSize(relatedSize)));
  const relatedSizeOrder = [...relatedSizeSet];
  const seenSizes = new Set();

  return productCatalog
    .filter((product) => normalizedProductSize(product) !== normalizedCurrent)
    .filter((product) => {
      const isCommercialProduct = `${product.category} ${product.position}`.toLowerCase().includes("commercial") || isCommercialTireSize(product.size);
      return commercialPage ? isCommercialProduct : !isCommercialProduct;
    })
    .filter((product) => relatedSizeSet.size ? relatedSizeSet.has(normalizedProductSize(product)) : true)
    .filter((product) => {
      const productSize = normalizedProductSize(product);
      if (seenSizes.has(productSize)) return false;
      seenSizes.add(productSize);
      return true;
    })
    .sort((a, b) => relatedSizeOrder.indexOf(normalizedProductSize(a)) - relatedSizeOrder.indexOf(normalizedProductSize(b)))
    .slice(0, limit);
}

export function getFallbackProducts(size = "", intent = "") {
  const exact = getProducts({ size, intent, limit: 24 });
  if (exact.length) {
    return exact;
  }

  const normalizedIntent = String(intent || "").toLowerCase();
  if (["steer", "drive", "trailer", "commercial", "truck"].some((item) => normalizedIntent.includes(item))) {
    return getProducts({ commercialOnly: true, limit: 12 });
  }

  return productCatalog.slice(0, 12);
}

export function searchProducts(query = "", limit = 24) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  if (!normalizedQuery) {
    return productCatalog.slice(0, limit);
  }

  const exactSize = getProducts({ size: normalizedQuery, limit });
  if (exactSize.length) {
    return exactSize;
  }

  if (/\b(semi|commercial|tractor|trailer|fleet|18 wheeler|steer|drive)\b/.test(normalizedQuery)) {
    if (normalizedQuery.includes("steer")) {
      return getProducts({ intent: "steer", commercialOnly: true, limit });
    }
    if (normalizedQuery.includes("drive")) {
      return getProducts({ intent: "drive", commercialOnly: true, limit });
    }
    if (normalizedQuery.includes("trailer")) {
      return getProducts({ intent: "trailer", commercialOnly: true, limit });
    }
    return getProducts({ commercialOnly: true, limit });
  }

  const terms = normalizedQuery
    .replace(/[^\w./-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const scored = productCatalog
    .map((product) => {
      const haystack = [
        product.brand,
        product.model,
        product.size,
        product.category,
        product.position,
        product.bestFor
      ].join(" ").toLowerCase();

      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  if (scored.length) {
    return scored.slice(0, limit);
  }

  return getFallbackProducts(normalizedQuery, normalizedQuery).slice(0, limit);
}

export function getRelatedSizeLinks(currentSize = "") {
  const type = isCommercialTireSize(currentSize) ? "commercial" : "passenger";
  return getRelatedSizes({ currentSize, sizes: tireSizes, type, limit: 8 })
    .map((size) => ({
      href: `/tires/${sizeToSlug(size)}`,
      label: `${size} tires`
    }));
}

export function getRelatedSizeCards(currentSize = "", { type = "", limit = 6 } = {}) {
  const pageType = type || (isCommercialTireSize(currentSize) ? "commercial" : "passenger");
  return getRelatedSizes({ currentSize, sizes: tireSizes, type: pageType, limit })
    .map((size) => ({
      size,
      href: `/tires/${sizeToSlug(size)}`,
      badge: pageType === "commercial" ? "Related Commercial Size" : "Related Size",
      use: pageType === "commercial" ? "Commercial truck tire alternative" : "Common passenger, SUV, or pickup replacement size",
      note: pageType === "commercial"
        ? "Confirm axle position, load range, casing, and application before purchase."
        : "Shown for browsing only. Confirm the exact size on your vehicle placard or retailer site."
    }));
}

export function vehicleSlug(value = "") {
  return String(value || "").toLowerCase().replace(/\s+/g, "-");
}

export function getVehicleFitment({ make = "", model = "", year = "" } = {}) {
  const normalized = {
    make: vehicleSlug(make),
    model: vehicleSlug(model),
    year: String(year || "")
  };

  return vehicleFitments.find((fitment) =>
    fitment.make === normalized.make &&
    fitment.model === normalized.model &&
    fitment.year === normalized.year
  );
}
