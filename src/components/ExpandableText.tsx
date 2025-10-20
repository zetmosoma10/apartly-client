import { useState } from "react";

type Props = {
  children: string;
};

const ExpandableText = ({ children }: Props) => {
  const [isExpanded, setIsExpended] = useState(false);
  const limit = 170;

  if (!children) return null;

  if (children.length <= limit) return <p>{children}</p>;

  const summary = isExpanded ? children : children.substring(0, limit) + "...";

  return (
    <p className="mt-1">
      <span className="opacity-70 leading-tight">{summary}</span>
      <button
        onClick={() => setIsExpended(!isExpanded)}
        className="btn btn-xs btn-warning ml-1"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </p>
  );
};

export default ExpandableText;
