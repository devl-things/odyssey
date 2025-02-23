import React from "react";
import './Toolbar.scss';
import { CgClose } from "react-icons/cg";

const Toolbar: React.FC = () => {
    return (<div className="toolbar">
        <button>
            <CgClose />
        </button>
    </div>);
};

export default Toolbar;