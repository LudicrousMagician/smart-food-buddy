import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { useAnalysis, generateMockAnalysis } from '@/context/AnalysisContext';
import { Upload as UploadIcon, Image, X, Camera, Scan } from 'lucide-react';

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { setCurrentAnalysis, addToHistory, isAnalyzing, setIsAnalyzing } = useAnalysis();
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !preview) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate mock analysis result
    const analysis = generateMockAnalysis(selectedFile.name.replace(/\.[^/.]+$/, ''), preview);
    
    setCurrentAnalysis(analysis);
    addToHistory(analysis);
    setIsAnalyzing(false);
    navigate('/analysis');
  };

  return (
    <Layout>
      <div className="content-container">
        <div className="max-w-2xl mx-auto animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Analyze Food Image
            </h1>
            <p className="text-muted-foreground">
              Upload a food label or menu image for AI-powered analysis
            </p>
          </div>

          {/* Upload Area */}
          <div className="card-elevated p-8">
            {!preview ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center">
                    <UploadIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Drop your image here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, PNG, WEBP (max 10MB)
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="btn-secondary text-sm py-2 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Browse Files
                    </button>
                    <button
                      type="button"
                      className="btn-outline text-sm py-2 px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={preview}
                    alt="Food preview"
                    className="w-full max-h-80 object-contain rounded-lg bg-muted"
                  />
                  <button
                    onClick={clearSelection}
                    className="absolute top-2 right-2 w-8 h-8 bg-foreground/80 hover:bg-foreground rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-background" />
                  </button>
                </div>

                {/* File Info */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Image className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{selectedFile?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearSelection}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Change
                  </button>
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={isAnalyzing}
                  className="btn-primary w-full"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <Loader size="sm" text="" />
                      <span>Analyzing Image...</span>
                    </div>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2" />
                      Analyze Image
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Tips for best results:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure the food label or menu text is clearly visible</li>
              <li>• Avoid blurry or low-resolution images</li>
              <li>• Include the full ingredient list if possible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Analyzing Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center animate-slide-up">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scan className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              Analyzing Your Food
            </h3>
            <p className="text-muted-foreground mb-4">
              Our AI is extracting and analyzing ingredients...
            </p>
            <Loader size="md" text="" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Upload;
