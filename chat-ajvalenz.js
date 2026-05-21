/* =========================================================
   ASISTENTE AJVALENZ v1
   Chat inteligente sin API, sin costos y sin backend.
   Archivo: chat-ajvalenz.js
   ========================================================= */

(function () {
  const AJVALENZ_WHATSAPP = "https://wa.me/56975510325";
  const AJVALENZ_EMAIL = "contacto@ajvalenz.cl";
  const AJVALENZ_WEB = "https://ajvalenz.cl";

  const knowledge = [
    {
      keys: ["minialmacen", "mini almacen", "mini almacén", "almacen", "almacén", "minimarket", "botilleria", "botillería", "inventario", "stock", "caja", "ventas", "pos"],
      answer:
        "MiniAlmacén Pro V3.0 es un sistema profesional para almacenes, minimarkets, botillerías y comercios.\n\nIncluye ventas, inventario, caja, clientes, proveedores, reportes y gestión Monocaja o Multicaja.\n\nEstá terminado y disponible para cotizar planes.",
      link: "minialmacen.html"
    },
    {
      keys: ["siges", "seguridad", "guardias", "ggss", "supervision", "supervisión", "instalaciones", "multitenant", "saas", "vigilancia"],
      answer:
        "SIGES Seguridad es una plataforma Multitenant / SaaS para empresas de seguridad.\n\nPermite gestionar operaciones, instalaciones, supervisión, reportes, usuarios, carta Gantt, horas extras, soporte y control centralizado.\n\nEstá terminado y disponible para cotizar planes.",
      link: "siges.html"
    },
    {
      keys: ["hotel", "hostal", "hostales", "cabaña", "cabañas", "pms", "reserva", "reservas", "habitaciones", "huesped", "huésped"],
      answer:
        "AJVALENZ Hotel PMS es un sistema en desarrollo para hoteles, hostales y cabañas.\n\nEstá pensado para reservas, habitaciones, check-in, check-out, caja, pagos, limpieza operativa y reportes.",
      link: "software.html"
    },
    {
      keys: ["medisalud", "medico", "médico", "salud", "clinica", "clínica", "pacientes", "agenda medica", "agenda médica"],
      answer:
        "MediSalud es una solución en desarrollo para centros de salud y atención clínica.\n\nSu objetivo es apoyar la gestión operativa, agenda, pacientes y procesos administrativos.",
      link: "software.html"
    },
    {
      keys: ["soporte", "reparacion", "reparación", "computador", "computadores", "notebook", "pc", "windows", "mac", "mantencion", "mantención", "formateo"],
      answer:
        "AJVALENZ ofrece soporte técnico para computadores, notebooks, Windows y Mac.\n\nIncluye diagnóstico, mantención, optimización, reparación y orientación técnica según el caso.\n\nPuedes solicitar atención o cotización por WhatsApp.",
      link: "contacto.html"
    },
    {
      keys: ["recuperacion", "recuperación", "datos", "disco", "disco duro", "pendrive", "memoria", "sd", "archivos", "rescate"],
      answer:
        "AJVALENZ ofrece recuperación y rescate de datos desde discos duros, memorias, pendrives y equipos con problemas.\n\nLa evaluación depende del estado físico y lógico del dispositivo.",
      link: "contacto.html"
    },
    {
      keys: ["web", "pagina", "página", "sitio", "ecommerce", "e-commerce", "landing", "desarrollo web", "diseño web", "tienda"],
      answer:
        "AJVALENZ desarrolla sitios web corporativos, páginas de presentación, landing pages, soluciones a medida y proyectos web para negocios o profesionales.\n\nPuedes cotizar indicando el tipo de sitio que necesitas.",
      link: "software.html"
    },
    {
      keys: ["curso", "cursos", "capacitacion", "capacitación", "excel", "word", "powerpoint", "office", "ofimatica", "ofimática", "clases"],
      answer:
        "AJVALENZ puede preparar cursos y capacitaciones para usuarios básicos e intermedios, especialmente en herramientas como Excel, Word, PowerPoint y uso general de tecnología.",
      link: "academia.html"
    },
    {
      keys: ["contacto", "cotizar", "cotizacion", "cotización", "precio", "valor", "planes", "whatsapp", "correo", "email", "telefono", "teléfono"],
      answer:
        "Puedes cotizar o solicitar información por WhatsApp o correo.\n\nWhatsApp: +569 75510325\nCorreo: contacto@ajvalenz.cl\nSitio web: ajvalenz.cl\n\nPara sistemas como MiniAlmacén Pro o SIGES Seguridad, lo mejor es solicitar una cotización según el caso.",
      link: "contacto.html"
    }
  ];

  const fallbackAnswer =
    "Puedo orientarte sobre AJVALENZ, MiniAlmacén Pro, SIGES Seguridad, soporte técnico, recuperación de datos, desarrollo web, cursos y cotizaciones.\n\nSi tu consulta es más específica, puedes escribir por WhatsApp a +569 75510325.";

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\sñ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findBestAnswer(userText) {
    const normalized = normalize(userText);
    let best = null;
    let bestScore = 0;

    knowledge.forEach(function (item) {
      let score = 0;

      item.keys.forEach(function (key) {
        const k = normalize(key);
        if (normalized.includes(k)) {
          score += k.length > 7 ? 3 : 2;
        }
      });

      if (score > bestScore) {
        best = item;
        bestScore = score;
      }
    });

    if (!best) {
      return {
        answer: fallbackAnswer,
        link: null
      };
    }

    return best;
  }

  function createChat() {
    if (document.getElementById("aj-chat-launcher")) return;

    const launcher = document.createElement("button");
    launcher.id = "aj-chat-launcher";
    launcher.setAttribute("aria-label", "Abrir Asistente AJVALENZ");
    launcher.innerHTML = "💬";

    const chat = document.createElement("div");
    chat.id = "aj-chat-window";

    chat.innerHTML = `
      <div class="aj-chat-header">
        <div class="aj-chat-title">
          <img src="logo.png" alt="AJVALENZ" class="aj-chat-logo">
          <div>
            <strong>Asistente AJVALENZ</strong>
            <span>Orientación comercial sin API</span>
          </div>
        </div>
        <button class="aj-chat-close" aria-label="Cerrar chat">×</button>
      </div>

      <div class="aj-chat-body" id="aj-chat-body"></div>

      <div class="aj-quick-actions">
        <button data-aj-question="Quiero cotizar MiniAlmacén Pro">MiniAlmacén Pro</button>
        <button data-aj-question="Quiero cotizar SIGES Seguridad">SIGES Seguridad</button>
        <button data-aj-question="Necesito soporte técnico">Soporte técnico</button>
        <button data-aj-question="Cómo puedo contactarte">Contacto</button>
      </div>

      <form class="aj-chat-form" id="aj-chat-form">
        <input id="aj-chat-input" type="text" autocomplete="off" placeholder="Escribe tu consulta..." maxlength="220">
        <button class="aj-chat-send" type="submit">Enviar</button>
      </form>

      <div class="aj-chat-footer">
        Asistente informativo. Para cotizaciones formales, contactar a AJVALENZ.
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(chat);

    const closeBtn = chat.querySelector(".aj-chat-close");
    const body = chat.querySelector("#aj-chat-body");
    const form = chat.querySelector("#aj-chat-form");
    const input = chat.querySelector("#aj-chat-input");

    function openChat() {
      chat.classList.add("aj-open");
      launcher.style.display = "none";

      if (!body.dataset.started) {
        addMessage(
          "bot",
          "Hola, soy el Asistente AJVALENZ.\n\nPuedo orientarte sobre software, soporte técnico, recuperación de datos, cursos y cotizaciones.\n\n¿Qué necesitas?"
        );
        body.dataset.started = "1";
      }

      setTimeout(function () {
        input.focus();
      }, 80);
    }

    function closeChat() {
      chat.classList.remove("aj-open");
      launcher.style.display = "flex";
    }

    function addMessage(type, text) {
      const row = document.createElement("div");
      row.className = "aj-chat-message aj-" + type;

      const bubble = document.createElement("div");
      bubble.className = "aj-chat-bubble";
      bubble.textContent = text;

      row.appendChild(bubble);
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    }

    function addBotResponse(result) {
      let text = result.answer;

      if (result.link) {
        text += "\n\nPuedes revisar más información aquí: " + result.link;
      }

      text += "\n\nPara cotizar planes: WhatsApp +569 75510325";

      addMessage("bot", text);
    }

    function handleQuestion(question) {
      const clean = (question || "").trim();
      if (!clean) return;

      addMessage("user", clean);

      setTimeout(function () {
        const result = findBestAnswer(clean);
        addBotResponse(result);
      }, 350);
    }

    launcher.addEventListener("click", openChat);
    closeBtn.addEventListener("click", closeChat);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const question = input.value;
      input.value = "";

      handleQuestion(question);
    });

    chat.querySelectorAll("[data-aj-question]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        handleQuestion(this.getAttribute("data-aj-question"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChat);
  } else {
    createChat();
  }
})();