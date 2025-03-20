import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

export function Calendar() {
    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState("");

    return (
        <DayPicker
            animate
            mode="range"
            showOutsideDays
            selected={selected}
            onSelect={setSelected}
            classNames={{
                today: `border-red-900 text-gray-900`, // Add a border to today's date
                selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
                root: `${defaultClassNames.root} w-full`, // Add a shadow to the root element
                chevron: `${defaultClassNames.chevron} fill-amber-500` // Change the color of the chevron
            }}
        />
    );
}

export default Calendar