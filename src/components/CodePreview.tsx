import { useEffect, useState } from "react";

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    // Convert React JSX to HTML for preview
    // This is a simplified conversion - in a real app you'd use a proper JSX to HTML transformer
    const convertToHtml = (jsxCode: string) => {
      // Extract the JSX return statement
      const jsxMatch = jsxCode.match(/return\s*\(([\s\S]*)\)\s*}?\s*$/m);
      if (!jsxMatch) return "<div>Preview not available</div>";

      let jsx = jsxMatch[1].trim();

      // Simple JSX to HTML conversion
      jsx = jsx
        .replace(/className=/g, "class=")
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // Remove comments
        .replace(/\s+/g, " "); // Clean up whitespace

      return jsx;
    };

    const html = convertToHtml(code);
    setPreviewHtml(html);
  }, [code]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">Live Preview</span>
      </div>
      <div className="p-6 bg-white">
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>
    </div>
  );
};

export default CodePreview;
