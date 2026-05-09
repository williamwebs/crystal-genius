"use client";

import React from "react";

type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const AdminPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: AdminPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 pt-2 font-nunito text-sm text-D6D6D6 md:flex-row md:items-center md:justify-between">
      <p>
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 rounded-[6px] border border-D6D6D6/20 px-4 text-white transition-colors hover:bg-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`h-9 min-w-9 rounded-[6px] px-3 transition-colors ${
                pageNumber === currentPage
                  ? "bg-red text-white"
                  : "border border-D6D6D6/20 text-white hover:bg-dark"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 rounded-[6px] border border-D6D6D6/20 px-4 text-white transition-colors hover:bg-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
