import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Play,
  Sparkles,
  Zap,
  Globe,
  Users,
  BookOpen,
  Brain,
  Volume2,
  Languages,
  Accessibility,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const features = [
  {
    icon: Sparkles,
    title: "AI-Generated Videos",
    description: "Ask any question and receive a personalized explainer video with narration and visuals.",
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Content adapts to your level - beginner, intermediate, or advanced explanations.",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Learn in your preferred language with automatic translation and localized content.",
  },
  {
    icon: Volume2,
    title: "AI Narration",
    description: "Crystal-clear AI-generated voiceovers that guide you through every concept.",
  },
  {
    icon: Accessibility,
    title: "Accessibility First",
    description: "Subtitles, clear fonts, and audio modes for learners with different needs.",
  },
  {
    icon: BarChart3,
    title: "Teacher Dashboard",
    description: "Track student progress and gain insights into learning patterns.",
  },
];

const targetUsers = [
  { icon: BookOpen, label: "Students" },
  { icon: Users, label: "Teachers" },
  { icon: Brain, label: "Visual Learners" },
  { icon: Globe, label: "Global Learners" },
];

const steps = [
  {
    number: "01",
    title: "Ask Your Question",
    description: "Type any topic or concept you want to understand better.",
  },
  {
    number: "02",
    title: "AI Generates Video",
    description: "Our AI creates a personalized explainer video with animations and narration.",
  },
  {
    number: "03",
    title: "Learn & Download",
    description: "Watch, learn, and download your video for offline access anytime.",
  },
];

const metrics = [
  { value: "10K+", label: "Videos Generated" },
  { value: "50+", label: "Languages" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Available" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Explain - Ai</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Turn Any Question Into an{" "}
              <span className="text-gradient">AI-Generated Explainer Video</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Personalized, visual, and accessible learning powered by AI — for everyone. 
              Ask anything, learn visually.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/demo">
                <Button variant="hero" size="xl" className="gap-2">
                  <Play className="w-5 h-5" />
                  Try Demo
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="hero-outline" size="xl" className="gap-2">
                  Watch Example
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex flex-wrap items-center justify-center gap-8"
            >
              {targetUsers.map((user) => (
                <div key={user.label} className="flex items-center gap-2 text-muted-foreground">
                  <user.icon className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">{user.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              The Problem We're Solving
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional learning is often text-heavy and one-size-fits-all. Many students struggle 
              with complex concepts because they learn differently. Visual learners, non-native speakers, 
              and students with learning challenges are often left behind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform any question into an engaging explainer video.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg h-full hover:shadow-xl transition-shadow">
                  <span className="text-6xl font-bold text-secondary/20">{step.number}</span>
                  <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-secondary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge AI technology to deliver the best learning experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powered by Advanced AI</h2>
              <p className="text-lg text-muted-foreground">
                Built on enterprise-grade technology for reliability and scale.
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                "Azure OpenAI for intelligent script generation",
                "Azure Cognitive Services for natural text-to-speech",
                "Azure ML for personalized learning paths",
                "Azure Media Services for video processing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-background">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-gradient-dark text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Making an Impact</h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Democratizing high-quality learning through AI-powered visual explanations.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-primary-foreground/70">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center bg-gradient-primary rounded-3xl p-12 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Learning?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join the beta and experience the future of personalized education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/demo">
                <Button variant="secondary" size="xl" className="gap-2 bg-card text-foreground hover:bg-card/90">
                  <Play className="w-5 h-5" />
                  Try Demo Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Join Beta Waitlist
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
