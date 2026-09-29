import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen, Mic, GitBranch, Table as TableIcon, ChevronLeft, ChevronRight,
  ChevronDown, ArrowUp, ArrowDown, Plus, Trash2, RotateCcw, Check, X, ExternalLink, Coffee,
} from "lucide-react";

/* ========================================================================== */
/* THEME                                                                      */
/* ========================================================================== */
const T = {
  bg: "#0F172A", panel: "#16213A", panel2: "#1B2846", line: "#26355A",
  text: "#E2E8F0", mute: "#94A3B8", cyan: "#38BDF8", violet: "#A855F7",
  green: "#22C55E", red: "#F87171",
};
const uiFont = `Inter, "Charis SIL", "Gentium Plus", "DejaVu Sans", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif`;
const ipaFont = `"Charis SIL", "Gentium Plus", "DejaVu Sans", "Noto Sans", "Segoe UI", sans-serif`;
const mathFont = `"Charis SIL", "DejaVu Serif", Georgia, serif`;

/* ========================================================================== */
/* COURSE DATA                                                                */
/* `content` uses light Markdown + $LaTeX$; rendered by the <Md> component     */
/* below (no external libraries needed).                                      */
/* ========================================================================== */
const phonologyData = [
  {
    id: "unit-1",
    title: "1. Fundamentals & Core Concepts",
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Phonology: Phonetics vs. Phonology",
        content: `
Phonetics focuses on the physical properties of speech sounds—how they are produced articulatorily, transmitted acoustically, and perceived auditorily. Phonology, in contrast, studies the cognitive, functional organization of those sounds within a specific language's mental grammar.

* **Phonetics:** Raw physical sound, universal, represented using square brackets: [pʰ].
* **Phonology:** Abstract mental representations, language-specific, represented using slashes: /p/.
        `,
        examples: [
          { label: "Phonetic vs. Phonological view of 'spin'", detail: "Phonetics captures the unaspirated voiceless stop [p] in [spɪn]. Phonology categorizes it under the abstract phoneme /p/." },
          { label: "Aspiration contrast in English vs. Hindi", detail: "In English, [pʰ] and [p] belong to one phoneme /p/. In Hindi, /pʰ/ (e.g., [pʰəl] 'fruit') and /p/ (e.g., [pəl] 'moment') are distinct phonemes." }
        ],
        exercises: [
          {
            question: "Is the statement describing Phonetics or Phonology? 'Analyzing the duration in milliseconds of vowel nasalization before voiced stops.'",
            options: ["Phonetics", "Phonology"],
            answer: 0,
            explanation: "Measuring duration in milliseconds examines physical acoustic properties, which falls squarely under Phonetics."
          }
        ]
      },
      {
        id: "1-2",
        title: "The Concept of the Phoneme and Allophones",
        content: `
A **phoneme** is an abstract structural unit of sound in a language that can distinguish meaning. An **allophone** is a surface phonetic realization of a phoneme determined by environment or variation.

Changing a phoneme alters word meaning, whereas substituting an allophone usually produces an unnatural or accented pronunciation without changing core word identity.
        `,
        examples: [
          { label: "English /t/ Allophones", detail: "• [tʰ] aspirated in /tɒp/ [tʰɒp] 'top'\n• [ɾ] tap/flap in /ˈbʌtər/ [ˈbʌɾɚ] 'butter'\n• [ʔ] glottal stop in /ˈkɪtn̩/ [ˈkɪʔn̩] 'kitten'\n• [t̚] unreleased in /kæt/ [kæt̚] 'cat'" },
          { label: "Korean /k/ Phoneme", detail: "Realized as voiceless [k] word-initially and voiced [ɡ] between voiced sounds: /koki/ [koɡi] 'meat'." }
        ],
        exercises: [
          {
            question: "In English, what is the relationship between [kʰ] in 'kit' [kʰɪt] and [k] in 'skit' [skɪt]?",
            options: [
              "They are two separate phonemes /kʰ/ and /k/.",
              "They are allophones of the single phoneme /k/.",
              "They are in contrastive distribution.",
              "They form a minimal pair."
            ],
            answer: 1,
            explanation: "They are context-conditioned phonetic realizations (allophones) of the single underlying phoneme /k/."
          }
        ]
      },
      {
        id: "1-3",
        title: "Minimal Pairs and Contrastive Distribution",
        content: `
Two sounds are in **contrastive distribution** if they occur in the exact same phonetic environment and cause a change in word meaning. A pair of words differing by only one sound in the same position is called a **minimal pair**. Minimal pairs prove that two sounds represent distinct phonemes.
        `,
        examples: [
          { label: "English Minimal Pair", detail: "/pɪn/ 'pin' [pʰɪn] vs. /bɪn/ 'bin' [bɪn] → Establishes /p/ and /b/ as distinct phonemes." },
          { label: "Minimal Pair establishing /s/ vs. /ʃ/", detail: "/sɪp/ 'sip' [sɪp] vs. /ʃɪp/ 'ship' [ʃɪp]." }
        ],
        exercises: [
          {
            question: "Which of the following word pairs forms a valid minimal pair in standard English?",
            options: [
              "cat /kæt/ and cot /kɒt/",
              "sing /sɪŋ/ and ring /rɪŋ/ (phonetically [ɹɪŋ])",
              "light /laɪt/ and night /naɪt/",
              "All of the above"
            ],
            answer: 3,
            explanation: "All listed pairs differ by exactly one segment in identical surrounding context."
          }
        ]
      },
      {
        id: "1-4",
        title: "Complementary Distribution and Free Variation",
        content: `
* **Complementary Distribution:** Two phonetically similar sounds never occur in the same environment. Where Sound A appears, Sound B never can. They are allophones of a single underlying phoneme.
* **Free Variation:** Two sounds can swap in the exact same environment without changing meaning or sounding ungrammatical (often stylistic/dialectal).
        `,
        examples: [
          { label: "Complementary Distribution", detail: "English [l] (clear L before vowels: [liːp] 'leap') vs. [ɫ] (dark L in coda: [pʰiːɫ] 'peel')." },
          { label: "Free Variation", detail: "Word-final voiceless stops in 'stop': released [stɒp] vs. unreleased [stɒp̚]." }
        ],
        exercises: [
          {
            question: "If sound [X] appears only before nasal consonants and sound [Y] appears everywhere else, what distribution are [X] and [Y] in?",
            options: [
              "Contrastive distribution",
              "Free variation",
              "Complementary distribution",
              "Minimal distribution"
            ],
            answer: 2,
            explanation: "Their environments are mutually exclusive, pointing directly to complementary distribution."
          }
        ]
      },
      {
        id: "1-5",
        title: "Distinctive Features and Feature Matrices",
        content: `
Distinctive feature theory (Jakobson, Fant & Halle; Chomsky & Halle's *SPE*) decomposes speech segments into binary (+/-) atomic phonological features. Feature matrices define natural classes of sounds that undergo or trigger identical phonological processes.

Major feature dimensions include:
* **Root:** [±consonantal], [±approximant], [±sonorant]
* **Laryngeal:** [±voice], [±spread glottis], [±constricted glottis]
* **Place/Manner:** [±continuant], [±strident], [±nasal], [±anterior], [±coronal]
        `,
        examples: [
          { label: "Natural Class of Voiceless Stops", detail: "Matrix for /p, t, k/: [+consonantal, -sonorant, -continuant, -voice]" },
          { label: "Coronal Consonants Matrix", detail: "/t, d, s, z, n, l/ all share [+coronal], produced with the tongue blade/tip." }
        ],
        exercises: [
          {
            question: "Which feature distinguishes /s/ [+continuant] from /t/ [-continuant]?",
            options: ["[±voice]", "[±coronal]", "[±continuant]", "[±nasal]"],
            answer: 2,
            explanation: "/s/ allows continuous airflow through the oral tract ([+continuant]), whereas /t/ creates a complete blockage ([-continuant])."
          }
        ]
      }
    ]
  },

  {
    id: "unit-2",
    title: "2. Phonological Rules & Processes",
    lessons: [
      {
        id: "2-1",
        title: "Formal Representation of Phonological Rules",
        content: `
Phonological processes are modeled systematically using rewrite rules:

$$A \\rightarrow B \\ / \\ C \\ \\underline{\\quad} \\ D$$

* **A**: Underlying target phoneme (Input)
* **B**: Surface phonetic output
* **C _ D**: Phonetic context (C = preceding environment, D = following environment)
* **/**: "In the environment of"

You can type rules in exactly this shape in the Derive tab.
        `,
        examples: [
          { label: "English Vowel Nasalization", detail: "V → [+nasal] / _ [+nasal]\n(A vowel becomes nasalized when directly preceding a nasal consonant, e.g., /mæn/ → [mæ̃n])." },
          { label: "German Word-Final Devoicing", detail: "[-sonorant] → [-voice] / _ #\n(Obstruents become voiceless at the end of a word, e.g., /raːd/ → [raːt] 'wheel')." }
        ],
        exercises: [
          {
            question: "What does the rule formalization 'Ø → [ə] / C _ C #' represent?",
            options: [
              "A schwa is deleted between two consonants at the end of a word.",
              "A schwa is inserted between two consonants at the end of a word.",
              "A consonant is inserted before a schwa.",
              "A schwa shifts to a full vowel."
            ],
            answer: 1,
            explanation: "Ø denotes zero (nothing), so this is an insertion (epenthesis): a schwa is inserted between two consonants before a word boundary (#)."
          }
        ]
      },
      {
        id: "2-2",
        title: "Assimilation (Nasal, Voice, Place, Manner)",
        content: `
**Assimilation** occurs when a sound changes a feature to become more similar to a neighboring sound (the *trigger*).

* **Regressive (Anticipatory):** The target changes to match a *following* trigger (target ← trigger).
* **Progressive (Perseverative):** The target changes to match a *preceding* trigger (trigger → target).
* **Types:** Nasal, Voicing, Place of Articulation, and Manner of Articulation.
        `,
        examples: [
          { label: "Place Assimilation (Regressive)", detail: "/ɪn+pɒsəbl̩/ → [ɪmˈpɒsəbl̩] 'impossible' (/n/ becomes bilabial [m] before /p/)." },
          { label: "Voicing Assimilation (Progressive)", detail: "English plural suffix: /kæt/ + /z/ → [kæts] (voiceless [t] forces voiceless [s])." }
        ],
        exercises: [
          {
            question: "In the phrase 'in book' pronounced as [ɪm bʊk], what type of assimilation has occurred?",
            options: [
              "Progressive place assimilation",
              "Regressive place assimilation",
              "Nasal manner assimilation",
              "Voicing assimilation"
            ],
            answer: 1,
            explanation: "The alveolar /n/ changes its place to bilabial [m] under the influence of the following bilabial /b/."
          }
        ]
      },
      {
        id: "2-3",
        title: "Dissimilation",
        content: `
**Dissimilation** occurs when two identical or similar sounds become less alike to facilitate perception or ease of articulation, often preventing repetition of a feature across nearby syllables.
        `,
        examples: [
          { label: "Latin suffix -alis to -aris", detail: "The Latin adjectival suffix /-aːlis/ becomes [-aːris] if the root already contains an /l/: 'nav-alis' (naval) vs. 'sol-aris' (solar)." },
          { label: "English Non-standard Pronunciation", detail: "/ˈfɛbɹuˌɛɹi/ 'February' → [ˈfɛbjuˌɛɹi] (the first /ɹ/ is lost or becomes [j] because of the second /ɹ/)." }
        ],
        exercises: [
          {
            question: "Why is the Latin adjective 'militaris' formed instead of 'militalis'?",
            options: [
              "Assimilation of liquid consonants.",
              "Dissimilation to avoid two /l/ sounds in adjacent syllables.",
              "Epenthesis to add a rhotic sound.",
              "Metathesis of /l/ and /r/."
            ],
            answer: 1,
            explanation: "The root milit- contains /l/, so the suffix dissimilates from /-alis/ to /-aris/."
          }
        ]
      },
      {
        id: "2-4",
        title: "Elision and Deletion",
        content: `
**Elision/Deletion** refers to the removal of a phonemic segment (vowel or consonant) during speech production, frequently observed in rapid or informal connected speech.
        `,
        examples: [
          { label: "English Alveolar Stop Deletion", detail: "'next door' /nɛkst dɔːr/ → [nɛks dɔːr] (deletion of /t/ between consonants)." },
          { label: "French Schwa Deletion (e muet)", detail: "Informal 'je ne sais pas' /ʒə nə sɛ pa/ → [ʒnəsɛpa] (the schwa of 'je' is lost)." }
        ],
        exercises: [
          {
            question: "Pronouncing 'camera' /ˈkæmərə/ as [ˈkæmrə] is an example of which phonological process?",
            options: ["Epenthesis", "Syncope (Vowel Deletion)", "Metathesis", "Fortition"],
            answer: 1,
            explanation: "The deletion of an unstressed interior vowel is called syncope (a form of deletion)."
          }
        ]
      },
      {
        id: "2-5",
        title: "Insertion and Epenthesis",
        content: `
**Insertion/Epenthesis** is the process where a phonetic segment is added into a word to fix non-permissible syllable structures or ease transitional articulation.

* **Prothesis:** Insertion at the beginning of a word.
* **Anaptyxis:** Insertion of a vowel inside a word, typically breaking up a consonant cluster.
* **Excrescence:** Insertion of a transitional consonant.
        `,
        examples: [
          { label: "Spanish Prothesis", detail: "Latin 'schola' → Spanish 'escuela'; likewise, Spanish speakers pronounce English 'school' /skuːl/ as [es.ˈkul]." },
          { label: "English Excrescent Stop", detail: "/dæns/ 'dance' → [dænts] (a transitional [t] appears between [n] and [s])." }
        ],
        exercises: [
          {
            question: "The pronunciation of 'athlete' /ˈæθliːt/ as [ˈæθəliːt] demonstrates:",
            options: ["Vowel Epenthesis", "Consonant Elision", "Assimilation", "Metathesis"],
            answer: 0,
            explanation: "An intrusive schwa [ə] is inserted into the middle of the consonant cluster /θl/."
          }
        ]
      },
      {
        id: "2-6",
        title: "Metathesis",
        content: `
**Metathesis** is the process that reorders or swaps the sequence of two adjacent or distant segments within a word.
        `,
        examples: [
          { label: "Dialectal English and Child Speech", detail: "/æsk/ 'ask' → [æks] 'aks' (swapping /s/ and /k/)." },
          { label: "Historical Old English to Modern English", detail: "Old English 'brid' → 'bird'; 'hros' → 'horse'; 'þridda' → 'third'." }
        ],
        exercises: [
          {
            question: "Pronouncing 'ask' /æsk/ as [æks] is an example of:",
            options: ["Dissimilation", "Metathesis", "Lenition", "Nasalization"],
            answer: 1,
            explanation: "Metathesis swaps the order of two segments (here /s/ and /k/)."
          }
        ]
      },
      {
        id: "2-7",
        title: "Lenition (Weakening) and Fortition (Strengthening)",
        content: `
* **Lenition (Weakening):** A segment becomes more sonorous or open along the scale:
  * Stop $\\rightarrow$ Fricative $\\rightarrow$ Approximant $\\rightarrow$ Zero (Deletion).
  * Voiceless $\\rightarrow$ Voiced.
* **Fortition (Strengthening):** A segment becomes less sonorous or tighter in constriction (e.g., word-initial aspiration, glottalization, or devocalizing glides).
        `,
        examples: [
          { label: "Spanish Intervocalic Lenition", detail: "/b, d, ɡ/ become approximants [β, ð, ɣ] between vowels: 'cabo' /kabo/ → [kaβo]." },
          { label: "English Tapping (Lenition)", detail: "Intervocalic /t/ weakens to voiced tap [ɾ] in 'latter' [ˈlæɾɚ]." }
        ],
        exercises: [
          {
            question: "Which of the following sound transitions represents Lenition?",
            options: ["[f] → [p]", "[k] → [x]", "[w] → [k]", "[s] → [t]"],
            answer: 1,
            explanation: "[k] (stop) shifting to [x] (fricative) increases openness/sonority, which defines Lenition."
          }
        ]
      },
      {
        id: "2-8",
        title: "Neutralization and Absolute Neutralization",
        content: `
* **Neutralization:** The loss of a contrast between two phonemes in a specific phonological environment.
* **Absolute Neutralization:** An underlying phonemic distinction is posited in theoretical representations but is completely neutralized in ALL surface contexts (controversial in Generative Phonology).
        `,
        examples: [
          { label: "German Final Devoicing (Neutralization)", detail: "/raːt/ 'advice' and /raːd/ 'wheel' both surface as [raːt] word-finally." },
          { label: "American English Flapping", detail: "'latter' /ˈlætər/ and 'ladder' /ˈlædər/ both surface as [ˈlæɾɚ]." }
        ],
        exercises: [
          {
            question: "Because 'metal' and 'medal' sound identical in fast American English as [ˈmɛɾl̩], what phenomenon has occurred?",
            options: [
              "Absolute Neutralization",
              "Contextual Neutralization of /t/ and /d/",
              "Metathesis",
              "Epenthesis"
            ],
            answer: 1,
            explanation: "The phonemic contrast between /t/ and /d/ is neutralized specifically in intervocalic flappable positions."
          }
        ]
      },
      {
        id: "2-9",
        title: "Rule Ordering (Feeding, Bleeding, Counter-feeding, Counter-bleeding)",
        content: `
In serial generative phonology, rules apply sequentially. Rule ordering relationships fall into four types (for rules A and B, where A would naturally precede B):

* **Feeding:** A applies first and creates new environments where B can apply.
* **Bleeding:** A applies first and destroys environments where B could have applied.
* **Counter-feeding:** B applies before A, so B misses the environments A would have created. The rules are in the non-feeding order.
* **Counter-bleeding:** B applies before A, so B applies even though A would have destroyed its environment. B's effect looks opaque on the surface.

Try it: the Derive tab labels each step as fed or bled automatically, and lets you reorder the rules.
        `,
        examples: [
          { label: "Feeding Example", detail: "Fast-speech 'police' /pəˈliːs/:\n1. Schwa Syncope: [pˈliːs]\n2. Liquid Devoicing after a voiceless stop: [pl̥iːs]\nSyncope creates the /p_l/ context, so Rule 1 feeds Rule 2." },
          { label: "Bleeding Example", detail: "English plural /bʌs+z/:\n1. Epenthesis inserts [ə]: [bʌsəz]\n2. Voicing Assimilation (z → s after a voiceless sound) can no longer apply because [ə] now separates /s/ and /z/.\nRule 1 bleeds Rule 2." },
          { label: "Counter-bleeding Example", detail: "Canadian English 'writer' /ɹaɪtɚ/:\n1. Raising: /aɪ/ → [ʌɪ] before voiceless consonants: [ɹʌɪtɚ]\n2. Flapping: /t/ → [ɾ]: [ɹʌɪɾɚ]\nIf Flapping applied first, it would destroy the voiceless context and block Raising. Because Raising applies first, it is counter-bled, and 'writer' [ɹʌɪɾɚ] contrasts with 'rider' [ɹaɪɾɚ]." }
        ],
        exercises: [
          {
            question: "If Rule 1 creates a target context for Rule 2, and Rule 1 is applied FIRST, what is the ordering relationship?",
            options: ["Bleeding", "Feeding", "Counter-feeding", "Counter-bleeding"],
            answer: 1,
            explanation: "Feeding ordering occurs when an earlier rule creates the context for a subsequent rule to apply."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIT 3 ---------------------------------- */
  {
    id: "unit-3",
    title: "3. Syllable Structure & Phonotactics",
    lessons: [
      {
        id: "3-1",
        title: "The Structure of the Syllable (Onset, Rhyme, Nucleus, Coda)",
        content: `
A syllable (represented by the Greek letter $\\sigma$) is a unit of organization for sounds. It is hierarchical, not a flat string:

$$\\sigma \\rightarrow \\text{Onset} + \\text{Rhyme}$$

$$\\text{Rhyme} \\rightarrow \\text{Nucleus} + \\text{Coda}$$

* **Onset:** consonants before the vowel (optional in many languages).
* **Nucleus:** the peak of the syllable, usually a vowel (required).
* **Coda:** consonants after the nucleus (optional).
* **Rhyme:** nucleus + coda. This is the unit that rhymes and that determines syllable weight.

A syllable with a short vowel and no coda is **light** (CV). One with a long vowel or a coda is typically **heavy** (CVV, CVC). Many stress systems care about weight.
        `,
        examples: [
          { label: "'cat' /kæt/", detail: "Onset: k\nNucleus: æ\nCoda: t\nRhyme: æt" },
          { label: "'strengths' /strɛŋkθs/", detail: "Onset: str\nNucleus: ɛ\nCoda: ŋkθs\nEnglish allows up to three consonants in the onset and four in the coda." },
          { label: "Syllabic consonant nucleus", detail: "'bottle' [ˈbɒɾl̩]: the final syllable has no vowel; the lateral [l̩] is the nucleus." }
        ],
        exercises: [
          {
            question: "In 'plant' /plænt/, which part is the rhyme?",
            options: ["/pl/", "/æ/", "/ænt/", "/nt/"],
            answer: 2,
            explanation: "The rhyme is the nucleus plus the coda: /æ/ + /nt/ = /ænt/. The onset is /pl/."
          }
        ]
      },
      {
        id: "3-2",
        title: "The Sonority Sequencing Principle",
        content: `
Sounds differ in **sonority**, roughly how vowel-like (open, resonant) they are. A commonly used scale:

$$\\text{stops}(1) < \\text{fricatives}(2) < \\text{nasals}(3) < \\text{liquids}(4) < \\text{glides}(5) < \\text{vowels}(6)$$

The **Sonority Sequencing Principle (SSP)** says a syllable rises in sonority from the onset edge up to the nucleus, then falls toward the coda edge. The nucleus is the sonority peak.

English has well-known exceptions: /s/ + stop clusters such as /st/, /sp/, /sk/ at word edges break the principle.
        `,
        examples: [
          { label: "Good onsets (rising)", detail: "/pl/ 'play' (stop → liquid)\n/tr/ 'tree' (stop → liquid)\n/kw/ 'quick' (stop → glide)" },
          { label: "Good codas (falling)", detail: "/ɛlp/ 'help' (liquid → stop)\n/ɒnd/ 'pond' (nasal → stop)" },
          { label: "SSP violation: /s/ + stop", detail: "/stɒp/ 'stop': /s/ (fricative, 2) is more sonorous than /t/ (stop, 1), yet /st/ is a licit English onset." }
        ],
        exercises: [
          {
            question: "Which onset violates the Sonority Sequencing Principle (ignoring /s/-clusters)?",
            options: ["/bl/", "/tr/", "/lp/", "/kw/"],
            answer: 2,
            explanation: "In /lp/ sonority falls from a liquid to a stop, the opposite of the rise the SSP requires in an onset."
          }
        ]
      },
      {
        id: "3-3",
        title: "Phonotactics: Possible and Impossible Words",
        content: `
**Phonotactics** are the language-specific rules about which sound sequences are allowed. Speakers know them without being taught.

There are two kinds of non-words. An **accidental gap** is a possible word that simply does not exist (blick). A **systematic gap** breaks phonotactic rules (bnick, in English).

Phonotactics also explain how loanwords are adapted: speakers repair illicit sequences, often by epenthesis or deletion.
        `,
        examples: [
          { label: "English accidental vs. systematic gaps", detail: "[blɪk] – possible, just not a word\n[bnɪk] – impossible: /bn/ is not an English onset\n[ŋaɪt] – impossible: /ŋ/ never begins an English word" },
          { label: "Japanese loanword adaptation", detail: "English 'strike' /straɪk/ → Japanese [sutoraiku]. Japanese syllables are mostly (C)V, so vowels are inserted into the cluster." },
          { label: "Spanish loanword adaptation", detail: "English 'stress' /strɛs/ → Spanish [es.tɾes]. Word-initial /s/ + consonant is repaired by prothesis." }
        ],
        exercises: [
          {
            question: "Which of these is a phonotactically possible (but nonexistent) English word?",
            options: ["[ŋaɪt]", "[bnɪk]", "[blɪk]", "[tlɛp]"],
            answer: 2,
            explanation: "/bl/ is a legal English onset, so [blɪk] is an accidental gap. The others begin with sequences English does not allow."
          }
        ]
      },
      {
        id: "3-4",
        title: "Syllabification and the Maximal Onset Principle",
        content: `
When consonants sit between vowels, where does the syllable boundary go? The **Maximal Onset Principle (MOP)** says: give the second syllable as many consonants as the language allows in a word-initial onset. Any leftovers go to the coda of the first syllable.

Steps:
* Find the vowels (nuclei).
* Take the consonant string between two nuclei.
* Give the second syllable the longest legal onset from that string.
* Put the rest in the previous coda.
        `,
        examples: [
          { label: "'apron' /eɪprən/", detail: "Between vowels: /pr/. /pr/ is a legal English onset, so it all goes right: eɪ.prən." },
          { label: "'ignite' /ɪɡnaɪt/", detail: "Between vowels: /ɡn/. /ɡn/ is not a legal English onset, so /ɡ/ closes the first syllable: ɪɡ.naɪt." },
          { label: "'pilgrim' /pɪlɡrɪm/", detail: "Between vowels: /lɡr/. /ɡr/ is a legal onset, /lɡr/ is not: pɪl.ɡrɪm." }
        ],
        exercises: [
          {
            question: "How does the Maximal Onset Principle syllabify 'monster' /mɒnstɚ/?",
            options: ["mɒnst.ɚ", "mɒn.stɚ", "mɒ.nstɚ", "m.ɒnstɚ"],
            answer: 1,
            explanation: "/nst/ is not a legal onset but /st/ is, so /st/ goes to the second syllable and /n/ stays in the first coda: mɒn.stɚ."
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIT 4 ---------------------------------- */
  {
    id: "unit-4",
    title: "4. Suprasegmentals & Autosegmental Phonology",
    lessons: [
      {
        id: "4-1",
        title: "Stress and Metrical Structure",
        content: `
**Stress** is relative prominence of one syllable over its neighbors, cued by some mix of pitch, duration, and loudness. Metrical phonology groups syllables into **feet**, each with one strong (S) and one weak (W) position.

* **Trochee:** S W (stress on the first syllable).
* **Iamb:** W S (stress on the second syllable).

A **metrical grid** stacks marks above syllables: the more marks over a syllable, the more prominent it is. The tallest column carries primary stress.
        `,
        examples: [
          { label: "Trochaic pattern", detail: "'water' [ˈwɔː.tɚ]: S W\n'table' [ˈteɪ.bl̩]: S W" },
          { label: "Iambic pattern", detail: "'be.lieve' [bɪ.ˈliːv]: W S\n'a.rise' [ə.ˈɹaɪz]: W S" },
          { label: "Stress shifts vowel quality", detail: "'photograph' [ˈfoʊ.ɾə.ɡɹæf] vs. 'photography' [fə.ˈtɒɡ.ɹə.fi]. Unstressed vowels reduce toward schwa." }
        ],
        exercises: [
          {
            question: "In an iambic foot, which syllable carries the stress?",
            options: ["The first", "The second", "Both equally", "Neither"],
            answer: 1,
            explanation: "An iamb is weak-strong (W S), so the second syllable is stressed."
          }
        ]
      },
      {
        id: "4-2",
        title: "Tone and Tone Sandhi",
        content: `
In a **tone language**, pitch distinguishes word meaning, just as consonants and vowels do. Tones may be **level** (high, mid, low) or **contour** (rising, falling).

**Tone sandhi** is a phonological process where a tone changes depending on neighboring tones, similar to segmental assimilation.
        `,
        examples: [
          { label: "Mandarin tones on /ma/", detail: "mā (tone 1, high level) 'mother'\nmá (tone 2, rising) 'hemp'\nmǎ (tone 3, dipping) 'horse'\nmà (tone 4, falling) 'scold'" },
          { label: "Mandarin third-tone sandhi", detail: "Two third tones in a row: the first becomes a rising tone. nǐ + hǎo 'hello' is pronounced ní hǎo." }
        ],
        exercises: [
          {
            question: "Mandarin má 'hemp' and mǎ 'horse' differ only in tone. What does this make them?",
            options: [
              "Allophones of one word",
              "A minimal pair distinguished by tone",
              "Free variants",
              "Complementary distribution"
            ],
            answer: 1,
            explanation: "Same segments, different pitch pattern, different meaning: a tonal minimal pair."
          }
        ]
      },
      {
        id: "4-3",
        title: "Autosegmental Phonology",
        content: `
**Autosegmental phonology** puts features such as tone on their own tier, separate from the segmental tier. The two tiers are connected by **association lines**.

* **Spreading:** a tone links to additional vowels.
* **Floating tone:** a tone with no vowel of its own, which docks onto a neighbor.
* **No-Crossing Constraint (NCC):** association lines on the same pair of tiers may not cross.
* **Obligatory Contour Principle (OCP):** adjacent identical tones (H H) merge into one.

This model explains why one tone can stretch over several syllables, or why several tones can pile onto one.
        `,
        examples: [
          { label: "Mende tone patterns (textbook data)", detail: "H: kɔ́ 'war'\nL: kpà 'debt'\nHL: mbû 'owl'\nLH: mbǎ 'rice'\nLHL: mbâ 'companion'\nOnly five patterns occur, no matter the word length." },
          { label: "Spreading", detail: "Mende 'felama' (junction) has one H tone spread across all three syllables: [félámá]." }
        ],
        exercises: [
          {
            question: "What does the No-Crossing Constraint prohibit?",
            options: [
              "Two tones on one vowel",
              "Association lines crossing between two tiers",
              "A tone spreading to a second vowel",
              "Adjacent identical tones"
            ],
            answer: 1,
            explanation: "The NCC says association lines linking the same two tiers may not cross. (Adjacent identical tones fall under the OCP.)"
          }
        ]
      }
    ]
  },

  /* ------------------------------ UNIT 5 ---------------------------------- */
  {
    id: "unit-5",
    title: "5. Optimality Theory",
    lessons: [
      {
        id: "5-1",
        title: "Constraints, GEN and EVAL",
        content: `
Optimality Theory (OT) replaces ordered rules with **ranked, violable constraints**.

* **GEN** produces a set of candidate outputs for each input.
* **CON** is the universal set of constraints.
* **EVAL** picks the candidate that best satisfies the language's ranking of CON.

Constraints come in two families:
* **Markedness:** penalize outputs that are hard or unusual (for example, a ban on voiced obstruents in coda position).
* **Faithfulness:** penalize differences between input and output: **MAX** (no deletion), **DEP** (no insertion), **IDENT(F)** (no feature change).
        `,
        examples: [
          { label: "The three basic faithfulness constraints", detail: "MAX: every input segment has an output correspondent (punishes deletion)\nDEP: every output segment has an input correspondent (punishes insertion)\nIDENT(voice): corresponding segments agree in voicing" }
        ],
        exercises: [
          {
            question: "Which type of constraint is DEP?",
            options: ["Markedness", "Faithfulness", "Alignment", "Sonority"],
            answer: 1,
            explanation: "DEP compares output to input and penalizes inserted material, so it is a faithfulness constraint."
          }
        ]
      },
      {
        id: "5-2",
        title: "Reading Tableaux",
        content: `
A **tableau** lists candidates in rows and ranked constraints in columns, highest-ranked on the left. Each violation earns a mark. When a candidate loses to a rival at a constraint, its mark is **fatal** (marked with an exclamation point), and later cells are shaded because they no longer matter. The winner is shown with a pointing hand.

**Strict domination:** a higher-ranked constraint outweighs any number of violations of lower-ranked ones. Marks are compared, not added up.

Open the OT tab and drag constraints left or right to see the winner change.
        `,
        examples: [
          { label: "Strict domination", detail: "Candidate A: one violation of the top constraint.\nCandidate B: three violations of the lowest constraint.\nB wins. One top-level mark is worse than any number of lower marks." }
        ],
        exercises: [
          {
            question: "Candidate A violates the top-ranked constraint once. Candidate B violates only the lowest-ranked constraint, five times. Which wins?",
            options: ["A", "B", "They tie", "Cannot be determined"],
            answer: 1,
            explanation: "Strict domination: the top-ranked constraint decides first, and B has no violation there."
          }
        ]
      },
      {
        id: "5-3",
        title: "Factorial Typology: Reranking as Language Variation",
        content: `
In OT, the constraints are universal and **languages differ only in ranking**. Reranking the same constraints predicts different languages.

If markedness outranks faithfulness, the language repairs marked structures (German devoices final obstruents). If faithfulness outranks markedness, it tolerates them (English keeps final voiced obstruents).
        `,
        examples: [
          { label: "German vs. English coda voicing", detail: "German: *VoicedCoda >> IDENT(voice) → /raːd/ surfaces as [raːt]\nEnglish: IDENT(voice) >> *VoicedCoda → /bæd/ surfaces as [bæd]" },
          { label: "Spanish vs. English /sC/ onsets", detail: "Spanish: *#sC >> DEP → /skuːl/ becomes [eskuːl]\nEnglish: DEP >> *#sC → /skuːl/ stays [skuːl]" }
        ],
        exercises: [
          {
            question: "Which ranking produces German-style final devoicing?",
            options: [
              "IDENT(voice) >> *VoicedCoda",
              "*VoicedCoda >> IDENT(voice)",
              "DEP >> MAX",
              "MAX >> DEP"
            ],
            answer: 1,
            explanation: "Only when the markedness constraint outranks IDENT(voice) is a voice change worth making."
          }
        ]
      }
    ]
  }
];

/* ========================================================================== */
/* PHONOLOGY ENGINE (pure JS)                                                 */
/* ========================================================================== */
// ENGINE-START
const strip = (t) => t.normalize("NFD").replace(/[\u0300-\u036f\u02b0-\u02ff]/g, "");
const DIPH = ["aɪ", "aʊ", "ʌɪ", "ɔɪ", "oʊ", "eɪ", "tʃ", "dʒ"];
const COMB = /[\u0300-\u036f\u02b0-\u02ff]/;

function tokenize(str) {
  const s = str.normalize("NFC").replace(/g/g, "ɡ").replace(/[ˈˌ.\s]/g, "");
  const chars = [...s];
  const out = [];
  for (let i = 0; i < chars.length; i++) {
    let c = chars[i];
    if (c === "+" || c === "#") { out.push(c); continue; }
    if (i + 1 < chars.length && DIPH.includes(c + chars[i + 1])) { c += chars[i + 1]; i++; }
    while (i + 1 < chars.length && COMB.test(chars[i + 1])) { c += chars[++i]; }
    out.push(c);
  }
  return out;
}

const VOWELS = "aeiouyɛɪɔɒʊʌæəɚɑɜɐøɨʉɯœɶɘɵɤɞ";
const isBoundary = (t) => t === "#" || t === "+";
const isV = (t) => !isBoundary(t) && VOWELS.includes([...strip(t)][0] || "");
const inList = (list) => (t) => list.includes(t) || list.includes(strip(t));
const MACROS = {
  V: isV,
  C: (t) => !isBoundary(t) && !isV(t),
  N: inList(["m", "n", "ŋ", "ɲ"]),
  S: inList(["s", "z", "ʃ", "ʒ", "tʃ", "dʒ"]),
  P: inList(["p", "t", "k", "f", "θ", "s", "ʃ", "tʃ", "x", "q"]),
  B: inList(["b", "d", "ɡ", "v", "ð", "z", "ʒ", "dʒ"]),
  L: inList(["l", "ɹ", "r"]),
};

function parseEl(s) {
  if (s === "#" || s === "+") return { k: s };
  if (s.length === 1 && MACROS[s]) return { k: "set", pred: MACROS[s] };
  if (s.startsWith("{") && s.endsWith("}")) {
    const items = s.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean).map((x) => {
      const t = tokenize(x);
      if (t.length !== 1) throw new Error(`"${x}" is not a single symbol`);
      return t[0];
    });
    if (!items.length) throw new Error("Empty set { }");
    return { k: "set", pred: inList(items), items };
  }
  const t = tokenize(s);
  if (t.length !== 1) throw new Error(`"${s}" must be one symbol, a class letter, or a set like {a,b}`);
  return { k: "set", pred: inList(t), items: t };
}

const EMPTY = ["∅", "Ø", "0"];
function parseRule(text) {
  const parts = text.split("/");
  if (parts.length > 2) throw new Error("Use a single “/” between the change and the environment");
  const ar = parts[0].split(/->|→|⟶|>/);
  if (ar.length !== 2) throw new Error("Write the change as  A -> B");
  const a = ar[0].trim();
  const b = ar[1].trim();
  if (!a) throw new Error("Missing the sound to change (or ∅ for insertion)");
  const insertion = EMPTY.includes(a);
  const target = insertion ? null : parseEl(a);
  let outs = [];
  if (!EMPTY.includes(b)) {
    if (!b) throw new Error("Missing the output (or ∅ for deletion)");
    outs = b.startsWith("{") ? parseEl(b).items : (() => {
      const t = tokenize(b);
      if (t.length !== 1) throw new Error(`Output "${b}" must be a single symbol or a set`);
      return t;
    })();
  }
  if (insertion && outs.length !== 1) throw new Error("An insertion needs exactly one output symbol");
  if (!insertion && target.items && outs.length > 1 && outs.length !== target.items.length)
    throw new Error("Output set must be the same size as the input set");
  if (!insertion && !target.items && outs.length > 1) throw new Error("A class letter can only map to one output symbol");
  let left = [], right = [];
  if (parts[1] !== undefined) {
    const halves = parts[1].split("_");
    if (halves.length !== 2) throw new Error("The environment needs exactly one “_” slot");
    left = halves[0].trim().split(/\s+/).filter(Boolean).map(parseEl);
    right = halves[1].trim().split(/\s+/).filter(Boolean).map(parseEl);
  }
  return { target, outs, left, right, insertion };
}

const matchTok = (el, tok) => {
  if (el.k === "#" || el.k === "+") return tok === el.k;
  return !isBoundary(tok) && el.pred(tok);
};

function applyRule(tokens, rule) {
  const n = tokens.length;
  const out = [];
  let changed = false;
  const left = (i) => {
    let p = i - 1;
    for (let e = rule.left.length - 1; e >= 0; e--) {
      const el = rule.left[e];
      if (el.k !== "+") while (p >= 0 && tokens[p] === "+") p--;
      if (p < 0 || !matchTok(el, tokens[p])) return false;
      p--;
    }
    return true;
  };
  const right = (j) => {
    let p = j;
    for (const el of rule.right) {
      if (el.k !== "+") while (p < n && tokens[p] === "+") p++;
      if (p >= n || !matchTok(el, tokens[p])) return false;
      p++;
    }
    return true;
  };
  const pick = (tok) => {
    if (!rule.outs.length) return null;
    if (rule.outs.length === 1) return rule.outs[0];
    const idx = rule.target.items.findIndex((it) => it === tok || it === strip(tok));
    return rule.outs[idx];
  };
  if (rule.insertion) {
    for (let i = 0; i < n; i++) {
      if (i > 0 && tokens[i] !== "+" && left(i) && right(i)) { out.push(rule.outs[0]); changed = true; }
      out.push(tokens[i]);
    }
    return { tokens: out, changed };
  }
  for (let i = 0; i < n; i++) {
    const tok = tokens[i];
    if (matchTok(rule.target, tok) && left(i) && right(i + 1)) {
      const r = pick(tok);
      if (r !== tok) changed = true;
      if (r !== null) out.push(r);
    } else out.push(tok);
  }
  return { tokens: out, changed };
}

function derive(ur, rules) {
  const base = ["#", ...tokenize(ur), "#"];
  let cur = base;
  const steps = [];
  rules.forEach((r) => {
    if (!r) { steps.push({ tokens: cur, status: "error" }); return; }
    const now = applyRule(cur, r);
    const onUR = applyRule(base, r).changed;
    const status = now.changed ? (onUR ? "applies" : "fed") : (onUR ? "bled" : "none");
    cur = now.tokens;
    steps.push({ tokens: cur, status });
  });
  return { base, steps, final: cur };
}
const showTokens = (tokens) => tokens.filter((t) => t !== "#").join("");
const surface = (tokens) => tokens.filter((t) => !isBoundary(t)).join("");
// ENGINE-END

/* ========================================================================== */
/* MARKDOWN-LITE RENDERER                                                     */
/* ========================================================================== */
const texToText = (s) =>
  s.replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\underline\{\\quad\}/g, "＿＿")
    .replace(/\\rightarrow/g, "→").replace(/\\Rightarrow/g, "⇒")
    .replace(/\\sigma/g, "σ").replace(/\\mu/g, "μ")
    .replace(/\\quad/g, " ").replace(/\\ /g, " ").replace(/\\\\/g, "")
    .replace(/\s+/g, " ").trim();

function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\$[^$]+\$|\*[^*\s][^*]*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**")) return <strong key={i} style={{ color: T.text }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("$")) return <span key={i} style={{ fontFamily: mathFont, fontStyle: "italic", color: T.cyan }}>{texToText(p.slice(1, -1))}</span>;
        if (p.startsWith("*")) return <em key={i}>{p.slice(1, -1)}</em>;
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
  );
}

function Md({ text }) {
  const blocks = [];
  let para = [];
  const flush = () => { if (para.length) { blocks.push({ t: "p", v: para.join(" ") }); para = []; } };
  text.trim().split("\n").forEach((l) => {
    if (!l.trim()) { flush(); return; }
    const li = l.match(/^(\s*)\* (.*)$/);
    if (li) { flush(); blocks.push({ t: "li", lvl: li[1].length >= 2 ? 1 : 0, v: li[2] }); return; }
    const d = l.trim().match(/^\$\$(.*)\$\$$/);
    if (d) { flush(); blocks.push({ t: "math", v: d[1] }); return; }
    para.push(l.trim());
  });
  flush();
  return (
    <div className="space-y-3" style={{ color: "#CBD5E1", lineHeight: 1.65, fontSize: 15 }}>
      {blocks.map((b, i) => {
        if (b.t === "math")
          return (
            <div key={i} className="text-center py-2 px-3 rounded-lg overflow-x-auto"
              style={{ background: T.panel2, fontFamily: mathFont, fontStyle: "italic", color: T.cyan, fontSize: 17 }}>
              {texToText(b.v)}
            </div>
          );
        if (b.t === "li")
          return (
            <div key={i} className="flex gap-2" style={{ paddingLeft: b.lvl * 18, marginTop: 6 }}>
              <span style={{ color: T.cyan }}>•</span>
              <div><Inline text={b.v} /></div>
            </div>
          );
        return <p key={i}><Inline text={b.v} /></p>;
      })}
    </div>
  );
}

/* ========================================================================== */
/* SHARED UI BITS                                                             */
/* ========================================================================== */
const Card = ({ children, style, className = "" }) => (
  <div className={`rounded-2xl p-4 ${className}`} style={{ background: T.panel, border: `1px solid ${T.line}`, ...style }}>{children}</div>
);
const Chip = ({ active, onClick, children, color = T.cyan }) => (
  <button onClick={onClick} className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap"
    style={{
      background: active ? color : T.panel2, color: active ? "#0F172A" : T.text,
      border: `1px solid ${active ? color : T.line}`, fontWeight: active ? 600 : 400,
    }}>
    {children}
  </button>
);
const IconBtn = ({ onClick, disabled, label, children }) => (
  <button onClick={onClick} disabled={disabled} aria-label={label}
    className="w-8 h-8 rounded-lg flex items-center justify-center"
    style={{ background: T.panel2, color: disabled ? "#475569" : T.text, border: `1px solid ${T.line}`, opacity: disabled ? 0.5 : 1 }}>
    {children}
  </button>
);
const ipa = { fontFamily: ipaFont };


function SupportCard() {
  const link = {
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
    padding: "12px 14px", borderRadius: 12, background: T.panel2, border: `1px solid ${T.line}`,
    color: T.text, textDecoration: "none", fontSize: 14,
  };
  return (
    <Card>
      <div className="font-semibold mb-1" style={{ color: T.text, fontSize: 15 }}>Support Phonemica</div>
      <p className="text-sm mb-3" style={{ color: T.mute, lineHeight: 1.5 }}>
        Follow the Facebook page for more, or buy me a coffee if the app helps your studies.
      </p>
      <div className="space-y-2">
        <a href="https://www.facebook.com/Factsbyexperiences" target="_blank" rel="noopener noreferrer" style={link}>
          <span>Follow on Facebook</span><ExternalLink size={16} color={T.cyan} />
        </a>
        <a href="https://paypal.me/afkharm" target="_blank" rel="noopener noreferrer" style={link}>
          <span className="flex items-center gap-2"><Coffee size={16} color={T.violet} /> Buy me a coffee</span>
          <ExternalLink size={16} color={T.cyan} />
        </a>
      </div>
    </Card>
  );
}

/* ========================================================================== */
/* LEARN TAB                                                                  */
/* ========================================================================== */
function Quiz({ ex, value, onPick }) {
  const answered = value !== undefined;
  const ok = value === ex.answer;
  return (
    <Card style={{ background: T.panel2 }}>
      <p className="mb-3" style={{ color: T.text, fontSize: 15, lineHeight: 1.5 }}>{ex.question}</p>
      <div className="space-y-2">
        {ex.options.map((o, i) => {
          const isPicked = value === i;
          const border = answered ? (i === ex.answer ? T.green : isPicked ? T.red : T.line) : T.line;
          return (
            <button key={i} disabled={answered} onClick={() => onPick(i)}
              className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2"
              style={{ background: T.panel, border: `1.5px solid ${border}`, color: T.text, fontSize: 14, ...ipa }}>
              <span className="flex-1">{o}</span>
              {answered && i === ex.answer && <Check size={16} color={T.green} />}
              {answered && isPicked && !ok && <X size={16} color={T.red} />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3 text-sm" style={{ color: ok ? T.green : T.red, lineHeight: 1.5 }}>
          <strong>{ok ? "Correct. " : "Not quite. "}</strong>
          <span style={{ color: "#CBD5E1" }}>{ex.explanation}</span>
          {!ok && (
            <button onClick={() => onPick(undefined)} className="block mt-2 underline" style={{ color: T.cyan }}>
              Try again
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

function Learn({ answers, setAnswers }) {
  const [openUnit, setOpenUnit] = useState("unit-1");
  const [lessonId, setLessonId] = useState(null);
  const flat = useMemo(() => phonologyData.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u }))), []);
  const isDone = (l) => l.exercises.every((ex, i) => answers[`${l.id}:${i}`] === ex.answer);
  const setAns = (lid, i, v) =>
    setAnswers((a) => { const n = { ...a }; if (v === undefined) delete n[`${lid}:${i}`]; else n[`${lid}:${i}`] = v; return n; });

  useEffect(() => { try { window.scrollTo(0, 0); } catch (e) { /* ignore */ } }, [lessonId]);

  if (lessonId) {
    const idx = flat.findIndex((l) => l.id === lessonId);
    const l = flat[idx];
    return (
      <div className="space-y-4">
        <button onClick={() => setLessonId(null)} className="flex items-center gap-1 text-sm" style={{ color: T.cyan }}>
          <ChevronLeft size={16} /> {l.unit.title}
        </button>
        <h2 style={{ fontSize: 22, lineHeight: 1.25, fontWeight: 700, color: T.text }}>{l.title}</h2>
        <Md text={l.content} />
        <div className="space-y-2">
          <div className="text-sm font-semibold" style={{ color: T.mute }}>Examples</div>
          {l.examples.map((e, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <div className="font-semibold mb-1" style={{ color: T.cyan, fontSize: 14 }}>{e.label}</div>
              <div className="whitespace-pre-line" style={{ ...ipa, color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>{e.detail}</div>
            </Card>
          ))}
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold" style={{ color: T.mute }}>Check yourself</div>
          {l.exercises.map((ex, i) => (
            <Quiz key={i} ex={ex} value={answers[`${l.id}:${i}`]} onPick={(v) => setAns(l.id, i, v)} />
          ))}
        </div>
        <div className="flex justify-between pt-2">
          <button disabled={idx === 0} onClick={() => setLessonId(flat[idx - 1].id)}
            className="px-4 py-2 rounded-xl text-sm flex items-center gap-1"
            style={{ background: T.panel2, color: idx === 0 ? "#475569" : T.text, border: `1px solid ${T.line}` }}>
            <ChevronLeft size={16} /> Previous
          </button>
          <button disabled={idx === flat.length - 1} onClick={() => setLessonId(flat[idx + 1].id)}
            className="px-4 py-2 rounded-xl text-sm flex items-center gap-1 font-semibold"
            style={{ background: idx === flat.length - 1 ? T.panel2 : T.cyan, color: idx === flat.length - 1 ? "#475569" : "#0F172A" }}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const total = flat.length;
  const doneCount = flat.filter(isDone).length;
  return (
    <div className="space-y-4">
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Course</h2>
        <p className="text-sm mt-1" style={{ color: T.mute }}>{doneCount} of {total} lessons completed</p>
        <div className="h-1.5 rounded-full mt-2" style={{ background: T.panel2 }}>
          <div className="h-1.5 rounded-full" style={{ width: `${(doneCount / total) * 100}%`, background: T.cyan, transition: "width .3s" }} />
        </div>
      </div>
      {phonologyData.map((u) => {
        const open = openUnit === u.id;
        const ud = u.lessons.filter(isDone).length;
        return (
          <Card key={u.id} style={{ padding: 0, overflow: "hidden" }}>
            <button onClick={() => setOpenUnit(open ? null : u.id)} className="w-full flex items-center gap-3 p-4 text-left">
              <div className="flex-1">
                <div className="font-semibold" style={{ color: T.text, fontSize: 15 }}>{u.title}</div>
                <div className="text-xs mt-0.5" style={{ color: T.mute }}>{ud}/{u.lessons.length} done</div>
              </div>
              <ChevronDown size={18} color={T.mute} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            {open && (
              <div style={{ borderTop: `1px solid ${T.line}` }}>
                {u.lessons.map((l) => (
                  <button key={l.id} onClick={() => setLessonId(l.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                    style={{ borderBottom: `1px solid ${T.line}` }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: isDone(l) ? T.green : "transparent", border: `1.5px solid ${isDone(l) ? T.green : T.line}` }}>
                      {isDone(l) && <Check size={12} color="#0F172A" />}
                    </span>
                    <span className="flex-1 text-sm" style={{ color: T.text }}>{l.title}</span>
                    <ChevronRight size={16} color={T.mute} />
                  </button>
                ))}
              </div>
            )}
          </Card>
        );
      })}
      <SupportCard />
    </div>
  );
}

/* ========================================================================== */
/* VOWEL / VOCAL TRACT TAB                                                    */
/* ========================================================================== */
// [ipa, height (0 close – 1 open), backness (0 front – 1 back), rounded]
const VOWEL_TABLE = [
  ["i", 0, 0, 0], ["y", 0, 0, 1], ["ɨ", 0, 0.5, 0], ["ʉ", 0, 0.5, 1], ["ɯ", 0, 1, 0], ["u", 0, 1, 1],
  ["ɪ", 0.2, 0.2, 0], ["ʊ", 0.2, 0.8, 1],
  ["e", 0.35, 0, 0], ["ø", 0.35, 0, 1], ["ɤ", 0.35, 1, 0], ["o", 0.35, 1, 1],
  ["ə", 0.55, 0.5, 0],
  ["ɛ", 0.65, 0, 0], ["œ", 0.65, 0, 1], ["ʌ", 0.65, 1, 0], ["ɔ", 0.65, 1, 1],
  ["æ", 0.82, 0.05, 0], ["a", 1, 0.1, 0], ["ɑ", 1, 1, 0], ["ɒ", 1, 1, 1],
];
const featOf = (h, b, r) => ({ high: h < 0.3, low: h > 0.8, back: b > 0.6, round: !!r });
const chartXY = (h, b) => {
  const xf = 20 + h * 40;
  return [xf + b * (180 - xf), 18 + h * 112];
};

function Mouth({ h, b, r }) {
  const px = 62 + b * 66;
  const py = 100 + h * 38;
  const gap = 8 + h * 30;
  const g = r ? gap * 0.55 : gap;
  const lx = r ? 16 : 26;
  const tongue = `M 52 168 C ${px - 34} ${py + 16}, ${px - 18} ${py}, ${px} ${py} C ${px + 22} ${py}, 138 ${py + 22}, 146 178 L 146 198 L 52 198 Z`;
  return (
    <svg viewBox="0 0 200 210" className="w-full" style={{ maxHeight: 230 }} role="img" aria-label="Vocal tract cross-section">
      <rect x="0" y="0" width="200" height="210" rx="16" fill="#111B31" />
      <path d="M 44 100 Q 92 56 152 82 L 152 30" stroke="#64748B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="152" y1="82" x2="152" y2="198" stroke="#334155" strokeWidth="3" />
      <path d={tongue} fill={T.cyan} opacity="0.85" style={{ transition: "d .15s" }} />
      <rect x={lx} y={132 - g / 2 - 12} width="22" height="12" rx="6" fill={T.violet} />
      <rect x={lx} y={132 + g / 2} width="22" height="12" rx="6" fill={T.violet} />
      <text x="100" y="24" textAnchor="middle" fontSize="9" fill={T.mute}>front ← → back</text>
    </svg>
  );
}

function Vowels() {
  const [h, setH] = useState(0);
  const [b, setB] = useState(0);
  const [r, setR] = useState(false);
  const [hl, setHl] = useState(null);
  const near = useMemo(() => {
    let best = null, bd = 9;
    VOWEL_TABLE.forEach((v) => {
      const d = Math.hypot(h - v[1], b - v[2]) + ((!!v[3]) !== r ? 0.3 : 0);
      if (d < bd) { bd = d; best = v; }
    });
    return best;
  }, [h, b, r]);
  const f = featOf(near[1], near[2], near[3]);
  const sign = (x) => (x ? "+" : "−");
  const matches = (v) => {
    if (!hl) return true;
    const ff = featOf(v[1], v[2], v[3]);
    const feat = hl.slice(1);
    return ff[feat] === (hl[0] === "+");
  };
  const FEATS = ["+high", "−high", "+low", "−low", "+back", "−back", "+round", "−round"].map((x) => x.replace("−", "-"));
  const set = (v) => { setH(v[1]); setB(v[2]); setR(!!v[3]); };
  const [cx, cy] = chartXY(h, b);

  return (
    <div className="space-y-4">
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Vowel space</h2>
        <p className="text-sm mt-1" style={{ color: T.mute }}>Move the tongue and lips and watch the features change.</p>
      </div>

      <Card>
        <div className="flex gap-4 items-center">
          <div style={{ width: "58%" }}><Mouth h={h} b={b} r={r} /></div>
          <div className="flex-1 text-center">
            <div style={{ ...ipa, fontSize: 56, lineHeight: 1, color: T.cyan }}>{near[0]}</div>
            <div className="mt-3 text-xs space-y-0.5" style={{ ...ipa, color: T.text }}>
              <div>[{sign(f.high)}high] [{sign(f.low)}low]</div>
              <div>[{sign(f.back)}back] [{sign(f.round)}round]</div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <label className="block text-sm" style={{ color: T.mute }}>
            Tongue height: {h < 0.3 ? "high" : h > 0.8 ? "low" : "mid"}
            <input type="range" min="0" max="1" step="0.01" value={h} onChange={(e) => setH(+e.target.value)} className="w-full" style={{ accentColor: T.cyan }} />
          </label>
          <label className="block text-sm" style={{ color: T.mute }}>
            Tongue backness: {b < 0.3 ? "front" : b > 0.7 ? "back" : "central"}
            <input type="range" min="0" max="1" step="0.01" value={b} onChange={(e) => setB(+e.target.value)} className="w-full" style={{ accentColor: T.cyan }} />
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: T.mute }}>Lips</span>
            <Chip active={!r} onClick={() => setR(false)}>spread</Chip>
            <Chip active={r} onClick={() => setR(true)} color={T.violet}>rounded</Chip>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-sm mb-2" style={{ color: T.mute }}>Tap a vowel, or pick a feature to light up its natural class.</div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {FEATS.map((x) => <Chip key={x} active={hl === x} onClick={() => setHl(hl === x ? null : x)}>{x}</Chip>)}
        </div>
        <svg viewBox="0 0 200 150" className="w-full mt-2">
          <path d="M 20 18 L 180 18 L 180 130 L 60 130 Z" fill="none" stroke={T.line} strokeWidth="1.5" />
          <line x1="40" y1="74" x2="180" y2="74" stroke={T.line} strokeDasharray="3 3" />
          <line x1="100" y1="18" x2="120" y2="130" stroke={T.line} strokeDasharray="3 3" />
          {VOWEL_TABLE.map((v) => {
            const [x, y] = chartXY(v[1], v[2]);
            const on = matches(v);
            const cur = v === near;
            return (
              <g key={v[0]} onClick={() => set(v)} style={{ cursor: "pointer", opacity: on ? 1 : 0.25 }}>
                <circle cx={x} cy={y} r="10" fill={v[3] ? T.violet : T.cyan} opacity="0.9" stroke={cur ? T.green : "none"} strokeWidth="2.5" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="#0F172A" style={{ fontFamily: ipaFont, fontWeight: 600 }}>{v[0]}</text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="14" fill="none" stroke={T.green} strokeDasharray="2 3" />
        </svg>
        <div className="flex gap-4 text-xs mt-1" style={{ color: T.mute }}>
          <span><span style={{ color: T.cyan }}>●</span> unrounded</span>
          <span><span style={{ color: T.violet }}>●</span> rounded</span>
        </div>
      </Card>
    </div>
  );
}

/* ========================================================================== */
/* DERIVE TAB                                                                 */
/* ========================================================================== */
const PRESETS = [
  {
    id: "plural", name: "English plural",
    desc: "Epenthesis feeds nothing here, but it bleeds voicing assimilation. Try swapping the rules.",
    words: ["bʌs+z", "kæt+z", "dɒɡ+z", "dɪʃ+z"],
    rules: [
      { name: "Epenthesis", text: "∅ -> ə / S _ S" },
      { name: "Voicing assimilation", text: "z -> s / P _" },
    ],
  },
  {
    id: "canadian", name: "Canadian raising",
    desc: "Raising applies before flapping (counter-bleeding). Swap them and 'writer' and 'rider' merge.",
    words: ["ɹaɪtɚ", "ɹaɪdɚ", "aɪs", "aɪz"],
    rules: [
      { name: "Raising", text: "aɪ -> ʌɪ / _ P" },
      { name: "Flapping", text: "{t,d} -> ɾ / V _ V" },
    ],
  },
  {
    id: "police", name: "Fast speech 'police'",
    desc: "Syncope creates the environment for liquid devoicing: a feeding order.",
    words: ["pəliːs", "kəlɛkt", "bəluːn"],
    rules: [
      { name: "Schwa syncope", text: "ə -> ∅ / P _ L" },
      { name: "Liquid devoicing", text: "l -> l̥ / P _" },
    ],
  },
  {
    id: "place", name: "Nasal place assimilation",
    desc: "The morpheme boundary + is transparent, so /n/ sees the consonant after it.",
    words: ["ɪn+pɒsəbəl", "ɪn+kəmplit", "ɪn+baləns", "ɪn+sɛnsɪtɪv"],
    rules: [
      { name: "Labial", text: "n -> m / _ {p,b}" },
      { name: "Velar", text: "n -> ŋ / _ {k,ɡ}" },
    ],
  },
  {
    id: "german", name: "German final devoicing",
    desc: "One rule with a paired set: each voiced obstruent maps to its voiceless partner.",
    words: ["raːd", "raːt", "taːɡ", "hʊnd", "hɪməl"],
    rules: [{ name: "Final devoicing", text: "{b,d,ɡ,v,z} -> {p,t,k,f,s} / _ #" }],
  },
  {
    id: "custom", name: "Sandbox",
    desc: "Write your own rules. Add words to test for unintended side effects.",
    words: ["lætɚ", "ædɚ", "kæt"],
    rules: [{ name: "Custom", text: "t -> ɾ / V _ V" }],
  },
];

const STATUS = {
  applies: { label: "applied", color: T.cyan, tip: "The rule found its target in the right environment and changed the form." },
  fed: { label: "fed", color: T.green, tip: "This rule would not have applied to the underlying form. An earlier rule created its environment (feeding)." },
  bled: { label: "bled", color: T.violet, tip: "This rule could have applied to the underlying form, but an earlier rule destroyed its environment (bleeding)." },
  none: { label: "no change", color: T.mute, tip: "Nothing in the form matched this rule's target and environment." },
  error: { label: "check rule", color: T.red, tip: "This rule could not be read, so it was skipped." },
};

let uid = 0;
const mkRules = (arr) => arr.map((r) => ({ ...r, id: `r${++uid}` }));

function Derive() {
  const [pid, setPid] = useState("plural");
  const preset = PRESETS.find((p) => p.id === pid);
  const [rules, setRules] = useState(() => mkRules(PRESETS[0].rules));
  const [ur, setUr] = useState(PRESETS[0].words[0]);
  const [openStep, setOpenStep] = useState(null);

  const choose = (p) => { setPid(p.id); setRules(mkRules(p.rules)); setUr(p.words[0]); setOpenStep(null); };
  const parsed = useMemo(() => rules.map((r) => { try { return { rule: parseRule(r.text) }; } catch (e) { return { error: e.message }; } }), [rules]);
  const run = (w) => derive(w, parsed.map((p) => p.rule || null));
  const d = useMemo(() => run(ur), [ur, parsed]); // eslint-disable-line
  const words = preset.words.includes(ur) || !ur.trim() ? preset.words : [...preset.words, ur];

  const move = (i, dir) => setRules((rs) => { const n = [...rs]; const j = i + dir; if (j < 0 || j >= n.length) return rs; [n[i], n[j]] = [n[j], n[i]]; return n; });
  const upd = (i, text) => setRules((rs) => rs.map((r, k) => (k === i ? { ...r, text } : r)));
  const del = (i) => setRules((rs) => rs.filter((_, k) => k !== i));
  const add = () => setRules((rs) => [...rs, { id: `r${++uid}`, name: "Custom", text: "" }]);

  return (
    <div className="space-y-4">
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Derivations</h2>
        <p className="text-sm mt-1" style={{ color: T.mute }}>Run an underlying form through ordered rewrite rules.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {PRESETS.map((p) => <Chip key={p.id} active={pid === p.id} onClick={() => choose(p)}>{p.name}</Chip>)}
      </div>
      <p className="text-sm" style={{ color: "#CBD5E1", lineHeight: 1.5 }}>{preset.desc}</p>

      <Card>
        <div className="text-sm mb-2" style={{ color: T.mute }}>Underlying form</div>
        <div className="flex items-center gap-2">
          <span style={{ ...ipa, color: T.mute, fontSize: 20 }}>/</span>
          <input value={ur} onChange={(e) => setUr(e.target.value)} spellCheck={false}
            className="flex-1 px-3 py-2 rounded-xl min-w-0"
            style={{ ...ipa, fontSize: 18, background: T.bg, color: T.text, border: `1px solid ${T.line}` }} />
          <span style={{ ...ipa, color: T.mute, fontSize: 20 }}>/</span>
        </div>
        <div className="flex gap-2 overflow-x-auto mt-3 pb-1">
          {words.map((w) => (
            <button key={w} onClick={() => setUr(w)} className="px-3 py-1 rounded-lg text-sm whitespace-nowrap"
              style={{ ...ipa, background: ur === w ? T.panel2 : "transparent", color: T.text, border: `1px solid ${ur === w ? T.cyan : T.line}` }}>
              {w}
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold" style={{ color: T.mute }}>Rules, applied top to bottom</div>
          <button onClick={() => choose(preset)} className="flex items-center gap-1 text-xs" style={{ color: T.cyan }}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
        {rules.map((r, i) => (
          <Card key={r.id} style={{ padding: 12 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-1 text-xs" style={{ color: T.violet }}>{i + 1}. {r.name}</span>
              <IconBtn label="Move rule up" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp size={15} /></IconBtn>
              <IconBtn label="Move rule down" onClick={() => move(i, 1)} disabled={i === rules.length - 1}><ArrowDown size={15} /></IconBtn>
              <IconBtn label="Delete rule" onClick={() => del(i)}><Trash2 size={15} /></IconBtn>
            </div>
            <input value={r.text} onChange={(e) => upd(i, e.target.value)} spellCheck={false} placeholder="A -> B / C _ D"
              className="w-full px-3 py-2 rounded-xl"
              style={{ ...ipa, fontSize: 16, background: T.bg, color: T.text, border: `1px solid ${parsed[i].error ? T.red : T.line}` }} />
            {parsed[i].error && <div className="text-xs mt-1.5" style={{ color: T.red }}>{parsed[i].error}</div>}
          </Card>
        ))}
        <button onClick={add} className="w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5"
          style={{ border: `1.5px dashed ${T.line}`, color: T.cyan }}>
          <Plus size={16} /> Add rule
        </button>
        <details className="text-sm" style={{ color: T.mute }}>
          <summary className="cursor-pointer py-1">Rule syntax</summary>
          <div className="mt-1 space-y-1" style={{ ...ipa, lineHeight: 1.6 }}>
            <div>Format: <span style={{ color: T.text }}>A -&gt; B / C _ D</span> (spaces between environment items)</div>
            <div>Classes: V vowel, C consonant, N nasal, S sibilant, P voiceless obstruent, B voiced obstruent, L liquid</div>
            <div>Sets: <span style={{ color: T.text }}>{"{p,t,k}"}</span>. A set on both sides maps item by item: <span style={{ color: T.text }}>{"{b,d} -> {p,t}"}</span></div>
            <div>∅ means nothing (insertion or deletion). # is a word edge. + is a morpheme edge that other symbols ignore unless you write it.</div>
          </div>
        </details>
      </div>

      <div>
        <div className="text-sm font-semibold mb-2" style={{ color: T.mute }}>Derivation (tap a step for the reason)</div>
        <div className="relative pl-7">
          <div className="absolute" style={{ left: 9, top: 10, bottom: 10, width: 2, background: T.line }} />
          <div className="relative mb-3">
            <span className="absolute rounded-full" style={{ left: -24, top: 8, width: 12, height: 12, background: T.text }} />
            <div className="px-3 py-2 rounded-xl" style={{ ...ipa, background: T.panel, border: `1px solid ${T.line}`, fontSize: 18, color: T.text }}>
              /{showTokens(d.base)}/ <span className="text-xs" style={{ color: T.mute, fontFamily: uiFont }}>underlying</span>
            </div>
          </div>
          {d.steps.map((s, i) => {
            const st = STATUS[s.status];
            const open = openStep === i;
            return (
              <div key={i} className="relative mb-3">
                <span className="absolute rounded-full" style={{ left: -24, top: 8, width: 12, height: 12, background: st.color }} />
                <button onClick={() => setOpenStep(open ? null : i)} className="w-full text-left px-3 py-2 rounded-xl"
                  style={{ background: T.panel, border: `1px solid ${open ? st.color : T.line}` }}>
                  <div className="flex items-center gap-2">
                    <span className="flex-1" style={{ ...ipa, fontSize: 18, color: T.text }}>{showTokens(s.tokens)}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: st.color, color: "#0F172A", fontWeight: 600 }}>{st.label}</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: T.mute }}>{rules[i].name}: <span style={ipa}>{rules[i].text}</span></div>
                  {open && <div className="text-sm mt-2" style={{ color: "#CBD5E1", lineHeight: 1.5 }}>{st.tip}</div>}
                </button>
              </div>
            );
          })}
          <div className="relative">
            <span className="absolute rounded-full" style={{ left: -24, top: 8, width: 12, height: 12, background: T.green }} />
            <div className="px-3 py-2 rounded-xl" style={{ ...ipa, background: T.panel2, border: `1.5px solid ${T.green}`, fontSize: 20, color: T.green }}>
              [{surface(d.final)}] <span className="text-xs" style={{ color: T.mute, fontFamily: uiFont }}>surface</span>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="text-sm font-semibold mb-2" style={{ color: T.mute }}>All test words</div>
        <div className="space-y-1">
          {words.filter((w) => w.trim()).map((w) => (
            <div key={w} className="flex items-center gap-2" style={{ ...ipa, fontSize: 16, color: T.text }}>
              <span className="flex-1">/{w}/</span>
              <span style={{ color: T.mute }}>→</span>
              <span className="flex-1 text-right" style={{ color: T.green }}>[{surface(run(w).final)}]</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ========================================================================== */
/* OPTIMALITY THEORY TAB                                                      */
/* ========================================================================== */
const OT_SETS = [
  {
    id: "devoice", name: "German devoicing", input: "/raːd/",
    note: "Markedness above IDENT(voice) gives German. Put IDENT(voice) first for an English-like language.",
    cons: [
      { id: "vc", name: "*VoicedCoda", kind: "M" },
      { id: "dep", name: "DEP", kind: "F" },
      { id: "max", name: "MAX", kind: "F" },
      { id: "id", name: "IDENT(voice)", kind: "F" },
    ],
    cands: [
      { form: "[raːt]", v: { id: 1 } },
      { form: "[raːd]", v: { vc: 1 } },
      { form: "[raːdə]", v: { dep: 1 } },
      { form: "[raː]", v: { max: 1 } },
    ],
    order: ["vc", "dep", "max", "id"],
  },
  {
    id: "school", name: "'school' repair", input: "/skuːl/",
    note: "Spanish repairs /sC/ onsets by inserting a vowel. Put *#sC last to get English.",
    cons: [
      { id: "sc", name: "*#sC", kind: "M" },
      { id: "max", name: "MAX", kind: "F" },
      { id: "dep", name: "DEP", kind: "F" },
    ],
    cands: [
      { form: "[skuːl]", v: { sc: 1 } },
      { form: "[eskuːl]", v: { dep: 1 } },
      { form: "[kuːl]", v: { max: 1 } },
    ],
    order: ["sc", "max", "dep"],
  },
  {
    id: "plural", name: "English plural", input: "/bʌs+z/",
    note: "Try DEP above MAX: the language deletes the suffix instead of inserting a vowel.",
    cons: [
      { id: "ss", name: "*SibSib", kind: "M" },
      { id: "max", name: "MAX", kind: "F" },
      { id: "dep", name: "DEP", kind: "F" },
      { id: "id", name: "IDENT(voice)", kind: "F" },
    ],
    cands: [
      { form: "[bʌsz]", v: { ss: 1 } },
      { form: "[bʌss]", v: { ss: 1, id: 1 } },
      { form: "[bʌsəz]", v: { dep: 1 } },
      { form: "[bʌs]", v: { max: 1 } },
    ],
    order: ["ss", "max", "dep", "id"],
  },
];

function evalOT(cands, order) {
  let alive = cands.map((_, i) => i);
  const elimAt = cands.map(() => Infinity);
  const fatal = cands.map(() => -1);
  order.forEach((cid, k) => {
    if (alive.length <= 1) return;
    const vs = alive.map((i) => cands[i].v[cid] || 0);
    const m = Math.min(...vs);
    const next = [];
    alive.forEach((i, j) => { if (vs[j] > m) { elimAt[i] = k; fatal[i] = k; } else next.push(i); });
    alive = next;
  });
  return { winners: alive, elimAt, fatal };
}

function OT() {
  const [sid, setSid] = useState("devoice");
  const set = OT_SETS.find((s) => s.id === sid);
  const [order, setOrder] = useState(OT_SETS[0].order);
  const choose = (s) => { setSid(s.id); setOrder(s.order); };
  const res = useMemo(() => evalOT(set.cands, order), [set, order]);
  const rows = useMemo(() => {
    const idx = set.cands.map((_, i) => i);
    idx.sort((a, b) => {
      const wa = res.winners.includes(a) ? 1 : 0, wb = res.winners.includes(b) ? 1 : 0;
      if (wa !== wb) return wb - wa;
      const ea = res.elimAt[a], eb = res.elimAt[b];
      if (ea !== eb) return eb - ea;
      return a - b;
    });
    return idx;
  }, [set, res]);
  const conOf = (id) => set.cons.find((c) => c.id === id);
  const mv = (k, dir) => setOrder((o) => { const n = [...o]; const j = k + dir; if (j < 0 || j >= n.length) return o; [n[k], n[j]] = [n[j], n[k]]; return n; });
  const isDefault = order.join() === set.order.join();

  return (
    <div className="space-y-4">
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T.text }}>Tableaux</h2>
        <p className="text-sm mt-1" style={{ color: T.mute }}>Re-rank the constraints with the arrows and watch the winner change.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {OT_SETS.map((s) => <Chip key={s.id} active={sid === s.id} onClick={() => choose(s)}>{s.name}</Chip>)}
      </div>

      <Card style={{ padding: 12 }}>
        <div className="flex items-center justify-between mb-2">
          <div style={{ ...ipa, fontSize: 20, color: T.text }}>{set.input}</div>
          <button onClick={() => setOrder(set.order)} disabled={isDefault} className="flex items-center gap-1 text-xs"
            style={{ color: isDefault ? "#475569" : T.cyan }}>
            <RotateCcw size={13} /> Reset ranking
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 300 }}>
            <thead>
              <tr>
                <th className="text-left p-1" style={{ color: T.mute, fontWeight: 400, fontSize: 12 }}>Candidates</th>
                {order.map((cid, k) => {
                  const c = conOf(cid);
                  return (
                    <th key={cid} className="p-1 align-top" style={{ borderLeft: k === 0 ? `1px solid ${T.line}` : `1px dashed ${T.line}`, minWidth: 74 }}>
                      <div style={{ ...ipa, fontSize: 12, color: c.kind === "M" ? T.violet : T.cyan, fontWeight: 600, lineHeight: 1.2 }}>{c.name}</div>
                      <div className="flex justify-center gap-1 mt-1">
                        <IconBtn label={`Rank ${c.name} higher`} onClick={() => mv(k, -1)} disabled={k === 0}><ChevronLeft size={14} /></IconBtn>
                        <IconBtn label={`Rank ${c.name} lower`} onClick={() => mv(k, 1)} disabled={k === order.length - 1}><ChevronRight size={14} /></IconBtn>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => {
                const cand = set.cands[i];
                const win = res.winners.includes(i);
                return (
                  <tr key={cand.form} style={{ background: win ? "rgba(34,197,94,0.12)" : "transparent", borderTop: `1px solid ${T.line}` }}>
                    <td className="p-2" style={{ ...ipa, fontSize: 16, color: win ? T.green : T.text, whiteSpace: "nowrap" }}>
                      {win ? "☞ " : ""}{cand.form}
                    </td>
                    {order.map((cid, k) => {
                      const n = cand.v[cid] || 0;
                      const dead = k > res.elimAt[i];
                      const fat = k === res.fatal[i];
                      let txt = "";
                      if (n) txt = fat ? "*".repeat(n - 1) + "*!" : "*".repeat(n);
                      return (
                        <td key={cid} className="text-center p-2"
                          style={{
                            ...ipa, fontSize: 16, borderLeft: k === 0 ? `1px solid ${T.line}` : `1px dashed ${T.line}`,
                            background: dead ? "rgba(148,163,184,0.15)" : "transparent",
                            color: fat ? T.red : dead ? "#64748B" : T.text, fontWeight: fat ? 700 : 400,
                          }}>
                          {txt}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="text-center" style={{ ...ipa, fontSize: 18, color: T.green }}>
        {res.winners.length === 1 ? `Optimal output: ${set.cands[res.winners[0]].form}` : `Tie: ${res.winners.map((i) => set.cands[i].form).join(" and ")}`}
      </div>
      <p className="text-sm" style={{ color: "#CBD5E1", lineHeight: 1.5 }}>{set.note}</p>
      <div className="flex gap-4 text-xs" style={{ color: T.mute }}>
        <span><span style={{ color: T.violet }}>■</span> markedness</span>
        <span><span style={{ color: T.cyan }}>■</span> faithfulness</span>
        <span><span style={{ color: T.red }}>*!</span> fatal violation</span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* APP SHELL                                                                  */
/* ========================================================================== */
const TABS = [
  { id: "learn", label: "Learn", Icon: BookOpen },
  { id: "vowels", label: "Vowels", Icon: Mic },
  { id: "derive", label: "Derive", Icon: GitBranch },
  { id: "ot", label: "OT", Icon: TableIcon },
];

export default function App() {
  const [tab, setTab] = useState("learn");
  const [answers, setAnswers] = useState({});
  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: uiFont }}>
      <style>{`
        button:focus-visible, input:focus-visible, summary:focus-visible { outline: 2px solid ${T.cyan}; outline-offset: 2px; }
        input[type=range] { height: 28px; }
        ::-webkit-scrollbar { height: 0; width: 0; }
      `}</style>
      <header className="max-w-xl mx-auto px-4 pt-5 pb-2">
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Phonem<span style={{ color: T.cyan, ...ipa }}>ɪ</span>ca
        </div>
      </header>
      <main className="max-w-xl mx-auto px-4 pt-3 pb-28">
        {tab === "learn" && <Learn answers={answers} setAnswers={setAnswers} />}
        {tab === "vowels" && <Vowels />}
        {tab === "derive" && <Derive />}
        {tab === "ot" && <OT />}
      </main>
      <nav className="fixed bottom-0 left-0 right-0" style={{ background: "rgba(15,23,42,0.96)", borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-xl mx-auto flex">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)} className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
              style={{ color: tab === id ? T.cyan : T.mute }} aria-current={tab === id ? "page" : undefined}>
              <Icon size={20} />
              <span style={{ fontSize: 12, fontWeight: tab === id ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
