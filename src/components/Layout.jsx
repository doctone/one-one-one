import { VerseSection } from './VerseSection'
import { QuestionSection } from './QuestionSection'
import { PrayerSection } from './PrayerSection'
import { Controls } from './Controls'
import logo from '../assets/logo.jpg'

export function Layout({ data, nextChapterId, nextVerseId }) {
    return (
        <main className="max-w-2xl mx-auto min-h-screen flex flex-col">
            <header className="p-8 md:p-10 text-center flex flex-col items-center gap-4">
                <div className="h-24 md:h-28 aspect-square rounded-full overflow-hidden mix-blend-multiply flex items-center justify-center">
                    <img
                        src={logo}
                        alt="Woodgreen Church"
                        className="w-full h-full object-cover scale-[1.01]"
                    />
                </div>
                <h1 className="font-serif text-xl text-gray-400 italic">One One One</h1>
            </header>

            <div className="flex-grow flex flex-col gap-2 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <VerseSection
                    text={data.verseText}
                    reference={data.verseRef}
                    extra={data.extraVerse}
                />
                <QuestionSection
                    question={data.question}
                    extra={data.extraQuestion}
                />
                <PrayerSection prayer={data.prayer} />
            </div>

            <Controls nextChapterId={nextChapterId} nextVerseId={nextVerseId} />
        </main>
    )
}
