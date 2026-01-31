import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface TableControlsProps {
  // Search
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;

  // Rows per page
  rowsPerPage: number;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  rowsPerPageOptions?: number[];
  totalResults: number;

  // Pagination
  currentPage: number;
  pageCount: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const TableControls: React.FC<TableControlsProps> = ({
  searchTerm,
  handleSearch,
  searchPlaceholder = 'Buscar...',
  rowsPerPage,
  handleRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 20, 50],
  totalResults,
  currentPage,
  pageCount,
  goToPage,
  nextPage,
  prevPage,
}) => {
  const startResult = totalResults > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const endResult = Math.min(currentPage * rowsPerPage, totalResults);

  return (
    <div className="flex flex-wrap justify-between items-center mb-4 gap-4 p-2 bg-gray-50/70 rounded-lg border border-gray-200">
      {/* Search Input */}
      <div className="relative flex-grow sm:flex-grow-0">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
        />
      </div>

      <div className="flex items-center gap-x-2 sm:gap-x-4">
        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 hidden sm:inline-block">Filas:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded-lg p-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            aria-label="Filas por página"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Info */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">{startResult}-{endResult}</span> de <span className="font-medium">{totalResults}</span>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Primera página"
          >
            &laquo;
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Página anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium px-2">
            {currentPage} / {pageCount || 1}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === pageCount || pageCount === 0}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Página siguiente"
          >
            <ChevronRight size={18} />
          </button>
           <button
            onClick={() => goToPage(pageCount)}
            disabled={currentPage === pageCount || pageCount === 0}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Última página"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};
