import React from 'react'

const Logo = ({
    variant = 'main',
    width = 200,
    height = 60,
    className = '',
    onClick = null,
}) => {
    const logos = {
        main: (
            <svg
                width={width}
                height={height}
                viewBox="0 0 200 60"
                className={className}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            >
                <defs>
                    <linearGradient
                        id="logoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#e50914" />
                        <stop offset="100%" stopColor="#b20710" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <rect
                    x="0"
                    y="15"
                    width="4"
                    height="30"
                    fill="url(#logoGradient)"
                    rx="2"
                />
                <text
                    x="15"
                    y="40"
                    fontFamily="Arial Black, sans-serif"
                    fontSize="28"
                    fontWeight="900"
                    fill="url(#logoGradient)"
                    filter="url(#glow)"
                >
                    StreamFlix
                </text>
                <circle cx="175" cy="30" r="12" fill="#e50914" opacity="0.8" />
                <polygon points="170,25 170,35 178,30" fill="white" />
            </svg>
        ),

        compact: (
            <svg
                width={width}
                height={height}
                viewBox="0 0 120 40"
                className={className}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            >
                <defs>
                    <linearGradient
                        id="compactGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#e50914" />
                        <stop offset="100%" stopColor="#b20710" />
                    </linearGradient>
                </defs>
                <rect
                    x="0"
                    y="10"
                    width="3"
                    height="20"
                    fill="url(#compactGradient)"
                    rx="1.5"
                />
                <text
                    x="10"
                    y="27"
                    fontFamily="Arial Black, sans-serif"
                    fontSize="18"
                    fontWeight="900"
                    fill="url(#compactGradient)"
                >
                    StreamFlix
                </text>
            </svg>
        ),

        dark: (
            <svg
                width={width}
                height={height}
                viewBox="0 0 200 60"
                className={className}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            >
                <defs>
                    <linearGradient
                        id="darkLogoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f3f3f3" />
                    </linearGradient>
                </defs>
                <rect
                    x="0"
                    y="15"
                    width="4"
                    height="30"
                    fill="#e50914"
                    rx="2"
                />
                <text
                    x="15"
                    y="40"
                    fontFamily="Arial Black, sans-serif"
                    fontSize="28"
                    fontWeight="900"
                    fill="url(#darkLogoGradient)"
                >
                    StreamFlix
                </text>
                <circle cx="175" cy="30" r="12" fill="#e50914" opacity="0.8" />
                <polygon points="170,25 170,35 178,30" fill="white" />
            </svg>
        ),
    }

    return logos[variant] || logos.main
}

export default Logo
