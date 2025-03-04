import React, { memo } from "react";
import { useLocalization } from '../../contexts/useLocalization';
import './Toolbar.scss';
import { CgClose, CgPlayListRemove } from "react-icons/cg";
import { LuCode, LuFileDown, LuFileImage, LuFileJson, LuLoader, LuSave } from "react-icons/lu";
import { logInDev } from "../../util/logging";

interface ToolbarProps {
    isDirectionRight?: boolean;
    onClose?: () => void;
    onSave?: () => void;
    onClear?: () => void;
    onFormat?: () => void;
    onLoad?: () => void;
    onDownloadJson?: () => void;
    onDownloadPdf?: () => void;
    onDownloadSvg?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ isDirectionRight = false, onClose, onSave, onClear, onFormat, onLoad, onDownloadJson, onDownloadPdf, onDownloadSvg }) => {
    const { translations } = useLocalization();
    logInDev("[Toolbar] rendered", isDirectionRight);
    return (<div className={`toolbar ${isDirectionRight ? 'right' : ''}`}>
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
        {onDownloadJson && (
            <button onClick={onDownloadJson} title={translations.toolbarDownloadJsonTooltip}>
                <LuFileJson />
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

export default memo(Toolbar);