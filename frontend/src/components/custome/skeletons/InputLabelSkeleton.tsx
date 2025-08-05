
const InputLabel = () => {
    return (

        <div role="status" className="mb-5 animate-pulse">
            <div className="max-full">
                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[50%] mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>

            </div>
            <span className="sr-only">Loading...</span>
        </div>

    )
}

interface InputLabelSkeleton { cols: number }
const InputLabelSkeleton = ({ cols }: InputLabelSkeleton) => {
    return (
        <>
            {
                [...Array(cols)].map((_, ind) => (
                    <InputLabel key={ind} />
                ))
            }
        </>

    );
};

export default InputLabelSkeleton