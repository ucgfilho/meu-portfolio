import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitLabIcon } from "@/components/icons/GitLabIcon";

const contactLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ucgfilho/",
    icon: Linkedin,
    color: "from-blue-500 to-blue-600",
    description: "Conecte-se comigo",
  },
  {
    name: "GitHub",
    href: "https://github.com/ucgfilho",
    icon: Github,
    color: "from-gray-600 to-gray-800",
    description: "Veja meus projetos",
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/ucgfilho",
    icon: GitLabIcon,
    color: "from-orange-500 to-red-500",
    description: "Mais repositórios",
  },
  {
    name: "Email",
    href: "mailto:ucgf.profissional@gmail.com",
    icon: Mail,
    color: "from-primary to-secondary",
    description: "ucgf.profissional@gmail.com",
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Vamos Conversar?</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades, colaborações e projetos interessantes.
            Não hesite em entrar em contato!
          </p>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-border/50">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">(73) 99847-8938</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-border/50">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Bahia, Brasil</span>
            </div>
          </motion.div>

          {/* Contact links grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <link.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {link.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="mailto:ucgf.profissional@gmail.com">
                <Mail className="w-5 h-5" />
                Enviar Email
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-24 pt-8 border-t border-border/50"
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
