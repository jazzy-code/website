import type { Localized } from "./projects/types";

export type Service = {
  id: string;
  name: Localized<string>;
  /** The problem this kind of work can solve. */
  problem: Localized<string>;
  /** Illustrative deliverables, not a list of delivered work. */
  examples: Localized<readonly string[]>;
};

export const services: readonly Service[] = [
  {
    id: "web",
    name: {
      es: "Sitios y aplicaciones web",
      en: "Websites and web applications",
    },
    problem: {
      es: "Tu negocio necesita presencia en la web o una herramienta en línea que se adapte a cómo trabaja.",
      en: "Your business needs a web presence or an online tool that fits the way it works.",
    },
    examples: {
      es: [
        "Sitios corporativos y de documentación",
        "Portales y marketplaces",
        "Aplicaciones web con autenticación y roles de usuario",
      ],
      en: [
        "Corporate and documentation websites",
        "Portals and marketplaces",
        "Web applications with authentication and user roles",
      ],
    },
  },
  {
    id: "custom-software",
    name: { es: "Software a medida", en: "Custom software" },
    problem: {
      es: "Algunos procesos no encajan en herramientas genéricas y requieren un sistema construido a su medida.",
      en: "Some processes don't fit generic tools and call for a system built around them.",
    },
    examples: {
      es: [
        "Sistemas de gestión de operaciones",
        "Control de accesos y visitas",
        "Flujos de aprobación y formularios dinámicos",
      ],
      en: [
        "Operations management systems",
        "Access and visitor control",
        "Approval workflows and dynamic forms",
      ],
    },
  },
  {
    id: "dashboards",
    name: {
      es: "Dashboards y paneles administrativos",
      en: "Dashboards and admin panels",
    },
    problem: {
      es: "La información está dispersa o se administra de forma manual, y hace falta un solo lugar para consultarla y gestionarla.",
      en: "Information is scattered or managed by hand, and a single place is needed to review and manage it.",
    },
    examples: {
      es: [
        "Paneles para administrar usuarios, contenido o solicitudes",
        "Tablas con búsqueda, filtros y acciones",
        "Reportes y estadísticas",
      ],
      en: [
        "Panels to manage users, content, or requests",
        "Tables with search, filters, and actions",
        "Reports and statistics",
      ],
    },
  },
  {
    id: "apis",
    name: {
      es: "Desarrollo e integración de APIs",
      en: "API development and integration",
    },
    problem: {
      es: "Tus aplicaciones y servicios necesitan comunicarse entre sí o con plataformas de terceros.",
      en: "Your applications and services need to communicate with each other or with third-party platforms.",
    },
    examples: {
      es: [
        "APIs propias para tus aplicaciones",
        "Integración con pasarelas de pago",
        "Integración con servicios de terceros, como búsqueda o traducción automática",
      ],
      en: [
        "Dedicated APIs for your applications",
        "Payment gateway integration",
        "Integration with third-party services, such as search or machine translation",
      ],
    },
  },
  {
    id: "automation",
    name: { es: "Automatizaciones", en: "Automations" },
    problem: {
      es: "Hay tareas repetitivas que consumen tiempo y podrían ejecutarse solas.",
      en: "Repetitive tasks take up time and could run on their own.",
    },
    examples: {
      es: [
        "Correos y notificaciones automáticas",
        "Actualización automática de estados",
        "Generación de reportes en Excel o PDF",
        "Webhooks y automatización de contenido",
      ],
      en: [
        "Automatic emails and notifications",
        "Automatic status updates",
        "Excel or PDF report generation",
        "Webhooks and content automation",
      ],
    },
  },
  {
    id: "cloud",
    name: {
      es: "Servicios y soluciones en la nube",
      en: "Cloud services and solutions",
    },
    problem: {
      es: "Tu solución necesita publicarse, almacenar archivos y operar en internet.",
      en: "Your solution needs to be published, store files, and run on the internet.",
    },
    examples: {
      es: [
        "Despliegue en plataformas como Vercel o AWS",
        "Almacenamiento de archivos en la nube",
        "Bases de datos gestionadas",
        "Despliegue continuo con CI/CD",
      ],
      en: [
        "Deployment on platforms such as Vercel or AWS",
        "Cloud file storage",
        "Managed databases",
        "Continuous deployment with CI/CD",
      ],
    },
  },
];
