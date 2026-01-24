import { useState, useEffect } from 'react'

export function VerseSection({ text, reference, extra }) {
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        setIsFlipped(false)
    }, [text])

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
            <div className={`relative transition-all duration-500 preserve-3d min-h-[25vh] md:min-h-[35vh] ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center py-12 px-6 md:py-20 md:px-8 text-center bg-sage-50 rounded-3xl shadow-sm group-hover:shadow-md transition-shadow duration-500">
                    <div className="max-w-md">
                        <h2 className="text-xl font-medium tracking-wider text-sage-600 mb-6 uppercase text-sm">Read</h2>
                        <p className="font-serif text-3xl md:text-4xl text-gray-800 leading-snug mb-6">
                            “{text}”
                        </p>
                        <p className="font-sans text-sage-500 font-medium tracking-wide">
                            {reference}
                        </p>
                        {extra && (
                            <div className="mt-4 text-xs text-sage-400 font-medium uppercase tracking-widest animate-pulse">
                                Tap for more
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center py-12 px-6 md:py-20 md:px-8 text-center bg-sage-100 rounded-3xl shadow-sm overflow-auto">
                    <div className="max-w-md">
                        <h2 className="text-xl font-medium tracking-wider text-sage-600 mb-6 uppercase text-sm">Context</h2>
                        <p className="font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed whitespace-pre-line">
                            {extra}
                        </p>
                        <div className="mt-6 text-xs text-sage-400 font-medium uppercase tracking-widest">
                            Tap to go back
                        </div>
                    </div>
                </div>

                {/* Spacer to maintain height since children are absolute */}
                <div className="invisible py-12 px-6 md:py-20 md:px-8 min-h-[25vh] md:min-h-[35vh]">
                    <div className="max-w-md">
                        <h2 className="text-xl mb-6">Read</h2>
                        <p className="text-3xl md:text-4xl mb-6">“{text}”</p>
                        <p>{reference}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

