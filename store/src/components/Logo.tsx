interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="url(#logoGrad)" />
      {/* Casa estilizada */}
      <path
        d="M20 10L9 19.5H12V30H18V24H22V30H28V19.5H31L20 10Z"
        fill="white"
        fillOpacity="0.15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Símbolo de power en el centro */}
      <circle cx="20" cy="22" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <path
        d="M20 17.5V19.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
