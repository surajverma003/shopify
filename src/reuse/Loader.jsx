import React from 'react'

const Loader = ({ size, message }) => {
    return (
        <>
            <div className="flex justify-center items-center gap-14 flex-col text-purple-600 dark:text-purple-400 min-h-[500px]">
                <span className="relative -left-6">
                    <iconify-icon icon="svg-spinners:ring-resize" width={size} height={size}></iconify-icon>
                </span>
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">Loading {message}...</p>
            </div>
        </>
    )
}

export default Loader
