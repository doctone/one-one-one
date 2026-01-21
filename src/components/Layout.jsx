import { VerseSection } from './VerseSection'
import { QuestionSection } from './QuestionSection'
import { PrayerSection } from './PrayerSection'
import { Controls } from './Controls'
import logo from '../assets/logo.png'

export function Layout({ data, onNext }) {
    return (
        <main className="max-w-2xl mx-auto min-h-screen flex flex-col">
            <header className="p-4 md:p-6 text-center flex flex-col items-center gap-2">
                <img src={logo} alt="Woodgreen Church" className="h-8 md:h-10 object-contain opacity-80" />
                <h1 className="font-serif text-xl text-gray-400 italic">One One One</h1>
            </header>

            <div className="flex-grow flex flex-col gap-2 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <VerseSection text={data.verseText} reference={data.verseRef} />
                <QuestionSection question={data.question} />
                <PrayerSection prayer={data.prayer} />
            </div>

            <Controls onNext={onNext} />
        </main>
    )
}
