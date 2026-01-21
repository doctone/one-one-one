export function PrayerSection({ prayer }) {
    return (
        <section className="flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-[15vh] md:min-h-[25vh] bg-clay-50 rounded-3xl mx-4 mt-4 shadow-sm transition-all duration-500 hover:shadow-md">
            <div className="max-w-md">
                <h2 className="text-xl font-medium tracking-wider text-clay-400 mb-4 uppercase text-sm">Pray</h2>
                <p className="font-serif text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                    {prayer}
                </p>
            </div>
        </section>
    )
}
