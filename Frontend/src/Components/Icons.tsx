export const SortIcon = ({ direction }: { direction: "ascending" | "descending" | null }) => (
  <svg
    className="w-3 h-3 ml-1.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    {direction === "ascending" && (
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Z" />
    )}
    {direction === "descending" && (
      <path d="M15.426 12.976h-6.852a2.075 2.075 0 0 0-1.847 1.086 1.9 1.9 0 0 0 .11 1.986l3.426 5.052a2.122 2.122 0 0 0 3.472 0l3.426-5.052a1.9 1.9 0 0 0 .11-1.986 2.074 2.074 0 0 0-1.847-1.086Z" />
    )}
  </svg>
);

export const SearchIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </svg>
);

export const ExportIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 11v5m0 0 2-2m-2 2-2-2M3 13h2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm0-10h2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Z M14.5 3H17a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Z"
    />
  </svg>
);

export const ChevronLeft = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m15 19-7-7 7-7"
    />
  </svg>
);

export const ChevronRight = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 5 7 7-7 7"
    />
  </svg>
);