export interface Translation {
    searchBarPlaceholder: string;
    toolbarFormatTooltip: string;
    toolbarCloseTooltip: string;
    // Add other translation keys here as needed, e.g.,:
    // greeting: string;
}

export interface Translations {
    en: Translation;
    hr: Translation;
    // You can add more languages here, e.g.,:
    // es: Translation;
}

export const DefaultTranslations: Translations = {
    en: {
        searchBarPlaceholder: "Search...",
        toolbarFormatTooltip: "Format json",
        toolbarCloseTooltip: "Close sidebar"
    },
    hr: {
        searchBarPlaceholder: "Traži",
        toolbarFormatTooltip: "Formatiraj",
        toolbarCloseTooltip: "Zatvori"
    },
    // Add other languages as needed
};