import type { Project } from "./types";

/**
 * Portfolio. Order here is the order shown in the catalog.
 *
 * Only confirmed information goes here. R&C Multimodal and RECIVIP have no
 * public URL, so they have no `links`. The UI hides every section that has no
 * data.
 *
 * `screens` point at the real captures in /public/images/projects/<folder>/.
 * The first screen is the cover. Roles follow what each file actually shows,
 * which differs from its name in a few cases: Alpha Wolves Arena screen 3
 * (desktop is image-3-mobile.png, mobile is image-3.png) and Rollstack
 * screens 1 and 3 (their desktop/mobile files are cross-named). Not used:
 * alpha-wolves-arena/image-5-mobile.png (a second desktop screen, not a phone
 * capture).
 */
export const projects: readonly Project[] = [
  {
    slug: "rollstack-docs-website",
    name: "Rollstack Docs & Website",
    screens: [
      {
        alt: {
          es: "Página de inicio del sitio de Rollstack con el mensaje principal sobre su plataforma de presentaciones con IA",
          en: "Rollstack website home page with the main message about its AI presentation platform",
        },
        desktop: { src: "/images/projects/rollstack/image-1.png", width: 1333, height: 912 },
        mobile: { src: "/images/projects/rollstack/image-3-mobile.png", width: 424, height: 828 },
      },
      {
        alt: {
          es: "Sección de cultura del sitio de Rollstack con tarjetas de valores y el apartado «Work from anywhere»",
          en: "Rollstack website culture section with value cards and the “Work from anywhere” block",
        },
        desktop: { src: "/images/projects/rollstack/image-2.png", width: 1332, height: 911 },
        mobile: { src: "/images/projects/rollstack/image-2-mobile.png", width: 423, height: 826 },
      },
      {
        alt: {
          es: "Página de blog de Rollstack con filtros por tema, buscador y artículos destacados",
          en: "Rollstack blog page with topic filters, search, and featured articles",
        },
        desktop: { src: "/images/projects/rollstack/image-1-mobile.png", width: 1331, height: 919 },
        mobile: { src: "/images/projects/rollstack/image-3.png", width: 423, height: 824 },
      },
      {
        alt: {
          es: "Página de bienvenida de la documentación de Rollstack con navegación lateral y tarjetas de acceso a los temas principales",
          en: "Welcome page of the Rollstack documentation with side navigation and cards linking to the main topics",
        },
        desktop: { src: "/images/projects/rollstack/image-4.png", width: 1346, height: 913 },
        mobile: { src: "/images/projects/rollstack/image-4-mobile.png", width: 424, height: 828 },
      },
    ],
    summary: {
      es: "Migración y evolución de la plataforma de documentación y del sitio web de Rollstack, con una arquitectura multilingüe, gestión estructurada de contenido y herramientas de búsqueda.",
      en: "Migration and evolution of Rollstack's documentation platform and website, with a multilingual architecture, structured content management, and search capabilities.",
    },
    description: {
      es: "Desarrollé la arquitectura web y de contenido para una plataforma de documentación multilingüe. El trabajo incluyó la migración de Payload CMS a Sanity, la organización del proyecto en un monorepo, la integración de traducciones automatizadas con DeepL, la indexación y búsqueda con Meilisearch y la integración de Kapa para consultas sobre la documentación.",
      en: "I developed the web and content architecture for a multilingual documentation platform. The work included migrating from Payload CMS to Sanity, organizing the project as a monorepo, integrating automated translations with DeepL, implementing indexing and search with Meilisearch, and integrating Kapa for documentation queries.",
    },
    features: {
      es: [
        "Migración de Payload CMS a Sanity",
        "Migración del sitio desde Webflow y evolución de los sitios web y de documentación",
        "Migración desde una arquitectura anterior con MongoDB y AWS S3",
        "Monorepo para organizar las aplicaciones y herramientas relacionadas",
        "Webhooks y automatizaciones de contenido",
        "Traducciones automáticas mediante DeepL",
        "Indexación y búsqueda con Meilisearch",
        "Asistente de IA Kapa para consultas sobre documentación",
        "Mejoras de rendimiento mediante prácticas SSR e ISR",
        "Simplificación de la infraestructura y reducción reportada de costes fijos",
      ],
      en: [
        "Migration from Payload CMS to Sanity",
        "Migration of the site from Webflow and evolution of the website and documentation sites",
        "Migration from a previous architecture based on MongoDB and AWS S3",
        "Monorepo to organize the applications and related tooling",
        "Content webhooks and automations",
        "Automatic translations through DeepL",
        "Indexing and search with Meilisearch",
        "Kapa AI assistant for documentation queries",
        "Performance improvements through SSR and ISR practices",
        "Infrastructure simplification and reported reduction in fixed costs",
      ],
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Sanity CMS",
      "Payload CMS",
      "DeepL API",
      "Meilisearch",
      "Kapa AI",
      "pnpm",
    ],
    infrastructure: ["GitHub Actions", "Vercel", "Render"],
    links: [
      {
        href: "https://www.rollstack.com/",
        label: { es: "Sitio web", en: "Website" },
      },
      {
        href: "https://docs.rollstack.com/",
        label: { es: "Documentación", en: "Documentation" },
      },
    ],
  },
  {
    slug: "the-world-club",
    name: "The World Club",
    screens: [
      {
        alt: {
          es: "Página de eventos del club con el listado de eventos destacados",
          en: "Club events page listing featured events",
        },
        desktop: { src: "/images/projects/the-world-club/image-1.png", width: 1336, height: 909 },
        mobile: { src: "/images/projects/the-world-club/image-1-mobile.png", width: 417, height: 829 },
      },
      {
        alt: {
          es: "Listado de próximas experiencias de un evento, con buscador y filtros",
          en: "List of upcoming experiences for an event, with search and filters",
        },
        desktop: { src: "/images/projects/the-world-club/image-2.png", width: 1335, height: 908 },
        mobile: { src: "/images/projects/the-world-club/image-2-mobile.png", width: 418, height: 829 },
      },
      {
        alt: {
          es: "Detalle de una experiencia con descripción, fecha, hora, ciudad y botón para comprar boletos",
          en: "Experience detail page with description, date, time, city, and a button to buy tickets",
        },
        desktop: { src: "/images/projects/the-world-club/image-3.png", width: 1338, height: 916 },
        mobile: { src: "/images/projects/the-world-club/image-3-mobile.png", width: 373, height: 827 },
      },
      {
        alt: {
          es: "Información de boletos, galería y mapa con la dirección de una experiencia",
          en: "Ticket information, gallery, and a map with the address of an experience",
        },
        desktop: { src: "/images/projects/the-world-club/image-4.png", width: 1343, height: 914 },
        mobile: { src: "/images/projects/the-world-club/image-4-mobile.png", width: 372, height: 824 },
      },
      {
        alt: {
          es: "Pantalla de datos de compra con tipo de boleto, cantidad, código de referido y total",
          en: "Purchase details screen with ticket type, quantity, referral code, and total",
        },
        desktop: { src: "/images/projects/the-world-club/image-5.png", width: 1336, height: 912 },
        mobile: { src: "/images/projects/the-world-club/image-5-mobile.png", width: 375, height: 826 },
      },
      {
        alt: {
          es: "Sección «Mi nivel» del programa de lealtad, con el nivel actual, el historial de experiencias y los niveles disponibles",
          en: "“Mi nivel” loyalty program section, with the current level, experience history, and available levels",
        },
        desktop: { src: "/images/projects/the-world-club/image-6.png", width: 1332, height: 913 },
        mobile: { src: "/images/projects/the-world-club/image-6-mobile.png", width: 369, height: 828 },
      },
      {
        alt: {
          es: "Dashboard administrativo con la tabla de experiencias y el botón para crear una nueva",
          en: "Admin dashboard with the experiences table and a button to create a new one",
        },
        desktop: { src: "/images/projects/the-world-club/image-7.png", width: 1340, height: 910 },
      },
      {
        alt: {
          es: "Formulario administrativo de una experiencia con datos generales, fechas y amenidades",
          en: "Admin form for an experience with general details, dates, and amenities",
        },
        desktop: { src: "/images/projects/the-world-club/image-8.png", width: 1339, height: 908 },
      },
      {
        alt: {
          es: "Administración de boletaje de una experiencia, con boletos vendidos y restantes y precio",
          en: "Ticketing administration for an experience, with tickets sold and remaining and price",
        },
        desktop: { src: "/images/projects/the-world-club/image-9.png", width: 1334, height: 909 },
      },
    ],
    summary: {
      es: "Plataforma digital para la gestión de eventos y venta de boletos, con pagos en línea y códigos QR para el acceso.",
      en: "Digital platform for event management and ticket sales, with online payments and QR-code-based access.",
    },
    description: {
      es: "Desarrollé una plataforma para gestionar eventos y digitalizar el proceso de compra y acceso. El sistema incluye funcionalidades de administración de eventos, compra de boletos, integración de pagos con Stripe y uso de códigos QR para el acceso.",
      en: "I developed a platform to manage events and digitize ticket purchasing and entry. The system includes event administration, ticket purchases, Stripe payment integration, and QR-code-based access.",
    },
    features: {
      es: [
        "Dos aplicaciones y una API",
        "Sitio público para descubrir eventos, consultar ubicaciones, amenidades y precios, y comprar boletos",
        "Acceso a los boletos y descarga del código QR correspondiente",
        "Dashboard administrativo para gestionar eventos, boletaje e historial de ventas",
        "Creación de banners publicitarios",
        "Gestión de patrocinadores",
        "Códigos de referido con descuentos",
        "Publicación de ofertas de partners externos",
        "Integración con Stripe para procesar pagos",
        "Gestión de apartados y transacciones relacionadas con el boletaje",
        "Envío de correos electrónicos",
      ],
      en: [
        "Two applications and one API",
        "Public site to discover events, browse locations, amenities, and prices, and buy tickets",
        "Access to purchased tickets and download of the corresponding QR code",
        "Admin dashboard to manage events, ticketing, and sales history",
        "Advertising banner creation",
        "Sponsor management",
        "Referral codes with discounts",
        "Publishing of offers from external partners",
        "Stripe integration to process payments",
        "Management of reservations and ticketing-related transactions",
        "Email delivery",
      ],
    },
    metrics: [
      { value: "100+", label: { es: "usuarios registrados", en: "registered users" } },
      { value: "100+", label: { es: "compras", en: "purchases" } },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Material UI",
      "Tailwind CSS",
      "Zustand",
      "PHP",
      "Laravel",
      "Laravel Sanctum",
      "Stripe",
      "MySQL",
    ],
    infrastructure: ["Hostinger"],
    links: [{ href: "https://theworldclub.com.mx/" }],
  },
  {
    slug: "alpha-wolves-arena",
    name: "Alpha Wolves Arena",
    screens: [
      {
        alt: {
          es: "Pantalla de estado del proyecto del emprendedor con la lista de formularios pendientes",
          en: "Entrepreneur project status screen listing the forms still pending",
        },
        desktop: { src: "/images/projects/alpha-wolves-arena/image-1.png", width: 1272, height: 913 },
        mobile: { src: "/images/projects/alpha-wolves-arena/image-1-mobile.png", width: 397, height: 838 },
      },
      {
        alt: {
          es: "Formulario de información personal del emprendedor, con avisos y campos de estudios e información familiar",
          en: "Entrepreneur personal information form, with notices and education and family fields",
        },
        desktop: { src: "/images/projects/alpha-wolves-arena/image-2.png", width: 1267, height: 912 },
        mobile: { src: "/images/projects/alpha-wolves-arena/image-2-mobile.png", width: 389, height: 849 },
      },
      {
        alt: {
          es: "Pantalla para grabar o subir el vídeo de presentación del CEO, con un límite de un minuto",
          en: "Screen to record or upload the CEO presentation video, limited to one minute",
        },
        desktop: { src: "/images/projects/alpha-wolves-arena/image-3-mobile.png", width: 1275, height: 914 },
        mobile: { src: "/images/projects/alpha-wolves-arena/image-3.png", width: 424, height: 829 },
      },
      {
        alt: {
          es: "Formulario de información del proyecto, con nombre, descripción y datos del equipo",
          en: "Project information form with name, description, and team details",
        },
        desktop: { src: "/images/projects/alpha-wolves-arena/image-4.png", width: 1259, height: 908 },
        mobile: { src: "/images/projects/alpha-wolves-arena/image-4-mobile.png", width: 425, height: 830 },
      },
      {
        alt: {
          es: "Dashboard administrativo con la tabla de startups, buscador, filtros e indicadores de progreso por formulario",
          en: "Admin dashboard with the startups table, search, filters, and per-form progress indicators",
        },
        desktop: { src: "/images/projects/alpha-wolves-arena/image-5.png", width: 1334, height: 920 },
      },
    ],
    summary: {
      es: "Ecosistema de tres aplicaciones conectadas mediante una API compartida para gestionar vídeos, evaluaciones y flujos de trabajo con distintos roles.",
      en: "An ecosystem of three applications connected through a shared API to manage videos, evaluations, and role-based workflows.",
    },
    description: {
      es: "Desarrollé tres aplicaciones integradas con una API compartida: una para emprendedores, una para inversionistas y un dashboard administrativo. El sistema contempla contenido en vídeo, evaluaciones y lógica de negocio basada en roles y estados, manteniendo la comunicación entre las aplicaciones mediante una interfaz de API común.",
      en: "I developed three applications integrated with a shared API: one for entrepreneurs, one for investors, and an admin dashboard. The system includes video content, evaluations, and business logic based on roles and states, with the applications communicating through a common API.",
    },
    features: {
      es: [
        "Tres aplicaciones y una API",
        "Aplicación para emprendedores que registran sus proyectos, completan formularios y suben tres vídeos: presentación personal, presentación del equipo y pitch del proyecto",
        "Aplicación para inversionistas, con presentación de pitches en formato vertical tipo Reels/TikTok y solicitudes de información adicional",
        "Dashboard administrativo para gestionar usuarios, proyectos e inversionistas",
        "Evaluación de proyectos por un jurado mediante criterios y puntuaciones, con aprobación o rechazo",
        "Diseño responsive pensado principalmente para dispositivos móviles",
        "Arquitectura desplegada en AWS EC2, con almacenamiento de archivos multimedia en S3",
      ],
      en: [
        "Three applications and one API",
        "Application for entrepreneurs to register their projects, complete forms, and upload three videos: personal introduction, team introduction, and project pitch",
        "Application for investors, with pitches presented in a vertical Reels/TikTok-style format and requests for additional information",
        "Admin dashboard to manage users, projects, and investors",
        "Project evaluation by a jury using criteria and scores, with approval or rejection",
        "Responsive design primarily intended for mobile devices",
        "Architecture deployed on AWS EC2, with media file storage on S3",
      ],
    },
    metrics: [
      { value: "200+", label: { es: "usuarios activos", en: "active users" } },
    ],
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "SCSS",
      "Redux",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "JWT Authentication",
    ],
    infrastructure: ["AWS EC2", "AWS S3"],
    links: [{ href: "https://alphawolvesarena.com/" }],
  },
  {
    slug: "rc-multimodal",
    name: "R&C Multimodal",
    screens: [
      {
        alt: {
          es: "Pantalla de seguimiento de servicios con filtros y un mapa con marcadores de las operaciones activas",
          en: "Service tracking screen with filters and a map with markers for active operations",
        },
        desktop: { src: "/images/projects/rc-multimodal/image-1.png", width: 1253, height: 907 },
      },
      {
        alt: {
          es: "Detalle de una operación de flete marítimo con sus datos y un mapa",
          en: "Detail of a sea freight operation with its data and a map",
        },
        desktop: { src: "/images/projects/rc-multimodal/image-2.png", width: 1249, height: 876 },
      },
      {
        alt: {
          es: "Creación de multitracking: tabla de operaciones y configuración de mapas y marcadores",
          en: "Multitracking creation: operations table and map and marker configuration",
        },
        desktop: { src: "/images/projects/rc-multimodal/image-3.png", width: 1277, height: 885 },
      },
      {
        alt: {
          es: "Histórico de operaciones con tabla, buscador y acciones",
          en: "Operations history with a table, search, and actions",
        },
        desktop: { src: "/images/projects/rc-multimodal/image-4.png", width: 1272, height: 899 },
      },
      {
        alt: {
          es: "Edición de un cliente con datos básicos, logotipo y contactos",
          en: "Client editing form with basic data, logo, and contacts",
        },
        desktop: { src: "/images/projects/rc-multimodal/image-5.png", width: 1343, height: 902 },
      },
    ],
    summary: {
      es: "Sistema de gestión de operaciones logísticas multimodales con seguimiento, mapas, reportes y administración de servicios.",
      en: "Multimodal logistics operations management system with tracking, maps, reports, and service administration.",
    },
    description: {
      es: "Desarrollé una aplicación full-stack para administrar operaciones logísticas y consultar su información operativa. Incluye módulos de seguimiento, visualización de información geográfica, reportes y gestión de clientes, consignatarios, ejecutivos y servicios logísticos.",
      en: "I developed a full-stack application for managing logistics operations and accessing operational information. It includes tracking modules, geographic data visualization, reports, and management of clients, consignees, executives, and logistics services.",
    },
    features: {
      es: [
        "Dashboard interno y API para centralizar operaciones logísticas, fletes y maniobras",
        "Gestión de servicios de flete terrestre, marítimo y aéreo, maniobras portuarias, carga de proyecto, transporte ferroviario y otras operaciones logísticas",
        "Mapa interactivo con marcadores geográficos para visualizar la ubicación de mercancías",
        "Seguimiento de múltiples operaciones activas mediante multitracking",
        "Generación de reportes en Excel y PDF para clientes",
        "Estadísticas e informes sobre operaciones y servicios activos",
        "Automatización de actualizaciones sobre servicios",
        "Plataforma en uso continuo, con mejoras evolutivas",
      ],
      en: [
        "Internal dashboard and API to centralize logistics operations, freight, and handling",
        "Management of land, sea, and air freight services, port handling, project cargo, rail transport, and other logistics operations",
        "Interactive map with geographic markers to visualize goods locations",
        "Tracking of multiple active operations through multitracking",
        "Excel and PDF report generation for clients",
        "Statistics and reports on active operations and services",
        "Automation of service updates",
        "Platform in continuous use, with ongoing evolutionary improvements",
      ],
    },
    technologies: [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Vuex",
      "Bootstrap",
      "PrimeVue",
      "PHP 8.2",
      "Laravel",
      "Laravel Sanctum",
      "Mapbox",
      "MySQL",
    ],
  },
  {
    slug: "marhaba-marbella",
    name: "Marhaba Marbella",
    screens: [
      {
        alt: {
          es: "Página principal de Marhaba Marbella con buscador de servicios y categorías",
          en: "Marhaba Marbella home page with a service search and categories",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-1.png", width: 1332, height: 913 },
        mobile: { src: "/images/projects/marhaba-marbella/image-1-mobile.png", width: 418, height: 825 },
      },
      {
        alt: {
          es: "Catálogo de ofertas disponibles con tarjetas de servicios y filtros por categoría",
          en: "Catalog of available offerings with service cards and category filters",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-2.png", width: 1329, height: 814 },
        mobile: { src: "/images/projects/marhaba-marbella/image-2-mobile.png", width: 354, height: 666 },
      },
      {
        alt: {
          es: "Ficha de una propiedad con galería de imágenes, datos clave y botón para solicitar una visita privada",
          en: "Property listing with an image gallery, key details, and a button to request a private viewing",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-3.png", width: 774, height: 621 },
        mobile: { src: "/images/projects/marhaba-marbella/image-3-mobile.png", width: 271, height: 618 },
      },
      {
        alt: {
          es: "Detalle de una propiedad con la descripción de la residencia y sus principales amenidades",
          en: "Property detail with the residence description and its key amenities",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-4.png", width: 775, height: 633 },
        mobile: { src: "/images/projects/marhaba-marbella/image-4-mobile.png", width: 231, height: 630 },
      },
      {
        alt: {
          es: "Dashboard del proveedor con la lista de sus servicios, estados y acciones",
          en: "Provider dashboard with the list of its services, statuses, and actions",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-5.png", width: 1299, height: 866 },
      },
      {
        alt: {
          es: "Formulario del proveedor con la información básica de un servicio",
          en: "Provider form with the basic information of a service",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-6.png", width: 1285, height: 909 },
      },
      {
        alt: {
          es: "Formulario del proveedor para reserva, medios y aspectos legales de un servicio",
          en: "Provider form for booking, media, and legal details of a service",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-7.png", width: 1286, height: 914 },
      },
      {
        alt: {
          es: "Dashboard del proveedor con las solicitudes de clientes recibidas",
          en: "Provider dashboard with the customer requests received",
        },
        desktop: { src: "/images/projects/marhaba-marbella/image-8.png", width: 1302, height: 900 },
      },
    ],
    summary: {
      es: "Marketplace digital de servicios premium en Marbella para presentar proveedores y facilitar solicitudes de servicios.",
      en: "A premium services marketplace in Marbella, designed to showcase providers and facilitate service requests.",
    },
    description: {
      es: "Desarrollé una plataforma web orientada a servicios premium, con funcionalidades para presentar proveedores y gestionar solicitudes. El proyecto incluye dos aplicaciones, una API propia, autenticación social y envío de correos transaccionales.",
      en: "I developed a web platform focused on premium services, with functionality to showcase providers and manage service requests. The project includes two applications, a dedicated API, social authentication, and transactional email delivery.",
    },
    features: {
      es: [
        "Dos aplicaciones y una API",
        "Marketplace público de servicios premium y experiencias VIP en Marbella",
        "Servicios como alquiler de yates, coches de lujo, chefs privados, seguridad privada y experiencias VIP",
        "Solicitudes de información y contratación de servicios",
        "Registro de proveedores con un dashboard propio para publicar y gestionar sus servicios",
        "Gestión de solicitudes de clientes interesados",
        "Dashboard interno para administrar usuarios, proveedores, servicios y solicitudes",
        "Autenticación mediante proveedores sociales",
        "Envío de correos transaccionales",
        "Almacenamiento de archivos en S3",
        "Aplicación desplegada en producción",
      ],
      en: [
        "Two applications and one API",
        "Public marketplace of premium services and VIP experiences in Marbella",
        "Services such as yacht rental, luxury cars, private chefs, private security, and VIP experiences",
        "Requests for information and for hiring services",
        "Provider registration with a dedicated dashboard to publish and manage their services",
        "Management of requests from interested customers",
        "Internal dashboard to manage users, providers, services, and requests",
        "Social-provider authentication",
        "Transactional emails",
        "File storage on S3",
        "Deployed to production",
      ],
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Clerk",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Nodemailer",
    ],
    infrastructure: ["Vercel", "Neon", "AWS S3"],
    links: [{ href: "https://marhabamarbella.com/" }],
  },
  {
    slug: "recivip",
    name: "RECIVIP",
    screens: [
      {
        alt: {
          es: "Listado de visitas con pestañas por estado y buscador",
          en: "Visits list with status tabs and search",
        },
        desktop: { src: "/images/projects/recivip/image-1.png", width: 1349, height: 867 },
      },
      {
        alt: {
          es: "Actualización de una visita con el flujo de aprobación y los datos del visitante",
          en: "Visit update screen with the approval workflow and visitor details",
        },
        desktop: { src: "/images/projects/recivip/image-2.png", width: 1342, height: 911 },
      },
      {
        alt: {
          es: "Documentos requeridos de una visita, con archivos cargados y opciones de vista previa y descarga",
          en: "Documents required for a visit, with uploaded files and preview and download options",
        },
        desktop: { src: "/images/projects/recivip/image-3.png", width: 1339, height: 905 },
      },
      {
        alt: {
          es: "Registro de entrada y salida de proveedores mediante lectura de código QR",
          en: "Provider entry and exit registration by scanning a QR code",
        },
        desktop: { src: "/images/projects/recivip/image-4.png", width: 1345, height: 912 },
      },
      {
        alt: {
          es: "Reporte de accesos con filtros por ubicación y fecha",
          en: "Access report with location and date filters",
        },
        desktop: { src: "/images/projects/recivip/image-5.png", width: 1347, height: 914 },
      },
    ],
    summary: {
      es: "Sistema de gestión de visitantes y control de acceso con flujos de aprobación, formularios dinámicos y códigos QR.",
      en: "Visitor management and access control system with approval workflows, dynamic forms, and QR codes.",
    },
    description: {
      es: "Desarrollé una solución para digitalizar el registro y la autorización de visitantes. El sistema incluye flujos de aprobación, formularios dinámicos, notificaciones y códigos QR para gestionar el acceso. La solución se adaptó y replicó para otros dos clientes.",
      en: "I developed a solution to digitize visitor registration and authorization. The system includes approval workflows, dynamic forms, notifications, and QR codes for access management. The solution was adapted and replicated for two additional clients.",
    },
    features: {
      es: [
        "Aplicación interna y API para gestionar entradas, salidas y visitas",
        "Registro de visitantes por parte del personal interno",
        "Invitaciones por correo electrónico",
        "Formularios que solicitan datos según el tipo de visita y los días autorizados",
        "Carga de documentos cuando son necesarios",
        "Validación y autorización por un administrador",
        "Generación de códigos QR de acceso",
        "Verificación de los códigos QR en caseta de vigilancia",
        "Soporte para visitas esporádicas, visitantes recurrentes y trabajadores temporales",
        "Solución replicada para otros dos clientes",
      ],
      en: [
        "Internal application and API to manage entries, exits, and visits",
        "Visitor registration by internal staff",
        "Email invitations",
        "Forms that request data based on visit type and authorized days",
        "Document upload when required",
        "Validation and authorization by an administrator",
        "Access QR code generation",
        "QR code verification at the security booth",
        "Support for one-off visits, recurring visitors, and temporary workers",
        "Solution replicated for two additional clients",
      ],
    },
    technologies: [
      "React",
      "JavaScript",
      "Zustand",
      "Material UI",
      "SCSS",
      "PHP",
      "Laravel",
    ],
    infrastructure: ["AWS EC2", "AWS S3"],
  },
];
