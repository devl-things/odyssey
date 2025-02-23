import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json"; // Import JSON language support
// import "prismjs/themes/prism-tomorrow.css"; // Theme for syntax highlighting
//import "prismjs/themes/prism-coy.css"; // Theme for syntax highlighting
import "./DacEditor.scss";
import Toolbar from "../toolbar/Toolbar";

interface DacEditorProps {
    dac?: string,
    onClose?: () => void;
    onLoad?: (dac: string) => void;
}

const DacEditor: React.FC<DacEditorProps> = ({ dac = "", onClose, onLoad }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerText = dac; // Set the initial content
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

    const handleOnLoad = () => {
        if (!contentRef.current) return;
        if (!contentRef.current.innerText) return;
        onLoad(contentRef.current.innerText);
    };

    // Pretty print JSON, highlight with Prism.js, and move cursor to end
    const prettyPrint = () => {
        if (!contentRef.current) return;
        if (!contentRef.current.innerText) return;
        try {
            const obj = JSON.parse(contentRef.current.innerText);
            const formattedJSON = JSON.stringify(obj, null, 2);
            contentRef.current.innerText = formattedJSON;

            // Apply Prism.js syntax highlighting
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
                prettyPrint();
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
            <Toolbar onFormat={prettyPrint} onClose={onClose} onLoad={handleOnLoad} />
            <div
                ref={contentRef}
                className="dac-editor-element"
                contentEditable={true}
            />
        </div>
    );
};

export default DacEditor;
