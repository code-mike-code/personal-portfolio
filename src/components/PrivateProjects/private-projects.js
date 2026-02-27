import corDentMobile from '../../assets/videos/cor-dent-mobile.mp4';
import corDentDesktop from '../../assets/videos/cor-dent-desktop.mp4';

export const privateProjects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    shortDescription: "A modern dashboard for managing online store inventory, orders, and analytics in real-time.",
    fullDescription: "Complete e-commerce management platform built with React and Node.js. Features real-time inventory tracking, order processing system, customer analytics dashboard, and automated reporting. Integrated with multiple payment processors (Stripe, PayPal) and supports multi-language interface.",
    thumbnailVideo: corDentMobile,
    fullVideo: corDentDesktop,
    techStack: ["React", "Node.js", "MongoDB", "Stripe API", "GSAP"]
  },
  {
    id: 2,
    title: "SaaS Analytics Platform",
    shortDescription: "Real-time analytics and data visualization platform for tracking business metrics and KPIs.",
    fullDescription: "Enterprise-grade analytics platform with interactive data visualization, custom dashboards, and real-time metrics. Built with React for the frontend and Express.js backend. Features include user authentication, role-based access control, export functionality, and machine learning-powered insights generation.",
    thumbnailVideo: '/assets/videos/project-2.mp4',
    fullVideo: '/assets/videos/project-2-desktop.mp4',
    techStack: ["React", "D3.js", "Express.js", "PostgreSQL", "TensorFlow.js"]
  },
  {
    id: 3,
    title: "Social Media Web App",
    shortDescription: "Full-featured social networking platform with real-time messaging, feeds, and user interactions.",
    fullDescription: "Complete social media application with user authentication, post creation, real-time messaging with Socket.io, image/video uploading, likes, comments, and follow system. Includes notification system, user profiles, and trending feeds. Responsive design optimized for both desktop and mobile.",
    thumbnailVideo: '/assets/videos/project-3.mp4',
    fullVideo: '/assets/videos/project-3-desktop.mp4',
    techStack: ["React", "Firebase", "Socket.io", "Node.js", "Tailwind CSS"]
  },
  {
    id: 4,
    title: "CMS & Content Manager",
    shortDescription: "Headless CMS with intuitive interface for managing content across multiple platforms.",
    fullDescription: "Flexible headless CMS system for content creators and marketers. Features include drag-and-drop page builder, rich text editor, SEO optimization tools, content scheduling, version control, and API-driven architecture. Supports webhooks for integration with any frontend framework or static site generator.",
    thumbnailVideo: '/assets/videos/project-4.mp4',
    fullVideo: '/assets/videos/project-4-desktop.mp4',
    techStack: ["React", "GraphQL", "Node.js", "MongoDB", "Webpack"]
  }
];
