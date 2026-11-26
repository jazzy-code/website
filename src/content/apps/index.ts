import type { App, AppDevice, AppScreen } from "./types";

function video(
  slug: string,
  duration: string,
  uploaded: string,
): App["video"] {
  const base = `/videos/apps/${slug}`;
  return {
    src: `${base}.mp4`,
    poster: `/images/apps/${slug}/poster.webp`,
    duration,
    uploaded,
    subtitles: { en: `${base}.en.vtt`, es: `${base}.es.vtt` },
  };
}

function screen(
  slug: string,
  file: string,
  device: AppDevice,
  en: string,
  es: string,
): AppScreen {
  // Captures are stored at their native resolution; next/image scales them down.
  return {
    src: `/images/apps/${slug}/${file}.webp`,
    width: device === "desktop" ? 2880 : 1179,
    height: device === "desktop" ? 1800 : 2556,
    device,
    alt: { en, es },
  };
}

const scary = (file: string, en: string, es: string) =>
  screen("scary-split", file, "phone", en, es);
const chill = (file: string, en: string, es: string) =>
  screen("chill-pdf", file, "desktop", en, es);

/** Display order of the Apps page. */
export const apps: readonly App[] = [
  {
    slug: "scary-split",
    name: "Scary Split",
    url: "https://scarysplit.jazzycode.com",
    theme: { accent: "#fcd34d", glow: "#6d3fd1" },
    logo: { src: "/images/apps/scary-split/logo.webp", width: 320, height: 320 },
    tagline: {
      en: "Split shared expenses without the scare",
      es: "Divide gastos entre amigos sin sustos",
    },
    summary: {
      en: "Log what was spent on a trip, party or night out, and Scary Split works out each share and who has to pay whom.",
      es: "Anota lo que se gastó en un viaje, fiesta o salida y Scary Split calcula cuánto le toca a cada quien y quién le transfiere a quién.",
    },
    video: video("scary-split", "1:17", "2026-11-26"),
    hero: {
      desktop: {
        src: "/images/apps/scary-split/home-desktop.png",
        width: 2800,
        height: 1800,
        device: "desktop",
        alt: {
          en: "Scary Split home screen on a computer",
          es: "Pantalla de inicio de Scary Split en computadora",
        },
      },
      phone: scary(
        "landing-logged-in",
        "Scary Split home screen",
        "Pantalla de inicio de Scary Split",
      ),
    },
    steps: [
      {
        title: { en: "Create your sustito", es: "Crea tu sustito" },
        text: {
          en: "A “sustito” is any trip, party or event with shared costs. Name it and add your friends.",
          es: "Un sustito es cualquier viaje, fiesta o evento con gastos compartidos. Ponle nombre y agrega a tus amigos.",
        },
        screen: scary(
          "create-sustito-filled",
          "Form to create a sustito with its participants",
          "Formulario para crear un sustito con sus participantes",
        ),
      },
      {
        title: { en: "Add the expenses", es: "Anota los gastos" },
        text: {
          en: "Concept, amount, who paid and who takes part. Split it into equal shares.",
          es: "Concepto, cantidad, quién pagó y quiénes participan. Divídelo en partes iguales.",
        },
        screen: scary(
          "add-expense-filled-equitative",
          "New expense split equally among five people",
          "Gasto nuevo dividido en partes iguales entre cinco personas",
        ),
      },
      {
        title: { en: "Or set custom amounts", es: "O divide por consumo" },
        text: {
          en: "When not everyone consumed the same, type what each person owes.",
          es: "Cuando no todos consumieron lo mismo, escribe lo que le toca a cada persona.",
        },
        screen: scary(
          "add-expense-filled-personalized",
          "Expense with a custom amount per person",
          "Gasto con una cantidad personalizada por persona",
        ),
      },
      {
        title: { en: "Share it", es: "Compártelo" },
        text: {
          en: "Send the link so your friends join and add their own expenses.",
          es: "Envía el enlace para que tus amigos se unan y agreguen sus propios gastos.",
        },
        screen: scary(
          "share-sustito-alert",
          "Confirmation that the sharing link was copied",
          "Aviso de que el enlace para compartir se copió",
        ),
      },
      {
        title: { en: "See who owes whom", es: "Mira quién le debe a quién" },
        text: {
          en: "Debts are simplified into a balance, so there are fewer transfers to make.",
          es: "Las deudas se simplifican en un balance para que hagan menos transferencias.",
        },
        screen: scary(
          "who-owes-who",
          "List of the transfers that settle the debts",
          "Lista de las transferencias que saldan las deudas",
        ),
      },
      {
        title: { en: "Settle up", es: "Queden a mano" },
        text: {
          en: "Record each payment as it happens until nothing is pending.",
          es: "Registra cada pago conforme sucede hasta que no quede nada pendiente.",
        },
        screen: scary(
          "payments-completed",
          "All debts settled, with the payment history",
          "Todas las deudas saldadas, con el historial de pagos",
        ),
      },
    ],
    features: [
      {
        icon: "users",
        title: { en: "Groups per event", es: "Grupos por evento" },
        text: {
          en: "Each trip or party lives in its own sustito, pending or settled.",
          es: "Cada viaje o fiesta en su propio sustito, pendiente o saldado.",
        },
      },
      {
        icon: "split",
        title: {
          en: "Equal or custom split",
          es: "División pareja o personalizada",
        },
        text: {
          en: "Choose how every single expense is divided.",
          es: "Elige cómo se divide cada gasto.",
        },
      },
      {
        icon: "balance",
        title: { en: "Fewer transfers", es: "Menos transferencias" },
        text: {
          en: "The balance simplifies who pays whom.",
          es: "El balance simplifica quién le paga a quién.",
        },
      },
      {
        icon: "payment",
        title: { en: "Payment history", es: "Historial de pagos" },
        text: {
          en: "Every payment is recorded and the debts update.",
          es: "Cada pago queda registrado y las deudas se actualizan.",
        },
      },
      {
        icon: "link",
        title: { en: "Share by link", es: "Comparte con un enlace" },
        text: {
          en: "Friends join and add what they paid.",
          es: "Tus amigos se unen y agregan lo que pagaron.",
        },
      },
      {
        icon: "login",
        title: { en: "Email or Google", es: "Correo o Google" },
        text: {
          en: "Sign in whichever way you prefer.",
          es: "Inicia sesión como prefieras.",
        },
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Prisma",
      "Better Auth",
      "Zod",
      "Resend",
      "Nodemailer",
    ],
  },
  {
    slug: "chill-pdf",
    name: "Chill PDF",
    url: "https://chillpdf.jazzycode.com",
    theme: { accent: "#6fd3f7", glow: "#1b7fb5" },
    logo: { src: "/images/apps/chill-pdf/logo.webp", width: 400, height: 339 },
    tagline: {
      en: "Edit your PDFs without the stress",
      es: "Edita tus PDF sin estrés",
    },
    summary: {
      en: "Delete, reorder and merge pages, add text and images, and download the result. Your files are processed in your browser.",
      es: "Elimina, reordena y fusiona páginas, agrega texto e imágenes y descarga el resultado. Tus archivos se procesan en tu navegador.",
    },
    video: video("chill-pdf", "1:17", "2026-11-26"),
    hero: {
      desktop: chill(
        "editor",
        "Chill PDF editor with a document open",
        "Editor de Chill PDF con un documento abierto",
      ),
      phone: screen(
        "chill-pdf",
        "home-mobile",
        "phone",
        "Chill PDF home screen on a phone",
        "Pantalla de inicio de Chill PDF en un teléfono",
      ),
    },
    steps: [
      {
        title: { en: "Upload your PDF", es: "Carga tu PDF" },
        text: {
          en: "Drag and drop the document, or pick it from your files.",
          es: "Arrastra y suelta el documento, o selecciónalo desde tus archivos.",
        },
        screen: chill(
          "home",
          "Start screen with the drop area",
          "Pantalla inicial con la zona para soltar archivos",
        ),
      },
      {
        title: {
          en: "Delete pages, undo anytime",
          es: "Elimina páginas y deshaz",
        },
        text: {
          en: "Remove what you don't need. If it was a mistake, bring it back.",
          es: "Quita lo que no necesites. Si fue un error, recupéralo.",
        },
        screen: chill(
          "delete",
          "Notice of a deleted page with an undo button",
          "Aviso de página eliminada con el botón para deshacer",
        ),
      },
      {
        title: { en: "Reorder by dragging", es: "Reordena arrastrando" },
        text: {
          en: "Grab a thumbnail and drop it where you want it.",
          es: "Toma una miniatura y suéltala en la posición que quieras.",
        },
        screen: chill(
          "reorder",
          "Page moved to a new position in the sidebar",
          "Página movida a otra posición en la barra lateral",
        ),
      },
      {
        title: { en: "Merge PDFs", es: "Fusiona PDF" },
        text: {
          en: "Add more files and their pages go after the last one.",
          es: "Agrega más archivos y sus páginas se añaden después de la última.",
        },
        screen: chill(
          "merge",
          "Notice that the pages of a second PDF were added",
          "Aviso de que se añadieron las páginas de otro PDF",
        ),
      },
      {
        title: { en: "Add text", es: "Agrega texto" },
        text: {
          en: "Click anywhere on the page, type and format it.",
          es: "Haz clic en la hoja, escribe y dale formato.",
        },
        screen: chill(
          "text",
          "Text box on a page with its formatting toolbar",
          "Caja de texto en una página con su barra de formato",
        ),
      },
      {
        title: {
          en: "Insert and crop images",
          es: "Inserta y recorta imágenes",
        },
        text: {
          en: "Resize from the corners and keep only the part you want.",
          es: "Cambia el tamaño desde las esquinas y conserva solo la parte que quieras.",
        },
        screen: chill(
          "image",
          "Dialog to crop an inserted image",
          "Ventana para recortar una imagen insertada",
        ),
      },
      {
        title: { en: "Download", es: "Descarga" },
        text: {
          en: "Get your edited PDF, ready to send.",
          es: "Obtén tu PDF editado, listo para enviar.",
        },
        screen: chill(
          "download",
          "The downloaded PDF with the added text and image",
          "El PDF descargado con el texto y la imagen agregados",
        ),
      },
    ],
    features: [
      {
        icon: "private",
        title: { en: "Stays in your browser", es: "Se queda en tu navegador" },
        text: {
          en: "Editing happens on your device: documents are not uploaded to a server.",
          es: "La edición ocurre en tu dispositivo: los documentos no se suben a un servidor.",
        },
      },
      {
        icon: "pages",
        title: { en: "Page control", es: "Control de páginas" },
        text: {
          en: "Delete pages, with undo and redo.",
          es: "Elimina páginas, con deshacer y rehacer.",
        },
      },
      {
        icon: "reorder",
        title: { en: "Drag and drop", es: "Arrastrar y soltar" },
        text: {
          en: "Reorder pages from the side panel.",
          es: "Reordena páginas desde el panel lateral.",
        },
      },
      {
        icon: "merge",
        title: { en: "Merge documents", es: "Fusiona documentos" },
        text: {
          en: "Combine several PDFs into one.",
          es: "Combina varios PDF en uno solo.",
        },
      },
      {
        icon: "text",
        title: { en: "Formatted text", es: "Texto con formato" },
        text: {
          en: "Font, size, bold, italics, underline, color and alignment.",
          es: "Fuente, tamaño, negrita, cursiva, subrayado, color y alineación.",
        },
      },
      {
        icon: "image",
        title: { en: "Images", es: "Imágenes" },
        text: {
          en: "Insert, move, resize and crop.",
          es: "Inserta, mueve, redimensiona y recorta.",
        },
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PDF.js",
      "pdf-lib",
      "Zustand",
      "dnd kit",
    ],
  },
];
