import { getBrandPageBySlug, siteUrl } from "./siteData";

export const truckCoreHubs = [
  {
    slug: "truck-tires",
    title: "Truck Tires",
    heroTitle: "Truck tires for pickups, work trucks, regional fleets, and heavy-duty replacement planning.",
    description:
      "Truck tire hub for buyers comparing applications, commercial sizes, and route-specific replacement paths without turning the public brand into a truck-only identity.",
    eyebrow: "Truck and commercial",
    summary:
      "A broad truck hub connecting pickup, vocational, and commercial truck tire demand into stronger downstream money pages.",
    childLinks: ["steer", "drive", "trailer", "11r22-5", "295-75r22-5", "long-haul", "regional"],
  },
  {
    slug: "commercial-truck-tires",
    title: "Commercial Truck Tires",
    heroTitle: "Commercial truck tires for fleets, owner-operators, and heavy-duty replacement cycles.",
    description:
      "Commercial truck tire hub covering major heavy-duty sizes, applications, fleet buying paths, and compliance-oriented research.",
    eyebrow: "Commercial truck",
    summary:
      "High-value commercial truck hub focused on freight, fleet, and owner-operator shopping paths.",
    childLinks: ["steer", "drive", "trailer", "long-haul", "regional", "mixed-service", "295-75r22-5", "11r22-5"],
  },
  {
    slug: "semi-truck-tires",
    title: "Semi Truck Tires",
    heroTitle: "Semi truck tires for long-haul, regional, and trailer replacement planning.",
    description:
      "Semi truck tire hub for tractor-trailer applications, common heavy-duty sizes, and revenue-focused replacement paths.",
    eyebrow: "Semi truck",
    summary:
      "Connects semi-truck demand into steer, drive, trailer, and route-specific truck tire pages.",
    childLinks: ["steer", "drive", "trailer", "long-haul", "regional", "295-75r22-5"],
  },
  {
    slug: "trailer-tires",
    title: "Trailer Tires",
    heroTitle: "Trailer tires for fleets comparing durability, casing life, and route-specific replacement options.",
    description:
      "Trailer tire hub for fleet buyers comparing heavy-duty trailer positions, common sizes, and road-duty applications.",
    eyebrow: "Trailer position",
    summary:
      "Supports high-intent trailer tire traffic under the broader marketplace brand.",
    childLinks: ["295-75r22-5", "11r22-5", "long-haul", "regional"],
  },
  {
    slug: "steer-tires",
    title: "Steer Tires",
    heroTitle: "Steer tires for fleets and owner-operators comparing wear control, fuel economy, and highway stability.",
    description:
      "Steer tire hub linking heavy-duty position demand to approved truck size and application pages.",
    eyebrow: "Steer position",
    summary:
      "Steer-tire landing page built for long-haul and regional commercial buying paths.",
    childLinks: ["11r22-5", "295-75r22-5", "long-haul", "regional"],
  },
  {
    slug: "drive-tires",
    title: "Drive Tires",
    heroTitle: "Drive tires for traction, mileage, and commercial replacement planning across freight applications.",
    description:
      "Drive tire hub for route-specific truck traffic, traction-focused pages, and truck-size monetization blocks.",
    eyebrow: "Drive position",
    summary:
      "Supports regional, mixed-service, and long-haul truck replacement demand.",
    childLinks: ["11r22-5", "295-75r22-5", "long-haul", "mixed-service"],
  },
  {
    slug: "all-position-truck-tires",
    title: "All-Position Truck Tires",
    heroTitle: "All-position truck tires for mixed fleets and buyers who need versatile heavy-duty coverage.",
    description:
      "All-position truck tire hub supporting broad fleet replacement paths and cross-application truck pages.",
    eyebrow: "All-position",
    summary:
      "Helps mixed-duty buyers compare flexible commercial truck replacements.",
    childLinks: ["295-75r22-5", "regional", "mixed-service"],
  },
  {
    slug: "long-haul-truck-tires",
    title: "Long-Haul Truck Tires",
    heroTitle: "Long-haul truck tires for fuel economy, casing life, and interstate replacement cycles.",
    description:
      "Long-haul truck tire hub targeting freight-route demand with size and position intersections.",
    eyebrow: "Long-haul",
    summary:
      "High-value long-haul truck landing page for fleet and owner-operator conversions.",
    childLinks: ["steer", "drive", "trailer", "11r22-5", "295-75r22-5"],
  },
  {
    slug: "regional-truck-tires",
    title: "Regional Truck Tires",
    heroTitle: "Regional truck tires for stop-and-go routes, scrub resistance, and durable replacement planning.",
    description:
      "Regional truck tire hub for route-specific demand tied to application and size intersections.",
    eyebrow: "Regional",
    summary:
      "Built for regional fleet demand without overpowering the public marketplace identity.",
    childLinks: ["steer", "drive", "trailer", "11r22-5", "295-75r22-5"],
  },
  {
    slug: "mixed-service-truck-tires",
    title: "Mixed-Service Truck Tires",
    heroTitle: "Mixed-service truck tires for fleets balancing highway wear, traction, and vocational durability.",
    description:
      "Mixed-service truck tire hub for construction, vocational, and route-flexible heavy-duty demand.",
    eyebrow: "Mixed service",
    summary:
      "Supports vocational and mixed-duty commercial truck monetization paths.",
    childLinks: ["drive", "all-position", "11r22-5", "295-75r22-5"],
  },
];

