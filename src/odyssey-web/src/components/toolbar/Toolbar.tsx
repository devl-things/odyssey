import React from "react";
import { useLocalization } from '../../contexts/useLocalization';
import './Toolbar.scss';
import { CgClose, CgPlayListRemove } from "react-icons/cg";
import { LuCode, LuFileDown, LuFileImage, LuLoader, LuSave } from "react-icons/lu";

interface ToolbarProps {
    onClose?: () => void;
    onSave?: () => void;
    onClear?: () => void;
    onFormat?: () => void;
    onLoad?: () => void;
    onDownloadPdf?: () => void;
    onDownloadSvg?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClose, onSave, onClear, onFormat, onLoad, onDownloadPdf, onDownloadSvg }) => {
    const { translations } = useLocalization();
    //TODO reverse the order when on right
    return (<div className="toolbar">
        {onClear && (
            <button onClick={onClear} title={translations.toolbarClearTooltip}>
                <CgPlayListRemove />
            </button>
        )}
        {onFormat && (
            <button onClick={onFormat} title={translations.toolbarFormatTooltip}>
                <LuCode />
            </button>
        )}
        {onLoad && (
            <button className="toolbar-success" onClick={onLoad} title={translations.toolbarLoadTooltip}>
                <LuLoader />
            </button>
        )}
        {onDownloadPdf && (
            <button onClick={onDownloadPdf} title={translations.toolbarDownloadPdfTooltip}>
                <LuFileDown />
            </button>
        )}
        {onDownloadSvg && (
            <button onClick={onDownloadSvg} title={translations.toolbarDownloadSvgTooltip}>
                <LuFileImage />
            </button>
        )}
        {onSave && (
            <button className="toolbar-success" onClick={onSave} title={translations.toolbarSaveTooltip}>
                <LuSave />
            </button>
        )}
        {onClose && (
            <button className="toolbar-danger" onClick={onClose} title={translations.toolbarCloseTooltip}>
                <CgClose />
            </button>
        )}
    </div >);
};

export default Toolbar;