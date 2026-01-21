export function VerseSection({ text, reference }) {
    return (
        <section className="flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-[20vh] md:min-h-[30vh] bg-sage-50 rounded-3xl mx-4 mt-4 shadow-sm transition-all duration-500 hover:shadow-md">
            <div className="max-w-md">
                <h2 className="text-xl font-medium tracking-wider text-sage-600 mb-6 uppercase text-sm">Read</h2>
                <p className="font-serif text-3xl md:text-4xl text-gray-800 leading-snug mb-6">
                    “{text}”
                </p>
                <p className="font-sans text-sage-500 font-medium tracking-wide">
                    {reference}
                </p>
            </div>
        </section>
    )
}
