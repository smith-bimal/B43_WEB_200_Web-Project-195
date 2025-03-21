import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

export function Calendar({ selected, onSelect }) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            animate
            mode="range"
            showOutsideDays
            selected={selected}
            onSelect={onSelect}
            numberOfMonths={1}
            className="flex h-full justify-center items-center scale-90 transform"
            classNames={{
                months: "flex justify-center",
                month: "w-full",
                caption: "flex justify-center text-sm",
                head_cell: "text-xs",
                cell: "text-sm",
                day: "h-8 w-8",
                today: `border-red-900 text-blue-500`,
                selected: `bg-amber-500 border-amber-500 text-gray=800`,
                root: `${defaultClassNames.root} h-full bg-transparent -mt-5`,
                chevron: `${defaultClassNames.chevron} fill-amber-500`
            }}
        />
    );
}

export default Calendar;