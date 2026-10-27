import type { Localized } from "./projects/types";

/**
 * Professional profile, taken from public/docs/CV_JavierTorres_2026.pdf.
 * The PDF is in English; the Spanish text is a translation of it.
 * Contact details from the PDF are intentionally not included here.
 */
export const profile = {
  name: "Javier Torres",
  title: {
    es: "Ingeniero de Software Fullstack",
    en: "Fullstack Software Engineer",
  } satisfies Localized<string>,
  summary: {
    es: "Soy un Ingeniero de Software Full-Stack Senior con más de 7 años de experiencia desarrollando aplicaciones web de alto rendimiento. Me especializo en frameworks frontend modernos y arquitecturas backend robustas. Tengo experiencia administrando bases de datos SQL y NoSQL, servicios en la nube y despliegues en hosting compartido y serverless.",
    en: "I'm a Senior Full-Stack Software Engineer with 7+ years of experience building high-performance web applications. Specialized in modern frontend frameworks and robust backend architectures. Experience managing SQL and NoSQL databases, cloud services and deployments in shared hosting and serverless hosting.",
  } satisfies Localized<string>,
};

export type SkillGroup = {
  id: string;
  title: Localized<string>;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    items: [
      "TypeScript",
      "React / Next.js / Vue",
      "Tailwind CSS",
      "Material UI / Shadcn UI",
    ],
  },
  {
    id: "backend",
    title: { es: "Backend y CMS", en: "Backend & CMS" },
    items: [
      "Node.js / Express",
      "PHP / Laravel",
      "Sanity Studio / Payload CMS",
      "Clerk / Better Auth",
    ],
  },
  {
    id: "data-cloud",
    title: { es: "Bases de datos y nube", en: "Databases & Cloud" },
    items: [
      "PostgreSQL / MySQL",
      "MongoDB",
      "AWS (S3, EC2)",
      "Vercel / Google Cloud",
    ],
  },
  {
    id: "tools",
    title: { es: "Herramientas y pruebas", en: "Tools & Testing" },
    items: [
      "Git / CI/CD",
      "Cypress / Jest",
      "Agile / Scrum",
      "AI (Claude, Cursor)",
    ],
  },
];

export type Experience = {
  id: string;
  company: string;
  role: Localized<string>;
  location: Localized<string>;
  period: Localized<string>;
  highlights: Localized<readonly string[]>;
};

export const experience: readonly Experience[] = [
  {
    id: "isol",
    company: "ISOL Ingeniería en Soluciones",
    role: { es: "Desarrollador Fullstack Senior", en: "Senior Fullstack Developer" },
    location: { es: "Ciudad de México", en: "Mexico City" },
    period: { es: "Marzo 2022 – Presente", en: "March 2022 – Present" },
    highlights: {
      es: [
        "Lideré la arquitectura frontend y el desarrollo de funcionalidades con React, Next.js, TypeScript, NX, Tailwind y Material UI para soluciones empresariales escalables.",
        "Integré y gestioné flujos de Headless CMS (Sanity y Craft) para optimizar la entrega de contenido dinámico.",
        "Implementé integraciones robustas con APIs REST y establecí suites de pruebas automatizadas con Cypress para lograr una alta cobertura de pruebas y confiabilidad en los componentes.",
      ],
      en: [
        "Led frontend architecture and feature development using React, Next.js, TypeScript, NX, Tailwind and Material UI for scalable enterprise solutions.",
        "Integrated and managed Headless CMS pipelines (Sanity & Craft) to optimize dynamic content delivery.",
        "Implemented robust REST API integrations and established automated test suites using Cypress to ensure high test coverage and component reliability.",
      ],
    },
  },
  {
    id: "paypal",
    company: "PayPal",
    role: {
      es: "Ingeniero de Software (remoto desde México)",
      en: "Software Engineer (Remote from Mexico)",
    },
    location: { es: "San José, California", en: "San Jose, California" },
    period: { es: "Mayo 2022 – Febrero 2023", en: "May 2022 – February 2023" },
    highlights: {
      es: [
        "Desarrollé módulos frontend centrales con React y TypeScript dentro del ecosistema altamente seguro de PayPal.",
        "Construí servicios backend escalables y endpoints de API con Node.js, Express y GraphQL.",
        "Ejecuté flujos rigurosos de pruebas unitarias y funcionales en entornos empresariales con Cypress, Jest y Jenkins.",
      ],
      en: [
        "Developed core frontend modules using React and TypeScript within PayPal's highly secure ecosystem.",
        "Engineered scalable backend services and API endpoints utilizing Node.js, Express, and GraphQL.",
        "Executed rigorous unit and functional testing workflows across enterprise environments using Cypress, Jest, and Jenkins.",
      ],
    },
  },
  {
    id: "flyingman",
    company: "Flyingman",
    role: {
      es: "Desarrollador Full-Stack Semi Senior (remoto desde México)",
      en: "Full-Stack Developer Mid (Remote from Mexico)",
    },
    location: { es: "San José, Costa Rica", en: "San José, Costa Rica" },
    period: { es: "Junio 2020 – Mayo 2022", en: "June 2020 – May 2022" },
    highlights: {
      es: [
        "Construí aplicaciones web de extremo a extremo con interfaces responsivas en Vue.js, React y Blade.",
        "Diseñé y mantuve APIs RESTful, lógica de negocio y migraciones de bases de datos con PHP y Laravel.",
        "Realicé pruebas unitarias y de funcionalidades siguiendo los estándares OpenAPI y Swagger.",
      ],
      en: [
        "Built end-to-end web applications featuring responsive user interfaces with Vue.js, React, and Blade.",
        "Designed and maintained backend RESTful APIs, business logic, and database migrations using PHP and Laravel.",
        "Conducted comprehensive unit and feature testing following OpenAPI and Swagger standards.",
      ],
    },
  },
  {
    id: "bpfs",
    company: "BPFS",
    role: {
      es: "Desarrollador Full-Stack Junior",
      en: "Full-Stack Developer Junior",
    },
    location: { es: "Querétaro", en: "Querétaro" },
    period: { es: "Febrero 2019 – Junio 2020", en: "February 2019 – June 2020" },
    highlights: {
      es: [
        "Lideré la creación de wireframes y prototipos de diseño UI/UX con Adobe XD y Figma.",
        "Desarrollé interfaces web con distintos frameworks: Angular, React, Vue.js y jQuery.",
        "Entregué endpoints backend y mantuve la lógica del lado del servidor con PHP y Node.js.",
      ],
      en: [
        "Spearheaded UI/UX design wireframes and prototypes using Adobe XD and Figma.",
        "Developed cross-framework web interfaces utilizing Angular, React, Vue.js, and jQuery.",
        "Delivered backend endpoints and maintained server-side logic with PHP and Node.js.",
      ],
    },
  },
];

export const education = [
  {
    school: "Universidad Autónoma de Querétaro",
    degree: { es: "Ingeniero de Software", en: "Software Engineer" },
    period: "2018 – 2021",
  },
] as const satisfies readonly {
  school: string;
  degree: Localized<string>;
  period: string;
}[];

export const languages = [
  { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
  {
    name: { es: "Inglés", en: "English" },
    level: { es: "Profesional", en: "Professional" },
  },
] as const satisfies readonly {
  name: Localized<string>;
  level: Localized<string>;
}[];
