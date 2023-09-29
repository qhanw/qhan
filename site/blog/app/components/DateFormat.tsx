"use client";
import dayjs from "dayjs";

type Format = "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD";

type DateFormatProps = { value?: Date | string | number; format?: Format };

export default function DateFormat({ value, format }: DateFormatProps) {
  return value ? dayjs(value).format(format) : "-";
}
