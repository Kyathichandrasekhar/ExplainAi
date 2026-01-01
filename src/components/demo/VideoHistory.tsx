import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GeneratedVideo } from "@/pages/Demo";

interface VideoHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedVideo[];
  onSelectVideo: (video: GeneratedVideo) => void;
}

export function VideoHistory({ isOpen, onClose, history, onSelectVideo }: VideoHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-2xl z-50 overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold">Video History</h2>
                <p className="text-sm text-muted-foreground">
                  {history.length} video{history.length !== 1 ? "s" : ""} generated
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Video List */}
            <div className="overflow-y-auto h-[calc(100vh-100px)] p-4 space-y-4">
              {history.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="bg-background rounded-xl p-4 border border-border/50 cursor-pointer hover:border-secondary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video rounded-lg bg-muted mb-3 relative overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-dark">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-secondary ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {video.question}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(video.createdAt)}</span>
                  </div>
                </motion.div>
              ))}

              {history.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No videos generated yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
