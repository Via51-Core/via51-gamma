// src/core/validator.ts

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export class CoreValidator {
    /**
     * Agnostic validation: Compares payload against a schema definition.
     * The core doesn't know what an "Event" or "Company" is.
     */
    public static validate(payload: any, schema: any): ValidationResult {
        const errors: string[] = [];

        // 1. Check for required entities defined in the Registry
        if (schema.requiredFields) {
            schema.requiredFields.forEach((field: string) => {
                if (payload[field] === undefined || payload[field] === null) {
                    errors.push(`Missing required field: ${field}`);
                }
            });
        }

        // 2. Type validation based on Registry rules
        for (const key in payload) {
            if (schema.properties && schema.properties[key]) {
                const expectedType = schema.properties[key].type;
                const actualType = typeof payload[key];

                if (actualType !== expectedType) {
                    errors.push(`Field '${key}' expected type ${expectedType} but got ${actualType}`);
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}