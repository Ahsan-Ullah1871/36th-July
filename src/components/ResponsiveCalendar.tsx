"use client";

import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import CalendarMobile from "./CalendarMobile";

export default function ResponsiveCalendar() {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!ready) return null;
  return isMobile ? <CalendarMobile /> : <Calendar />;
}
