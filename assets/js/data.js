// Base de datos de fragancias y configuración general para Fragancia Decants
window.CONFIG = {
  telefonoWhatsApp: "59162307504",
  tooltipWhatsApp: "¡Escríbenos!",
  mensajeWhatsAppGeneral: "Hola, me gustaría consultar sobre sus fragancias",
  pieDePagina: "© 2026 Fragancia Decants · Todos los derechos reservados"
};

window.PERFUMES_DATA = {
  varones: [
    {
      id: "9pm-clasico",
      marca: "Afnan",
      nombre: "9PM Clásico",
      dataNombre: "afnan 9pm clásico manzana canela vainilla lavanda bergamota",
      imagen: "assets/images/9PMClasico.webp",
      precioDesde: 100,
      notas: "Manzana verde, canela, vainilla, lavanda y bergamota.",
      sensacion: "Dulce y frutal.",
      ocasiones: "Noches.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "9pm-rebel",
      marca: "Afnan",
      nombre: "9PM Rebel",
      dataNombre: "afnan 9pm rebel piña manzana verde naranja vainilla",
      imagen: "assets/images/9PMRebel.webp",
      precioDesde: 100,
      notas: "Piña, manzana verde, naranja y vainilla.",
      sensacion: "Dulce e intenso.",
      ocasiones: "Salidas nocturnas.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "amber-oud-gold",
      marca: "Al Haramain",
      nombre: "Amber Oud Gold Edition",
      dataNombre: "al haramain amber oud gold edition melón piña vainilla",
      imagen: "assets/images/AmberOudGoldEdition.webp",
      precioDesde: 115,
      notas: "Melón, piña, vainilla, bergamota y almizcle.",
      sensacion: "Dulce-frutal y jugoso.",
      ocasiones: "Día, tarde y noche.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 115 }
      ]
    },
    {
      id: "al-haramain-aqua-dubai",
      marca: "Al Haramain",
      nombre: "Aqua Dubai",
      dataNombre: "al haramain aqua dubai bergamota mandarina melón ámbar",
      imagen: "assets/images/AquaDubai.webp",
      precioDesde: 115,
      notas: "Bergamota, mandarina, melón y ámbar.",
      sensacion: "Fresco, limpio y jabonoso.",
      ocasiones: "Versátil.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 115 }
      ]
    },
    {
      id: "versace-eros",
      marca: "Versace",
      nombre: "Eros Eau De Toilette",
      dataNombre: "versace eros eau de toilette menta manzana limón",
      imagen: "assets/images/ErosEauDeToilette.webp",
      precioDesde: 145,
      notas: "Menta, manzana verde, limón, vainilla y cedro.",
      sensacion: "Fresco, masculino y seductor.",
      ocasiones: "Versátil.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 145 }
      ]
    },
    {
      id: "fakhar-black",
      marca: "Lattafa",
      nombre: "Fakhar Black",
      dataNombre: "lattafa fakhar black manzana jengibre canela lavanda tonka",
      imagen: "assets/images/FakharBlack.webp",
      precioDesde: 100,
      notas: "Manzana, jengibre, canela, lavanda y haba tonka.",
      sensacion: "Limpio, fresco y juvenil.",
      ocasiones: "Versátil.",
      duracion: "5–6 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "hawas-fire",
      marca: "Rasasi",
      nombre: "Hawas Fire",
      dataNombre: "rasasi hawas fire salvia ámbar jazmín",
      imagen: "assets/images/Hawasfire.webp",
      precioDesde: 110,
      notas: "Salvia esclarea, ámbar y jazmín.",
      sensacion: "Cálido, atractivo y adictivo.",
      ocasiones: "Tardes y noches frescas.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 110 }
      ]
    },
    {
      id: "hawas-ice",
      marca: "Rasasi",
      nombre: "Hawas Ice",
      dataNombre: "rasasi hawas ice limón bergamota ciruela manzana",
      imagen: "assets/images/HawasIce.webp",
      precioDesde: 115,
      notas: "Limón italiano, bergamota, ciruela y manzana.",
      sensacion: "Frescura cítrica y limpia.",
      ocasiones: "Día a día y climas cálidos.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 115 }
      ]
    },
    {
      id: "lattafa-khamrah",
      marca: "Lattafa",
      nombre: "Khamrah Clásico",
      dataNombre: "lattafa khamrah canela vainilla dátiles tonka nuez",
      imagen: "assets/images/KhamrahClasico.webp",
      precioDesde: 100,
      notas: "Canela, vainilla, dátiles, haba tonka y nuez moscada.",
      sensacion: "Dulce gourmand invasivo y acalorado.",
      ocasiones: "Noches y climas fríos.",
      duracion: "+10 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "le-beau-le-parfum",
      marca: "Jean Paul Gaultier",
      nombre: "Le Beau Le Parfum",
      dataNombre: "le beau le parfum jean paul gaultier vainilla coco piña",
      imagen: "assets/images/LeBeauLeParfum.webp",
      precioDesde: 170,
      notas: "Vainilla, coco, piña y maderas.",
      sensacion: "Dulce, cálido y atractivo.",
      ocasiones: "Salidas casuales.",
      duracion: "8–10 horas",
      precios: [
        { size: "10 ml", valor: 170 }
      ]
    },
    {
      id: "le-male-elixir",
      marca: "Jean Paul Gaultier",
      nombre: "Le Male Elixir",
      dataNombre: "le male elixir jean paul gaultier vainilla lavanda",
      imagen: "assets/images/LeMaleElixir.webp",
      precioDesde: 185,
      notas: "Vainilla, lavanda, menta, miel y tabaco.",
      sensacion: "Sensual, cálida y adictiva.",
      ocasiones: "Salidas nocturnas.",
      duracion: "8–10 horas",
      precios: [
        { size: "10 ml", valor: 185 }
      ]
    },
    {
      id: "ysl-myslf-edt",
      marca: "Yves Saint Laurent",
      nombre: "MYSLF",
      dataNombre: "ysl myslf yves saint laurent bergamota azahar pachuli",
      imagen: "assets/images/MYSLF.webp",
      precioDesde: 190,
      notas: "Bergamota, azahar y pachuli.",
      sensacion: "Limpio, juvenil y agradable.",
      ocasiones: "Versátil.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 190 }
      ]
    },
    {
      id: "odyssey-mandarin-sky",
      marca: "Armaf",
      nombre: "Odyssey Mandarin Sky",
      dataNombre: "armaf odyssey mandarin sky mandarina naranja azafrán caramelo",
      imagen: "assets/images/OdysseyMandarinSky.webp",
      precioDesde: 115,
      notas: "Mandarina, naranja, azafrán y caramelo.",
      sensacion: "Caramelo cítrico.",
      ocasiones: "Salidas casuales.",
      duracion: "8 horas",
      precios: [
        { size: "10 ml", valor: 115 }
      ]
    },
    {
      id: "dior-sauvage",
      marca: "Dior",
      nombre: "Sauvage",
      dataNombre: "dior sauvage bergamota pimienta vetiver",
      imagen: "assets/images/Sauvage.webp",
      precioDesde: 185,
      notas: "Bergamota, pimienta, vetiver y ambroxan.",
      sensacion: "Fresco, salvaje y magnético.",
      ocasiones: "Versátil.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 185 }
      ]
    },
    {
      id: "scandal-le-parfum",
      marca: "Jean Paul Gaultier",
      nombre: "Scandal Le Parfum Intense",
      dataNombre: "scandal le parfum intense jean paul gaultier tonka sándalo cuero",
      imagen: "assets/images/ScadalLeParfumIntense.webp",
      precioDesde: 185,
      notas: "Tonka, sándalo, geranio y cuero.",
      sensacion: "Dulce, sensual, cálido y adictivo.",
      ocasiones: "Noches frías.",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 185 }
      ]
    },
    {
      id: "stronger-with-you-intensely",
      marca: "Emporio Armani",
      nombre: "Stronger With You Intensely",
      dataNombre: "emporio armani stronger with you intensely vainilla canela lavanda",
      imagen: "assets/images/StrongerWithYouIntensely.webp",
      precioDesde: 215,
      notas: "Vainilla, canela, lavanda, pimienta rosa y ámbar.",
      sensacion: "Dulce gourmand y cálido.",
      ocasiones: "Noches cálidas y tardes frescas.",
      duracion: "8 horas",
      precios: [
        { size: "10 ml", valor: 215 }
      ]
    },
    {
      id: "valentino-born-in-roma",
      marca: "Valentino",
      nombre: "Uomo Born In Roma Intense",
      dataNombre: "valentino uomo born in roma intense vainilla lavanda",
      imagen: "assets/images/UomoBornInRomaIntense.webp",
      precioDesde: 255,
      notas: "Vainilla, lavanda, grosella y vetiver.",
      sensacion: "Dulzón, cremoso y cálido.",
      ocasiones: "Eventos y salidas nocturnas.",
      duracion: "8 horas",
      precios: [
        { size: "10 ml", valor: 255 }
      ]
    },
    {
      id: "rayhaan-tropical-vibe",
      marca: "Rayhaan",
      nombre: "Tropical Vibe",
      dataNombre: "rayhaan tropical vibe mango piña bergamota coco dulzon frutal",
      imagen: "assets/images/Rayhaan.webp",
      precioDesde: 100,
      notas: "Mango, Piña, Bergamota, Coco.",
      sensacion: "Dulzón frutal",
      ocasiones: "Salidas casuales",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "armaf-club-de-nuit-intense-man",
      marca: "Armaf",
      nombre: "Club de Nuit Intense Man",
      dataNombre: "armaf club de nuit intense man limon bergamota piña grosellas manzana verde muy masculino",
      imagen: "assets/images/armafMan.webp",
      precioDesde: 100,
      notas: "Limón, Bergamota, piña, grosellas, manzana verde.",
      sensacion: "Muy masculino",
      ocasiones: "Salidas nocturnas",
      duracion: "8 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    }
  ],
  damas: [
    {
      id: "yum-yum",
      marca: "Armaf",
      nombre: "Yum Yum",
      dataNombre: "armaf yum yum cerezas bayas silvestres vainilla rosas almizcle",
      imagen: "assets/images/YumYum.webp",
      precioDesde: 115,
      notas: "Cerezas, bayas silvestres, vainilla, rosas y almizcle.",
      sensacion: "Dulce afrutado — femenino y encantador ✨",
      ocasiones: "Perfecto para la noche.",
      duracion: "8–10 horas de larga duración.",
      esDestacado: true,
      badgeTexto: "✦ Destacado del Mes",
      precios: [
        { size: "10 ml", valor: 115 }
      ]
    },
    {
      id: "lattafa-eclaire",
      marca: "Lattafa",
      nombre: "Éclaire",
      dataNombre: "lattafa eclaire caramelo leche azúcar miel vainilla praline comestible provocador",
      imagen: "assets/images/lattafa.webp",
      precioDesde: 100,
      notas: "Caramelo, Leche, Azúcar, miel, Vainilla, Praline.",
      sensacion: "Comestible, provocador.",
      ocasiones: "Salidas casuales",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "odyssey-candee",
      marca: "Armaf",
      nombre: "Odyssey Candee",
      dataNombre: "armaf odyssey candee fresa frambuesa bergamota durazno muy femenina",
      imagen: "assets/images/Armaf.webp",
      precioDesde: 100,
      notas: "Fresa, Frambuesa, Bergamota, durazno.",
      sensacion: "Muy femenina",
      ocasiones: "Salidas casuales",
      duracion: "6–8 horas",
      precios: [
        { size: "10 ml", valor: 100 }
      ]
    },
    {
      id: "carolina-herrera-la-bomba",
      marca: "Carolina Herrera",
      nombre: "La Bomba",
      dataNombre: "carolina herrera la bomba pitahaya vainilla frangipani pachuli peonia adictiva enérgica",
      imagen: "assets/images/CarolinaHerrera.webp",
      precioDesde: 200,
      notas: "Pitahaya, Vainilla, Frangipani, Pachuli, peonia",
      sensacion: "Adictiva y enérgica.",
      ocasiones: "Ocasiones especiales.",
      duracion: "8–10 horas",
      precios: [
        { size: "10 ml", valor: 200 }
      ]
    },
    {
      id: "rasasi-hawas-diva",
      marca: "Rasasi",
      nombre: "Hawas Diva",
      dataNombre: "rasasi hawas diva frutos rojos vainilla ruibardo lichi rosas sensual cálida adictiva",
      imagen: "assets/images/Rasasi.webp",
      precioDesde: 110,
      notas: "Frutos rojos, Vainilla, Ruibardo, lichi y rosas",
      sensacion: "Sensual, Cálida y adictiva",
      ocasiones: "Salidas casuales",
      duracion: "8–10 horas",
      precios: [
        { size: "10 ml", valor: 110 }
      ]
    }
  ],
  ofertas: [
    {
      id: "combo-pa-los-manes",
      marca: "Colección Diseñador",
      nombre: "Combo Pa' Los Manes",
      dataNombre: "combo pa los manes diseñador le male elixir scandal intense sauvage edp myslf edp le beau le parfum",
      imagen: "assets/images/ComboPaLosManes.webp",
      tag: "🔥 Pack TOP Diseñador (15 ml)",
      desc: "El pack definitivo para el hombre moderno. Incluye fragancias de diseñador reconocidas por su estela y fijación.",
      precioOriginal: null,
      precioCombo: 430,
      incluye: [
        "Jean Paul Gaultier | Le Male Elixir",
        "Jean Paul Gaultier | Scandal Intense",
        "Dior | Sauvage EDP",
        "YSL | MYSLF EDP",
        "Jean Paul Gaultier | Le Beau Le Parfum"
      ],
      precios: [
        { size: "15 ml", valor: 430 }
      ]
    },
    {
      id: "combo-tres-siniestros",
      marca: "Trío Best Sellers",
      nombre: "Combo Tres Siniestros",
      dataNombre: "combo tres siniestros le male elixir sauvage edp armani stronger with you intensely",
      imagen: "assets/images/ComboTresSiniestros.webp",
      tag: "⚡ Trío Nocturno & Seducción (15 ml)",
      desc: "La trilogía imparable para la noche y citas. Tres bombas de duración y cumplidos.",
      precioOriginal: null,
      precioCombo: 260,
      incluye: [
        "Jean Paul Gaultier | Le Male Elixir",
        "Dior | Sauvage EDP",
        "Armani | Stronger With You Intensely"
      ],
      precios: [
        { size: "15 ml", valor: 260 }
      ]
    },
    {
      id: "combo-oloroso",
      marca: "Best Sellers Árabes",
      nombre: "Combo Oloroso",
      dataNombre: "combo oloroso haramain amber oud gold edition lattafa khamrah clasico armaf mandarin sky",
      imagen: "assets/images/ComboOloroso.webp",
      tag: "✨ Potencia Árabe (15 ml)",
      desc: "Tres fragancias árabes virales de duración extrema y estela brutal.",
      precioOriginal: null,
      precioCombo: 150,
      incluye: [
        "Haramain | Amber Oud Gold Edition",
        "Lattafa | Khamrah Clásico",
        "Armaf | Mandarín Sky"
      ],
      precios: [
        { size: "15 ml", valor: 150 }
      ]
    },
    {
      id: "combo-deliciosa",
      marca: "Selección Femenina",
      nombre: "Combo Deliciosa",
      dataNombre: "combo deliciosa armaf yum yum armaf odyssey candee lattafa eclaire",
      imagen: "assets/images/ComboDeliciosa.webp",
      tag: "💖 Gourmand & Dulce (15 ml)",
      desc: "El trío más adictivo, dulce y femenino. Notas de vainilla, fruta, caramelo y flores finas.",
      precioOriginal: null,
      precioCombo: 140,
      incluye: [
        "Armaf | Yum Yum",
        "Armaf | Odyssey Candee",
        "Lattafa | Éclaire"
      ],
      precios: [
        { size: "15 ml", valor: 140 }
      ]
    }
  ]
};
