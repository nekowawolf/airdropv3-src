import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  "cursor-pointer border border-color/30 text-fill-color hover:bg-white/5 hover:text-fill-color/80 transition-colors",
                  isActive && "bg-[#6366f1] border-[#6366f1] text-white hover:bg-[#6366f1] hover:text-white"
                )}
                isActive={isActive}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                href="#"
              >
                {page}
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
