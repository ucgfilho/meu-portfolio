import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { GitLabIcon } from "@/components/icons/GitLabIcon";

/* =============================================================================
   HeroSection - iOS 26 Liquid Glass
   
   DESIGN:
   - Tipografia fina e elegante com tracking aumentado
   - Gradiente Aurora no nome
   - Botões Liquid Glass com specular highlight
   - Animações spring para feedback fluido
   ============================================================================= */

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge - Glass chip */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
            style={{
              background: "hsl(var(--tertiary) / 0.1)",
              border: "1px solid hsl(var(--tertiary) / 0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1), 0 0 20px -5px hsl(var(--tertiary) / 0.3)",
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse-soft"
              style={{ background: "hsl(var(--tertiary))", boxShadow: "0 0 8px hsl(var(--tertiary))" }}
            />
            <span className="text-sm text-tertiary font-medium tracking-wide">
              Disponível para novas oportunidades
            </span>
          </motion.div>

          {/* Nome - Display com gradient Aurora */}
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.15, 
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 tracking-tight"
          >
            <span className="text-foreground font-light">Olá, eu sou</span>
            <br />
            <span className="gradient-text">Ubirajara Filho</span>
          </motion.h1>

          {/* Título e descrição */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.3, 
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="mb-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-primary mb-5 tracking-wide">
              Analista de QA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed tracking-wide font-light">
              Especialista em automação de testes, práticas DevOps e cultura de
              qualidade. Construindo arquiteturas de testes escaláveis e
              implementando shift-left testing em ambientes ágeis com entrega
              contínua.
            </p>
          </motion.div>

          {/* CTA Buttons - Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.45, 
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
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

          {/* Social Links - Liquid Glass icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.6, 
              ease: [0.34, 1.56, 0.64, 1]
            }}
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
                className="p-4 rounded-2xl text-muted-foreground hover:text-foreground transition-all duration-300"
                style={{
                  background: "hsl(0 0% 100% / 0.05)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "inset 0 1px 1px 0 hsl(0 0% 100% / 0.1)",
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -4,
                  boxShadow: "inset 0 1px 2px 0 hsl(0 0% 100% / 0.2), 0 8px 25px -5px hsl(var(--primary) / 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <span className="text-xs font-light tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
};
