import { buildGoUrl } from "./redirects.js";

const tireRackClickBase = process.env.TSE_TIRE_RACK_CJ_CLICK_BASE || "https://www.anrdoezrs.net/click-101740681-13697786";

function tireRackSpecialOfferUrl(promoId = "") {
  const destination = `https://www.tirerack.com/specialoffers/details.jsp?promoID=${encodeURIComponent(promoId)}`;
  return `${tireRackClickBase}?url=${encodeURIComponent(destination)}`;
}

function trackedOfferUrl(offer, placement = "tire-rack-specials") {
  return buildGoUrl({
    merchant: "Tire Rack",
    href: tireRackSpecialOfferUrl(offer.promoId),
    placement,
    tireSize: offer.brand
  });
}

export const tireRackSpecialOffers = [
  {
    promoId: "IRS38",
    brand: "Pirelli",
    title: "Pirelli P Zero Trofeo Track Tires",
    savings: "$100 instant savings",
    expires: "Ends June 30",
    type: "Tire instant savings",
    image: "https://www.tirerack.com/images/promos/retail/2026/pi/04/IRS38_550x470R.png"
  },
  {
    promoId: "CP617",
    brand: "Cooper",
    title: "Select Cooper Tires",
    savings: "$70 back",
    expires: "Ends June 30",
    type: "Tire rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/coop/03/CP617_550x470R.png"
  },
  {
    promoId: "P681",
    brand: "Pirelli",
    title: "Select Pirelli Tires",
    savings: "$100 rebate",
    expires: "Ends June 30",
    type: "Tire rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/pi/06/P681_550x470R.png"
  },
  {
    promoId: "G626",
    brand: "Goodyear",
    title: "Select Goodyear Tires",
    savings: "Up to $80 back",
    expires: "Ends June 30",
    type: "Tire rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/gy/03/G628_550x470R.png"
  },
  {
    promoId: "C641",
    brand: "Continental",
    title: "Select Continental Tires",
    savings: "$110 prepaid Mastercard",
    expires: "Ends June 30",
    type: "Tire rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/co/06/C641_550x470R.png"
  },
  {
    promoId: "IRS75",
    brand: "Pirelli",
    title: "Select Pirelli Tires",
    savings: "$100 instant savings",
    expires: "Ends June 27",
    type: "Tire instant savings",
    image: "https://www.tirerack.com/images/promos/retail/2026/pi/06/IRS75_550x470R.png"
  },
  {
    promoId: "IRS78",
    brand: "Vredestein",
    title: "Select Vredestein Tires",
    savings: "$80 instant savings",
    expires: "Ends June 29",
    type: "Tire instant savings",
    image: "https://www.tirerack.com/images/promos/retail/2026/vr/06/IRS78_550x470R.png"
  },
  {
    promoId: "IRS42",
    brand: "Dunlop",
    title: "Dunlop Blue Response A/S Tires",
    savings: "$100 instant savings",
    expires: "Ends June 30",
    type: "Tire instant savings",
    image: "https://www.tirerack.com/images/promos/retail/2026/dun/05/IRS42_550x470R.png"
  },
  {
    promoId: "M681",
    brand: "Michelin",
    title: "Michelin Pilot Sport 4S Tires",
    savings: "$100 prepaid Mastercard",
    expires: "See Tire Rack",
    type: "Tire rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/mi/06/M681_550x470R.png"
  },
  {
    promoId: "MT621",
    brand: "Mickey Thompson",
    title: "Mickey Thompson Tires",
    savings: "$100 back",
    expires: "See Tire Rack",
    type: "Online rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/mt/06/MT621_550x470R.png"
  },
  {
    promoId: "IRS56",
    brand: "Bridgestone",
    title: "Bridgestone Dueler LX Tires",
    savings: "$80 instant savings",
    expires: "Ends June 29",
    type: "Tire instant savings",
    image: "https://www.tirerack.com/images/promos/retail/2026/bs/06/IRS56_550x470R.png"
  },
  {
    promoId: "W621",
    brand: "Enkei",
    title: "Enkei RPF1 & RPT1 Wheels",
    savings: "Special pricing",
    expires: "See Tire Rack",
    type: "Wheel offer",
    image: "https://www.tirerack.com/images/promos/retail/2026/en/06/W621_550x470R.png"
  },
  {
    promoId: "A651",
    brand: "Hawk",
    title: "All Hawk Products",
    savings: "10% off",
    expires: "See Tire Rack",
    type: "Parts offer",
    image: "https://www.tirerack.com/images/promos/retail/2026/hawk/06/A651_550x470R.png"
  },
  {
    promoId: "A641",
    brand: "Street Plus",
    title: "Street Plus Brake Pads",
    savings: "10% off",
    expires: "Ends June 30",
    type: "Parts offer",
    image: "https://www.tirerack.com/images/promos/retail/2026/stp/05/A641_550x470R.png"
  },
  {
    promoId: "I660",
    brand: "H&R",
    title: "H&R Suspension Products",
    savings: "10% off",
    expires: "Ends June 30",
    type: "Suspension offer",
    image: "https://www.tirerack.com/images/promos/retail/2026/hr/05/I660_550x470R.png"
  },
  {
    promoId: "I622",
    brand: "KONI",
    title: "KONI Shock Value Sale",
    savings: "20% off",
    expires: "Ends June 30",
    type: "Suspension offer",
    image: "https://www.tirerack.com/images/promos/retail/2026/koni/03/I622_550x470R.png"
  },
  {
    promoId: "I681",
    brand: "Fox",
    title: "Fox Suspension Products",
    savings: "10% off",
    expires: "Ends July 6",
    type: "Suspension offer",
    image: "https://www.tirerack.com/images/promos/retail/2026/fx/06/I681_550x470R.png"
  },
  {
    promoId: "I677",
    brand: "ACCESS",
    title: "ACCESS Covers and Accessories",
    savings: "$75 prepaid card",
    expires: "See Tire Rack",
    type: "Accessory rebate",
    image: "https://www.tirerack.com/images/promos/retail/2026/ac/06/I677_550x470R.png"
  }
].map((offer) => ({
  ...offer,
  href: trackedOfferUrl(offer, `tire-rack-special-${offer.promoId.toLowerCase()}`)
}));

export function getTireRackSpecialOffers(limit = tireRackSpecialOffers.length) {
  return tireRackSpecialOffers.slice(0, limit);
}
