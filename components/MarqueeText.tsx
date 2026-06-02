interface MarqueeTextProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export function MarqueeText({
  items,
  speed = 40,
  className = "",
  separator = "—",
}: MarqueeTextProps) {
  const text = items.join(` ${separator} `) + ` ${separator} `;
  const doubled = text + text;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
    >
      <div
        style={{
          display: "inline-flex",
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block pr-4">{doubled}</span>
        <span className="inline-block pr-4">{doubled}</span>
      </div>
    </div>
  );
}
