// Inside Calendar component
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import { CalendarCell } from "./CalendarCell";

export const DAYS_IN_WEEK = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Calendar = () => {
  const { datesInMonth, isYearlyView, selectedDate } = useContext(CalendarContext);

  const renderMonthlyCalendar = () => (
    <div className="flex flex-col justify-start w-100" data-testid="calendar-component">
     <div className="flex justify-between">
        {DAYS_IN_WEEK.map((day) => (
          <div
            className="flex items-start flex-grow h-8 m-1 text-sm text-slate-500 font-sans"
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
      {datesInMonth.map((week, weekIndex) => (
        <div className="flex justify-between flex-grow" key={weekIndex}>
          {week.map((day, dayIndex) => (
            <span className="flex flex-grow w-full" key={dayIndex}>
              <CalendarCell day={day} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );

   const renderYearlyCalendar = () => {
    const allMonths = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthDate = new Date(selectedDate);
      monthDate.setMonth(monthIndex);

      const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(monthDate);

      return (
        <div key={monthIndex} className="mb-4">
          <div className="font-bold text-xl mb-2">{monthName}</div>
          <div className="flex justify-between">
            {DAYS_IN_WEEK.map((day) => (
              <div
                className="flex items-start flex-grow h-8 m-1 text-sm text-slate-500 font-sans"
                key={day}
              >
                {day}
              </div>
            ))}
          </div>
          {datesInMonth.map((week, weekIndex) => (
            <div className="flex justify-between flex-grow" key={weekIndex}>
              {week.map((day, dayIndex) => (
                <span className="flex flex-grow w-full" key={dayIndex}>
                  <CalendarCell day={day} />
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    });

    return <div>{allMonths}</div>;
  };

  return isYearlyView ? renderYearlyCalendar() : renderMonthlyCalendar();
};