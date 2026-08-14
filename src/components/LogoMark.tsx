/** Soft monogram logo: Z & W */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Z and W wedding monogram"
    >
      <defs>
        <linearGradient id="logoStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b08d57" />
          <stop offset="50%" stopColor="#d8c3a0" />
          <stop offset="100%" stopColor="#8f7348" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="url(#logoStroke)"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="url(#logoStroke)"
        strokeWidth="0.6"
        opacity="0.45"
      />
      <text
        x="60"
        y="52"
        textAnchor="middle"
        fill="url(#logoStroke)"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="600"
        letterSpacing="1"
      >
        Z
      </text>
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="#a8906c"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="14"
        fontStyle="italic"
      >
        &amp;
      </text>
      <text
        x="60"
        y="92"
        textAnchor="middle"
        fill="url(#logoStroke)"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="600"
        letterSpacing="1"
      >
        W
      </text>
    </svg>
  )
}
