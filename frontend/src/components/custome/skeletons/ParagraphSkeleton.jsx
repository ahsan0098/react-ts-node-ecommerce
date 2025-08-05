import React from 'react'

const ParagraphSkeleton = () => {
    return (

        <div role="status" className="mb-10 animate-pulse">
            <div className="max-full">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[50%] mb-2.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[70%] mb-2.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[80%] mb-2.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[60%]"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>

    )
}

export default ParagraphSkeleton