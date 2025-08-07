import type { CollectionMeta } from "@/models/collection.interface";




interface PaginationProps {
  meta: CollectionMeta;
  callback: (url: string) => void;
}

const Pagination = ({ meta, callback }: PaginationProps) => {

  return (meta.prev || meta.next) ? (
    <div className="flex py-3 justify-end">

      {meta.prev && (
        <button
          className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          onClick={() => callback(meta.prev!)}
        >
          &laquo; Prev
        </button>
      )}


      {Object.entries(meta.links).map(([pageNum, url]) => (
        <button
          key={pageNum}
          className={`px-3 py-1 text-xs font-medium rounded ${meta.page === url
            ? 'font-bold text-blue-500'
            : 'text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white'
            }`}
          onClick={() => callback(url)}
        >
          {pageNum}
        </button>
      ))}

      {meta.next && (
        <button
          className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          onClick={() => callback(meta.next!)}
        >
          Next &raquo;
        </button>
      )}
    </div>
  ) : <></>;
};

export default Pagination;
