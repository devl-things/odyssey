import { AuthenticationType } from "./Enums";

export default interface EdgeSecurity {
    encryption?: boolean;
    authentication?: AuthenticationType | null;
}