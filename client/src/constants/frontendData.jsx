import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaCode,
  FaMobile,
  FaCogs,
  FaShieldAlt,
  FaServer,
  FaGraduationCap,
  FaLock,
  FaGlobe,
  FaSearch,
  FaGlobeAmericas,
  FaDesktop,
  FaUpload,
} from "react-icons/fa";
import { SiTypescript, SiJest, SiTailwindcss, SiSass, SiSocketdotio, SiNextdotjs } from "react-icons/si";
import { MdOutlineSpeed, MdOutlineAccessibility, MdOutlineLanguage, MdOutlinePayment, MdOutlineAnalytics } from "react-icons/md";

export const frontendTreeData = {
  id: "frontend",
  title: "Frontend Development",
  icon: <FaGlobe className="text-blue-500" />,
  description: "Complete frontend development roadmap",
  children: [
    {
      id: "foundations",
      title: "1. Web Foundations",
      icon: <FaGlobe className="text-blue-400" />,
      description: "Core web technologies and fundamentals",
      children: [
        {
          id: "web-fundamentals",
          title: "Web Fundamentals",
          icon: <FaGlobe className="text-blue-500" />,
          description: "DNS, HTTP/HTTPS, TLS basics, Browser rendering process, Domain, hosting, deployment overview, DevTools essentials",
          color: "text-blue-400",
          bgColor: "bg-blue-500/10"
        },
        {
          id: "html",
          title: "Semantic HTML",
          icon: <FaHtml5 className="text-orange-500" />,
          description: "Semantic tags and structure, Forms and validation attributes, Accessibility (ARIA roles, screen readers)",
          color: "text-orange-400",
          bgColor: "bg-orange-500/10"
        },
        {
          id: "seo",
          title: "SEO Implementation",
          icon: <FaSearch className="text-green-500" />,
          description: "Meta tags (title, description), OpenGraph, canonical links, robots.txt, sitemap.xml configuration, Lighthouse SEO audits",
          color: "text-green-400",
          bgColor: "bg-green-500/10"
        }
      ]
    },
    {
      id: "styling",
      title: "2. CSS & Styling",
      icon: <FaCss3Alt className="text-blue-400" />,
      description: "Styling and layout technologies",
      children: [
        {
          id: "css-foundation",
          title: "CSS Foundation",
          icon: <FaCss3Alt className="text-blue-500" />,
          description: "Box model, selectors, specificity, Flexbox and Grid layouts, Positioning and media queries",
          color: "text-blue-400",
          bgColor: "bg-blue-500/10"
        },
        {
          id: "css-libraries",
          title: "CSS Libraries",
          icon: <SiTailwindcss className="text-cyan-500" />,
          description: "Tailwind CSS (utility-first framework), Bootstrap (optional)",
          color: "text-cyan-400",
          bgColor: "bg-cyan-500/10"
        },
        {
          id: "css-preprocessors",
          title: "CSS Preprocessors",
          icon: <SiSass className="text-pink-500" />,
          description: "SCSS/SASS fundamentals, Nesting, mixins, variables",
          color: "text-pink-400",
          bgColor: "bg-pink-500/10"
        }
      ]
    },
    {
      id: "javascript",
      title: "3. JavaScript",
      icon: <FaJs className="text-yellow-400" />,
      description: "JavaScript programming fundamentals",
      children: [
        {
          id: "js-foundation",
          title: "JavaScript Foundation",
          icon: <FaJs className="text-yellow-400" />,
          description: "Variables, functions, loops, Arrays, objects, ES6+ features, DOM manipulation and events",
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10"
        },
        {
          id: "js-advanced",
          title: "Advanced JavaScript",
          icon: <FaCode className="text-green-400" />,
          description: "Closures, hoisting, scope, Prototypes and inheritance, Async JS: Promises, async/await, Event loop and throttling",
          color: "text-green-400",
          bgColor: "bg-green-500/10"
        },
        {
          id: "typescript",
          title: "TypeScript Foundation",
          icon: <SiTypescript className="text-blue-600" />,
          description: "Type annotations and interfaces, Generics and enums, TS in React projects",
          color: "text-blue-600",
          bgColor: "bg-blue-600/10"
        }
      ]
    },
    {
      id: "version-control",
      title: "4. Version Control",
      icon: <FaGitAlt className="text-orange-600" />,
      description: "Git and collaboration tools",
      children: [
        {
          id: "git-github",
          title: "Git & GitHub",
          icon: <FaGitAlt className="text-orange-600" />,
          description: "Init, commit, push, pull, Branching and merge conflicts, Pull requests and workflows",
          color: "text-orange-600",
          bgColor: "bg-orange-600/10"
        }
      ]
    },
    {
      id: "react",
      title: "5. React Ecosystem",
      icon: <FaReact className="text-cyan-400" />,
      description: "React framework and related technologies",
      children: [
        {
          id: "react-foundation",
          title: "React Foundation",
          icon: <FaReact className="text-cyan-400" />,
          description: "JSX and components, Props, state, useEffect, Conditional rendering, forms",
          color: "text-cyan-400",
          bgColor: "bg-cyan-500/10"
        },
        {
          id: "react-routing",
          title: "React Routing",
          icon: <FaGlobeAmericas className="text-purple-500" />,
          description: "React Router v6 basics, Nested routes, dynamic params",
          color: "text-purple-400",
          bgColor: "bg-purple-500/10"
        },
        {
          id: "state-management",
          title: "React State Management",
          icon: <FaCogs className="text-purple-400" />,
          description: "Context API, Redux Toolkit basics, Zustand / Jotai (optional)",
          color: "text-purple-400",
          bgColor: "bg-purple-500/10"
        },
        {
          id: "forms-validation",
          title: "Forms & Validation",
          icon: <FaDesktop className="text-indigo-500" />,
          description: "Controlled vs uncontrolled forms, React Hook Form / Formik, Yup / Zod validation",
          color: "text-indigo-400",
          bgColor: "bg-indigo-500/10"
        }
      ]
    },
    {
      id: "security",
      title: "6. Security & Authentication",
      icon: <FaShieldAlt className="text-red-400" />,
      description: "Security practices and user authentication",
      children: [
        {
          id: "authentication",
          title: "Authentication",
          icon: <FaLock className="text-red-500" />,
          description: "Firebase Auth / JWT / OAuth, Login/logout flows, Protected routes and role checks",
          color: "text-red-400",
          bgColor: "bg-red-500/10"
        },
        {
          id: "security-essentials",
          title: "Security Essentials",
          icon: <FaShieldAlt className="text-red-400" />,
          description: "HTTPS, CSP, XSS, CSRF, Secure token storage (cookies vs localStorage)",
          color: "text-red-400",
          bgColor: "bg-red-500/10"
        }
      ]
    },
    {
      id: "testing",
      title: "7. Testing & Quality",
      icon: <SiJest className="text-red-400" />,
      description: "Testing frameworks and code quality tools",
      children: [
        {
          id: "testing-debugging",
          title: "Testing & Debugging",
          icon: <SiJest className="text-red-400" />,
          description: "Jest, React Testing Library, Cypress / Playwright, ESLint, Prettier",
          color: "text-red-400",
          bgColor: "bg-red-500/10"
        }
      ]
    },
    {
      id: "apis",
      title: "8. APIs & Data",
      icon: <FaServer className="text-indigo-400" />,
      description: "Working with APIs and data",
      children: [
        {
          id: "rest-graphql",
          title: "REST & GraphQL APIs",
          icon: <FaServer className="text-indigo-400" />,
          description: "Fetch and Axios, REST conventions, GraphQL basics with Apollo",
          color: "text-indigo-400",
          bgColor: "bg-indigo-500/10"
        },
        {
          id: "real-time",
          title: "Real-Time Communication",
          icon: <SiSocketdotio className="text-blue-500" />,
          description: "WebSockets / Socket.IO, GraphQL subscriptions",
          color: "text-blue-400",
          bgColor: "bg-blue-500/10"
        }
      ]
    },
    {
      id: "advanced",
      title: "9. Advanced Concepts",
      icon: <FaCode className="text-purple-400" />,
      description: "Advanced frontend concepts and frameworks",
      children: [
        {
          id: "ssr-nextjs",
          title: "Server-Side Rendering (Next.js)",
          icon: <SiNextdotjs className="text-black" />,
          description: "SSG, SSR, ISR, getStaticProps, getServerSideProps, API routes",
          color: "text-gray-800",
          bgColor: "bg-gray-800/10"
        },
        {
          id: "pwa",
          title: "PWA (Progressive Web Apps)",
          icon: <FaMobile className="text-blue-500" />,
          description: "Web App Manifest, Service workers and caching, Add to home screen",
          color: "text-blue-400",
          bgColor: "bg-blue-500/10"
        }
      ]
    },
    {
      id: "optimization",
      title: "10. Performance & UX",
      icon: <MdOutlineSpeed className="text-green-500" />,
      description: "Performance optimization and user experience",
      children: [
        {
          id: "performance",
          title: "Performance Optimization",
          icon: <MdOutlineSpeed className="text-green-500" />,
          description: "Core Web Vitals, Lazy loading, bundle analysis, Responsive images and formats",
          color: "text-green-400",
          bgColor: "bg-green-500/10"
        },
        {
          id: "accessibility",
          title: "Accessibility (a11y)",
          icon: <MdOutlineAccessibility className="text-purple-500" />,
          description: "Keyboard navigation, Screen readers, Color contrast",
          color: "text-purple-400",
          bgColor: "bg-purple-500/10"
        },
        {
          id: "i18n",
          title: "Internationalization (i18n)",
          icon: <MdOutlineLanguage className="text-orange-500" />,
          description: "i18next / react-intl setup, Language switcher and RTL support",
          color: "text-orange-400",
          bgColor: "bg-orange-500/10"
        }
      ]
    },
    {
      id: "business",
      title: "11. Business & Deployment",
      icon: <FaUpload className="text-blue-500" />,
      description: "Payment integration and deployment",
      children: [
        {
          id: "payment",
          title: "Payment Integration",
          icon: <MdOutlinePayment className="text-green-500" />,
          description: "Stripe / Razorpay / PayPal, Secure forms and callbacks, Webhooks",
          color: "text-green-400",
          bgColor: "bg-green-500/10"
        },
        {
          id: "deployment",
          title: "CI/CD & Deployment",
          icon: <FaUpload className="text-blue-500" />,
          description: "GitHub Actions, Vercel, Netlify, Firebase, Environment setup and rollback",
          color: "text-blue-400",
          bgColor: "bg-blue-500/10"
        }
      ]
    },
    {
      id: "professional",
      title: "12. Professional Development",
      icon: <FaGraduationCap className="text-yellow-500" />,
      description: "Code quality and professional practices",
      children: [
        {
          id: "architecture",
          title: "Code Architecture & Clean Code",
          icon: <FaCogs className="text-indigo-500" />,
          description: "Folder structure and patterns, Atomic design, ESLint, commit guidelines",
          color: "text-indigo-400",
          bgColor: "bg-indigo-500/10"
        },
        {
          id: "monitoring",
          title: "Monitoring & Analytics",
          icon: <MdOutlineAnalytics className="text-purple-500" />,
          description: "Sentry / LogRocket, Google Analytics, Custom error tracking",
          color: "text-purple-400",
          bgColor: "bg-purple-500/10"
        },
        {
          id: "portfolio",
          title: "Final Projects & Portfolio",
          icon: <FaGraduationCap className="text-yellow-500" />,
          description: "Portfolio site, Blog with Markdown, E-commerce project, Dashboard with real-time data",
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10"
        }
      ]
    }
  ]
}; 