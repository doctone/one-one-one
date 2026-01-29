const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * Get the current day index (0 = Monday, 6 = Sunday)
 */
function getTodayIndex() {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

export function WeeklyProgress({ completed }) {
  const todayIndex = getTodayIndex();

  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {DAYS.map((day, index) => {
        const isCompleted = completed[index];
        const isToday = index === todayIndex;

        return (
          <div key={index} className="flex flex-col items-center gap-1">
            <span
              className={`text-xs font-medium ${
                isToday ? 'text-sage-600' : 'text-gray-400'
              }`}
            >
              {day}
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-sage-500 border-sage-500'
                  : isToday
                    ? 'border-sage-400 bg-sage-50'
                    : 'border-gray-200 bg-white'
              }`}
            >
              {isCompleted && (
                <svg
                  className="w-full h-full text-white p-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
