import corDentMobile from '../../assets/videos/cor-dent-mobile.mp4';
import corDentTablet from '../../assets/videos/cor-dent-tablet.mp4';
import corDentDesktop from '../../assets/videos/cor-dent-desktop.mp4';

// Tylko dane nietłumaczalne — opisy żyją w src/i18n/locales/*.json
// pod kluczami work.projects.<id>.short / .full
export const privateProjects = [
  {
    id: 1,
    title: "Vitalis Cardio",
    liveUrl: "https://vitalis-cardio.pl/",
    thumbnailVideo: null,
    tabletVideo: null,
    fullVideo: null,
    techStack: ["React", "Tailwind CSS", "Vite", "SEO"]
  },
  {
    id: 2,
    title: "Pewny Leasing",
    liveUrl: "https://pewnyleasing24.pl/",
    thumbnailVideo: null,
    tabletVideo: null,
    fullVideo: null,
    techStack: ["React", "GSAP", "Responsive Design", "SEO"]
  },
  {
    id: 3,
    title: "Drago Partner",
    liveUrl: "https://dragopartner.pl/",
    thumbnailVideo: null,
    tabletVideo: null,
    fullVideo: null,
    techStack: ["React", "Responsive Design", "SEO", "Performance"]
  },
  {
    id: 4,
    title: "Cor-Dent Żurakowscy",
    liveUrl: "https://cor-dent-zurakowscy.pl/",
    thumbnailVideo: corDentMobile,
    tabletVideo: corDentTablet,
    fullVideo: corDentDesktop,
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"]
  },
  {
    id: 5,
    title: "Cudowna Doniczka",
    liveUrl: "https://cudownadoniczka.pl/",
    thumbnailVideo: null,
    tabletVideo: null,
    fullVideo: null,
    techStack: ["React", "GSAP", "Responsive Design", "E-commerce"]
  }
];
