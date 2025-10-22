"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertdoctorSchema } from "./schema";

export const upsertDoctor = actionClient
  .schema(upsertdoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("clinic not found");
    }

    await db
      .insert(doctorsTable)
      .values({
        id: parsedInput.id,
        clinicId: session?.user.clinic?.id,
        name: parsedInput.name,
        specialty: parsedInput.specialty,
        availableFromWeekDay: parsedInput.availableFromWeekDay,
        availableToWeekDay: parsedInput.availableToWeekDay,
        availableFromtime: parsedInput.availableFromTime,
        availableTotime: parsedInput.availableToTime,
        appointmentPriceInCenst: parsedInput.appointmentPriceInCents,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          name: parsedInput.name,
          specialty: parsedInput.specialty,
          availableFromWeekDay: parsedInput.availableFromWeekDay,
          availableToWeekDay: parsedInput.availableToWeekDay,
          availableFromtime: parsedInput.availableFromTime,
          availableTotime: parsedInput.availableToTime,
          appointmentPriceInCenst: parsedInput.appointmentPriceInCents,
        },
      });
  });
