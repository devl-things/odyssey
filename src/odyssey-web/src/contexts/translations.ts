export interface Translation {
    searchBarPlaceholder: string;
    // Add other translation keys here as needed, e.g.,:
    // greeting: string;
}

export interface Translations {
    en: Translation;
    fr: Translation;
    // You can add more languages here, e.g.,:
    // es: Translation;
}

export const DefaultTranslations: Translations = {
    en: {
        searchBarPlaceholder: "Search..."
    },
    fr: {
        searchBarPlaceholder: "Rechercher..."
    },
    // Add other languages as needed
};