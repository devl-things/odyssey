import React from "react";
import { useLocalization } from '../../contexts/useLocalization';
import './Toolbar.scss';
import { CgClose } from "react-icons/cg";
import { LuCode } from "react-icons/lu";

interface ToolbarProps {
    onClose?: () => void;  // Define handleSearch as a function that takes a string (query)
    onFormat?: () => void;  // Define handleSearch as a function that takes a string (query)
}

const Toolbar: React.FC<ToolbarProps> = ({ onClose, onFormat }) => {
    const { translations } = useLocalization();

    return (<div className="toolbar">
        {onFormat && (
            <button onClick={onFormat} title={translations.toolbarFormatTooltip}>
                <LuCode />
            </button>
        )}
        {onClose && (
            <button className="toolbar-close" onClick={onClose} title={translations.toolbarCloseTooltip}>
                <CgClose />
            </button>
        )
        }
    </div >);
};

export default Toolbar;