import { motion } from "framer-motion";
import { FileText, Mic, Video, Wand2, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";
import type { GenerationStep } from "@/pages/Demo";

interface GenerationProgressProps {
  steps: GenerationStep[];
  question: string;
}

const stepIcons = {
  script: Sparkles,
  scenes: FileText,
  narration: Mic,
  visuals: Wand2,
  complete: Video,
};

export function GenerationProgress({ steps, question }: GenerationProgressProps) {
  return (
    <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
          <Wand2 className="w-8 h-8 text-secondary animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Creating Your Content</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          "{question.slice(0, 60)}{question.length > 60 ? "..." : ""}"
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = stepIcons[step.id as keyof typeof stepIcons] || FileText;
          const isComplete = step.status === "complete";
          const isActive = step.status === "active";
          const isError = step.status === "error";

          return (
            <motion.div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                isError
                  ? "bg-destructive/10 border border-destructive/20"
                  : isActive
                  ? "bg-secondary/10 border border-secondary/20"
                  : isComplete
                  ? "bg-muted/50"
                  : "bg-muted/20"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isError
                    ? "bg-destructive text-destructive-foreground"
                    : isActive
                    ? "bg-secondary text-secondary-foreground"
                    : isComplete
                    ? "bg-secondary/20 text-secondary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isError ? (
                  <AlertCircle className="w-5 h-5" />
                ) : isComplete ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <span
                  className={`font-medium ${
                    isError
                      ? "text-destructive"
                      : isActive
                      ? "text-foreground"
                      : isComplete
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="flex-shrink-0">
                {isActive && (
                  <span className="text-xs font-medium text-secondary">In progress...</span>
                )}
                {isComplete && (
                  <span className="text-xs font-medium text-muted-foreground">Complete</span>
                )}
                {isError && (
                  <span className="text-xs font-medium text-destructive">Failed</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Estimated Time */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          AI is generating your personalized content...
        </p>
      </div>
    </div>
  );
}
