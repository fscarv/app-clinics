import z from "zod";

export const upsertdoctorSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
    specialty: z
      .string()
      .trim()
      .min(2, { message: "Especialidade é obrigatório" }),
    appointmentPriceInCents: z
      .number()
      .min(2, { message: "Preço da consulta é obrigatório" }),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z
      .string()
      .min(2, { message: "Hora inicial é obrigatória" }),
    availableToTime: z.string().min(2, { message: "Hora final é obrigatória" }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "Hora inicial deve ser anterior a hora final",
      path: ["availableToTime"],
    },
  );

  export type UpsertDoctorSchema = z.infer<typeof upsertdoctorSchema>;