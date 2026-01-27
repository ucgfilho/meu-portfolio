import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitLabIcon } from "@/components/icons/GitLabIcon";

/* =============================================================================
   ContactSection - Material 3 Expressive
   
   DESIGN:
   - Cards de contato usando M3 filled card style
   - Chips para informações de contato
   - Gradientes expressivos nos ícones
   
   ACESSIBILIDADE:
   - Links com labels descritivos
   - Contraste adequado em todos os elementos
   ============================================================================= */

const contactLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ucgfilho/",
    icon: Linkedin,
    description: "Conecte-se comigo",
    color: "#0a66c2",
    activeColor: "#004182",
  },
  {
    name: "GitHub",
    href: "https://github.com/ucgfilho",
    icon: Github,
    description: "Veja meus projetos",
    color: "#333333",
    activeColor: "#1a1a1a",
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/ucgfilho",
    icon: GitLabIcon,
    description: "Mais repositórios",
    color: "#fc6d26",
    activeColor: "#e24329",
  },
  {
    name: "Email",
    href: "mailto:ucgf.profissional@gmail.com",
    icon: Mail,
    description: "ucgf.profissional@gmail.com",
    color: "#EA4335", // Gmail Red
    activeColor: "#C5221F",
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section header - M3 style */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="section-header-icon">
              <Send className="w-5 h-5" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Vamos Conversar?
            </h2>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Estou sempre aberto a novas oportunidades, colaborações e projetos
            interessantes. Não hesite em entrar em contato!
          </p>

          {/* Contact info - M3 Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-border/30">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">(73) 99847-8938</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-border/30">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm text-foreground">Bahia, Brasil</span>
            </div>
          </motion.div>

          {/* Contact links grid - M3 Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.05 * index,
                }}
              >
                <motion.a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`Contato via ${link.name}`}
                  style={{
                    backgroundColor: "hsl(var(--surface-container))",
                    borderColor: "hsl(var(--border) / 0.3)",
                  }}
                  className="rounded-2xl p-6 border transition-all duration-200 group block h-full"
                  transition={{ duration: 0.15 }}
                  whileHover={{
                    scale: 1.03,
                    y: -3,
                    backgroundColor: link.color,
                    borderColor: link.color,
                    color: "#ffffff",
                    boxShadow: `inset 0 1px 2px 0 hsl(0 0% 100% / 0.2), 0 8px 25px -5px ${link.color}80`,
                  }}
                  whileTap={{
                    scale: 0.95,
                    backgroundColor: link.activeColor,
                    borderColor: link.activeColor,
                  }}
                >
                  {/* Icon container - M3 style with primary tonal */}
                  <div className="w-12 h-12 rounded-xl bg-primary/12 flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 group-hover:scale-105 transition-all duration-200">
                    <link.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-white transition-colors duration-200">
                    {link.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate group-hover:text-white/90 transition-colors duration-200">
                    {link.description}
                  </p>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer - M3 minimal */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-24 pt-8 border-t border-border/30"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ubirajara Filho
          </p>
        </div>
      </motion.footer>
    </section>
  );
};
