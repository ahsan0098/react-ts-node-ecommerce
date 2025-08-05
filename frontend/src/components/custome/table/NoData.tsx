
interface NoData { text: string, dimensions: string }

const NoData = ({ text = '', dimensions = "w-96 h-60" }: NoData) => {
    return (
        <div className="flex flex-col justify-center items-center relative mt-5">
            <img className={dimensions} src="/public/no-data.svg" alt="" />
            {
                text && <p className="absolute top-5 text-nowrap border border-purple-500 m-0 p-3 rounded bg-purple-50 text-purple-700">{text}</p>}
        </div>

    )
}

export default NoData