import moment from "moment";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClockCircle } from "@solar-icons/react-perf/BoldDuotone";
import { ShiftDetails } from "../types";

interface ShiftDetailsHeaderProps {
  shift: ShiftDetails;
}

function getTimeRange(openingTime: Date, closingTime: Date | null) {
  const formattedOpeningTime = moment(openingTime).locale("id").format("DD MMMM Y");

  if (!closingTime) return formattedOpeningTime;

  const isSameDay = moment(openingTime).isSame(closingTime, "day");
  if (isSameDay) return formattedOpeningTime;

  const formattedClosingTime = moment(closingTime).locale("id").format("DD MMMM Y");
  return `${formattedOpeningTime} - ${formattedClosingTime}`;
}

export default function ShiftDetailsHeader({ shift }: ShiftDetailsHeaderProps) {
  return (
    <>
      <div className="p-4 mb-4 flex justify-between items-center">
        <Link href="/dashboard/shift" className="bg-white grid place-content-center shrink-0 rounded-full size-10 border border-neutral-300 text-neutral-500">
          <ArrowLeft size={24} />
        </Link>
        <h5 className="text-xl text-white font-semibold">Detail Riwayat Shift</h5>
        <div className="size-10"></div>
      </div>
      <div className="flex flex-col items-center mb-8">
        <div className="size-20 bg-teal-100 grid place-content-center rounded-full text-4xl leading-none mb-4">
          <ClockCircle size={40} color="#009689" />
        </div>
        <p className="text text-neutral-200 mb-1">Sesi Periode Shift</p>
        <h5 className="text-xl font-semibold text-white">{getTimeRange(shift.openingTime, shift.closingTime)}</h5>
      </div>
    </>
  );
}
