import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Upload, Image, Zap, Code, Sparkles, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);

      // Simulate upload and processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Convert file to base64 for passing to results page
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        navigate("/results", {
          state: {
            imageData: base64,
            fileName: file.name,
          },
        });
      };
      reader.readAsDataURL(file);
    },
    [navigate],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
    },
    multiple: false,
    disabled: isUploading,
  });

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate clean, responsive code in seconds",
    },
    {
      icon: Code,
      title: "React + Tailwind",
      description: "Production-ready components with modern styling",
    },
    {
      icon: Sparkles,
      title: "Pixel Perfect",
      description: "Faithful recreation of your designs",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-16 lg:py-24">
          <div className="fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Turn Screenshots into
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Clean Code
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Upload any design screenshot and instantly get production-ready
              React + Tailwind CSS code. Perfect for developers, designers, and
              startups who want to move fast.
            </p>
          </div>

          {/* Upload Area */}
          <div className="max-w-2xl mx-auto mb-16 fade-in">
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50 scale-105"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }
                ${isUploading ? "pointer-events-none opacity-50" : ""}
              `}
            >
              <input {...getInputProps()} />

              {isUploading ? (
                <div className="text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg font-medium text-gray-700">
                    Processing your screenshot...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Analyzing design patterns and generating code
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isDragActive ? (
                      <Upload className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Image className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isDragActive
                      ? "Drop your screenshot here"
                      : "Upload your design screenshot"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your image, or click to browse
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2">
                    Choose File
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Supports PNG, JPG, JPEG, GIF, BMP, WebP
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 fade-in">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
