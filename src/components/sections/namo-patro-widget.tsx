// Namo Patro widget — live BS calendar demo embedded in the project modal.
// Namo Patro widget — live Bikram Sambat calendar demo embedded inside the project modal.
// Shows today's BS date (adjusted to Nepal's UTC+5:45 timezone) and an interactive BS→AD converter.
// The conversion engine lives in src/lib/calendar/bs-converter.ts.
import { useState, useMemo } from "react";
import { Calendar, ArrowRightLeft, Sparkles, Check } from "lucide-react";
import { getLiveBsDate, convertBsToAd, BS_MONTH_NAMES } from "@/utils/calendar/bs-converter";

export function NamoPatroWidget() {
  const liveBs = useMemo(() => getLiveBsDate(), []);
  const [selectedMonth, setSelectedMonth] = useState(liveBs.month);
  const [selectedDay, setSelectedDay] = useState(liveBs.day);
  const [selectedYear, setSelectedYear] = useState(liveBs.year);

  const convertedAd = useMemo(() => {
    return convertBsToAd(selectedYear, selectedMonth, selectedDay);
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Namo Patro · Live BS Calendar Engine
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 font-mono">
          GPL-3.0 Engine
        </span>
      </div>

      {/* Today in Bikram Sambat Display */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-surface p-3.5 border border-line">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
            Today in Kathmandu (Bikram Sambat)
          </span>
          <p className="font-display text-2xl font-normal text-fg mt-0.5">
            {liveBs.year} {liveBs.monthName} {liveBs.day}
          </p>
          <p className="text-xs text-emerald-400 mt-0.5">
            {liveBs.dayName} · {liveBs.tithi}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
            Gregorian Equivalent
          </span>
          <p className="font-mono text-sm text-fg mt-1">
            {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date())}
          </p>
          <span className="text-[10px] text-muted">Timezone: UTC+5:45</span>
        </div>
      </div>

      {/* Interactive Converter Calculator */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted flex items-center gap-1.5">
          <ArrowRightLeft className="size-3 text-emerald-400" />
          Interactive BS ➔ AD Date Conversion Calculator
        </span>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div>
            <label className="text-[10px] uppercase text-muted block mb-1">BS Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-fg outline-none focus:border-emerald-500"
            >
              {[2080, 2081, 2082, 2083, 2084, 2085].map((y) => (
                <option key={y} value={y} className="bg-surface text-fg">
                  {y} BS
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase text-muted block mb-1">BS Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-fg outline-none focus:border-emerald-500"
            >
              {BS_MONTH_NAMES.map((name, i) => (
                <option key={name} value={i + 1} className="bg-surface text-fg">
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase text-muted block mb-1">BS Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-fg outline-none focus:border-emerald-500"
            >
              {Array.from({ length: 32 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d} className="bg-surface text-fg">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-surface-2 p-3 border border-line mt-2">
          <span className="text-xs text-muted">Gregorian (AD) Output:</span>
          <span className="font-display text-base font-normal text-emerald-400">
            {convertedAd}
          </span>
        </div>
      </div>
    </div>
  );
}
