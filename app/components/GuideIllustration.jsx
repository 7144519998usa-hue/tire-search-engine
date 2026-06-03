import TireCategoryImage from "./TireCategoryImage";

const guideTypeMap = {
  commercial: "drive",
  ev: "ev",
  buying: "passenger",
  basics: "tread",
  default: "tread"
};

export default function GuideIllustration({ group = "", title = "" }) {
  const key = String(group || "").toLowerCase();
  const type = key.includes("commercial")
    ? guideTypeMap.commercial
    : key.includes("ev")
      ? guideTypeMap.ev
      : key.includes("buying")
        ? guideTypeMap.buying
        : guideTypeMap.default;

  return <TireCategoryImage type={type} alt={`${title || group} tire education visual`} />;
}
