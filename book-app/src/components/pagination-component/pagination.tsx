export default function Pagination({
  totalPages,
  setPage,
}: {
  totalPages: number;
  setPage: (index: number) => void;
}) {
  return (
    <div className="flex justify-between items-center min-w-[70px] mt-[90px]">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className="border rounded-[0.45rem] p-[10px] paginationButton"
          onClick={() => setPage(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
