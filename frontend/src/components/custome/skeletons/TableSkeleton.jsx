
const TableSkeleton = ({ cols }) => {
    return (
        <div
            role="status"
            className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
            {[...Array(10)].map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-3">
                    <div className="flex gap-x-10">
                        {[...Array(cols)].map((_, ind) => (
                            <Col key={ind} />
                        ))}
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
            ))}
        </div>
    );
};

const Col = () => {
    return (
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    );
};

export default TableSkeleton;
