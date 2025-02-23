export interface Translation {
    searchBarPlaceholder: string;
    sidebarLeftToggleButtonTooltip: string;
    toolbarFormatTooltip: string;
    toolbarLoadTooltip: string;
    toolbarDownloadPdfTooltip: string;
    toolbarDownloadSvgTooltip: string;
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
        sidebarLeftToggleButtonTooltip: "Dac Editor",
        toolbarFormatTooltip: "Format json",
        toolbarLoadTooltip: "Load diagram",
        toolbarDownloadPdfTooltip: "Download in PDF",
        toolbarDownloadSvgTooltip: "Download in Svg",
        toolbarCloseTooltip: "Close sidebar"
    },
    hr: {
        searchBarPlaceholder: "Traži",
        sidebarLeftToggleButtonTooltip: "Dac Editor",
        toolbarFormatTooltip: "Formatiraj",
        toolbarLoadTooltip: "Učitaj diagram",
        toolbarDownloadPdfTooltip: "Skini PDF",
        toolbarDownloadSvgTooltip: "Skini Svg",
        toolbarCloseTooltip: "Zatvori"
    },
    // Add other languages as needed
};