import z, { string } from "zod"


export const createHashInput = z.object({
    title: string(),
    content: string()
})

export type CreatehashInput = z.infer<typeof createHashInput>

export const updateHashInput = z.object({
    title: string(),
    content: string(),
    id:string()
})
export type UpdateHashInput = z.infer<typeof updateHashInput>