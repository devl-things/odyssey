export function toKebabCase(str: string): string {
    return str ? str
        .trim()
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Add '-' between lowercase and uppercase letters (camelCase support)
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with '-'
        .toLowerCase() // Convert everything to lowercase
        .replace(/[^a-z0-9-]/g, '') // Remove any non-alphanumeric characters except '-'
        : "";
}

export function toUpperCaseSafe(str?: string): string {
    return str ? str.toUpperCase() : "";
}