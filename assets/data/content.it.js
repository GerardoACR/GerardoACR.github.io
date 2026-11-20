const portfolioSkills = [
  {
    "group": "science",
    "name": "Python e programmazione scientifica",
    "level": "Avanzato",
    "description": "Calcolo scientifico, analisi dei dati, automazione e sviluppo di flussi di lavoro riproducibili."
  },
  {
    "group": "science",
    "name": "Machine learning e deep learning",
    "level": "Intermedio avanzato",
    "description": "Progettazione, addestramento, valutazione e ottimizzazione di modelli predittivi per diversi tipi di dati e ambiti applicativi."
  },
  {
    "group": "science",
    "name": "Calcolo ad alte prestazioni e distribuito",
    "level": "Intermedio avanzato",
    "description": "Elaborazione parallela, flussi di calcolo scalabili, addestramento distribuito e uso efficiente delle risorse negli esperimenti."
  },
  {
    "group": "science",
    "name": "Analisi geospaziale e spaziotemporale",
    "level": "Intermedio avanzato",
    "description": "Integrazione, analisi e visualizzazione di dati spaziali e temporali per la ricerca scientifica e applicata."
  },
  {
    "group": "science",
    "name": "IA agentica e integrazione software",
    "level": "Intermedio avanzato",
    "description": "Applicazioni basate su LLM, flussi di lavoro con agenti, orchestrazione degli strumenti, sviluppo di API e integrazione con sistemi deterministici."
  },
  {
    "group": "science",
    "name": "Ingegneria dei dati e automazione",
    "level": "Intermedio avanzato",
    "description": "Progettazione e realizzazione di pipeline di dati, elaborazione automatizzata, controllo della qualità e integrazione di dati provenienti da fonti eterogenee."
  },
  {
    "group": "other",
    "name": "R",
    "level": "Intermedio",
    "description": ""
  },
  {
    "group": "other",
    "name": "JavaScript",
    "level": "Intermedio base",
    "description": ""
  },
  {
    "group": "other",
    "name": "SQL",
    "level": "Intermedio base",
    "description": ""
  },
  {
    "group": "other",
    "name": "Adobe",
    "level": "Avanzato",
    "description": "Photoshop, Premiere"
  },
  {
    "group": "other",
    "name": "IA generativa",
    "level": "Intermedio avanzato",
    "description": "Midjourney, ComfyUI, LM Studio"
  },
  {
    "group": "other",
    "name": "Blender",
    "level": "Intermedio base",
    "description": ""
  },
  {
    "group": "languages",
    "name": "Spagnolo",
    "level": "Madrelingua",
    "description": ""
  },
  {
    "group": "languages",
    "name": "Inglese",
    "level": "Avanzato",
    "description": ""
  },
  {
    "group": "languages",
    "name": "Italiano",
    "level": "Avanzato",
    "description": ""
  },
  {
    "group": "languages",
    "name": "Giapponese",
    "level": "Base",
    "description": "Senza certificazione"
  }
];

const portfolioProjects = [
  {
    "title": "Minacce informatiche nell’IIoT: il ML può mitigare le vulnerabilità e prevenire i danni? [ENG]",
    "description": "Questo lavoro analizza come il machine learning possa supportare l’intrusion detection negli ambienti Industrial Internet of Things e Operational Technology (IIoT/OT). Basandosi su esperimenti con il dataset ToN_IoT Modbus, valuta se i modelli di ML possano aiutare a rilevare minacce informatiche, ridurre gli attacchi non individuati e mitigare i rischi per le infrastrutture critiche, contribuendo al tempo stesso a una prospettiva orientata alla governance, in cui la detection sostiene una gestione del rischio cyber e un processo decisionale più informato.",
    "links": [
      {
        "cta": "Leggi il paper (PDF)",
        "href": "assets/documents/cyberThreatsInIIoT.pdf"
      },
      {
        "cta": "Vedi il repository completo",
        "href": "https://github.com/GerardoACR/iiot_ids_project"
      }
    ]
  },
  {
    "title": "Estrazione e validazione dei CV con un LLM [ITA]",
    "description": "Nell'ambito di un corso di Natural Language Processing (NLP) presso l'Università di Bologna, ho sviluppato un'applicazione che utilizza modelli linguistici eseguiti localmente per estrarre e strutturare in formato JSON le informazioni contenute nei curriculum vitae in PDF. L'applicazione valida i dati estratti tramite Pydantic e genera documenti XML e schede HTML che consentono di cercare i candidati in base a competenze, lingue conosciute e altri criteri di interesse.",
    "cta": "Apri il repository",
    "href": "https://github.com/GerardoACR/cv-validator-and-analysis"
  },
  {
    "title": "Rischi climatici per le popolazioni vulnerabili a Bologna [ITA]",
    "description": "Come Data Scientist e Product Owner di un progetto d’esame all’Università di Bologna, ho integrato dati aperti su temperatura e popolazione per esplorare l’esposizione e rischio stagionale dei bambini sotto i cinque anni e delle persone dai 65 anni in su.",
    "cta": "Repository del progetto",
    "href": "https://github.com/GerardoACR/bologna-climate-health-risk"
  },
  {
    "title": "Il panopticon digitale dell’intelligenza artificiale: tra sicurezza e libertà [ENG]",
    "description": "Redatto per il mio corso magistrale Governance e Diritto delle PPAA, questo lavoro analizza come l’IA applicata alla sicurezza pubblica possa degenerare in un panopticon digitale e traduce i quadri normativi europei (AI Act, GDPR, Data Governance Act) in un’applicazione pratica per le imprese che sviluppano o forniscono IA alla pubblica amministrazione in modo sicuro, verificabile e rispettoso dei diritti.",
    "cta": "Leggi il paper (PDF)",
    "href": "assets/documents/panopticPaper.pdf"
  },
  {
    "title": "Il futuro dell’industria del design con l’IA generativa [ESP]",
    "description": "Nel luglio 2022 ho scritto un articolo per El Universal in cui sostengo che l’IA generativa avrebbe trasformato in modo radicale l’industria creativa negli anni successivi. Puoi dargli un’occhiata.",
    "cta": "Leggi l’articolo",
    "href": "https://www.generacionuniversitaria.com.mx/tu-voz/dibujo-asistido-por-inteligencia-artificial-es-arte/"
  },
  {
    "title": "Saggi di opinione sulla filosofia [ESP]",
    "description": "Pubblico brevi testi di opinione su temi diversi e continuerò ad aggiungere nuovi articoli. Puoi visitare il mio profilo Medium.",
    "cta": "Visita il mio Medium",
    "href": "https://gercorral.medium.com"
  }
];
