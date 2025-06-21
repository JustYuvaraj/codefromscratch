import React, { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isBefore,
  isAfter,
  isSameMonth,
  addMonths,
  format,
  subYears,
} from "date-fns";

const DEFAULT_SCALE = 0.6; // adjust as needed to fit your Dashboard width

/**
 * Props:
 * - streakData: { [ "yyyy-MM-dd" ]: number }
 * - startDate: Date object for calendar start (inclusive). Defaults to 1 year ago from today.
 * - endDate:   Date object for calendar end (inclusive). Defaults to today.
 * - scale:     number for overall scale (e.g. 0.6). Defaults to DEFAULT_SCALE.
 */
const StreakCalendar = ({
  streakData = {},
  startDate,
  endDate,
  scale = DEFAULT_SCALE,
}) => {
  // 1. Determine date range defaults
  const today = new Date();
  const defaultEnd = endDate instanceof Date ? endDate : today;
  const defaultStart =
    startDate instanceof Date
      ? startDate
      : subYears(defaultEnd, 1); // 1 year ago by default

  // 2. Weekday labels
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // 3. Pre-calc max count in streakData to build dynamic intensity levels
  const maxCount = useMemo(() => {
    const vals = Object.values(streakData).filter((v) => typeof v === "number");
    return vals.length ? Math.max(...vals) : 0;
  }, [streakData]);

  // 4. Function to get Tailwind classes per count, for a glossy dark theme
  const getLevelClass = (count) => {
    if (!count || maxCount === 0) {
      // valid date but zero submissions: show dark gray box
      return "bg-gray-800";
    }
    // Compute ratio in (0,1], avoid division by zero
    const ratio = count / maxCount;
    // Choose gradient/shade based on ratio thresholds
    if (ratio <= 0.25) {
      // lowest non-zero: dark green gradient
      return "bg-gradient-to-br from-green-900 to-green-700 shadow-inner";
    } else if (ratio <= 0.5) {
      return "bg-gradient-to-br from-green-800 to-green-500 shadow-md";
    } else if (ratio <= 0.75) {
      return "bg-gradient-to-br from-green-600 to-green-400 shadow-md";
    } else {
      // top intensity
      return "bg-gradient-to-br from-green-400 to-green-200 shadow-lg";
    }
  };

  // 5. Build months array: memoize for performance if props stable
  const months = useMemo(() => {
    const arr = [];
    let currentMonth = new Date(
      defaultStart.getFullYear(),
      defaultStart.getMonth(),
      1
    );
    // Iterate month by month until after defaultEnd
    while (!isAfter(currentMonth, defaultEnd)) {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);

      // Align to Monday-Sunday grid
      const visibleStart = startOfWeek(monthStart, { weekStartsOn: 1 });
      const visibleEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

      const days = [];
      let day = visibleStart;
      while (!isAfter(day, visibleEnd)) {
        const isValid =
          isSameMonth(day, currentMonth) &&
          !isBefore(day, defaultStart) &&
          !isAfter(day, defaultEnd);
        days.push(isValid ? new Date(day) : null);
        day = addDays(day, 1);
      }

      // Slice into week-columns (7 days per column)
      const columns = [];
      for (let i = 0; i < days.length; i += 7) {
        columns.push(days.slice(i, i + 7));
      }

      arr.push({ columns, label: format(currentMonth, "MMM") });
      currentMonth = addMonths(currentMonth, 1);
    }
    return arr;
  }, [defaultStart, defaultEnd]);

  return (
    <div className="w-full overflow-hidden h-[110px]">
      {/* Scale both labels & grid together; origin-top-left so left-aligned */}
      <div
        className="origin-top-left"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div className="flex items-start">
          {/* Weekday labels column */}
          <div className="flex flex-col gap-1 mr-2">
            {daysOfWeek.map((day, idx) => (
              // h-4 matches each grid cell’s height; gap-1 matches vertical gap
              <div
                key={idx}
                className="h-4 w-6 text-l text-white/60 leading-4 select-none"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar months */}
          <div className="flex items-end gap-4">
            {months.map((month, monthIdx) => (
              <div key={monthIdx} className="flex flex-col items-center">
                {/* Week-columns for this month */}
                <div className="flex gap-1">
                  {month.columns.map((week, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-1">
                      {week.map((day, rowIdx) => {
                        // Format date for lookup
                        const dateStr = day ? format(day, "yyyy-MM-dd") : null;
                        const count = day && streakData[dateStr] ? streakData[dateStr] : 0;
                        // If day === null → outside month or outside range: transparent
                        const baseClass = day
                          ? getLevelClass(count)
                          : "bg-transparent";
                        return (
                          <div
                            key={rowIdx}
                            className={`w-4 h-4 rounded-sm transition duration-200 ${
                              // add hover effect only for valid days
                              day
                                ? `${baseClass} hover:brightness-110`
                                : baseClass
                            }`}
                            title={
                              day
                                ? `${format(day, "yyyy-MM-dd")} — ${
                                    count
                                  } submissions`
                                : ""
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Month label centered under its block */}
                <div className="text-xl text-white/60 mt-1 select-none">
                  {month.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
