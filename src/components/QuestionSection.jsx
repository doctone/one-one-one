export function QuestionSection({ question }) {
    return (
        <section className="flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-[15vh] md:min-h-[25vh] bg-sand-100 rounded-3xl mx-4 mt-4 shadow-sm transition-all duration-500 hover:shadow-md">
            <div className="max-w-md">
                <h2 className="text-xl font-medium tracking-wider text-sand-500 mb-4 uppercase text-sm">Ask</h2>
                <p className="font-sans text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                    {question}
                </p>
            </div>
        </section>
    )
}
