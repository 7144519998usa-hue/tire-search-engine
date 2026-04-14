export const editorialTeam = {
  leadWriter: {
    name: "TireSearchEngine Editorial Team",
    role: "Editorial research and comparison desk",
  },
  reviewer: {
    name: "TireSearchEngine Standards Review",
    role: "Methodology and commerce review",
  },
};

export const defaultTrustStats = [
  { label: "Updated", value: "This month" },
  { label: "Approach", value: "Comparison-first" },
  { label: "Focus", value: "US tire buyers" },
];

export function getDisclosureCopy(type = "affiliate") {
  if (type === "lead-gen") {
    return "Lead-gen page: quote requests may be shared with matching commercial partners.";
  }

  if (type === "advertiser") {
    return "Advertiser disclosure: placements may be influenced by commercial relationships.";
  }

  return "Affiliate disclosure: TireSearchEngine may earn a commission when you click through to certain partners.";
}
