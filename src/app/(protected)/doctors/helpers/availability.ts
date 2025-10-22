import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { doctorsTable } from "@/db/schema";

dayjs.extend(utc);
dayjs.locale("pt-BR");

export const getAvailability = (doctor: typeof doctorsTable.$inferSelect) => {
  const from = dayjs()
    .utc()
    .day(doctor.availableFromWeekDay)
    .set("hour", Number(doctor.availableFromtime.split(":")[0]))
    .set("minute", Number(doctor.availableFromtime.split(":")[1]))
    .set("second", Number(doctor.availableFromtime.split(":")[2] || 0))
    .local();

  const to = dayjs()
    .utc()
    .day(doctor.availableToWeekDay)
    .set("hour", Number(doctor.availableTotime.split(":")[0]))
    .set("minute", Number(doctor.availableTotime.split(":")[1]))
    .set("second", Number(doctor.availableTotime.split(":")[2] || 0))
    .local();

  return { from, to };
};
