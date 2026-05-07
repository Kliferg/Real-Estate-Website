(function () {
  const e = React.createElement;
  const API_BASE = window.API_BASE || "http://localhost:4000";

  const ownerContactFallback = {
    email: "owner@northlineestates.ph",
    phone: "+639171234567"
  };

  const fallbackModels = [
    {
      id: 1,
      name: "Cavite Starter Townhouse",
      price: "PHP 3,850,000",
      location: "Imus, Cavite",
      beds: 3,
      baths: 2,
      area: "82 sqm",
      lot: "60 sqm",
      summary: "A practical townhouse for first-time buyers who need access to Metro Manila and nearby schools."
    },
    {
      id: 2,
      name: "Laguna Family Duplex",
      price: "PHP 5,600,000",
      location: "Santa Rosa, Laguna",
      beds: 4,
      baths: 3,
      area: "128 sqm",
      lot: "96 sqm",
      summary: "A family-ready duplex with parking, a flexible ground-floor room, and a simple open living area."
    },
    {
      id: 3,
      name: "Bulacan Modern Bungalow",
      price: "PHP 4,250,000",
      location: "Malolos, Bulacan",
      beds: 3,
      baths: 2,
      area: "94 sqm",
      lot: "120 sqm",
      summary: "A single-storey home with fewer stairs, a wider lot, and a compact layout for everyday comfort."
    },
    {
      id: 4,
      name: "Antipolo View Residence",
      price: "PHP 8,900,000",
      location: "Antipolo, Rizal",
      beds: 4,
      baths: 3.5,
      area: "185 sqm",
      lot: "150 sqm",
      summary: "A hillside-inspired home with larger windows, a view deck placeholder, and private family zones."
    },
    {
      id: 5,
      name: "Cebu Suburban House",
      price: "PHP 7,450,000",
      location: "Talisay, Cebu",
      beds: 4,
      baths: 3,
      area: "162 sqm",
      lot: "132 sqm",
      summary: "A balanced Visayas home model for growing families who want city access and a quieter street."
    },
    {
      id: 6,
      name: "Davao Courtyard Home",
      price: "PHP 6,800,000",
      location: "Lanang, Davao City",
      beds: 3,
      baths: 3,
      area: "148 sqm",
      lot: "140 sqm",
      summary: "A warm-climate layout with a shaded courtyard placeholder, secure parking, and airy interiors."
    }
  ];

  const navItems = [
    { id: "home", label: "Home" },
    { id: "models", label: "Models" },
    { id: "about", label: "About Us" }
  ];

  const classes = {
    page: "min-h-screen bg-gradient-to-b from-deep-blue/10 via-white to-white",
    shell: "mx-auto w-[calc(100%_-_32px)] max-w-[1160px]",
    eyebrow: "text-xs font-extrabold uppercase tracking-[0.12em] text-deep-blue-soft",
    h1: "mt-4 mb-5 text-5xl font-black leading-[0.95] tracking-normal text-ink sm:text-6xl lg:text-8xl",
    h2: "text-3xl font-black leading-tight tracking-normal text-ink sm:text-4xl",
    lead: "max-w-2xl text-base leading-8 text-slate-600 sm:text-lg",
    button: "inline-flex min-h-11 items-center justify-center rounded-md border border-ink px-5 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-deep-blue-soft focus:ring-offset-2",
    buttonDark: "bg-ink text-white",
    buttonLight: "bg-white text-ink",
    buttonBlue: "border-deep-blue bg-deep-blue text-white",
    card: "rounded-lg border border-slate-200 bg-white",
    input: "w-full rounded-md border border-white/25 bg-white/10 px-3 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/80",
    label: "text-sm font-extrabold text-white/85",
    pill: "rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-ink-soft"
  };

  function useHashRoute() {
    const readRoute = () => (window.location.hash || "#home").replace("#", "");
    const [page, setPage] = React.useState(readRoute);

    React.useEffect(() => {
      const handleHash = () => setPage(readRoute());
      window.addEventListener("hashchange", handleHash);
      return () => window.removeEventListener("hashchange", handleHash);
    }, []);

    const navigate = (nextPage) => {
      window.location.hash = nextPage;
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return [page, navigate];
  }

  function useCompanyContact() {
    const [contact, setContact] = React.useState(ownerContactFallback);

    React.useEffect(() => {
      fetch(`${API_BASE}/api/company`)
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((company) => setContact({
          email: company.ownerEmail || company.contactEmail || ownerContactFallback.email,
          phone: company.contactPhone || ownerContactFallback.phone
        }))
        .catch(() => setContact(ownerContactFallback));
    }, []);

    return contact;
  }

  function Navbar({ page, navigate }) {
    const [open, setOpen] = React.useState(false);
    const go = (id) => {
      navigate(id);
      setOpen(false);
    };

    return e("header", { className: "sticky top-0 z-20 border-b border-slate-200/90 bg-white/90 backdrop-blur" },
      e("div", { className: `${classes.shell} flex min-h-[72px] items-center justify-between gap-5` },
        e("button", { className: "flex items-center gap-3 text-left", onClick: () => go("home"), "aria-label": "Go to home page" },
          e("span", { className: "grid h-11 w-11 place-items-center border-2 border-deep-blue-soft bg-ink text-sm font-black text-white" }, "NE"),
          e("span", null,
            e("span", { className: "block font-extrabold text-ink" }, "Northline Estates"),
            e("span", { className: "hidden text-xs text-slate-500 sm:block" }, "Philippines real estate startup")
          )
        ),
        e("button", {
          className: "grid h-11 w-11 place-items-center rounded-md border border-slate-200 bg-white text-ink md:hidden",
          onClick: () => setOpen(!open),
          "aria-label": "Open navigation",
          "aria-expanded": open
        },
          e("span", { className: "relative h-0.5 w-5 bg-current before:absolute before:left-0 before:-top-2 before:h-0.5 before:w-5 before:bg-current after:absolute after:left-0 after:top-2 after:h-0.5 after:w-5 after:bg-current" })
        ),
        e("nav", {
          className: `${open ? "flex" : "hidden"} absolute left-4 right-4 top-16 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-2xl md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`,
          "aria-label": "Primary navigation"
        },
          navItems.map((item) => e("button", {
            key: item.id,
            className: `rounded-md px-4 py-2 text-left text-sm font-extrabold transition ${page === item.id ? "bg-deep-blue text-white" : "text-ink-soft hover:bg-deep-blue hover:text-white"}`,
            onClick: () => go(item.id)
          }, item.label))
        )
      )
    );
  }

  function PlaceholderImage({ title, meta, compact }) {
    return e("div", {
      className: `${compact ? "min-h-[220px]" : "min-h-[320px]"} flex items-end justify-between gap-4 bg-deep-blue p-5 text-white [background-image:linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,255,255,0)),repeating-linear-gradient(45deg,rgba(255,255,255,.08)_0_14px,rgba(255,255,255,.03)_14px_28px)]`,
      role: "img",
      "aria-label": `${title} placeholder image`
    },
      e("span", { className: "font-extrabold" }, title),
      e("span", { className: "text-sm text-white/70" }, meta)
    );
  }

  function Home({ navigate }) {
    return e(React.Fragment, null,
      e("section", { className: "grid min-h-[calc(100vh-72px)] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,.82fr)] lg:py-14" },
        e("div", null,
          e("div", { className: classes.eyebrow }, "Philippines-based real estate company"),
          e("h1", { className: classes.h1 }, "Homes planned for Filipino buyers."),
          e("p", { className: classes.lead },
            "Northline Estates helps local buyers compare townhouses, duplexes, bungalows, and modern family homes across key Philippine locations before booking a site visit."
          ),
          e("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row" },
            e("button", { className: `${classes.button} ${classes.buttonDark}`, onClick: () => navigate("models") }, "View Models"),
            e("button", { className: `${classes.button} ${classes.buttonLight}`, onClick: () => navigate("about") }, "Contact Us")
          )
        ),
        e("aside", { className: "overflow-hidden rounded-lg bg-ink text-white shadow-2xl", "aria-label": "Company dashboard summary" },
          e(PlaceholderImage, { title: "Philippine home placeholder", meta: "Exterior / interior render" }),
          e("div", { className: "grid border-t border-white/15 sm:grid-cols-3" },
            e(Stat, { value: "6", label: "Launch models" }),
            e(Stat, { value: "PHP", label: "Local pricing" }),
            e(Stat, { value: "24h", label: "Inquiry response" })
          )
        )
      ),
      e("section", { className: "py-14" },
        e("div", { className: "mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between" },
          e("div", null,
            e("div", { className: classes.eyebrow }, "Dashboard"),
            e("h2", { className: classes.h2 }, "What Northline offers")
          ),
          e("p", { className: classes.lead }, "A clean starting point for buyers in the Philippines: compare homes, understand budget ranges, and contact the owner through email or SMS.")
        ),
        e("div", { className: "grid gap-4 md:grid-cols-3" },
          e(DashboardTile, { icon: "1", title: "Local house models", text: "A focused Philippine catalog with peso pricing, province/city labels, and clear home specs." }),
          e(DashboardTile, { icon: "2", title: "Buyer-friendly guidance", text: "Simple content for comparing starter homes, family layouts, and larger residences." }),
          e(DashboardTile, { icon: "3", title: "Email and SMS contact", text: "Inquiries are saved to the backend, then buyers can send the same message to the owner." })
        )
      )
    );
  }

  function Stat({ value, label }) {
    return e("div", { className: "border-b border-white/15 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0" },
      e("strong", { className: "block text-2xl" }, value),
      e("span", { className: "text-xs text-white/65" }, label)
    );
  }

  function DashboardTile({ icon, title, text }) {
    return e("article", { className: `${classes.card} p-6` },
      e("div", { className: "mb-5 grid h-10 w-10 place-items-center rounded-md bg-deep-blue text-sm font-black text-white" }, icon),
      e("h3", { className: "mb-3 text-lg font-black text-ink" }, title),
      e("p", { className: "leading-7 text-slate-500" }, text)
    );
  }

  function Models() {
    const [models, setModels] = React.useState(fallbackModels);

    React.useEffect(() => {
      fetch(`${API_BASE}/api/models`)
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then((data) => setModels(data.models || fallbackModels))
        .catch(() => setModels(fallbackModels));
    }, []);

    return e(React.Fragment, null,
      e("section", { className: "py-12 sm:py-16" },
        e("div", { className: classes.eyebrow }, "House models"),
        e("h1", { className: classes.h1 }, "Compare Philippine home options."),
        e("p", { className: classes.lead }, "These cards use placeholder picture blocks and local-style details, ready to replace with real photos, renders, or walkthrough stills.")
      ),
      e("section", { className: "pb-14" },
        e("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3" },
          models.map((model) => e(ModelCard, { key: model.id, model }))
        )
      ),
      e("section", { className: "grid gap-7 py-14 lg:grid-cols-[.82fr_1fr]" },
        e("div", null,
          e("div", { className: classes.eyebrow }, "Buyer flow"),
          e("h2", { className: classes.h2 }, "Built for mobile-first decisions"),
          e("p", { className: `${classes.lead} mt-4` }, "Cards stack cleanly on phones, navigation collapses into a compact menu, and inquiry capture stays reachable without crowding the page.")
        ),
        e(InquiryForm, null)
      )
    );
  }

  function ModelCard({ model }) {
    return e("article", { className: `${classes.card} overflow-hidden` },
      e(PlaceholderImage, { title: model.name, meta: "Photo placeholder", compact: true }),
      e("div", { className: "p-5" },
        e("div", { className: "mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-deep-blue-soft" }, model.location),
        e("h3", { className: "mb-3 text-xl font-black text-ink" }, model.name),
        e("p", { className: "leading-7 text-slate-500" }, model.summary),
        e("div", { className: "my-5 flex flex-wrap gap-2" },
          e("span", { className: classes.pill }, model.price),
          e("span", { className: classes.pill }, `${model.beds} beds`),
          e("span", { className: classes.pill }, `${model.baths} baths`),
          e("span", { className: classes.pill }, model.area),
          e("span", { className: classes.pill }, `${model.lot} lot`)
        ),
        e("button", { className: `${classes.button} ${classes.buttonBlue} w-full`, onClick: () => window.location.hash = "about" }, "Request Details")
      )
    );
  }

  function InquiryForm() {
    const contact = useCompanyContact();
    const [status, setStatus] = React.useState("");
    const [lastMessage, setLastMessage] = React.useState("");
    const [form, setForm] = React.useState({ name: "", email: "", phone: "", interest: "" });

    const update = (field, value) => setForm({ ...form, [field]: value });

    const buildMessage = (data) => [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Inquiry: ${data.interest}`
    ].join("\n");

    const openEmail = (message) => {
      const subject = encodeURIComponent("Real estate inquiry - Northline Estates");
      const body = encodeURIComponent(message || buildMessage(form));
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    };

    const openSms = (message) => {
      const body = encodeURIComponent(message || buildMessage(form));
      window.location.href = `sms:${contact.phone}?&body=${body}`;
    };

    const submit = (event) => {
      event.preventDefault();
      const message = buildMessage(form);
      setStatus("Saving inquiry...");
      fetch(`${API_BASE}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then(() => {
          setLastMessage(message);
          setStatus("Inquiry saved. Choose Email Owner or SMS Owner to send it directly.");
        })
        .catch(() => {
          setLastMessage(message);
          setStatus("Backend is offline. You can still send the inquiry by email or SMS.");
        });
    };

    return e("form", { className: "rounded-lg border border-slate-800 bg-ink p-6 text-white", onSubmit: submit },
      e("h2", { className: "mb-2 text-2xl font-black" }, "Contact Us"),
      e("p", { className: "mb-5 leading-7 text-white/70" }, "Save the inquiry to the backend, then send the same message to the owner through email or SMS."),
      e("div", { className: "mb-4 grid gap-2" },
        e("label", { className: classes.label, htmlFor: "name" }, "Name"),
        e("input", { className: classes.input, id: "name", value: form.name, onChange: (event) => update("name", event.target.value), required: true })
      ),
      e("div", { className: "mb-4 grid gap-2" },
        e("label", { className: classes.label, htmlFor: "email" }, "Email"),
        e("input", { className: classes.input, id: "email", type: "email", value: form.email, onChange: (event) => update("email", event.target.value), required: true })
      ),
      e("div", { className: "mb-4 grid gap-2" },
        e("label", { className: classes.label, htmlFor: "phone" }, "Phone number"),
        e("input", { className: classes.input, id: "phone", value: form.phone, onChange: (event) => update("phone", event.target.value), placeholder: "09XX XXX XXXX" })
      ),
      e("div", { className: "mb-5 grid gap-2" },
        e("label", { className: classes.label, htmlFor: "interest" }, "What model or location are you interested in?"),
        e("textarea", { className: `${classes.input} min-h-32 resize-y`, id: "interest", value: form.interest, onChange: (event) => update("interest", event.target.value), required: true })
      ),
      e("div", { className: "grid gap-3 sm:grid-cols-3" },
        e("button", { className: `${classes.button} ${classes.buttonLight}`, type: "submit" }, "Save Inquiry"),
        e("button", { className: `${classes.button} ${classes.buttonBlue}`, type: "button", onClick: () => openEmail(lastMessage) }, "Email Owner"),
        e("button", { className: `${classes.button} ${classes.buttonLight}`, type: "button", onClick: () => openSms(lastMessage) }, "SMS Owner")
      ),
      e("div", { className: "mt-4 min-h-6 text-sm text-white/75", role: "status" }, status),
      e("div", { className: "mt-3 text-xs leading-6 text-white/50" }, `Owner: ${contact.email} | ${contact.phone}`)
    );
  }

  function About() {
    return e(React.Fragment, null,
      e("section", { className: "py-12 sm:py-16" },
        e("div", { className: classes.eyebrow }, "About Us"),
        e("h1", { className: classes.h1 }, "A startup built for local home buying."),
        e("p", { className: classes.lead }, "Northline Estates is a modern real estate startup for the Philippine market, with clear property comparisons, peso pricing, and direct inquiry handling.")
      ),
      e("section", { className: "-mx-[calc((100vw-100%)/2)] border-y border-slate-200 bg-slate-100 py-14" },
        e("div", { className: `${classes.shell} grid items-center gap-7 lg:grid-cols-2` },
          e("div", { className: "overflow-hidden rounded-lg" },
            e(PlaceholderImage, { title: "Team / office placeholder", meta: "Company image" })
          ),
          e("div", null,
            e("div", { className: classes.eyebrow }, "Company position"),
            e("h2", { className: classes.h2 }, "Clean inventory, clear guidance, responsive service."),
            e("p", { className: `${classes.lead} mt-4` }, "The site introduces the company as a focused partner for buyers who want to compare local homes without getting lost in cluttered listings. It can later expand into agent profiles, location pages, booking calendars, and admin tools.")
          )
        )
      ),
      e("section", { className: "grid gap-7 py-14 lg:grid-cols-[.82fr_1fr]" },
        e("div", { className: "grid gap-4" },
          e(ValueCard, { title: "Philippine catalog", text: "Models include Cavite, Laguna, Bulacan, Rizal, Cebu, and Davao options with PHP pricing." }),
          e(ValueCard, { title: "Responsive experience", text: "The Tailwind layout adapts across phones, tablets, and desktops with touch-friendly navigation." }),
          e(ValueCard, { title: "Contact-ready backend", text: "The backend separates company data, model data, and captured inquiries for easier future expansion." })
        ),
        e(InquiryForm, null)
      )
    );
  }

  function ValueCard({ title, text }) {
    return e("article", { className: `${classes.card} p-6` },
      e("h3", { className: "mb-3 text-lg font-black text-ink" }, title),
      e("p", { className: "leading-7 text-slate-500" }, text)
    );
  }

  function Footer() {
    return e("footer", { className: "mt-12 border-t border-slate-200 py-8 text-slate-500" },
      e("div", { className: `${classes.shell} flex flex-wrap justify-between gap-4` },
        e("span", null, "Northline Estates"),
        e("span", null, "Black, white, and deep blue Philippine real estate UI")
      )
    );
  }

  function App() {
    const [page, navigate] = useHashRoute();
    const currentPage = navItems.some((item) => item.id === page) ? page : "home";

    return e("div", { className: classes.page },
      e(Navbar, { page: currentPage, navigate }),
      e("main", { className: classes.shell },
        currentPage === "home" && e(Home, { navigate }),
        currentPage === "models" && e(Models, null),
        currentPage === "about" && e(About, null)
      ),
      e(Footer, null)
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(e(App));
})();
