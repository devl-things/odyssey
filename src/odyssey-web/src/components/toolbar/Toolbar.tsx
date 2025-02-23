import React from "react";
import { useLocalization } from '../../contexts/useLocalization';
import './Toolbar.scss';
import { CgClose } from "react-icons/cg";
import { LuCode, LuFileDown, LuFileImage, LuLoader } from "react-icons/lu";

interface ToolbarProps {
    onClose?: () => void;
    onFormat?: () => void;
    onLoad?: () => void;
    onDownloadPdf?: () => void;
    onDownloadSvg?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClose, onFormat, onLoad, onDownloadPdf, onDownloadSvg }) => {
    const { translations } = useLocalization();

    return (<div className="toolbar">
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
        {onClose && (
            <button className="toolbar-danger" onClick={onClose} title={translations.toolbarCloseTooltip}>
                <CgClose />
            </button>
        )
        }
    </div >);
};

export default Toolbar;