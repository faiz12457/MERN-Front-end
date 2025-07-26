import React from "react";

export default function SkeletonOrderProductCard() {
  return (
    <div className="bg-white border border-l-0 border-r-0 border-b-0 border-t-zinc-200 p-6 flex gap-2.5 animate-pulse">
      {/* Skeleton Image */}
      <div className="flex-shrink-0 w-40 h-40 bg-gray-200 rounded-lg relative mt-4 shadow">
        <div className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full bg-gray-300"></div>
      </div>

      {/* Skeleton Content */}
      <div className="mt-4 w-[510px] flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
            <div className="h-3 w-72 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="h-3 w-40 bg-gray-200 rounded"></div>

          <div className="flex space-x-6">
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
