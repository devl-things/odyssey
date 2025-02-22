import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json"; // Import JSON language support
// import "prismjs/themes/prism-tomorrow.css"; // Theme for syntax highlighting
//import "prismjs/themes/prism-coy.css"; // Theme for syntax highlighting
import "./DacEditor.scss";

const DacEditor: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

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

    // Pretty print JSON, highlight with Prism.js, and move cursor to end
    const prettyPrint = () => {
        if (!contentRef.current) return;

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
                if (!selection!.rangeCount) return;

                const range = selection!.getRangeAt(0);
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
        <>
            <button onClick={prettyPrint}>Pretty Print</button>
            <div
                ref={contentRef}
                className="content_editable_element"
                contentEditable={true}
                style={{
                    minHeight: "150px",
                    border: "1px solid black",
                    padding: "5px",
                    // whiteSpace: "pre-wrap", // Keeps JSON formatting
                    fontFamily: "monospace",
                    fontSize: 14,
                    // background: "#2d2d2d", // Dark background for Prism theme
                    // color: "#ccc", // Light text for readability
                }}
            />
        </>
    );
};

export default DacEditor;
