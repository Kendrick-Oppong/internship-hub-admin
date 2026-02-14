import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type PaginationTabsProps = {
  page: number;
  size: number;
  total: number;
  onPageChange?: (page: number) => void;
};

export function PaginationTabs({
  page,
  size,
  total,
  onPageChange,
}: Readonly<PaginationTabsProps>) {
  const start = total === 0 ? 0 : page * size + 1;
  const end = Math.min((page + 1) * size, total);
  const totalPages = Math.max(1, Math.ceil(total / size));

  const goto = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    onPageChange?.(page);
  };

  // condensed page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const showEllipsis = totalPages > maxVisible + 2;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    pages.push(0);

    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages - 2, page + 1);

    if (start > 1) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 2) pages.push("...");

    pages.push(totalPages - 1);

    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap mt-5">
      <p className="font-semibold text-sm">
        Showing{" "}
        <span className="text-primary font-bold">
          {start} - {end}
        </span>{" "}
        of <span className="text-primary font-bold">{total}</span> items
      </p>

      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={`text-sm ${
                page === 0 ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                goto(page - 1);
              }}
            />
          </PaginationItem>

          {getPageNumbers().map((p, idx) => {
            const key = typeof p === "number" ? `page-${p}` : `ellipsis-${idx}`;
            return (
              <PaginationItem key={key} className="text-sm p-0">
                {p === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    className="!text-sm size-7"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      goto(p as number);
                    }}
                  >
                    {(p as number) + 1}
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              className={`text-sm ${
                page === totalPages - 1 ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                goto(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
