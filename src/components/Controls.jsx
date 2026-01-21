export function Controls({ onNext }) {
    return (
        <div className="p-6 flex justify-center pb-12">
            <button
                onClick={onNext}
                className="group relative px-8 py-4 bg-gray-800 text-white font-sans text-lg font-medium rounded-full 
                   shadow-lg hover:bg-gray-700 hover:shadow-xl hover:-translate-y-0.5 
                   active:translate-y-0 active:shadow-md transition-all duration-300
                   focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
                <span className="flex items-center gap-2">
                    Next Devotional
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </span>
            </button>
        </div>
    )
}
