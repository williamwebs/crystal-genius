import Link from "next/link";

type PaginationLinksProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

function createPageHref(basePath: string, page: number) {
  const safePage = Math.max(1, page);
  return safePage === 1 ? basePath : `${basePath}?page=${safePage}`;
}

const PaginationLinks = ({
  basePath,
  currentPage,
  totalPages,
}: PaginationLinksProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 pt-4 font-nunito text-sm text-[#555555] md:flex-row md:items-center md:justify-between">
      <p>
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={createPageHref(basePath, currentPage - 1)}
          aria-disabled={currentPage === 1}
          className={`rounded-[8px] border px-4 py-2 transition-colors ${
            currentPage === 1
              ? "pointer-events-none border-[#D6D6D6] text-[#999999]"
              : "border-[#D6D6D6] text-[#555555] hover:bg-[#f5f5f5]"
          }`}
        >
          Previous
        </Link>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <Link
              key={pageNumber}
              href={createPageHref(basePath, pageNumber)}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              className={`min-w-10 rounded-[8px] border px-3 py-2 text-center transition-colors ${
                pageNumber === currentPage
                  ? "border-red bg-red text-white"
                  : "border-[#D6D6D6] text-[#555555] hover:bg-[#f5f5f5]"
              }`}
            >
              {pageNumber}
            </Link>
          )
        )}

        <Link
          href={createPageHref(basePath, currentPage + 1)}
          aria-disabled={currentPage === totalPages}
          className={`rounded-[8px] border px-4 py-2 transition-colors ${
            currentPage === totalPages
              ? "pointer-events-none border-[#D6D6D6] text-[#999999]"
              : "border-[#D6D6D6] text-[#555555] hover:bg-[#f5f5f5]"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default PaginationLinks;
