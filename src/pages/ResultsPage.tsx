import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Copy,
  Download,
  Eye,
  Code2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Header from "../components/Header";
import CodePreview from "../components/CodePreview";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const { imageData, fileName } = location.state || {};

  useEffect(() => {
    if (!imageData) {
      navigate("/");
      return;
    }

    // Simulate code generation based on the uploaded image
    // In a real app, this would be an AI service call
    const mockGeneratedCode = generateMockCode(fileName);
    setGeneratedCode(mockGeneratedCode);
  }, [imageData, fileName, navigate]);

  const generateMockCode = (_fileName: string) => {
    // This generates realistic-looking React + Tailwind code
    // In production, this would be replaced with actual AI-generated code
    return `import React from 'react'

const GeneratedComponent = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the next generation of digital solutions designed
          specifically for modern businesses and creative professionals.
        </p>
      </header>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
          <p className="text-gray-600">
            Intuitive interface designed for seamless user experience
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-gray-600">
            Optimized performance for rapid loading and smooth interactions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Innovative</h3>
          <p className="text-gray-600">
            Cutting-edge technology that pushes the boundaries of possibility
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
          Get Started Today
        </button>
      </div>
    </div>
  )
}

export default GeneratedComponent`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GeneratedComponent.tsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!imageData) return null;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Upload
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Generated Code</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </button>
            <button
              onClick={downloadCode}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Original Image */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Original Screenshot
              </h3>
              <img
                src={imageData}
                alt="Uploaded screenshot"
                className="w-full rounded-lg border border-gray-200"
              />
              <p className="text-sm text-gray-500 mt-2">{fileName}</p>
            </div>
          </div>

          {/* Code/Preview Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors
                    ${
                      activeTab === "code"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  <Code2 className="w-4 h-4" />
                  React Code
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors
                    ${
                      activeTab === "preview"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  <Eye className="w-4 h-4" />
                  Live Preview
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "code" ? (
                  <div className="rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language="tsx"
                      style={tomorrow}
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                      showLineNumbers
                    >
                      {generatedCode}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <CodePreview code={generatedCode} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
