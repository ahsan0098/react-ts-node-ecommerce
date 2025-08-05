
interface LineSkeleton { size: string }
const LineSkeleton = ({ size }: LineSkeleton) => {
    return (

        <div role="status" className="animate-pulse">
            <div className={`h-5 bg-gray-200 rounded-md  dark:bg-gray-700 ${size}`}></div>
            <span className="sr-only">Loading...</span>
        </div>

    )
}

export default LineSkeleton