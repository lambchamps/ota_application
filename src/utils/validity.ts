import { z } from "zod"

export const isValidJSON = (data: any): { valid: boolean, data?: unknown } => {
    try {
        return {
            valid: true,
            data: JSON.parse(data)
        }
    } catch (_) {
        return {
            valid: false
        }
    }
}

export const isValidID = (id?: number | string) => {
    try {
        const parsedId = Number(id)
        const isNotValid = [
            id === undefined,
            id === '',
            !Number.isInteger(parsedId)
        ]
    
        if (isNotValid.includes(true)) {
            return false
        }

        return parsedId
    } catch (_) {
        return {
            valid: false
        }
    }
}

export const parseValidator = <T>(result: z.SafeParseReturnType<T, T>): boolean => {
    if (result.success) {
        return true
    }

    return false
}
