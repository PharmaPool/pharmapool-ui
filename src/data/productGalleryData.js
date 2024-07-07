const productGalleryData = [
  {
    classOfDrug: "antimalaria",
    drugs: [
      {
        drug: "Sulfadoxine + Pyrimethamine",
        brands: ["Fansidar®", "Amalar®"],
      },
      {
        drug: "Chloroquine phosphate",
        brands: ["Quimal®", "Dawaquin®"],
      },
      {
        drug: "Artemether + Lumenfantrine",
        brands: ["Lonart®", "Coartem®"],
      },
      {
        drug: "Clindamycin",
        brands: ["Cleocin®", "Clindesse®", "Clindagel®"],
      },
      {
        drug: "Primaquine",
        brands: ["Jasoprim®", "Malirid®", "Remaquin®"],
      },
      {
        drug: "Quinine sulphate",
        brands: ["Qualaquin®"],
      },
    ],
  },
  {
    classOfDrug: "Nsaids/anti-pyretic/non-opiods",
    drugs: [
      {
        drug: "Aspirin (Oral tablet)",
        brands: ["Bayer", "Aspro Clear®", "Disprin®", "Zorprin®"],
      },
      {
        drug: "Diclofenac (Oral tablet)",
        brands: [
          "Cataflam®",
          "Voltaren-XR®",
          "Dyloject®",
          "Cambia®",
          "Zipsor®",
          "Zorvolex®",
        ],
      },
      {
        drug: "Ibuprofen",
        brands: ["Motrin®", "Advil®", "Brufen®", "Ibucap®", "Ibupain®"],
      },
      {
        drug: "Celecoxib (Oral Capsule)",
        brands: ["Celebrex®", "Elyxyb®"],
      },
      {
        drug: "Diflunisal (Oral Tablet)",
        brands: ["Dolobin®"],
      },
      {
        drug: "Etodolac",
        brands: ["Lodine®"],
      },
      {
        drug: "Fenoprofen Calcium (Oral capsule)",
        brands: ["Nalfon®"],
      },
      {
        drug: "Ketoprofen (Oral Capsule Immediate Release)",
        brands: ["Orudis®"],
      },
      {
        drug: "Mefenamic Acid (Oral Capsule)",
        brands: ["Ponstel®", "Ponstan®"],
      },
      {
        drug: "Naproxen (Oral tablet)",
        brands: ["Naprosyn®"],
      },
      {
        drug: "Piroxicam (Oral Capsule)",
        brands: [
          "Feldene®",
          "Neoxicam®",
          "Saldin®",
          "Diovin®",
          "Felvin®",
          "Piroxy®",
        ],
      },
      {
        drug: "Sulindac (Oral Tablet)",
        brands: ["Clinoril®", "Sulin®"],
      },
      {
        drug: "Tolmetin Sodium (Oral Capsule)",
        brands: ["Tolectin®"],
      },
      {
        drug: "Meclofenamate Sodium (Oral Capsule)",
        brands: ["Meclomen®"],
      },
      {
        drug: "Diclofenac sodium-Misoprostol (Oral Tablet Delayed Release)",
        brands: ["Arthrotec®"],
      },
      {
        drug: "Indomethacin",
        brands: ["Indocin®"],
      },
      {
        drug: "Nabumetone",
        brands: ["Relafen®"],
      },
      {
        drug: "Paracetamol",
        brands: [
          "Tylenol®",
          "Panadol®",
          "Panamax®",
          "Perdolan®",
          "Calpol®",
          "Doliprane®",
        ],
      },
      {
        drug: "Oxaprozin",
        brands: ["Daypro®"],
      },
    ],
  },
  {
    classOfDrug: "opioids",
    drugs: [
      {
        drug: "Morphine Sulfate",
        brands: ["Roxanol®", "Arymo®"],
      },
      {
        drug: "Tramadol",
        brands: ["Ultram®", " ConZip®", "Rybix®"],
      },
      {
        drug: "Fentanyl",
        brands: ["Duragesic®", "Actiq®", "Sublimaze®"],
      },
      {
        drug: "Buprenorphine",
        brands: ["Belbuca®", "Brixadi®", "Buprenex®"],
      },
      {
        drug: "Hydromorphone",
        brands: ["Dilaudid®", "Exalgo®"],
      },
      {
        drug: "Levorphanol",
        brands: ["Levo-Dromoran®"],
      },
      {
        drug: "Methadone",
        brands: ["Methadose®", "Dolophine®"],
      },
      {
        drug: "Oxycodone",
        brands: [
          "OxyContin®",
          "Xtampza ER®",
          "Roxicodone®",
          "Oxaydo®",
          "Roxybond®",
        ],
      },
      {
        drug: "Oxymorphone HCl",
        brands: ["Numorphan®", "Opana ER®", "O-Morphon®"],
      },
      {
        drug: "Acetaminophen-Codeine",
        brands: ["Co-codamol®"],
      },
      {
        drug: "Oxycodone-Aspirin (Oral Tablet)",
        brands: ["Endodan®", "Percodan®"],
      },
      {
        drug: "Hydrocodone (Oral Tablet)",
        brands: ["Vicodin®", " Lortab®"],
      },
    ],
  },
  {
    classOfDrug: "anti-gout",
    drugs: [
      {
        drug: "Allopurinol",
        brands: ["Zyloprim®", " Aloprim®"],
      },
      {
        drug: "Colchicine",
        brands: ["Colcrys®", "Mitigare®"],
      },
      {
        drug: "Probenecid (Oral Tablet)",
        brands: ["Probalan"],
      },
      {
        drug: "Probenecid-Colchicine (Oral Tablet)",
        brands: ["Col-Benemid®"],
      },
    ],
  },
  {
    classOfDrug: "Disease modifying agents used in Rheumatoid disorders",
    drugs: [
      {
        drug: "Azathioprine",
        brands: ["Azasan®", "Imuran®"],
      },
      {
        drug: "Methotrexate",
        brands: ["Reditrex®", "Trexail®", "Xatmep®,", " Rasuvo®"],
      },
      {
        drug: "Sulfasalazine",
        brands: ["Azulfidine®", " Saaz®"],
      },
      {
        drug: "Hydroxychloroquine phosphate",
        brands: ["Plaquenil®"],
      },
      {
        drug: "Leflunomide",
        brands: ["Arava®"],
      },
    ],
  },
  {
    classOfDrug: "anti-allergic/medicines used in anaphylaxis",
    drugs: [
      {
        drug: "Epinephrine",
        brands: ["Adrenalin®"],
      },
      {
        drug: "Chlorpheniramine",
        brands: ["ChlorTrimeton®", " Diabetic Tussin®"],
      },
      {
        drug: "Dexchlorpheniramine",
        brands: ["Polaramine®"],
      },
      {
        drug: "Dexamethasone",
        brands: ["Decadron®", "Dexasone®", "Solurex®", "Baycadron®"],
      },
      {
        drug: "Hydrocortisone",
        brands: [
          "Hydrocort®",
          "Alphosyl®",
          "Aquacort®",
          "Cortef®",
          "Cortenema®",
        ],
      },
      {
        drug: "Prednisolone",
        brands: ["Pediapred®", "Flopred®", "Orapred®", "Millipred®"],
      },
      {
        drug: "Promethazine",
        brands: ["Phenergan®", "Phenadoz®"],
      },
      {
        drug: "Cetirizine",
        brands: ["Zyrtec®", "Cetrizin®"],
      },
      {
        drug: "Cyproheptadine",
        brands: ["Periactin®", "Sydin®"],
      },
      {
        drug: "Loratadine",
        brands: ["Alavert®", "Claritin®", " Ohm Allergy Relief®"],
      },
      {
        drug: "Olopatadine HCl",
        brands: ["Pataday"],
      },
    ],
  },
  {
    classOfDrug: "general anesthesia",
    drugs: [
      {
        drug: "Halothane",
        brands: ["Fluothane"],
      },
      {
        drug: "Isoflurane",
        brands: ["tetrox"],
      },
      {
        drug: "Ketamine Hydrochloride",
        brands: ["Ketalar®"],
      },
      {
        drug: "Nitrous Oxide",
        brands: ["INOmax®", "Genosyl®"],
      },
      {
        drug: "Thiopentone Sodium",
        brands: ["Sodium Pentothal®", "Trapanal®"],
      },
      {
        drug: "Propofol",
        brands: ["Diprivan®"],
      },
    ],
  },
  {
    classOfDrug: "local anaesthesia",
    drugs: [
      {
        drug: "Bupivacaine",
        brands: ["Marcaine", "Sensorcaine®"],
      },
      {
        drug: "Lidocaine",
        brands: ["Xylocaine-MPF®", "Anestacaine®", "Dilocaine®", "Lidoject 1®"],
      },
    ],
  },
  {
    classOfDrug:
      "Preoperative Medication and Sedation for Short Term Procedures",
    drugs: [
      {
        drug: "Atropine Sulphate",
        brands: ["AtroPen®"],
      },
      {
        drug: "Diazepam",
        brands: ["Valium®", "Diastat®"],
      },
      {
        drug: "Midazolam",
        brands: ["Dormicum®", "Versed®"],
      },
      {
        drug: "Morphine Sulphate",
        brands: ["Roxanol®", "Arymo"],
      },
      {
        drug: "Promethazine",
        brands: ["Phenergan®", " Phenadoz®"],
      },
    ],
  },
  {
    classOfDrug: "anticonvulsants/ antiepileptic",
    drugs: [
      {
        drug: "Buspirone HCl (Oral Tablet)",
        brands: ["BuSpar®"],
      },
      {
        drug: "Hydroxyzine HCl",
        brands: ["Vistaril®", " Atarax®"],
      },
      {
        drug: "Alprazolam",
        brands: ["Xanax®", "Xanax XR®"],
      },
      {
        drug: "Chlordiazepoxide HCl (Oral Capsule)",
        brands: ["Librium®"],
      },
      {
        drug: "Clonazepam",
        brands: ["Klonopin®"],
      },
      {
        drug: "Oxazepam (Oral Capsule)",
        brands: ["Serax®"],
      },
      {
        drug: "Diazepam",
        brands: ["Valium®", " Diastat®"],
      },
      {
        drug: "Phenobarbitone",
        brands: ["Nobatol®", "Luminal Sodium®", "Solfoton®", "Tedral®"],
      },
      {
        drug: "Phenytoin Sodium",
        brands: ["Dilantin®", "Phenytek®"],
      },
      {
        drug: "Lorazepam",
        brands: ["Ativan®", "Tavor®", "Temesta®"],
      },
    ],
  },
  {
    classOfDrug: "antimigraine ",
    drugs: [
      {
        drug: "Aspirin",
        brands: ["Bayer®", "Aspro Clear®", "Disprin®", "Zorprin®"],
      },
      {
        drug: "Dihydroergotamine",
        brands: ["Migranal®", "Trudhesa®"],
      },
      {
        drug: "Paracetamol",
        brands: [
          "Tylenol®",
          "Panadol®",
          " Panamax®",
          "Perdolan®",
          "Calpol®",
          "Doliprane®",
        ],
      },
      {
        drug: "Propranolol hydrochloride (prophylaxis)",
        brands: ["Inderal®", " InnoPran XL®"],
      },
      {
        drug: "Ibuprofen",
        brands: ["Motrin®", "Advil®", "Brufen®", "Ibucap®", "Ibupain®"],
      },
    ],
  },
  {
    classOfDrug: "anti-arrhytmic ",
    drugs: [
      {
        drug: "Adenosine",
        brands: ["Adenocard®", "Adenoscan®"],
      },
      {
        drug: "Amiodarone",
        brands: ["Pacerone®", "Cordarone®", "Nexterone®"],
      },
      {
        drug: "Diltiazem",
        brands: ["Cardizem CD®", "Taztia XT®"],
      },
      {
        drug: "Esmolol",
        brands: ["Brevibloc®"],
      },
      {
        drug: "Lidocaine Hydrochloride",
        brands: ["Xylocaine®", "Anestacaine®", "Dilocaine®", "Lidoject 1®"],
      },
      {
        drug: "Verapamil",
        brands: ["Isoptin®", "Covera®", "Verelan®"],
      },
    ],
  },
  {
    classOfDrug: "anti-hypertensive",
    drugs: [
      {
        drug: "Amlodipine",
        brands: ["Norvasc®", "Katerzia®", "Norliqva®"],
      },
      {
        drug: "Atenolol",
        brands: ["Tenormin®"],
      },
      {
        drug: "Enalapril Maleate",
        brands: ["Vasotec®"],
      },
      {
        drug: "Losartan Potassium",
        brands: ["Cozaar®"],
      },
      {
        drug: "Methyldopa",
        brands: ["Aldomet®", "Aldoril®", "Dopamet®"],
      },
      {
        drug: "Nifedipine",
        brands: ["Procardia®", "Adalat®", "Nifediac®"],
      },
      {
        drug: "Sodium Nitroprusside",
        brands: ["Nipride®", "Nitropress®"],
      },
      {
        drug: "Hydrochlorothiazide",
        brands: ["Microzide®", "HydroDiuril®", "Oretic®"],
      },
      {
        drug: "Lisinopril",
        brands: ["Zestril®", "Prinivil®"],
      },
      {
        drug: "Furosemide (Oral Tablet)",
        brands: ["Lasix®"],
      },
      {
        drug: "Amiloride HCl (Oral Tablet)",
        brands: ["Midamor®"],
      },
      {
        drug: "Amiloride + Hydrchlorothiazide",
        brands: ["Moduretic®"],
      },
      {
        drug: "Hydralazine HCl (Oral Tablet)",
        brands: ["Apresoline®"],
      },
      {
        drug: "Mannitol",
        brands: ["Osmitrol®", "Brochitol®"],
      },
    ],
  },
  {
    classOfDrug: "medicines used in heart failure",
    drugs: [
      {
        drug: "Digoxin",
        brands: ["Lanoxin®"],
      },
      {
        drug: "Dobutamine",
        brands: ["Dobutrex®"],
      },
      {
        drug: "Dopamine Hydrochloride",
        brands: ["Intropin®"],
      },
    ],
  },
  {
    classOfDrug: "anti-thrombotic",
    drugs: [
      {
        drug: "Acetyl salicylic acid (Aspirin)",
        brands: ["Bayer®", "Aspro Clear®", "Disprin®", "Zorprin®"],
      },
      {
        drug: "Heparin Sodium",
        brands: ["Heparin®", "Cath-Flush®"],
      },
      {
        drug: "Streptokinase",
        brands: ["Kabikinase®", "Streptase®"],
      },
      {
        drug: "Urokinase",
        brands: [],
      },
    ],
  },
  {
    classOfDrug: "antihypolipidemia",
    drugs: [
      {
        drug: "Atorvastatin",
        brands: ["Lipitor®", "AstraZeneca®"],
      },
      {
        drug: "Fenofibrate",
        brands: ["Tricor®", "Lofibra®", "Fenoglide®", "Triglide®"],
      },
      {
        drug: "Gemfibrozil (Oral Tablet)",
        brands: ["Lopid®"],
      },
      {
        drug: "Fluvastatin Sodium (Oral Capsule)",
        brands: ["Lescol®"],
      },
      {
        drug: "Simvastatin (Oral Tablet)",
        brands: ["Zocor®"],
      },
      {
        drug: "Cholestyramine (Oral Packet)",
        brands: ["Prevalite®", "Questran®", "LoCholest®"],
      },
      {
        drug: "Ezetimibe (Oral Tablet)",
        brands: ["Zetia®"],
      },
      {
        drug: "Niacin (Oral tablet)",
        brands: ["Niacor®", "Niaspan®"],
      },
      {
        drug: "Omega-3-Acid Ethyl Esters (Oral Capsule)",
        brands: ["Lovaza®"],
      },
    ],
  },
  {
    classOfDrug: "antidiabetic",
    drugs: [
      {
        drug: "Metformin",
        brands: ["Merck®", "Lipha®"],
      },
      {
        drug: "Insulin",
        brands: ["Admelog®", "Apidra®", "Fiasp®", "Humalog®"],
      },
      {
        drug: "Glibenclamide",
        brands: ["Daonil®", "Glanil®"],
      },
      {
        drug: "Pioglitazone",
        brands: ["Actos®"],
      },
      {
        drug: "Vildagliptin + Metformin",
        brands: ["Vilget-M"],
      },
      {
        drug: "Empaglifozin",
        brands: ["Jardiance®"],
      },
      {
        drug: "Liraglutide",
        brands: ["Victoza®", "Saxenda®"],
      },
    ],
  },
  {
    classOfDrug: "antacids and anti-ulcer",
    drugs: [
      {
        drug: "Aluminum Hydroxide + Magnesium Hydroxide",
        brands: ["Almacone®"],
      },
      {
        drug: "Omeprazole",
        brands: ["Prilosec®"],
      },
      {
        drug: "Ranitidine",
        brands: ["Zantac®"],
      },
      {
        drug: "Pantoprazole",
        brands: ["Protonix®"],
      },
      {
        drug: "Famotidine",
        brands: ["Pepcid®", "Fluxid®"],
      },
      {
        drug: "Cimetidine",
        brands: ["Tagamet®", "Kriscet®"],
      },
    ],
  },
  {
    classOfDrug: "antiemetics",
    drugs: [
      {
        drug: "Domperidone",
        brands: ["Motilium®"],
      },
      {
        drug: "Metoclopramide",
        brands: ["Reglan®", "Metozolv®"],
      },
      {
        drug: "Promethazine",
        brands: ["Phenergan®", "Phenadoz®"],
      },
      {
        drug: "Ondansetron",
        brands: ["Zofran®", "Zuplenz®"],
      },
    ],
  },
  {
    classOfDrug: "antispasmodic",
    drugs: [
      {
        drug: "Dicyclomine Hydrochloride",
        brands: ["Bentyl®"],
      },
      {
        drug: "Hyoscine Butyl Bromide",
        brands: ["Buscopan®"],
      },
      {
        drug: "Glycopyrrolate",
        brands: ["Robinul®", "Cuvposa®"],
      },
      {
        drug: "Methscopolamine Bromide",
        brands: ["Pamine®", "Pamine forte®"],
      },
      {
        drug: "Propantheline Bromide",
        brands: ["Pro-Banthine®"],
      },
      {
        drug: "Loperamide",
        brands: ["Imodium®"],
      },
    ],
  },
  {
    classOfDrug: "laxatives",
    drugs: [
      {
        drug: "Bisacodyl",
        brands: ["Dulcolax®", "Correctol®", "Modane®"],
      },
      {
        drug: "Ispaghula",
        brands: ["Fybogel®"],
      },
    ],
  },
  {
    classOfDrug: "antidiarrhoreals",
    drugs: [
      {
        drug: "Oral Rehydration Salts",
        brands: ["Ric-Oral®", "Electral®"],
      },
      {
        drug: "Zinc Sulfate",
        brands: ["Orazinc®", "Zincate®"],
      },
      {
        drug: "Metronidazole",
        brands: ["Flagyl®"],
      },
    ],
  },
  {
    classOfDrug: "antihelminthics",
    drugs: [
      {
        drug: "Albendazole",
        brands: ["Albenza®", "Wormnil®", "Zentel®", "Noworm®"],
      },
      {
        drug: "Piperazine",
        brands: ["Antepar®", " Dewormer®", "Multifuge®"],
      },
      {
        drug: "Diethylcarbamazine citrate",
        brands: ["Hetrazan®"],
      },
      {
        drug: "Praziquantel",
        brands: ["Biltricide®"],
      },
      {
        drug: "Mebendazole",
        brands: ["Flagyl®"],
      },
    ],
  },
  {
    classOfDrug: "antibacterials",
    drugs: [
      {
        drug: "Amoxicillin",
        brands: ["Amoxil®", "Larotid®"],
      },
      {
        drug: "Ampicillin",
        brands: ["Ampi®", "Omnipen®", "penglobe®"],
      },
      {
        drug: "Ceftriaxone",
        brands: ["Rocephin®"],
      },
      {
        drug: "Cephalexin",
        brands: ["Keflex®", "Keftab®", "Biocef®", "Daxbia®"],
      },
      {
        drug: "Azithromycin",
        brands: ["Zithromax®", "Zmax®"],
      },
      {
        drug: "Ciprofloxacin",
        brands: ["Cipro®", "ProQuin®"],
      },
      {
        drug: "Co-trimoxazole (Trimethoprim + Sulphamethoxazole)",
        brands: ["Septrin®", "Emtrim®"],
      },
      {
        drug: "Doxycycline",
        brands: ["Vibramycin®", "Doxy®", "Oracea®", "Adoxa®"],
      },
      {
        drug: "Gentamicin",
        brands: ["Garamycin®", "Gentamycin Paediatric"],
      },
      {
        drug: "Vancomycin",
        brands: ["Vancocin®", "Firvanq®"],
      },
    ],
  },
  {
    classOfDrug: "antileprosy",
    drugs: [
      {
        drug: "Clofazimine",
        brands: ["Lamprene®"],
      },
      {
        drug: "Rifampicin",
        brands: ["Rifadin®", "Rimactane®"],
      },
      {
        drug: "Dapsone",
        brands: ["Aczone gel®"],
      },
    ],
  },
  {
    classOfDrug: "anti tuberculosis",
    drugs: [
      {
        drug: "Ethambutol",
        brands: ["Myambutol®"],
      },
      {
        drug: "Isoniazid",
        brands: ["Nydrazid®"],
      },
      {
        drug: "Rifampin + Isoniazid",
        brands: ["Rifamate®"],
      },
      {
        drug: "Ofloxacin",
        brands: ["Ocuflox®", "Floxin®"],
      },
      {
        drug: "Isoniazid +Pyrazinamide + Rifampin",
        brands: ["Rifater®"],
      },
      {
        drug: "Rifampicin",
        brands: ["Rifadin®", "Rimactane®"],
      },
      {
        drug: "Streptomycin Sulphate",
        brands: ["Rimosidin®", "Plantomycin®"],
      },
    ],
  },
  {
    classOfDrug: "antifungal",
    drugs: [
      {
        drug: "Clotrimazole",
        brands: ["Clotrim Antifungal®", "Lotrimin®", "Mycelex®"],
      },
      {
        drug: "Amphotericin B (conventional)",
        brands: ["Fungilin®", "Abelcet®", "AmBisome®", "Amphotec®"],
      },
      {
        drug: "Fluconazole",
        brands: ["Diflucan®"],
      },
      {
        drug: "Griseofulvin",
        brands: ["Cimsovin®", "Gris-PEG®", "Grifulvin V®"],
      },
      {
        drug: "Nystatin",
        brands: ["Nystop®", "Klayesta®", "Nyamyc®"],
      },
      {
        drug: "Ketoconazole",
        brands: ["Nizoral®"],
      },
      {
        drug: "Miconazole oral",
        brands: ["Oravig®"],
      },
    ],
  },
  {
    classOfDrug: "antiviral",
    drugs: [
      {
        drug: "Lamivudine + Zidovudine",
        brands: ["Combivir®"],
      },
      {
        drug: "Acyclovir",
        brands: ["Zovirax®"],
      },
      {
        drug: "Zidovudine",
        brands: ["Retrovir"],
      },
      {
        drug: "Atazanavir + Ritonavir",
        brands: ["Ritovaz"],
      },
    ],
  },
  {
    classOfDrug: "antiprotozoal",
    drugs: [
      {
        drug: "Metronidazole",
        brands: ["Flagyl®"],
      },
      {
        drug: "Diloxanide Furoate",
        brands: ["Furamide®"],
      },
      {
        drug: "Sulfadoxine + Pyrimethamine",
        brands: ["Fansidar®", "Amalar®"],
      },
      {
        drug: "Chloroquine phosphate",
        brands: ["Quimal®", "Dawaquin®"],
      },
      {
        drug: "Artemether + Lumenfantrine",
        brands: ["Lonart®", "Coartem®"],
      },
      {
        drug: "Clindamycin",
        brands: ["Cleocin®", "Clindesse®", "Clindagel®"],
      },
      {
        drug: "Primaquine",
        brands: ["Jasoprim®", "Malirid®", "Remaquin®"],
      },
      {
        drug: "Quinine sulphate",
        brands: ["Qualaquin®"],
      },
    ],
  },
  {
    classOfDrug: "antianginal",
    drugs: [
      {
        drug: "Acetyl salicylic acid (Aspirin)",
        brands: ["Bayer®", "Aspro Clear®", "Disprin®", "Zorprin®"],
      },
      {
        drug: "Diltiazem",
        brands: ["Cardizem CD®", "Taztia XT®"],
      },
      {
        drug: "Glyceryl Trinitrate",
        brands: ["Rectogesic®", "Minitran®", "Glytrin®"],
      },
      {
        drug: "Isosorbide dinitrate",
        brands: ["Dilatrate-SR®", "Isordil®", "Isordil Titradose®"],
      },
      {
        drug: "Metoprolol",
        brands: ["Lopressor®", "Toprol XL®"],
      },
      {
        drug: "Clopidogrel",
        brands: ["Plavix®"],
      },
    ],
  },
];

export default productGalleryData;
