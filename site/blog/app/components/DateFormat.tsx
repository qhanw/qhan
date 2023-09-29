"use client";
import dayjs from "dayjs";

type Format = "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD";

type DateFormatProps = {
  value?: Date | string | number;
  format?: Format;
  short?: boolean;
};

export default function DateFormat({ short, value, format }: DateFormatProps) {
  const f: Format = short ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";

  return value ? dayjs(value).format(format || f) : "-";
}
