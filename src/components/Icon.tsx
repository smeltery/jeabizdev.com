import type { CSSProperties } from "react";
const paths = {
  search: ["m21 21-4.4-4.4", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0"],
  menu: ["M4 6h16M4 12h16M4 18h16"],
  close: ["m6 6 12 12M6 18 18 6"],
  chevron: ["m6 9 6 6 6-6"],
  right: ["M5 12h14m-5-5 5 5-5 5"],
  external: [
    "M15 3h6v6m0-6L10 14",
    "M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5",
  ],
  file: [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z",
    "M14 2v6h6M8 13h8M8 17h6",
  ],
  briefcase: [
    "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2",
    "M3 6h18v14H3ZM3 11a20 20 0 0 0 18 0M10 12h4",
  ],
  user: [
    "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    "M4 21v-2a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v2",
  ],
  route: [
    "M5 3v12a4 4 0 0 0 4 4h10M15 15l4 4-4 4",
    "M8 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M22 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  ],
  science: ["M9 3h6M10 3v7l-6 9a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M8 15h8"],
  calculator: [
    "M5 2h14v20H5ZM8 6h8M8 11h1M15 11h1M8 15h1M15 15h1M8 19h1M15 19h1",
  ],
  chart: ["M4 3v17h17M8 15v-4M13 15V7M18 15v-6"],
  globe: [
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18",
    "M12 3c5 5 5 13 0 18-5-5-5-13 0-18",
  ],
  mail: ["M3 5h18v14H3ZM3 5l9 7 9-7"],
  linkedin: ["M6 9v12M6 4v.01M10 21V9h4v2c2-4 7-2 7 2v8M14 21v-7"],
  download: ["M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"],
  check: ["m5 12 4 4L19 6"],
  folder: ["M3 5h6l2 3h10v12H3Z"],
  up: ["M12 20V4m-6 6 6-6 6 6"],
};
export type IconName = keyof typeof paths;
export default function Icon({
  name,
  size = 18,
  className = "",
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name].map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
