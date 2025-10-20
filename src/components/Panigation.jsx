import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Panigation({ currentPage, setCurrPage, totalPages = 11 }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrPage(page);
    }
  };

  const getPagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  };

  return (
    <div className="mt-7 w-full px-4">
      <div className="flex justify-center sm:justify-end">
        <div className="flex gap-2 overflow-x-auto max-w-full px-1 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 cursor-pointer flex justify-center items-center min-w-[40px] h-10 border border-zinc-400 rounded-sm"
          >
            <IoIosArrowBack size={20} />
          </button>

          {getPagination().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && goToPage(page)}
              disabled={page === "..."}
              className={`min-w-[40px] h-10 rounded-sm text-sm border 
                ${
                  currentPage === page
                    ? "bg-zinc-300 border-zinc-400"
                    : "border-zinc-300"
                } ${
                page === "..."
                  ? "bg-transparent cursor-default border-none"
                  : "cursor-pointer"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 cursor-pointer flex justify-center items-center min-w-[40px] h-10 border border-zinc-400 rounded-sm"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Panigation;
