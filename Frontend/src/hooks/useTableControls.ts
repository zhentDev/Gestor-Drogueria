import { useState, useMemo, useEffect } from 'react';

// Define a generic type for the data items
type DataItem = { [key: string]: any };

interface UseTableControlsProps<T extends DataItem> {
  initialData: T[];
  initialRowsPerPage?: number;
  searchKeys?: (keyof T)[];
}

export const useTableControls = <T extends DataItem>({
  initialData,
  initialRowsPerPage = 5,
  searchKeys = [],
}: UseTableControlsProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return initialData;
    }
    return initialData.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        return (
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }, [initialData, searchTerm, searchKeys]);

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, rowsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, pageCount));
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page on rows change
  };
  
  // Effect to reset to page 1 if the page becomes invalid after filtering
  useEffect(() => {
    if (currentPage > pageCount && pageCount > 0) {
      setCurrentPage(pageCount);
    } else if (pageCount === 0) {
        setCurrentPage(1);
    }
  }, [pageCount, currentPage]);

  return {
    paginatedData,
    currentPage,
    rowsPerPage,
    searchTerm,
    pageCount,
    handleSearch,
    handleRowsPerPageChange,
    nextPage,
    prevPage,
    goToPage,
    totalResults: filteredData.length,
  };
};
