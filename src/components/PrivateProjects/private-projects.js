import corDentMobile from '../../assets/videos/cor-dent-mobile.mp4';
import corDentDesktop from '../../assets/videos/cor-dent-desktop.mp4';
import vitalisCardioMobile from '../../assets/videos/vitalis-cardio-mobile.mp4';
import vitalisCardioDesktop from '../../assets/videos/vitalis-cardio-desktop.mp4';
import pewnyLeasingMobile from '../../assets/videos/pewny-leasing24-mobile.mp4';
import pewnyLeasingDesktop from '../../assets/videos/pewny-leasing24-desktop.mp4';
import dragoPartnerMobile from '../../assets/videos/drago-partner-mobile.mp4';
import dragoPartnerDesktop from '../../assets/videos/drago-partner-desktop.mp4';
import cudownaDoniczkaMobile from '../../assets/videos/cudowna-doniczka-mobile.mp4';
import cudownaDoniczkaDesktop from '../../assets/videos/cudowna-doniczka-desktop.mp4';

// Tylko dane nietłumaczalne — opisy żyją w src/i18n/locales/*.json
// pod kluczami work.projects.<id>.short / .full
export const privateProjects = [
  {
    id: 1,
    title: "Vitalis Cardio",
    liveUrl: "https://vitalis-cardio.pl/",
    thumbnailVideo: vitalisCardioMobile,
    tabletVideo: null,
    fullVideo: vitalisCardioDesktop,
    techStack: ["React", "Tailwind CSS", "Vite", "SEO"]
  },
  {
    id: 2,
    title: "Pewny Leasing",
    liveUrl: "https://pewnyleasing24.pl/",
    thumbnailVideo: pewnyLeasingMobile,
    tabletVideo: null,
    fullVideo: pewnyLeasingDesktop,
    techStack: ["React", "GSAP", "Responsive Design", "SEO"]
  },
  {
    id: 3,
    title: "Drago Partner",
    liveUrl: "https://dragopartner.pl/",
    thumbnailVideo: dragoPartnerMobile,
    tabletVideo: null,
    fullVideo: dragoPartnerDesktop,
    techStack: ["React", "Responsive Design", "SEO", "Performance"]
  },
  {
    id: 4,
    title: "Cor-Dent Żurakowscy",
    liveUrl: "https://cor-dent-zurakowscy.pl/",
    thumbnailVideo: corDentMobile,
    tabletVideo: null,
    fullVideo: corDentDesktop,
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"]
  },
  {
    id: 5,
    title: "Cudowna Doniczka",
    liveUrl: "https://cudownadoniczka.pl/",
    thumbnailVideo: cudownaDoniczkaMobile,
    tabletVideo: null,
    fullVideo: cudownaDoniczkaDesktop,
    techStack: ["React", "GSAP", "Responsive Design", "E-commerce"]
  }
];
