import { useId } from 'react'

/** Soft monogram logo: Z & W */
export function LogoMark({
  className = '',
  contrast = false,
}: {
  className?: string
  contrast?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const gradId = `logoStroke-${uid}`

  return (
    <svg
      className={`logo-mark${contrast ? ' logo-mark--contrast' : ''} ${className}`.trim()}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Z and W wedding monogram"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8f7348" />
          <stop offset="45%" stopColor="#b08d57" />
          <stop offset="100%" stopColor="#6e5735" />
        </linearGradient>
      </defs>
      {contrast ? (
        <circle cx="60" cy="60" r="58" fill="rgba(255,252,247,0.92)" />
      ) : null}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill={contrast ? 'rgba(255,252,247,0.96)' : 'none'}
        stroke={`url(#${gradId})`}
        strokeWidth="2"
      />
      <circle
        cx="60"
        cy="60"
        r="47"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="0.8"
        opacity="0.55"
      />
      <text
        x="60"
        y="50"
        textAnchor="middle"
        fill={`url(#${gradId})`}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
      >
        Z
      </text>
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="#7a6240"
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
        fill={`url(#${gradId})`}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontWeight="700"
      >
        W
      </text>
    </svg>
  )
}
