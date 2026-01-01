import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Brain,
  Languages,
  Volume2,
  Accessibility,
  BarChart3,
  MessageSquareText,
  Palette,
  Download,
  Share2,
  History,
  Subtitles,
  Play,
  CheckCircle2,
} from "lucide-react";

const mainFeatures = [
  {
    icon: Sparkles,
    title: "AI-Generated Explainer Videos",
    description: "Ask any question and our AI creates a complete explainer video with narration, visuals, and animations. No templates, no manual editing — just intelligent content generation.",
    highlights: ["Custom script generation", "Scene-by-scene breakdown", "Topic-relevant animations"],
  },
  {
    icon: Brain,
    title: "Adaptive Difficulty Levels",
    description: "Content automatically adjusts to match your understanding. Choose beginner, intermediate, or advanced explanations for any topic.",
    highlights: ["Personalized complexity", "Progressive learning", "Concept scaffolding"],
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Learn in your preferred language. Our AI generates content in English, Hindi, Telugu, and more languages coming soon.",
    highlights: ["Native language learning", "Accurate translations", "Cultural context"],
  },
  {
    icon: Volume2,
    title: "AI Voice Narration",
    description: "Crystal-clear, natural-sounding AI voices guide you through every concept. Choose from multiple voice styles and accents.",
    highlights: ["Natural speech patterns", "Clear pronunciation", "Engaging delivery"],
  },
  {
    icon: Palette,
    title: "Dynamic Visual Animations",
    description: "Each video features custom-generated animations that illustrate concepts visually. Complex ideas become simple through motion graphics.",
    highlights: ["Topic-specific visuals", "Smooth animations", "Visual metaphors"],
  },
  {
    icon: Accessibility,
    title: "Accessibility Features",
    description: "Built for everyone. Automatic subtitles, adjustable playback speed, and high-contrast modes ensure no learner is left behind.",
    highlights: ["Auto-generated captions", "Screen reader support", "Adjustable settings"],
  },
];

const additionalFeatures = [
  { icon: Download, label: "Download Videos", description: "Save videos for offline learning" },
  { icon: Share2, label: "Easy Sharing", description: "Share videos with classmates" },
  { icon: History, label: "Learning History", description: "Access all your generated videos" },
  { icon: Subtitles, label: "Subtitles", description: "Auto-generated captions" },
  { icon: MessageSquareText, label: "Quiz Mode", description: "Test your understanding" },
  { icon: BarChart3, label: "Teacher Dashboard", description: "Track student progress" },
];

export default function Features() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-12 pb-24 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-8">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Powerful Features</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Everything You Need for{" "}
              <span className="text-gradient">Visual Learning</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the full suite of AI-powered features designed to transform how you learn and understand complex topics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Content */}
                <div className="flex-1 max-w-xl">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-sm font-medium">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full max-w-lg">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-secondary/5 to-accent/5 border border-border/50 shadow-xl flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
                      <feature.icon className="w-10 h-10 text-secondary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">And Much More</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Additional tools and features to enhance your learning experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-dark text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Experience It?
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8">
              Try our demo and see how AI can transform your learning experience.
            </p>
            <Link to="/demo">
              <Button variant="secondary" size="xl" className="gap-2 bg-card text-foreground hover:bg-card/90">
                <Play className="w-5 h-5" />
                Try Demo Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
