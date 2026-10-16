import React from 'react';

/**
 * Monoline enterprise SVG icons with restrained geometry.
 * All icons are decorative and marked aria-hidden="true".
 */
export function OfferingIcon({ name, className = '' }) {
  const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `ep-icon ${className}`.trim(),
    'aria-hidden': 'true',
    focusable: 'false',
  };

  switch (name) {
    // Services / Capabilities
    case 'ai-mvp-development':
      return (
        <svg {...iconProps}>
          <rect x="3" y="4" width="6" height="6" rx="1" />
          <rect x="15" y="14" width="6" height="6" rx="1" />
          <path d="M9 7h3a2 2 0 0 1 2 2v5" className="ep-icon-path" />
          <circle cx="18" cy="7" r="2" className="ep-icon-node" />
        </svg>
      );

    case 'ai-enablement-advisory':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="12 4 14.5 9.5 20 12 14.5 14.5 12 20 9.5 14.5 4 12 9.5 9.5 12 4" className="ep-icon-needle" />
          <circle cx="12" cy="12" r="1.5" className="ep-icon-node" />
        </svg>
      );

    case 'business-transformation':
      return (
        <svg {...iconProps}>
          <path d="M4 17l6-6-6-6" />
          <path d="M12 19h8" />
          <path d="M14 5h6" />
          <circle cx="18" cy="12" r="2.5" className="ep-icon-node" />
          <path d="M10 12h5" className="ep-icon-path" />
        </svg>
      );

    case 'ai-strategy-governance':
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" className="ep-icon-path" />
        </svg>
      );

    // Products
    case 'kinlu':
      return (
        <svg {...iconProps}>
          <path d="M3 20h18" />
          <path d="M4 16l5-5 4 4 7-9" className="ep-icon-path" />
          <circle cx="20" cy="6" r="2" className="ep-icon-node" />
        </svg>
      );

    case 'artifex':
      return (
        <svg {...iconProps}>
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <circle cx="12" cy="13" r="3" className="ep-icon-path" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <circle cx="17.5" cy="9.5" r="1" className="ep-icon-node" />
        </svg>
      );

    case 'numaya':
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.5 10.8l7-3.6" className="ep-icon-path" />
          <path d="M8.5 13.2l7 3.6" className="ep-icon-path" />
        </svg>
      );

    // Case Studies
    case 'cleanroom-ems':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 3" className="ep-icon-needle" />
          <path d="M4 12h2" />
          <path d="M18 12h2" />
          <path d="M12 4v2" />
          <path d="M12 18v2" />
        </svg>
      );

    case 'teachmeback':
      return (
        <svg {...iconProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <circle cx="12" cy="10" r="1.5" className="ep-icon-node" />
          <path d="M12 6v2" className="ep-icon-path" />
          <path d="M12 12v2" className="ep-icon-path" />
        </svg>
      );

    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
  }
}
