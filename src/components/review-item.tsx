"use client";
import React from "react";

export function ReviewItem({ review }: { review: any }) {
  const [expanded, setExpanded] = React.useState(false);
  const firstLine = review.content.split("\n")[0];
  const rest = review.content.slice(firstLine.length).trim();
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-yellow-400">{review.author}</span>
        <span className="text-xs text-gray-400">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-200 whitespace-pre-line">
        {firstLine}
        {rest && !expanded && (
          <>
            ...{" "}
            <button
              className="text-yellow-400 underline text-xs ml-1"
              onClick={() => setExpanded(true)}
            >
              Show more
            </button>
          </>
        )}
        {expanded && rest && (
          <>
            {"\n"}
            {rest}
            <button
              className="text-yellow-400 underline text-xs ml-2"
              onClick={() => setExpanded(false)}
            >
              Show less
            </button>
          </>
        )}
      </p>
    </div>
  );
}
