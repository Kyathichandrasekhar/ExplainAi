import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Wand2,
  History,
} from "lucide-react";
import { GenerationProgress } from "@/components/demo/GenerationProgress";
import { VideoHistory } from "@/components/demo/VideoHistory";
import { ScriptDisplay } from "@/components/demo/ScriptDisplay";
import { supabase } from "@/integrations/supabase/client";

export type GenerationStep = {
  id: string;
  label: string;
  status: "pending" | "active" | "complete" | "error";
};

export type SceneImage = {
  sceneNumber: number;
  imageUrl: string;
};

export type VideoScript = {
  title: string;
  duration: string;
  narration: string;
  scenes: {
    sceneNumber: number;
    title: string;
    description: string;
    narrationSegment: string;
    visualPrompt: string;
  }[];
  keyPoints: string[];
  summary: string;
};

export type GeneratedVideo = {
  id: string;
  question: string;
  language: string;
  title: string;
  description: string;
  script: VideoScript | null;
  sceneImages: SceneImage[];
  createdAt: Date;
};

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "te", label: "Telugu" },
];

const exampleQuestions = [
  "Explain photosynthesis in simple terms",
  "How does a black hole form?",
  "What is quantum computing?",
  "Explain machine learning to a beginner",
];

export default function Demo() {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("en");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<GeneratedVideo[]>([]);
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    { id: "script", label: "Generating AI script", status: "pending" },
    { id: "scenes", label: "Creating scene breakdown", status: "pending" },
    { id: "images", label: "Generating scene images", status: "pending" },
    { id: "complete", label: "Finalizing content", status: "pending" },
  ]);

  const updateStep = (stepIndex: number, status: GenerationStep["status"]) => {
    setGenerationSteps((steps) =>
      steps.map((s, idx) => ({
        ...s,
        status: idx === stepIndex ? status : idx < stepIndex ? "complete" : s.status,
      }))
    );
  };

  const generateSceneImages = async (scenes: VideoScript["scenes"]): Promise<SceneImage[]> => {
    const sceneImages: SceneImage[] = [];
    
    // Generate images for first 3 scenes to save time/credits
    const scenesToGenerate = scenes.slice(0, 3);
    
    for (const scene of scenesToGenerate) {
      try {
        console.log('Generating image for scene:', scene.sceneNumber);
        const { data, error } = await supabase.functions.invoke('generate-scene-image', {
          body: { 
            visualPrompt: scene.visualPrompt,
            sceneNumber: scene.sceneNumber,
            title: scene.title
          }
        });

        if (error) {
          console.error('Scene image error:', error);
          continue;
        }

        if (data?.imageUrl) {
          sceneImages.push({
            sceneNumber: scene.sceneNumber,
            imageUrl: data.imageUrl
          });
        }
      } catch (err) {
        console.error('Failed to generate image for scene:', scene.sceneNumber, err);
      }
    }

    return sceneImages;
  };

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Please enter a question",
        description: "Type a question or topic you'd like explained.",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedVideo(null);

    // Reset steps
    setGenerationSteps((steps) =>
      steps.map((s) => ({ ...s, status: "pending" }))
    );

    try {
      // Step 1: Generate AI Script
      updateStep(0, "active");
      
      const { data, error } = await supabase.functions.invoke('generate-video-script', {
        body: { question, language }
      });

      if (error) {
        console.error('Script generation error:', error);
        updateStep(0, "error");
        throw new Error(error.message || 'Failed to generate script');
      }

      if (data.error) {
        updateStep(0, "error");
        throw new Error(data.error);
      }

      const script = data.script as VideoScript;
      updateStep(0, "complete");

      // Step 2: Scene breakdown (already done by AI)
      updateStep(1, "active");
      await new Promise((r) => setTimeout(r, 500));
      updateStep(1, "complete");

      // Step 3: Generate scene images
      updateStep(2, "active");
      const sceneImages = await generateSceneImages(script.scenes);
      updateStep(2, "complete");

      // Step 4: Finalize
      updateStep(3, "active");
      await new Promise((r) => setTimeout(r, 500));
      updateStep(3, "complete");

      // Create video result
      const newVideo: GeneratedVideo = {
        id: Date.now().toString(),
        question: question,
        language: language,
        title: script.title,
        description: script.summary,
        script: script,
        sceneImages: sceneImages,
        createdAt: new Date(),
      };

      setGeneratedVideo(newVideo);
      setHistory((prev) => [newVideo, ...prev]);

      toast({
        title: "Content generated!",
        description: `Your AI explainer content is ready with ${sceneImages.length} scene images.`,
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuestion(example);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-8 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI Video Demo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Generate Your{" "}
              <span className="text-gradient">Explainer Content</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ask any question and watch as our AI creates a personalized script with AI-generated scene images and narration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Demo Area */}
      <section className="py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!isGenerating && !generatedVideo ? (
              /* Input State */
              <motion.div
                key="input"
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Input Form */}
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What would you like to learn?
                      </label>
                      <Textarea
                        placeholder="e.g., Explain quantum computing in simple terms..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={4}
                        className="resize-none text-lg"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">
                          Language
                        </label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 sm:flex-initial">
                        <label className="block text-sm font-medium mb-2 invisible">
                          Generate
                        </label>
                        <Button
                          variant="hero"
                          size="lg"
                          className="w-full sm:w-auto gap-2 h-12"
                          onClick={handleGenerate}
                        >
                          <Wand2 className="w-5 h-5" />
                          Generate Content
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example Questions */}
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Try an example:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {exampleQuestions.map((example) => (
                      <button
                        key={example}
                        onClick={() => handleExampleClick(example)}
                        className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* History Button */}
                {history.length > 0 && (
                  <div className="mt-8 text-center">
                    <Button
                      variant="ghost"
                      className="gap-2"
                      onClick={() => setShowHistory(true)}
                    >
                      <History className="w-4 h-4" />
                      View History ({history.length})
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : isGenerating ? (
              /* Generating State */
              <motion.div
                key="generating"
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GenerationProgress steps={generationSteps} question={question} />
              </motion.div>
            ) : generatedVideo ? (
              /* Result State */
              <motion.div
                key="result"
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ScriptDisplay 
                  video={generatedVideo} 
                  onRegenerate={handleRegenerate}
                  onNewVideo={() => {
                    setGeneratedVideo(null);
                    setQuestion("");
                  }}
                />

                {/* History Link */}
                {history.length > 1 && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="ghost"
                      className="gap-2"
                      onClick={() => setShowHistory(true)}
                    >
                      <History className="w-4 h-4" />
                      View All Content ({history.length})
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      {/* Video History Modal */}
      <VideoHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onSelectVideo={(video) => {
          setGeneratedVideo(video);
          setShowHistory(false);
        }}
      />
    </Layout>
  );
}
