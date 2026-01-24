import { useState, useEffect } from 'react'

export function QuestionSection({ question, extra }) {
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        setIsFlipped(false)
    }, [question])

    const handleFlip = () => {
        if (extra) {
            setIsFlipped(!isFlipped)
        }
    }

    return (
        <section
            className={`group perspective-1000 mx-4 mt-4 cursor-pointer ${!extra ? 'cursor-default' : ''}`}
            onClick={handleFlip}
        >
            <div className={`relative transition-all duration-500 preserve-3d min-h-[15vh] md:min-h-[25vh] ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 md:p-8 text-center bg-sand-100 rounded-3xl shadow-sm group-hover:shadow-md transition-shadow duration-500">
                    <div className="max-w-md">
                        <h2 className="text-xl font-medium tracking-wider text-sand-500 mb-4 uppercase text-sm">Ask</h2>
                        <p className="font-sans text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                            {question}
                        </p>
                        {extra && (
                            <div className="mt-4 text-xs text-sand-400 font-medium uppercase tracking-widest animate-pulse">
                                Tap for more
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 md:p-8 text-center bg-sand-200 rounded-3xl shadow-sm overflow-auto">
                    <div className="max-w-md">
                        <h2 className="text-xl font-medium tracking-wider text-sand-500 mb-4 uppercase text-sm">Bonus</h2>
                        <p className="font-sans text-xl md:text-2xl text-gray-800 font-medium leading-relaxed whitespace-pre-line">
                            {extra}
                        </p>
                        <div className="mt-6 text-xs text-sand-400 font-medium uppercase tracking-widest">
                            Tap to go back
                        </div>
                    </div>
                </div>

                {/* Spacer to maintain height */}
                <div className="invisible p-6 md:p-8 min-h-[15vh] md:min-h-[25vh]">
                    <div className="max-w-md">
                        <h2 className="text-xl mb-4">Ask</h2>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed">{question}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

