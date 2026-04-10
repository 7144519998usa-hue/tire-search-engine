import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo-lockup" aria-label="TireSearchEngine home">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 88 88" role="img">
          <defs>
            <linearGradient id="tse-tread" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc8f54" />
              <stop offset="100%" stopColor="#d44a24" />
            </linearGradient>
          </defs>
          <circle cx="44" cy="44" r="39" fill="#102824" />
          <circle cx="44" cy="44" r="22" fill="#f4ead8" />
          <path
            d="M44 9a35 35 0 0 1 0 70"
            fill="none"
            stroke="url(#tse-tread)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M20 22 34 33M16 39l19 7M16 55l19-6M20 67l14-11M68 22 54 33M72 39l-19 7M72 55l-19-6M68 67 54 56"
            fill="none"
            stroke="#f4ead8"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="44" cy="44" r="9" fill="#102824" />
        </svg>
      </span>
      <span className="logo-type">
        <strong>TireSearchEngine</strong>
        <small>Organic tire traffic into affiliate revenue</small>
      </span>
    </Link>
  );
}
