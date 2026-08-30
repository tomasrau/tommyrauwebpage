// webinar.ics.ts — archivo de calendario del webinar.
//
// Endpoint estático: Astro lo prerenderiza a /webinar/webinar.ics durante
// el build, así que no necesita servidor. Se sirve como texto de
// calendario y el sistema operativo lo abre con Apple Calendar, Outlook o
// lo que el visitante tenga por defecto.
//
// Por qué un .ics y no sólo el link de Google Calendar: el link de Google
// sirve únicamente a quien usa Google Calendar. El .ics cubre al resto
// (Apple, Outlook, Thunderbird) y es el formato estándar. Se ofrecen los
// dos porque cubren públicos distintos.
//
// Las horas van en UTC (sufijo Z), no en hora local: así el evento cae
// bien en la agenda de cualquiera, sin depender de que su equipo tenga
// bien configurada la zona de Buenos Aires. Verificado con `date`:
// 19:00 ART = 22:00 UTC del 24/09, y termina 01:00 UTC del 25/09.
import type { APIRoute } from "astro";

const INICIO_UTC = "20260924T220000Z";
const FIN_UTC = "20260925T010000Z";

const TITULO = "Webinar · Economía & Finanzas: Ordenar e Invertir";
const URL_EVENTO = "https://tomasrau.ar/webinar";

const DESCRIPCION = [
  "Tres horas en vivo para entender el contexto económico, ordenar tus finanzas",
  "y empezar a pensar tus inversiones con criterio.",
  "",
  "El acceso llega por mail antes del encuentro.",
  "",
  `Más información: ${URL_EVENTO}`,
].join("\\n");

// RFC 5545: las líneas no deberían pasar de 75 octetos; el plegado va con
// CRLF + un espacio al inicio de la continuación. Sin esto, una
// descripción larga rompe el parseo en algunos clientes.
function plegar(linea: string): string {
  const bytes = [...linea];
  if (bytes.length <= 74) return linea;
  const partes: string[] = [];
  let actual = "";
  for (const ch of bytes) {
    if (actual.length >= 74) {
      partes.push(actual);
      actual = " ";
    }
    actual += ch;
  }
  partes.push(actual);
  return partes.join("\r\n");
}

export const GET: APIRoute = () => {
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//tomasrau.ar//Webinar//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    // UID estable: si alguien descarga el archivo dos veces, la agenda
    // actualiza el mismo evento en vez de duplicarlo.
    "UID:webinar-economia-finanzas-2026-09-24@tomasrau.ar",
    `DTSTAMP:${INICIO_UTC}`,
    `DTSTART:${INICIO_UTC}`,
    `DTEND:${FIN_UTC}`,
    plegar(`SUMMARY:${TITULO}`),
    plegar(`DESCRIPTION:${DESCRIPCION}`),
    plegar(`URL:${URL_EVENTO}`),
    "LOCATION:Online",
    "STATUS:CONFIRMED",
    // Aviso 1 día antes y otro 30 minutos antes: es un evento en vivo y
    // el no-show es el costo real de un webinar pago.
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Mañana es el webinar",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:El webinar empieza en 30 minutos",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // CRLF, no \n: lo pide el RFC y algunos clientes de Outlook rechazan el
  // archivo si sólo lleva saltos de línea Unix.
  return new Response(lineas.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="webinar-tomasrau.ics"',
    },
  });
};
