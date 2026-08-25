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

// Postery (pierwsza klatka wideo) — pokazywane natychmiast; wideo dobiera się
// dopiero gdy sekcja wjedzie w viewport (patrz WorkShowcase). Bez posterów
// aktywne wideo z preload="auto" ściągało 4–6 MB od razu na starcie strony.
import corDentMobilePoster from '../../assets/videos/posters/cor-dent-mobile.webp';
import corDentDesktopPoster from '../../assets/videos/posters/cor-dent-desktop.webp';
import vitalisCardioMobilePoster from '../../assets/videos/posters/vitalis-cardio-mobile.webp';
import vitalisCardioDesktopPoster from '../../assets/videos/posters/vitalis-cardio-desktop.webp';
import pewnyLeasingMobilePoster from '../../assets/videos/posters/pewny-leasing24-mobile.webp';
import pewnyLeasingDesktopPoster from '../../assets/videos/posters/pewny-leasing24-desktop.webp';
import dragoPartnerMobilePoster from '../../assets/videos/posters/drago-partner-mobile.webp';
import dragoPartnerDesktopPoster from '../../assets/videos/posters/drago-partner-desktop.webp';
import cudownaDoniczkaMobilePoster from '../../assets/videos/posters/cudowna-doniczka-mobile.webp';
import cudownaDoniczkaDesktopPoster from '../../assets/videos/posters/cudowna-doniczka-desktop.webp';

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
    thumbnailPoster: vitalisCardioMobilePoster,
    fullPoster: vitalisCardioDesktopPoster,
    techStack: ["React", "Tailwind CSS", "Vite", "SEO"]
  },
  {
    id: 2,
    title: "Pewny Leasing",
    liveUrl: "https://pewnyleasing24.pl/",
    thumbnailVideo: pewnyLeasingMobile,
    tabletVideo: null,
    fullVideo: pewnyLeasingDesktop,
    thumbnailPoster: pewnyLeasingMobilePoster,
    fullPoster: pewnyLeasingDesktopPoster,
    techStack: ["React", "GSAP", "Responsive Design", "SEO"]
  },
  {
    id: 3,
    title: "Drago Partner",
    liveUrl: "https://dragopartner.pl/",
    thumbnailVideo: dragoPartnerMobile,
    tabletVideo: null,
    fullVideo: dragoPartnerDesktop,
    thumbnailPoster: dragoPartnerMobilePoster,
    fullPoster: dragoPartnerDesktopPoster,
    techStack: ["React", "Responsive Design", "SEO", "Performance"]
  },
  {
    id: 4,
    title: "Cor-Dent Żurakowscy",
    liveUrl: "https://cor-dent-zurakowscy.pl/",
    thumbnailVideo: corDentMobile,
    tabletVideo: null,
    fullVideo: corDentDesktop,
    thumbnailPoster: corDentMobilePoster,
    fullPoster: corDentDesktopPoster,
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"]
  },
  {
    id: 5,
    title: "Cudowna Doniczka",
    liveUrl: "https://cudownadoniczka.pl/",
    thumbnailVideo: cudownaDoniczkaMobile,
    tabletVideo: null,
    fullVideo: cudownaDoniczkaDesktop,
    thumbnailPoster: cudownaDoniczkaMobilePoster,
    fullPoster: cudownaDoniczkaDesktopPoster,
    techStack: ["React", "GSAP", "Responsive Design", "E-commerce"]
  }
];
