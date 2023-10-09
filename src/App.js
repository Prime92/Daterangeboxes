import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendar } from "react-icons/fa";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = () => {
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const [breakpoint, setBreakpoint] = useState("lg");
  const [layouts, setLayouts] = useState({
    lg: [],
    md: [],
    sm: []
  });
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRangeChange = (ranges) => {
    const selectedDate = ranges.selection.startDate;

    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(selectedDate);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    setSelectedRange({
      startDate: startOfWeek,
      endDate: endOfWeek,
      key: "selection"
    });

    generateLayoutForWeek(startOfWeek, endOfWeek);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const generateLayoutForWeek = (startOfWeek, endOfWeek) => {
    const numDays =
      Math.floor((endOfWeek - startOfWeek) / (1000 * 60 * 60 * 24)) + 1;

    const tmpLayouts = {
      lg: generateLayout(numDays, 6, startOfWeek),
      md: generateLayout(numDays, 4, startOfWeek),
      sm: generateLayout(numDays, 2, startOfWeek)
    };

    setLayouts(tmpLayouts);
  };

  const generateLayout = (numBoxes, col, startOfWeek) => {
    const layout = [];
    const currentDate = new Date(startOfWeek);
    for (let i = 0; i < numBoxes; i++) {
      layout.push({
        i: `box${i}`,
        x: i % col,
        y: Math.floor(i / col),
        w: 1,
        h: 1,
        content: (
          <div>
            <div className="date">{currentDate.toLocaleDateString()}</div>
            <div>
              <input type="text" placeholder="Text Input 1" />
            </div>
            <div>
              <input type="text" placeholder="Text Input 2" />
            </div>
            <div>
              <input type="file" />
            </div>
          </div>
        )
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return layout;
  };

  return (
    <div>
      <div>
        <label htmlFor="boxType" onClick={toggleCalendar}>
          <FaCalendar /> Select Date Range
        </label>
        {calendarVisible && (
          <DateRange
            ranges={[selectedRange]}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
          />
        )}
      </div>
      <h5>{breakpoint.toUpperCase()}</h5>
      <ResponsiveReactGridLayout
        rowHeight={120} // Adjusted row height to accommodate the content
        margin={[10, 10]} // Adding padding between boxes
        breakpoints={{ lg: 900, md: 768, sm: 476 }}
        cols={{ lg: 6, md: 4, sm: 2 }}
        layouts={layouts}
        measureBeforeMount={true}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
      >
        {layouts[breakpoint].map((itm) => (
          <div key={itm.i} data-grid={itm} className="block">
            {itm.content}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default DragFromOutsideLayout;
