export default interface FieldMapping {
    sourceField: string;
    targetField: string;
    transformation?: string | null; // Optional transformation function
}