import {describe, expect, it, beforeEach} from "vitest";
import {act, render, screen, fireEvent} from "@testing-library/react";
import App from "@/App";
import i18n from "@/lib/i18n";
import ptBR from "@/locales/pt-BR.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

describe("Portfolio Redesign — Content, Structure & Accessibility Verification", () => {
    beforeEach(async () => {
        await act(async () => {
            await i18n.changeLanguage("pt-BR");
        });
    });

    it("preserves exact section order and semantic heading hierarchy", () => {
        const {container} = render(<App/>);

        const main = container.querySelector("main");
        expect(main).toBeInTheDocument();

        const sections = Array.from(main!.querySelectorAll(":scope > section"));
        expect(sections).toHaveLength(8);
        expect(sections[1]).toHaveAttribute("id", "about");
        expect(sections[2]).toHaveAttribute("id", "experience");
        expect(sections[3]).toHaveAttribute("id", "skills");
        expect(sections[4]).toHaveAttribute("id", "projects");
        expect(sections[5]).toHaveAttribute("id", "education");
        expect(sections[6]).toHaveAttribute("id", "languages");
        expect(sections[7]).toHaveAttribute("id", "contact");

        // Verify semantic h1 and h2 headings
        const h1 = screen.getByRole("heading", {level: 1});
        expect(h1).toHaveTextContent(ptBR.hero.name);

        const h2s = screen.getAllByRole("heading", {level: 2});
        expect(h2s.map((h) => h.textContent)).toEqual([
            ptBR.about.title,
            ptBR.experience.title,
            ptBR.skills.title,
            ptBR.projects.title,
            ptBR.education.title,
            ptBR.languagesSection.title,
            ptBR.contact.title,
        ]);
    });

    it("preserves 100% of original pt-BR textual content and metrics", () => {
        render(<App/>);

        // Hero
        expect(screen.getByText(ptBR.hero.greeting)).toBeInTheDocument();
        expect(screen.getByText(ptBR.hero.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.hero.title)).toBeInTheDocument();
        expect(screen.getByText(ptBR.hero.viewProjects)).toBeInTheDocument();
        expect(screen.getByText(ptBR.hero.contact)).toBeInTheDocument();

        // About
        expect(screen.getByText(ptBR.about.bio1)).toBeInTheDocument();
        expect(screen.getByText(ptBR.about.bio2)).toBeInTheDocument();
        expect(screen.getByText(ptBR.about.bio3)).toBeInTheDocument();
        expect(screen.getByAltText(ptBR.about.imageAlt)).toHaveAttribute("src", "/images/profile-photo.png");

        // Experience
        for (const item of ptBR.experience.items) {
            expect(screen.getByText(item.company)).toBeInTheDocument();
            expect(screen.getByText(item.role)).toBeInTheDocument();
            expect(screen.getByText(item.location)).toBeInTheDocument();
            expect(screen.getByText(item.period)).toBeInTheDocument();
            for (const resp of item.responsibilities) {
                expect(screen.getByText(resp)).toBeInTheDocument();
            }
        }

        // Skills
        expect(screen.getByText(ptBR.skills.backendDevelopment)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.browserAutomation)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.cloudPersistence)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.documentProcessing)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.dataOrchestration)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.qualityEngineering)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.devops)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.automatedReports)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.testManagement)).toBeInTheDocument();
        expect(screen.getByText(ptBR.skills.allTechnologies)).toBeInTheDocument();

        // Projects
        expect(screen.getByText(ptBR.projects.portdata.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.portdata.description)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.sgdoctor.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.sgdoctor.description)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.microsservico.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.microsservico.description)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.xpathCatcher.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.xpathCatcher.description)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.viewMoreGithub)).toBeInTheDocument();
        expect(screen.getByText(ptBR.projects.viewGithubButton)).toBeInTheDocument();

        // Education
        expect(screen.getByText(ptBR.education.degree)).toBeInTheDocument();
        expect(screen.getByText(ptBR.education.institution)).toBeInTheDocument();
        expect(screen.getByText(ptBR.education.period)).toBeInTheDocument();
        expect(screen.getByText(ptBR.education.status)).toBeInTheDocument();

        // Languages
        expect(screen.getByText(ptBR.languagesSection.spanish.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.languagesSection.spanish.level)).toBeInTheDocument();
        expect(screen.getByText(ptBR.languagesSection.english.name)).toBeInTheDocument();
        expect(screen.getByText(ptBR.languagesSection.english.level)).toBeInTheDocument();
        expect(screen.getByText("100%")).toBeInTheDocument();
        expect(screen.getByText("85%")).toBeInTheDocument();
        expect(screen.getByText("60%")).toBeInTheDocument();

        // Contact
        expect(screen.getByText(ptBR.contact.description)).toBeInTheDocument();
        expect(screen.getByText(ptBR.contact.phone)).toBeInTheDocument();
        expect(screen.getByText(ptBR.contact.location)).toBeInTheDocument();
        expect(screen.getByText(ptBR.contact.linkedinDescription)).toBeInTheDocument();
        expect(screen.getByText(ptBR.contact.githubDescription)).toBeInTheDocument();
        expect(screen.getByText(ptBR.contact.gitlabDescription)).toBeInTheDocument();
        expect(screen.getByText(ptBR.contact.emailDescription)).toBeInTheDocument();
    });

    it("preserves all external links, project URLs, and navigation anchors", () => {
        const {container} = render(<App/>);

        const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));

        expect(hrefs).toContain("#about");
        expect(hrefs).toContain("#education");
        expect(hrefs).toContain("#experience");
        expect(hrefs).toContain("#skills");
        expect(hrefs).toContain("#projects");
        expect(hrefs).toContain("#contact");
        expect(hrefs).toContain("https://drive.google.com/file/d/1xCiolo4vc35d92N6LmUeDl9VOH6U4TWS/view?usp=sharing");
        expect(hrefs).toContain("https://www.portdata.tech/");
        expect(hrefs).toContain("https://sgdoctor.cpds.tech/");
        expect(hrefs).toContain("https://github.com/ucgfilho/microservice-cs");
        expect(hrefs).toContain("https://addons.mozilla.org/pt-BR/firefox/addon/xpath-catcher/");
        expect(hrefs).toContain("https://www.linkedin.com/in/ucgfilho/");
        expect(hrefs).toContain("https://github.com/ucgfilho");
        expect(hrefs).toContain("https://gitlab.com/ucgfilho");
        expect(hrefs).toContain("mailto:ucgf.profissional@gmail.com");
    });

    it("supports en and es translations without losing content", async () => {
        render(<App/>);

        await act(async () => {
            await i18n.changeLanguage("en");
        });
        expect(screen.getByText(en.hero.title)).toBeInTheDocument();
        expect(screen.getByRole("heading", {level: 2, name: en.about.title})).toBeInTheDocument();
        expect(screen.getByRole("heading", {level: 2, name: en.projects.title})).toBeInTheDocument();

        await act(async () => {
            await i18n.changeLanguage("es");
        });
        expect(screen.getByText(es.hero.title)).toBeInTheDocument();
        expect(screen.getByRole("heading", {level: 2, name: es.about.title})).toBeInTheDocument();
        expect(screen.getByRole("heading", {level: 2, name: es.projects.title})).toBeInTheDocument();
    });

    it("toggles mobile navigation menu and closes on Escape", () => {
        render(<App/>);

        const menuButton = screen.getByRole("button", {name: ptBR.nav.openMenu});
        expect(menuButton).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(menuButton);
        expect(menuButton).toHaveAttribute("aria-expanded", "true");

        fireEvent.keyDown(window, {key: "Escape"});
        expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });

    it("ensures all SVG role='img' icons have accessible labels and links have no label-content-name mismatch", () => {
        const {container} = render(<App/>);

        // Verify svg-img-alt & agent-accessibility-tree: every visible svg[role="img"] has aria-label
        const visibleSvgImgs = Array.from(
            container.querySelectorAll('ul:not([aria-hidden="true"]) svg[role="img"]'),
        );
        expect(visibleSvgImgs.length).toBeGreaterThan(0);
        for (const svg of visibleSvgImgs) {
            expect(svg.getAttribute("aria-label")).toBeTruthy();
        }

        // Verify project and contact cards do not override visible text with mismatched aria-label
        const projectLinks = Array.from(
            container.querySelectorAll("#projects a.arch-panel-interactive"),
        );
        expect(projectLinks).toHaveLength(4);
        for (const link of projectLinks) {
            expect(link.hasAttribute("aria-label")).toBe(false);
        }

        // Verify responsive WebP source in AboutSection
        const pictureSource = container.querySelector('#about picture source[type="image/webp"]');
        expect(pictureSource).toBeInTheDocument();
        expect(pictureSource?.getAttribute("srcset")).toContain("/images/profile-photo-320.webp");
    });

    it("makes header 100% opaque on scroll and opens language dropdown on click", () => {
        Object.defineProperty(window, "scrollY", {value: 0, writable: true, configurable: true});
        render(<App/>);

        const nav = screen.getByRole("navigation", {name: ptBR.nav.title});
        expect(nav.className).toContain("bg-transparent");

        act(() => {
            Object.defineProperty(window, "scrollY", {value: 120, writable: true, configurable: true});
            fireEvent.scroll(window);
        });
        expect(nav.className).toContain("bg-background");
        expect(nav.className).not.toContain("bg-transparent");

        const langTrigger = screen.getByRole("button", {name: /Português/i});
        expect(langTrigger).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(langTrigger);
        expect(langTrigger).toHaveAttribute("aria-expanded", "true");
        const englishOption = screen.getByRole("menuitemradio", {name: /English/i});
        expect(englishOption).toBeInTheDocument();

        fireEvent.click(englishOption);
        expect(langTrigger).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByText(en.hero.title)).toBeInTheDocument();
    });
});