export const approvedTruckSizes = [
  {
    slug: "11r22-5",
    size: "11R22.5",
    title: "11R22.5 Truck Tires",
    summary:
      "A core heavy-duty truck size used in long-haul and regional fleets comparing durability, retread value, and cost per mile.",
    applications: ["long-haul", "regional", "mixed-service"],
    positions: ["steer", "drive", "trailer", "all-position"],
    leadLabel: "Get fleet pricing for 11R22.5 tires",
  },
  {
    slug: "295-75r22-5",
    size: "295/75R22.5",
    title: "295/75R22.5 Truck Tires",
    summary:
      "A high-intent truck size for fleets and owner-operators comparing casing durability, fuel efficiency, and route-specific fit.",
    applications: ["long-haul", "regional", "mixed-service"],
    positions: ["steer", "drive", "trailer", "all-position"],
    leadLabel: "Request quotes for 295/75R22.5 tires",
  },
  {
    slug: "11r24-5",
    size: "11R24.5",
    title: "11R24.5 Truck Tires",
    summary:
      "A heavy-duty replacement size for long-haul and linehaul fleets focusing on uptime, wear resistance, and casing life.",
    applications: ["long-haul", "regional"],
    positions: ["steer", "drive", "trailer"],
    leadLabel: "Talk with a fleet tire specialist",
  },
];

export const truckApplications = [
  {
    slug: "long-haul",
    title: "Long-Haul Truck Tires",
    summary:
      "Long-haul truck pages prioritize fuel economy, casing life, and stable interstate wear patterns.",
    monetizationLabel: "Request long-haul fleet pricing",
  },
  {
    slug: "regional",
    title: "Regional Truck Tires",
    summary:
      "Regional truck pages support route-stop wear, scrub resistance, and balanced casing value.",
    monetizationLabel: "Compare regional truck tire programs",
  },
  {
    slug: "mixed-service",
    title: "Mixed-Service Truck Tires",
    summary:
      "Mixed-service truck pages support vocational and multi-route replacement demand where durability and versatility matter.",
    monetizationLabel: "Get mixed-service tire recommendations",
  },
];

export const truckPositions = [
  {
    slug: "steer",
    title: "Steer Tires",
    summary:
      "Steer tire pages support straight-tracking, wear control, and long-haul or regional front-axle replacement planning.",
  },
  {
    slug: "drive",
    title: "Drive Tires",
    summary:
      "Drive tire pages support traction, mileage, and heavy-duty route-specific replacement decisions.",
  },
  {
    slug: "trailer",
    title: "Trailer Tires",
    summary:
      "Trailer tire pages support casing value, scrub resistance, and fleet replacement planning.",
  },
  {
    slug: "all-position",
    title: "All-Position Truck Tires",
    summary:
      "All-position pages support mixed fleets comparing versatile heavy-duty tire options.",
  },
];

export const approvedTruckBrandPages = [
  {
    brandSlug: "michelin",
    title: "Michelin Truck Tires",
    summary:
      "Michelin truck tire page supporting premium long-haul, regional, and fleet-focused comparison demand.",
  },
  {
    brandSlug: "goodyear",
    title: "Goodyear Truck Tires",
    summary:
      "Goodyear truck tire page supporting mainstream commercial and mixed-duty truck replacement paths.",
  },
  {
    brandSlug: "bridgestone",
    title: "Bridgestone Truck Tires",
    summary:
      "Bridgestone truck tire page linking brand demand into commercial truck categories and fleet intent.",
  },
];

function bySlug(items, slug) {
  return items.find((item) => item.slug === slug) || null;
}

export function getTruckHubBySlug(slug) {
  return bySlug(truckCoreHubs, slug);
}

export function getTruckSizeBySlug(slug) {
  return bySlug(approvedTruckSizes, slug);
}

export function getTruckApplicationBySlug(slug) {
  return bySlug(truckApplications, slug);
}

export function getTruckPositionBySlug(slug) {
  return bySlug(truckPositions, slug);
}

export function getApprovedTruckBrandPage(brandSlug) {
  const page = approvedTruckBrandPages.find((item) => item.brandSlug === brandSlug);
  const brand = getBrandPageBySlug(brandSlug);

  if (!page || !brand) {
    return null;
  }

  return {
    ...page,
    brand,
  };
}

export function getApprovedTruckIntersections() {
  return approvedTruckSizes.flatMap((size) =>
    size.applications.map((applicationSlug) => ({
      sizeSlug: size.slug,
      applicationSlug,
    }))
  );
}

export function getTruckPageLeadCard(entity) {
  return {
    heading: entity.leadLabel || entity.monetizationLabel || "Request fleet pricing",
    body:
      "Use this truck page to compare commercial options, request pricing, and continue into fleet-focused buying paths from the same marketplace experience.",
    ctaLabel: "Request fleet pricing",
    ctaHref: "/contact/fleet-quotes",
  };
}

export function buildTruckCollectionSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteUrl}${path}`,
  };
}
