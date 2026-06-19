"use client";

import moment from "moment";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

type PeriodMode = "harian" | "mingguan" | "bulanan" | "custom";

export default function DateFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlMode = (searchParams.get("type") as PeriodMode) || "harian";
  const initialStart = searchParams.get("start") || "";
  const initialEnd = searchParams.get("end") || "";

  const [activeMode, setActiveMode] = useState<PeriodMode>(urlMode);
  const [customStart, setCustomStart] = useState(urlMode === "custom" ? initialStart : "");
  const [customEnd, setCustomEnd] = useState(urlMode === "custom" ? initialEnd : "");

  useEffect(() => {
    setActiveMode(urlMode);
    if (urlMode === "custom") {
      setCustomStart(initialStart);
      setCustomEnd(initialEnd);
    }
  }, [urlMode, initialStart, initialEnd]);

  const updateUrlParams = (mode: PeriodMode, start?: string, end?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (mode === "harian") {
      params.delete("type");
      params.delete("start");
      params.delete("end");
    } else {
      params.set("type", mode);
      if (start && end) {
        params.set("start", start);
        params.set("end", end);
      } else {
        params.delete("start");
        params.delete("end");
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleModeChange = (mode: PeriodMode) => {
    setActiveMode(mode);

    if (mode === "harian") {
      updateUrlParams("harian");
    } else if (mode === "mingguan") {
      const start = moment().startOf("isoWeek").format("YYYY-MM-DD");
      const end = moment().endOf("isoWeek").format("YYYY-MM-DD");
      updateUrlParams("mingguan", start, end);
    } else if (mode === "bulanan") {
      const start = moment().startOf("month").format("YYYY-MM-DD");
      const end = moment().endOf("month").format("YYYY-MM-DD");
      updateUrlParams("bulanan", start, end);
    } else if (mode === "custom") {
      if (customStart && customEnd) {
        updateUrlParams("custom", customStart, customEnd);
      } else {
        updateUrlParams("custom");
      }
    }
  };

  const handleCustomDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") {
      setCustomStart(value);
      if (value && customEnd) updateUrlParams("custom", value, customEnd);
    } else {
      setCustomEnd(value);
      if (customStart && value) updateUrlParams("custom", customStart, value);
    }
  };

  return (
    <div className="p-2 space-y-2 bg-neutral-900 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2">
        {(["harian", "mingguan", "bulanan", "custom"] as PeriodMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => handleModeChange(mode)}
            className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all cursor-pointer ${activeMode === mode ? "bg-teal-600 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"}`}
          >
            {mode}
          </button>
        ))}
      </div>

      {activeMode === "custom" && (
        <div className="flex items-center gap-2 max-w-md animate-fadeIn pt-3 border-t border-neutral-600">
          <div className="flex-1 space-y-2">
            <input
              type="date"
              value={customStart}
              onChange={(e) => handleCustomDateChange("start", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white outline-none [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          <ArrowRight className="text-neutral-400" size={20} />
          <div className="flex-1 space-y-2">
            <input
              type="date"
              value={customEnd}
              onChange={(e) => handleCustomDateChange("end", e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white outline-none [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      )}
    </div>
  );
}
