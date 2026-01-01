import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  RefreshCw,
  Share2,
  Play,
  BookOpen,
  Lightbulb,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GeneratedVideo } from "@/pages/Demo";
import { useState } from "react";

interface ScriptDisplayProps {
  video: GeneratedVideo;
  onRegenerate: () => void;
  onNewVideo: () => void;
}

export function ScriptDisplay({ video, onRegenerate, onNewVideo }: ScriptDisplayProps) {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this with others.",
    });
  };

  const handleDownload = () => {
    if (!video.script) return;
    
    const content = `
# ${video.script.title}

## Summary
${video.script.summary}

## Key Points
${video.script.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## Full Narration
${video.script.narration}

## Scene Breakdown
${video.script.scenes.map((scene) => `
### Scene ${scene.sceneNumber}: ${scene.title}
**Description:** ${scene.description}
**Visual:** ${scene.visualPrompt}
**Narration:** ${scene.narrationSegment}
`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${video.script.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Script saved as Markdown file.",
    });
  };

  if (!video.script) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No script data available</p>
      </div>
    );
  }

  const { script, sceneImages } = video;
  const hasImages = sceneImages && sceneImages.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sceneImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sceneImages.length) % sceneImages.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {script.title}
        </motion.h2>
        <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {script.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {script.scenes.length} scenes
          </span>
          {hasImages && (
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              {sceneImages.length} images
            </span>
          )}
        </div>
      </div>

      {/* Scene Images Slideshow */}
      {hasImages && (
        <motion.div 
          className="relative rounded-2xl overflow-hidden bg-card border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="aspect-video relative">
            <img 
              src={sceneImages[currentImageIndex].imageUrl} 
              alt={`Scene ${sceneImages[currentImageIndex].sceneNumber}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm font-medium">
                Scene {sceneImages[currentImageIndex].sceneNumber}: {script.scenes[sceneImages[currentImageIndex].sceneNumber - 1]?.title}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {script.scenes[sceneImages[currentImageIndex].sceneNumber - 1]?.narrationSegment?.slice(0, 100)}...
              </p>
            </div>
            
            {/* Navigation */}
            {sceneImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          
          {/* Dots */}
          {sceneImages.length > 1 && (
            <div className="flex justify-center gap-2 p-4">
              {sceneImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-secondary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Summary Card */}
      <motion.div 
        className="bg-gradient-accent/10 rounded-2xl p-6 border border-secondary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-secondary" />
          Summary
        </h3>
        <p className="text-muted-foreground">{script.summary}</p>
      </motion.div>

      {/* Key Points */}
      <motion.div 
        className="bg-card rounded-2xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold mb-4">Key Points</h3>
        <ul className="space-y-3">
          {script.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Scene Breakdown with Images */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-semibold mb-4">Scene Breakdown</h3>
        <div className="grid gap-4">
          {script.scenes.map((scene, index) => {
            const sceneImage = sceneImages?.find(img => img.sceneNumber === scene.sceneNumber);
            
            return (
              <motion.div
                key={scene.sceneNumber}
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-secondary/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Scene Image Thumbnail */}
                  {sceneImage && (
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={sceneImage.imageUrl} 
                        alt={`Scene ${scene.sceneNumber}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-secondary">{scene.sceneNumber}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-2">{scene.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{scene.description}</p>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm italic">"{scene.narrationSegment}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Full Narration */}
      <motion.div 
        className="bg-card rounded-2xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-secondary" />
          Full Narration Script
        </h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {script.narration}
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        className="bg-card rounded-2xl p-6 border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="hero" className="gap-2" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download Script
          </Button>
          <Button variant="outline" className="gap-2" onClick={onRegenerate}>
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            variant="ghost"
            className="ml-auto gap-2"
            onClick={onNewVideo}
          >
            Generate New Content
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
