// Beschrijvende teksten uit de HBO-i Domeinbeschrijving (2024), hoofdstuk 2.
window.HBOI_MODEL = {
  layers: [
    {
      id: "gebruikersinteractie",
      name: "Gebruikersinteractie",
      color: "#2D2E83",
      text: "De architectuurlaag ‘gebruikersinteractie’ heeft betrekking op de communicatie tussen (eind)gebruiker en ict-systeem. Hier wordt nadrukkelijk niet de interactie bedoeld met gebruikers, zoals die plaatsvindt tijdens het tot stand komen van een ict-systeem; dat is immers in elk van de architectuurlagen aan de orde."
    },
    {
      id: "organisatieprocessen",
      name: "Organisatieprocessen",
      color: "#1B75BC",
      text: "De architectuurlaag ‘organisatieprocessen’ heeft betrekking op het faciliteren van organisatieprocessen door middel van ict-systemen. Daarbij gaat het om de functionaliteit van het systeem als geheel (geautomatiseerde en niet-geautomatiseerde delen), bezien vanuit de context van de te realiseren organisatiedoelen."
    },
    {
      id: "infrastructuur",
      name: "Infrastructuur",
      color: "#29A9E1",
      text: "De architectuurlaag ‘infrastructuur’ betreft het geheel aan ict-systemen waarmee organisatieprocessen gefaciliteerd worden. Het gaat hier om beschikbaar stellen, beschikbaar houden en configureren van de traditionele hardware-infrastructuur, maar zeker ook de software-infrastructuur."
    },
    {
      id: "software",
      name: "Software",
      color: "#8DC63F",
      text: "De architectuurlaag ‘software’ betreft het ontwikkelen van diverse soorten software. Dit betreft software die na oplevering wordt opgenomen in een ict-infrastructuur."
    },
    {
      id: "hardware-interfacing",
      name: "Hardware interfacing",
      color: "#F4E01D",
      text: "De architectuurlaag ‘hardware interfacing’ betreft software die interactie aangaat met beschikbare hardware. Hierbij gaat het om situaties waarbij in de software expliciet rekening gehouden moet worden met mogelijkheden en beperkingen van de beschikbare hardware. In de beschrijving binnen deze architectuurlaag is gekozen voor ‘systeem’ als generieke, overkoepelende term. Afhankelijk van de context kan dit nader gespecificeerd worden in ‘embedded systeem’, ‘industrial automation’, ‘virtueel systeem’, enzovoort."
    }
  ],
  layersIntro: "De derde dimensie van de beroepstaken wordt gevormd door vijf architectuurlagen. Deze zijn geïnspireerd door enterprise- en software-architectuurmodellen: Gebruikersinteractie, Organisatieprocessen, Infrastructuur, Software en Hardware interfacing. Omdat de activiteiten betrekking kunnen hebben op verschillende aspecten van ict-systemen, kunnen ze inhoudelijk heel verschillend zijn. De architectuurlagen zijn bedoeld om deze inhoudelijke differentiatie zichtbaar te maken en de breedte van het domein weer te geven.",
  layersOrder: "De volgorde van de vijf architectuurlagen is niet willekeurig. Elke laag voegt functionaliteit of waarde toe aan de onderliggende laag en maakt gebruik van ‘services’ uit die laag: gebruikersinteractie ontsluit door ict-gefaciliteerde organisatieprocessen die gebouwd zijn op een geconfigureerde infrastructuur die is opgebouwd uit (geprogrammeerde) hard- en softwarecomponenten die (eventueel) via hardware interfaces verbonden zijn met hardware-systemen.",

  activities: [
    {
      id: "analyseren",
      name: "Analyseren",
      color: "#F59A23",
      text: "De activiteit ‘analyseren’ behelst het analyseren van processen, producten en informatiestromen in hun onderlinge samenhang en context.",
      ecf: "e-CF dimension 1 (areas): de activiteit ‘analyseren’ valt grofweg binnen een gedeelte van de ‘area’ ‘Plan’ die binnen dimensie 1 wordt onderscheiden."
    },
    {
      id: "adviseren",
      name: "Adviseren",
      color: "#E5007D",
      text: "De activiteit ‘adviseren’ behelst het adviseren over de inrichting van processen en/of informatie voor een nieuw te ontwikkelen, aan te schaffen of aan te passen ict-systeem.",
      ecf: "e-CF dimension 1 (areas): de activiteit ‘adviseren’ valt grofweg binnen een gedeelte van de ‘area’ ‘Plan’ die binnen dimensie 1 wordt onderscheiden."
    },
    {
      id: "ontwerpen",
      name: "Ontwerpen",
      color: "#E2005A",
      text: "De activiteit ‘ontwerpen’ behelst het ontwerpen van een (deel van een) ict-systeem op basis van requirements.",
      ecf: "e-CF dimension 1 (areas): de activiteit ‘ontwerpen’ valt grofweg binnen een gedeelte van de ‘area’ ‘Plan’ die binnen dimensie 1 wordt onderscheiden."
    },
    {
      id: "realiseren",
      name: "Realiseren",
      color: "#D71E3A",
      text: "De activiteit ‘realiseren’ behelst het realiseren en testen van een (deel van een) ict-systeem op basis van een ontwerp.",
      ecf: "e-CF dimension 1 (areas): de activiteit ‘realiseren’ valt grofweg binnen de ‘area’ ‘Build’ die binnen dimensie 1 wordt onderscheiden."
    },
    {
      id: "manage-control",
      name: "Manage & control",
      color: "#8E1B3A",
      text: "De activiteit ‘manage & control’ behelst het beheren, monitoren en optimaliseren van de ontwikkeling, de ingebruikname en het gebruik van ict-systemen.",
      ecf: "e-CF dimension 1 (areas): de activiteit ‘manage & control’ valt overwegend binnen de ‘area’ ‘Run’ die binnen dimensie 1 wordt onderscheiden."
    }
  ],
  activitiesIntro: "De tweede dimensie van de beroepstaken bestaat uit de vijf activiteiten ‘analyseren’, ‘adviseren’, ‘ontwerpen’, ‘realiseren’ en ‘manage & control’. Deze activiteiten zijn gebaseerd op de ‘system en software development life cycle’. Elke student uit het HBO-i opleidingsdomein moet deze activiteiten uit kunnen voeren binnen de eigen beroepscontext. Daarbij kunnen uiteenlopende processen toegepast worden: van een meer lineaire aanpak met duidelijk onderscheiden fasen tot agile aanpakken met een iteratief proces, waarin verschillende activiteiten simultaan uitgevoerd worden. De activiteit ‘manage & control’ omvat de inrichting en het beheer van dit proces. In de reeks van activiteiten wordt deze als laatste genoemd om de relatie met de andere activiteiten beter te kunnen maken. De uitvoering van een beroepstaak zal echter vaak met ‘manage & control’ beginnen. Bij alle activiteiten zijn kwaliteitsaspecten, zoals beveiliging, budget, tijd en duurzaamheid, van groot belang.",

  levels: [
    {
      n: 1, name: "Taakgericht",
      zelfstandigheid: "Werkt onder algemene richtlijnen in een omgeving waar onvoorspelbare veranderingen plaatsvinden",
      context: "Gestructureerd – voorspelbare context, probleem afgebakend, aanpak en oplossing bekend bij opdrachtgever",
      inhoud: "Enkele basisconcepten die voortbouwen op de vooropleiding"
    },
    {
      n: 2, name: "Probleemgericht",
      zelfstandigheid: "Lost zelfstandig interactieve kwesties op die voortvloeien uit projectactiviteiten",
      context: "Gestructureerd – onvoorspelbare context, probleem gegeven, keuze aanpak en oplossingsruimte beperkt",
      inhoud: "Combinatie van meerdere basisconcepten en enkele verdiepende concepten die voortbouwen op basisconcepten"
    },
    {
      n: 3, name: "Situatiegericht",
      zelfstandigheid: "Werkt onafhankelijk om interactieve problemen op te lossen. Heeft een positief effect op de teamprestaties",
      context: "Gestructureerd – onvoorspelbare context, vage problemen, aanpak en oplossingsruimte open",
      inhoud: "Combinatie van meerdere concepten voor verdieping en innovatie in de lokale situatie"
    },
    {
      n: 4, name: "Professiegericht",
      zelfstandigheid: "Coördineert en bestuurt. Stelt kwesties aan de orde met veel interacterende factoren",
      context: "Ongestructureerde multidisciplinaire en/of specialistische context",
      inhoud: "Nieuwe concepten voor verdieping en innovatie die overdraagbaar zijn naar andere situaties"
    }
  ],
  levelsIntro: "De eerste dimensie van de HBO-i domeinbeschrijving is het beheersingsniveau. Dit bepaalt het opleidingsniveau. Het beheersingsniveau wordt bepaald door de complexiteit van context, de complexiteit van de inhoud en de zelfstandigheid bij de uitvoering van de opdracht. Een beheersingsniveau wordt bereikt wanneer twee van de drie facetten op het betreffende niveau liggen. Een hoger beheersingsniveau impliceert de beheersing van de beroepstaken op de onderliggende beheersingsniveaus.",
  levelsFrameworks: "Om binnen de diversiteit vergelijkbaarheid mogelijk te maken onderscheidt het HBO-i vier beheersingsniveaus, conform de definities in het Zelcommodel (Bulthuis, 2013). De typering sluit aan bij dimensie drie van het e-CF (proficiency level) en de niveau-indeling van de Expertgroep Protocol van de Vereniging Hogescholen.",

  tasksIntro: "De architectuurlagen zijn uitgewerkt in exemplarische beroepstaken. Het geheel van de beschreven beroepstaken heeft enerzijds een illustratieve en anderzijds een kaderstellende functie. Dat houdt in dat de genoemde beroepstaken illustraties zijn en dus niet als verplicht aanwezige onderdelen van een opleiding geïnterpreteerd moeten worden. Samen schetsen deze illustraties een overzicht biedend kader voor de combinaties van activiteiten, architectuurlagen en niveaus.",
  tasksDerive: "De beroepstaken zijn per architectuurlaag ingedeeld in vier beheersingsniveaus. Startend vanuit een bepaalde cel in de kubus kan eenvoudig een beroepstaak van hoger of lager niveau afgeleid worden door te variëren in de zelfstandigheid of de complexiteit van de betreffende beroepstaak.",

  skillsIntro: "Professional skills, ofwel professionele vaardigheden, zijn onlosmakelijk verbonden met de beroepstaken die een ict-beroepsbeoefenaar uitvoert. Professionele taakuitvoering is taak- en contextspecifiek: zij vereist professioneel gedrag naar stakeholders en het leveren van passende, relevante beroepsproducten die aansluiten bij de eisen van de organisatie, waarbij zorgvuldige afwegingen zijn gemaakt in relatie tot maatschappelijke vraagstukken. De professional skills zijn geformuleerd binnen vier aandachtsgebieden, die elk een eigen focus kennen. Elk aandachtsgebied is onderverdeeld in drie competenties.",
  skills: [
    {
      id: "toekomstgericht-organiseren",
      name: "Toekomstgericht organiseren",
      color: "#E5007D",
      text: "Binnen toekomstgericht organiseren staat de omgeving centraal waarin de ict-werkzaamheden plaatsvinden. De aandacht ligt hier op de werkwijze in relatie tot de opdracht en de contextfactoren die de werkzaamheden en/of de te (door)ontwikkelen producten beïnvloeden.",
      competencies: [
        ["Organisatorische context", "Je brengt verschillende omgevingsfactoren in beeld (bijvoorbeeld maatschappelijke ontwikkelingen zoals vraagstukken op het gebied van duurzaamheid en/of inclusie) die de uitwerking van de opdracht kunnen beïnvloeden en onderneemt op basis hiervan vervolgstappen."],
        ["Ethiek", "Je weegt maatschappelijke en ethische aspecten (zoals duurzaamheid en inclusie) in de (toegepaste) technologische en professionele context en betrekt deze in het professioneel handelen."],
        ["Procesmanagement", "Je organiseert en realiseert de opdracht (bijvoorbeeld een projectopdracht) op basis van gestelde randvoorwaarden en draagt zorg voor een duurzame inbedding van de oplevering in de organisatie."]
      ]
    },
    {
      id: "onderzoekend-vermogen",
      name: "Onderzoekend vermogen",
      color: "#F59A23",
      text: "Binnen onderzoekend vermogen staan de vraagstukken centraal die gerelateerd aan de opdracht zijn. Binnen dit thema ligt de nadruk op een kritische houding en op methodisch werken met onderbouwde keuzes.",
      competencies: [
        ["Methodische probleemaanpak", "Je brengt relevante vraagstukken en/of mogelijkheden in beeld, identificeert welke kennis ontbreekt en plant vervolgstappen in het onderzoek op gestructureerde en kritische wijze, waarbij je kiest voor methoden die passen bij het voorliggende vraagstuk."],
        ["Onderzoek", "Je voert onderzoek uit met een open houding op onderbouwde, pragmatische, gestructureerde en kritische wijze."],
        ["Oplossing", "Je past de uit onderzoek verkregen informatie toe binnen de context van het vraagstuk en doet voorstellen op basis van de verkregen informatie. Je blijft hierbij kritisch en open voor alternatieve ideeën en werkwijzen."]
      ]
    },
    {
      id: "persoonlijk-leiderschap",
      name: "Persoonlijk leiderschap",
      color: "#F4E01D",
      text: "Persoonlijk leiderschap richt zich op de ontwikkeling van het individu in relatie tot de context waarin deze opereert. Hierbij is aandacht voor proactief handelen op basis van verkregen informatie om verdere persoonlijke en professionele ontwikkeling vorm te geven.",
      competencies: [
        ["Ondernemend zijn", "Je werkt doelgericht en acteert weloverwogen op nieuwe kansen/initiatieven, waarin je samenwerkingspartners betrekt (denk aan teamleden, stakeholders, maatschappelijke organisaties)."],
        ["Persoonlijke ontwikkeling", "Je onderbouwt studie- en loopbaankeuzes en stuurt je eigen leerontwikkeling beargumenteerd bij (bijvoorbeeld middels reflectie en/of feedback)."],
        ["Persoonlijke profilering", "Je evalueert regelmatig persoonlijke ambities en kwaliteiten in relatie tot de gewenste positionering in het werkveld en onderneemt hier op passende wijze actie op."]
      ]
    },
    {
      id: "doelgericht-interacteren",
      name: "Doelgericht interacteren",
      color: "#29A9E1",
      text: "Communicatie en samenwerking staan binnen doelgericht interacteren centraal. Hierbinnen zijn zowel de vorm als de inhoud van de communicatie- en samenwerkingsaspecten van belang.",
      competencies: [
        ["Partners", "Je onderhoudt actief de relatie met relevante samenwerkingspartners (denk aan teamleden, opdrachtgevers, eindgebruikers, maatschappelijke organisaties en/of andere stakeholders)."],
        ["Communicatie", "Je stemt je communicatie weloverwogen en doelgericht af op de doelgroep(en)."],
        ["Samenwerken", "Je werkt bewust, op constructieve wijze en in de geschikte vorm samen, waarbij je verantwoordelijkheid neemt voor jouw deel in de samenwerking (bijvoorbeeld in interdisciplinaire en/of interculturele context) en het eindresultaat."]
      ]
    }
  ],
  modelIntro: "De domeinbeschrijving geeft een systematische beschrijving van het werkveld waar de opleidingen binnen het HBO-i voor opleiden. De kubus beschrijft de vakinhoud in drie dimensies: de beheersingsniveaus (hoe complex zijn de inhoud en de context van het werk?), de activiteiten (wat doet een ict’er?) en de architectuurlagen (binnen welke context wordt er gewerkt?). De kubus is gevuld met exemplarische beroepstaken. Eromheen staan de vier aandachtsgebieden met professional skills die een ict’er nodig heeft."
};
