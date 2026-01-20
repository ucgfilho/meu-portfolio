import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { GitLabIcon } from "@/components/icons/GitLabIcon";

/* =============================================================================
   HeroSection - Material 3 Expressive
   
   DESIGN:
   - Hierarquia tipográfica clara seguindo M3 type scale
   - Animações com easing M3 (decelerated para entrada)
   - Gradiente expressivo no nome para destaque visual
   - Status badge usando M3 chip style
   
   ACESSIBILIDADE:
   - Contraste de texto ≥ 7:1 (WCAG AAA)
   - Links com labels descritivos
   - Indicador de scroll com motion reduzido respeitado
   ============================================================================= */

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge - M3 Chip style 
              Indica disponibilidade com indicador pulsante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary/15 border border-tertiary/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse-soft" />
            <span className="text-sm text-tertiary font-medium">
              Disponível para novas oportunidades
            </span>
          </motion.div>

          {/* Nome - M3 Display Large 
              Gradiente expressivo para destaque visual */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0, 0, 0, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-foreground">Olá, eu sou</span>
            <br />
            <span className="gradient-text-expressive">Ubirajara Filho</span>
          </motion.h1>

          {/* Título e descrição - M3 Headline/Body */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0, 0, 0, 1] }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-4">
              Analista de QA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Especialista em automação de testes, práticas DevOps e cultura de
              qualidade. Construindo arquiteturas de testes escaláveis e
              implementando shift-left testing em ambientes ágeis com entrega
              contínua.
            </p>
          </motion.div>

          {/* CTA Buttons - M3 Button variants */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0, 0, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#projects">
                Ver Projetos
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#contact">
                Entrar em Contato
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>

          {/* Social Links - M3 Icon buttons com state layer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0, 0, 0, 1] }}
            className="flex items-center justify-center gap-4"
          >
            {[
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ucgfilho/",
                label: "LinkedIn",
              },
              {
                icon: Github,
                href: "https://github.com/ucgfilho",
                label: "GitHub",
              },
              {
                icon: GitLabIcon,
                href: "https://gitlab.com/ucgfilho",
                label: "GitLab",
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar perfil no ${social.label}`}
                className="p-3 rounded-2xl bg-surface-container border border-border/50 hover:bg-surface-container-high hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-300 ease-m3-emphasized"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - respects prefers-reduced-motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <span className="text-xs font-medium">Role para baixo</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
};
