export interface Translation {
    searchBarPlaceholder: string;
    sidebarLeftToggleButtonTooltip: string;
    toolbarClearTooltip: string,
    toolbarFormatTooltip: string;
    toolbarLoadTooltip: string;
    toolbarDownloadJsonTooltip: string,
    toolbarDownloadPdfTooltip: string;
    toolbarDownloadSvgTooltip: string;
    toolbarSaveTooltip: string;
    toolbarCloseTooltip: string;
    primaryKey: string;
    required: string;
    optional: string;
}

export interface Translations {
    en: Translation;
    hr: Translation;
}

export const DefaultTranslations: Translations = {
    en: {
        searchBarPlaceholder: "Search...",
        sidebarLeftToggleButtonTooltip: "Dac Editor",
        toolbarClearTooltip: "Clear json",
        toolbarFormatTooltip: "Format json",
        toolbarLoadTooltip: "Load diagram",
        toolbarDownloadJsonTooltip: "Download in Json",
        toolbarDownloadPdfTooltip: "Download in PDF",
        toolbarDownloadSvgTooltip: "Download in Svg",
        toolbarSaveTooltip: "Save",
        toolbarCloseTooltip: "Close sidebar",
        primaryKey: "Primary Key",
        required: "Required",
        optional: "Optional"
    },
    hr: {
        searchBarPlaceholder: "Traži",
        sidebarLeftToggleButtonTooltip: "Dac Editor",
        toolbarClearTooltip: "Počisti",
        toolbarFormatTooltip: "Formatiraj",
        toolbarLoadTooltip: "Učitaj diagram",
        toolbarDownloadJsonTooltip: "Skini Json",
        toolbarDownloadPdfTooltip: "Skini PDF",
        toolbarDownloadSvgTooltip: "Skini Svg",
        toolbarSaveTooltip: "Spremi",
        toolbarCloseTooltip: "Zatvori",
        primaryKey: "Primarni Ključ",
        required: "Obavezno",
        optional: "Proizvoljno"
    },
    // Add other languages as needed
};