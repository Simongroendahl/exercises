"use strict";
const texts = {
  de: {
    texts: [
      { text: "Das Bot", location: ".header" },
      { text: "Das Ro-Bot", location: ".footer" },
      { text: "Ein Boot ist eine wilde Art zu reisen.", location: ".contentText"},
    ],
  },
  da: {
    texts: [
      { text: "Båden", location: ".header" },
      { text: "Robotten", location: ".footer" },
      { text: "En båd er en vild måde at rejse på.", location: ".contentText"},
    ],
  },
  ro: {
    texts: [
      { text: "Barca", location: ".header" },
      { text: "Robotul", location: ".footer" },
      { text: "O barcă este un mod sălbatic de a călători.", location: ".contentText"},
    ],
}
};

const locale = "da";

const sprogSelektor = document.getElementById('sprogValg');

        // Function to update the text based on selected language
        function opdaterSprog(sprog) {
            const sprogTekst = texts[sprog].texts;

            sprogTekst.forEach(item => {
                const sprogValg = document.querySelector(item.location);
                if (sprogValg) {
                    sprogValg.textContent = item.text;
                }
            });
        }

        // Event listener som lytter efter ændringer i dropdown menuen.
        sprogSelektor.addEventListener('change', (nytSprog) => {
            opdaterSprog(nytSprog.target.value);
        });

        // Opsætter dansk som det første sprog på sitet.
        opdaterSprog(locale);