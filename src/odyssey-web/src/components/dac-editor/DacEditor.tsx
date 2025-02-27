import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json"; // Import JSON language support
// import "prismjs/themes/prism-tomorrow.css"; // Theme for syntax highlighting
//import "prismjs/themes/prism-coy.css"; // Theme for syntax highlighting
import "./DacEditor.scss";
import DiagramModel from "../../data/odyssey-protocol/DiagramModel";
import { isDiagramModel } from "../../data/odyssey-protocol/typeGuard";
import Toolbar from "../toolbar/Toolbar";

interface DacEditorProps {
    dac?: DiagramModel,
    onClose?: () => void;
    onLoad?: (dac: DiagramModel) => void;
}

const toIndentedString = (obj: object): string => {
    if (obj)
        return JSON.stringify(obj, null, 2);
    else return "";
};

const DacEditor: React.FC<DacEditorProps> = ({ dac = null, onClose, onLoad }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerText = toIndentedString(dac);
        }
    }, [dac]);

    // Moves the caret to the end of the content
    const moveCaretToEnd = () => {
        if (!contentRef.current) return;

        const selection = window.getSelection();
        if (!selection) return;

        const range = document.createRange();
        range.selectNodeContents(contentRef.current);
        range.collapse(false); // Move to the end

        selection.removeAllRanges();
        selection.addRange(range);
    };

    const getDiagramModelFromEditor = (): DiagramModel | null => {
        if (!contentRef.current) return;
        if (!contentRef.current.innerText) return;
        let diagram: DiagramModel = JSON.parse(contentRef.current.innerText);
        if (isDiagramModel(diagram)) {
            return diagram;
        }
        else {
            throw new Error("Not a valid type");
        }
    };

    const handleOnLoad = () => {
        try {
            onLoad(getDiagramModelFromEditor());
        }
        catch (error) {
            alert("Invalid model: " + error);
        }
    };

    const handleOnClear = () => {
        if (!contentRef.current) return;
        contentRef.current.innerText = "";
    };

    // Pretty print JSON, highlight with Prism.js, and move cursor to end
    const handleOnFormat = () => {
        try {
            let diagram: DiagramModel = getDiagramModelFromEditor();
            const formattedJSON = toIndentedString(diagram);
            contentRef.current.innerHTML = Prism.highlight(formattedJSON, Prism.languages.json, "json");
        } catch (error) {
            alert("Invalid JSON: " + error);
        }
        moveCaretToEnd(); // Ensure the caret moves to the end
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "Enter") {
                event.preventDefault();
                handleOnFormat();
            }
        };

        const handlePaste = (event: ClipboardEvent) => {
            event.preventDefault(); // Prevent default paste behavior

            const text = event.clipboardData?.getData("text/plain"); // Get plain text
            if (document.getSelection && text && contentRef.current) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;

                const range = selection.getRangeAt(0);
                range.deleteContents(); // Remove selected text
                range.insertNode(document.createTextNode(text)); // Insert plain text
                range.collapse(false); // Move cursor after the pasted text
            }
        };

        const currentDiv = contentRef.current;
        if (currentDiv) {
            currentDiv.addEventListener("keydown", handleKeyDown);
            currentDiv.addEventListener("paste", handlePaste);
        }

        return () => {
            if (currentDiv) {
                currentDiv.removeEventListener("keydown", handleKeyDown);
                currentDiv.removeEventListener("paste", handlePaste);
            }
        };
    }, []);

    return (
        <div className="dac-editor">
            <Toolbar onFormat={handleOnFormat} onClose={onClose} onLoad={handleOnLoad} onClear={handleOnClear} />
            <div
                ref={contentRef}
                className="dac-editor-element"
                contentEditable={true}
            />
        </div>
    );
};

export default DacEditor;
