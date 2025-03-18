import { toKebabCase } from "../../util/StringManipulations";

export function createHandleTargetId(str: string): string {
    return toKebabCase(str) + '-in';
}

export function createHandleSourceId(str: string): string {
    return toKebabCase(str) + '-out';
}
