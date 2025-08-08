import React from "react";

const Badge = ({ props }) => {
  const { color = "blue", text } = props;

  const styleMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      ring: "ring-blue-500/30",
    },
    red: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      ring: "ring-red-500/30",
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      ring: "ring-green-500/30",
    },
    yellow: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      ring: "ring-yellow-500/30",
    },
  };

  const selected = styleMap[color] || styleMap.blue;

  const badgeClass =
    `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ` +
    `${selected.bg} ${selected.text} ring-1 ${selected.ring}`;

  return <span className={badgeClass}>{text}</span>;
};

export default Badge;
