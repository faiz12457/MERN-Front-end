import React from 'react';

export default function SkeletonProfileAddress() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Box */}
      <div className="w-full flex flex-col justify-center items-center  h-40 gap-1.5">
        <div className="w-[70px] h-[70px] rounded-full bg-gray-300"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-40 bg-gray-200 rounded"></div>
      </div>

      {/* Address Box */}
      <div className=" p-2">
        {/* Header */}
        <div className="w-full h-10 rounded bg-gray-300 mb-4"></div>

        {/* Address Fields */}
        <div className="pl-5 text-xl flex flex-col gap-2">
          <div className="h-4 w-52 bg-gray-200 rounded"></div>
          <div className="h-4 w-44 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end mt-4 pr-2">
          <div className="w-16 h-[30px] rounded bg-gray-300"></div>
          <div className="w-16 h-[30px] rounded border border-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
