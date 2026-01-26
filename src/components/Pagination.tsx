import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationTabs({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  const getVisiblePages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination className="mt-12 select-none">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`border border-color/30 text-fill-color hover:bg-white/5 hover:text-fill-color cursor-pointer ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            onClick={handlePrevious}
            href="#"
          />
        </PaginationItem>

        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="text-fill-color/60" />
              </PaginationItem>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                className={cn(
                  "cursor-pointer border border-color/30 text-fill-color hover:bg-white/5 hover:text-fill-color/80 transition-colors",
                  isActive && "bg-blue-400/80 text-fill-color hover:bg-blue-500"
                )}
                isActive={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNum);
                }}
                href="#"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className={`border border-color/30 text-fill-color hover:bg-white/5 hover:text-fill-color cursor-pointer ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
              }`}
            onClick={handleNext}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}