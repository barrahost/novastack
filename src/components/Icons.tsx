"use client";

const ICONS: Record<string, string> = {
  logo: `
    <path d="M5 17.5 12 21l7-3.5"/>
    <path d="M5 12 12 15.5 19 12"/>
    <path class="nd" d="M12 3 19 6.5 12 10 5 6.5Z"/>`,

  apps: `
    <rect x="3" y="4.5" width="18" height="15" rx="2.4"/>
    <path d="M3 9h18"/>
    <circle class="nd" cx="6" cy="6.7" r="1"/>
    <path d="M7 12.5h7M7 15.5h10"/>`,

  platform: `
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/>
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/>
    <rect class="nds" x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/>
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/>
    <path d="M10.5 7.25h3M7.25 10.5v3M16.75 10.5v3"/>`,

  portal: `
    <path d="M5 20V5.5A1.5 1.5 0 0 1 6.5 4h8.2A1.5 1.5 0 0 1 16.2 5.5V20"/>
    <path d="M3.5 20h17"/>
    <circle class="nd" cx="13" cy="12" r="1.1"/>
    <path d="M19 9.5v8"/><path d="M16.2 9.5H21"/>`,

  dashboard: `
    <rect x="3.5" y="4" width="17" height="16" rx="2.2"/>
    <path d="M7.5 16v-3"/>
    <path class="ndl" d="M11.75 16V9"/>
    <path d="M16 16v-5.5"/>
    <path d="M3.5 8.2h17"/>`,

  ai: `
    <path class="nd" d="M12 9.4 13 12l2.6 1-2.6 1-1 2.6-1-2.6L8.4 13l2.6-1Z"/>
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"/>`,

  business: `
    <circle cx="12" cy="12" r="8.5"/>
    <circle cx="12" cy="12" r="4.4"/>
    <circle class="ndf" cx="12" cy="12" r="1.4"/>
    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/>`,

  execution: `
    <path d="M4 19c3.5 0 3.5-7 7-7s3.5-7 9-7"/>
    <circle cx="4" cy="19" r="1.3"/>
    <circle class="ndf" cx="11" cy="12" r="1.3"/>
    <circle cx="20" cy="5" r="1.3"/>`,

  durable: `
    <path d="M4 9.5 12 5l8 4.5"/>
    <path d="M5.5 9.7V18M18.5 9.7V18"/>
    <path d="M9.5 10.5V18M14.5 10.5V18"/>
    <path class="nd" d="M3.5 18.5h17"/>`,

  africa: `
    <path d="M9 3.5c-1.6 2.2-1 3.8.3 4.9 1.4 1.2 1.2 2.7.2 3.8-1.4 1.5-1 3.4.2 5 .9 1.2.6 2.6-.3 3.8"/>
    <path d="M12.2 3.5c2.8.3 5 1.9 5.9 4.7 1.2 3.7-.6 8.2-4.3 10.4-.9.5-1.9.9-3 1.1"/>
    <circle class="ndf" cx="13.8" cy="11.4" r="1.4"/>`,

  stack: `
    <path class="nd" d="M12 3.5 20 7.5 12 11.5 4 7.5Z"/>
    <path d="M4 12 12 16 20 12"/>
    <path d="M4 16.5 12 20.5 20 16.5"/>`,

  finance: `
    <path d="M4 9.5 12 5l8 4.5"/>
    <path d="M3.5 9.7h17"/>
    <path d="M6.5 10v7M11 10v7M16.5 10v7"/>
    <path class="nd" d="M3.5 20.5h17"/>`,

  telecom: `
    <path class="ndl" d="M12 13.5V20"/>
    <circle class="ndf" cx="12" cy="11" r="1.5"/>
    <path d="M8.4 7.4a5 5 0 0 0 0 7.2M15.6 7.4a5 5 0 0 1 0 7.2"/>
    <path d="M5.8 4.8a8.6 8.6 0 0 0 0 12.4M18.2 4.8a8.6 8.6 0 0 1 0 12.4"/>`,

  logistics: `
    <path d="M3.5 8.5 12 4.5l8.5 4v7L12 19.5 3.5 15.5Z"/>
    <path d="M3.5 8.5 12 12.5l8.5-4"/>
    <path class="ndl" d="M12 12.5v7"/>
    <path d="M7.75 6.5 16.25 10.5"/>`,

  datacenter: `
    <rect x="4" y="3.5" width="16" height="5.2" rx="1.3"/>
    <rect x="4" y="10.4" width="16" height="5.2" rx="1.3"/>
    <rect x="4" y="17.3" width="16" height="3.2" rx="1.3"/>
    <circle class="ndf" cx="7.2" cy="6.1" r="1"/>
    <circle class="ndf" cx="7.2" cy="13" r="1"/>`,

  retail: `
    <path d="M5 8h14l-1 11.5a1 1 0 0 1-1 .9H7a1 1 0 0 1-1-.9Z"/>
    <path class="nd" d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/>`,

  government: `
    <path d="M4 9 12 4l8 5"/>
    <path d="M3.5 9.2h17"/>
    <path d="M6 9.5v8M10 9.5v8M14 9.5v8M18 9.5v8"/>
    <path class="nd" d="M3 20.5h18"/>`,

  healthcare: `
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.4"/>
    <path class="ndl" d="M12 8v8"/>
    <path class="ndl" d="M8 12h8"/>`,

  arrow: `<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>`,
  check: `<path class="nd" d="M5 12.5 10 17.5 19 6.5"/>`,
  mail: `<rect x="3.5" y="5.5" width="17" height="13" rx="2.2"/><path d="M4.5 7.5 12 13l7.5-5.5"/>`,
  pin: `<path d="M12 21s6.5-5.8 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.2 6.5 11 6.5 11Z"/><circle class="ndf" cx="12" cy="10" r="2"/>`,
  linkedin: `<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path class="nd" d="M8 10.5V16M8 7.7v.1M11.5 16v-3.2a2.3 2.3 0 0 1 4.6 0V16"/>`,
};

export function Icon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const body = ICONS[name] ?? "";
  return (
    <span className={`ic${className ? ` ${className}` : ""}`} style={style}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </span>
  );
}
