import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import Result from "./popup/Result";

import { Link } from "react-router-dom";

const { REACT_APP_API_ENDPOINT } = process.env;

function Home() {
  const paragraphsEnglish = [
    "The wise owl perched atop the ancient oak, its eyes glowing like golden orbs in the moonlight, watched silently as the nocturnal creatures emerged from their hidden realms. The silent whispers of the leaves told tales of unseen worlds, weaving a symphony of secrets untold.",
    "In a realm where dragons soared above, their scales shimmering in the sun's embrace, a lone knight ventured into the unknown, his armor clinking softly. The air was ripe with the fragrance of the myriad of flowers that danced in the gentle breeze, whispering secrets of valor and magic.",
    "The endless cascade of binary data flowed like a digital river through the labyrinth of circuits and transistors. The computer hummed softly, its artificial intelligence contemplating the vastness of human experience and the myriad mysteries of the universe, unbounded by time.",
    "A solitary beacon illuminated the boundless ocean, its rays dancing upon the water like a waltz of light. The waves, whispering stories of distant lands and ancient civilizations, cradled the vessels of explorers in their eternal embrace, guiding them through the labyrinth of the sea.",
    "Amidst the echoes of time, ancient monuments stood as guardians of history, their stones etched with the wisdom of bygone eras. The sun's golden embrace breathed life into the shadows, unveiling the forgotten tales of valor and the eternal dance of light and darkness.",
    "The velvet curtain of the night was adorned with the diamonds of the cosmos, each twinkling star a beacon in the vastness of the universe. The whispers of the celestial symphony filled the infinite space, weaving the tapestry of time and the eternal dance of the galaxies.",
    "In the serene embrace of the forest, the symphony of nature unfolded, the leaves whispering secrets of the ancient earth. The creatures of the woodlands danced in the dappled sunlight, their footsteps a melody in the eternal song of the wilderness.",
    "The silvery strands of the spider's web danced in the morning breeze, each delicate thread glistening with the tears of dawn. The forest awoke in a symphony of light, the leaves whispering tales of the nocturnal ballet and the eternal dance of the shadows.",
    "The boundless expanse of the desert whispered tales of ancient civilizations, its sands the keepers of forgotten secrets. The winds danced amongst the dunes, their melodies a symphony of the eternal and the transient, weaving the song of the sands.",
    "The whispering winds of autumn danced through the golden leaves, telling tales of harvests and feasts. The air was ripe with the fragrance of ripened fruits and the gentle hum of the world preparing for the embrace of winter's chill.",
    "In the boundless fields of the cosmos, stars danced in celestial harmony, their light the symphony of eternity. Each twinkling note told tales of worlds unseen and the eternal dance of light and darkness, woven into the fabric of the universe.",
    "The labyrinth of the mind is a realm of infinite possibilities, its corridors adorned with the tapestries of thoughts and emotions. The dance of neurons painted the canvas of consciousness with the myriad hues of experiences, weaving the symphony of self.",
    "The ancient tome lay open, its pages whispering tales of arcane wisdom and forgotten spells. The air was heavy with the fragrance of aged parchment and the echoes of the incantations that had once danced through the hallowed halls of the sanctum.",
    "The enigma of the ocean depths whispered secrets of hidden realms and ancient leviathans. The dance of the waves was a symphony of the mysterious and the known, the surface a veil between worlds, each ripple a note in the song of the sea.",
    "The city slept under the veil of the night, its heartbeat a symphony of dreams and whispers. The shadows danced amongst the towering buildings, the moonlight painting the canvas of the urban jungle with the hues of silence and solitude.",
    "In the realm of dreams, the landscapes of the imagination unfolded in a dance of shadows and light. The air was heavy with the fragrance of unseen flowers and the echoes of laughter that resonated through the corridors of the mind.",
    "The boundless sky whispered tales of adventurous spirits and winged marvels. The clouds danced in the embrace of the winds, their shapes morphing into the echoes of the dreams of the earthbound, each wisp a note in the symphony of the heavens.",
    "The realm of the mystical was a tapestry of ancient spells and enchanted lands, its fabric woven with the threads of wonder and awe. The air was ripe with the fragrance of magical herbs and the soft murmur of the elements, each whisper a secret of the arcane.",
    "The golden sands of time flowed through the ancient hourglass, each grain a whisper of the eternal dance of the ages. The air was filled with the echoes of civilizations risen and fallen, each shadow a tale of glory and ruin, woven into the fabric of history.",
    "The eternal dance of the celestial bodies painted the canvas of the cosmos with the hues of time and space. The whispers of the galaxies unfolded in a symphony of light and darkness, each twinkling star a note in the song of the universe.",
  ];

  const paragraphsFrench = [
    "Le soleil se couchait à l'horizon, colorant le ciel de teintes orangées et pourpres. Les oiseaux retournaient à leurs nids, chantant des mélodies douces.",
    "Dans le petit village au bord de la mer, les pêcheurs rangeaient leurs filets, préparant leurs bateaux pour le lendemain. La brise salée caressait leurs visages fatigués.",
    "Juliette marchait le long du boulevard, les lumières de la ville brillant autour d'elle. Chaque pas racontait une histoire, chaque coin de rue évoquait un souvenir.",
    "Le château, perché sur la colline, dominait le paysage. Ses tours anciennes et ses murs en pierre racontaient des histoires d'amour, de trahison et de bravoure.",
    "La forêt était un sanctuaire de paix et de tranquillité. Les arbres s'élevaient fièrement, leurs feuilles murmurant les secrets de la nature.",
    "Au cœur de Paris, la Seine serpentait avec grâce, reflétant les lumières de la ville. Les amoureux marchaient le long des quais, main dans la main.",
    "L'odeur du pain frais s'échappait de la boulangerie, attirant les passants. Chaque croissant, chaque baguette racontait l'histoire du boulanger et de son art.",
    "Dans le musée, les tableaux racontaient l'histoire de générations d'artistes. Les couleurs, les formes et les textures évoquaient des émotions intenses.",
    "La montagne se dressait majestueusement, couverte de neige. Les skieurs descendaient les pistes avec enthousiasme, laissant derrière eux des traces éphémères.",
    "La pluie tombait doucement sur les toits de la ville. Les gouttes d'eau jouaient une mélodie apaisante, berçant les rêves de ceux qui écoutaient.",
    "Chaque fleur dans le jardin avait une histoire à raconter. Les roses rouges parlaient d'amour passionné, tandis que les marguerites évoquaient l'innocence.",
    "Les enfants couraient dans le parc, leurs rires résonnant dans l'air frais du printemps. Le carrousel tournait sans cesse, portant avec lui des rêves de jeunesse.",
    "Les étoiles scintillaient dans le ciel nocturne, chacune d'elles étant une énigme de l'univers. Les astronomes les observaient avec curiosité, cherchant à percer leurs secrets.",
    "Le marché était animé de conversations et de marchandage. Les étals débordaient de fruits, de légumes et de spécialités locales.",
    "Le vin vieillissait doucement dans la cave, attendait patiemment le moment où il serait dégusté. Chaque bouteille racontait l'histoire de la vigne et du vigneron.",
    "Le chat se prélassait au soleil, profitant de chaque rayon. Il étirait ses pattes et ronronnait de contentement, sans souci du monde.",
    "Le festival remplissait les rues de musique, de danse et de couleur. Les gens célébraient, oubliant leurs soucis et se laissant emporter par la joie.",
    "Le moulin à vent se dressait fièrement dans le champ, ses ailes tournant au gré du vent. Il était le gardien des récoltes et des saisons.",
    "La bibliothèque était un trésor de connaissances. Chaque livre était une porte vers un autre monde, une invitation à l'aventure et à la découverte.",
    "L'automne transformait le paysage en une palette de couleurs vives. Les feuilles tombaient en tourbillonnant, annonçant l'arrivée du froid hivernal.",
  ];

  const paragraphsSpanish = [
    "Durante mis vacaciones, visité el pequeño pueblo de Ronda en España. Las vistas desde el puente eran simplemente impresionantes y la historia del lugar me cautivó.",
    "Los mercados en México están llenos de colores vibrantes. Puedes encontrar todo, desde frutas frescas hasta tejidos tradicionales, y el ambiente es simplemente electrizante.",
    "En la tranquilidad de la sierra, hay un pequeño refugio donde los viajeros pueden desconectar del mundo y disfrutar de la naturaleza en su estado más puro.",
    "El flamenco es mucho más que un simple baile; es una expresión profunda del alma andaluza. Ver una actuación en vivo puede ser una experiencia verdaderamente conmovedora.",
    "Cada vez que miro el horizonte desde la costa, me pierdo en el inmenso azul del océano. Es un recordatorio constante de lo vasto y misterioso que es nuestro mundo.",
    "Barcelona es una mezcla fascinante de lo antiguo y lo nuevo. Mientras paseas por sus calles, es posible que te encuentres con una iglesia gótica justo al lado de un rascacielos moderno.",
    "Mi abuela solía contarme historias de su juventud, de tiempos más simples, donde la vida giraba en torno a la familia, el trabajo y la comunidad.",
    "Durante las fiestas, las calles de Madrid se llenan de vida. Las luces brillan por todas partes, y la música y la risa resuenan en cada esquina.",
    "Hay un pequeño café en el corazón de Buenos Aires donde los poetas y músicos se reúnen para compartir sus obras. Es un rincón mágico que parece detenido en el tiempo.",
    "El río Amazonas es una maravilla de la naturaleza. Viajar a lo largo de sus aguas te brinda una perspectiva completamente diferente de la vida y el medio ambiente.",
    "El tango es el alma de Argentina. Es más que un baile; es una historia de pasión, amor y nostalgia.",
    "Caminar por las calles empedradas de Antigua, Guatemala, es como viajar atrás en el tiempo. Cada edificio y cada callejón tienen su propia historia que contar.",
    "Los atardeceres en el Caribe son algo que nunca olvidarás. El cielo se tiñe de tonos anaranjados y rojos, mientras el sol se hunde lentamente en el mar.",
    "El arte de tejer ha sido pasado de generación en generación en los Andes. Las técnicas tradicionales han sido preservadas y todavía se pueden ver en los mercados locales.",
    "La comida mexicana es una explosión de sabores y texturas. Desde los picantes tacos hasta el dulce churro, hay algo para satisfacer a todos los paladares.",
    "La ciudad de Machu Picchu, perdida en lo alto de las montañas, es un testimonio del ingenio y la perseverancia del pueblo inca.",
    "Durante el Día de los Muertos en México, las familias se reúnen para recordar y honrar a sus seres queridos que han fallecido. Es una celebración llena de color, música y amor.",
    "La selva del Yucatán esconde muchos secretos. Entre ellos, antiguas ciudades mayas que una vez fueron el epicentro de una civilización floreciente.",
    "El arte callejero en Valparaíso, Chile, es una manifestación de la creatividad y la resistencia del pueblo. Cada mural cuenta una historia y refleja la identidad de la comunidad.",
    "La Patagonia es un lugar de belleza salvaje y prístina. Desde sus imponentes montañas hasta sus vastos lagos, es un paraíso para los amantes de la naturaleza.",
  ];

  const sentencesEnglish = [
    "The moonlight danced on the tranquil sea.",
    "Leaves whispered secrets in a gentle breeze.",
    "The clock ticked away, echoing in silence.",
    "Clouds painted the sky with shadows and light.",
    "The city skyline glittered in the night.",
    "The mountain stood majestic against the skyline.",
    "The cat prowled silently through the grass.",
    "Raindrops played a sweet melody on the roof.",
    "The candle flame flickered in the darkness.",
    "Sunset painted the horizon in vibrant hues.",
    "The waves embraced the shore tenderly.",
    "The stars were diamonds in the night sky.",
    "The book held the echo of forgotten words.",
    "The deer leapt through the silent forest.",
    "The music wove a tapestry of emotion.",
    "The garden was a symphony of colors.",
    "The wind sang a lullaby through the trees.",
    "The shadows held whispers of ancient secrets.",
    "The snowflakes danced in the winter air.",
    "The flowers bloomed in a rainbow of colors.",
  ];

  const sentencesFrench = [
    "Les oiseaux chantent dès l'aube.",
    "Marie prépare des crêpes pour le petit déjeuner.",
    "La Seine traverse la belle ville de Paris.",
    "Chaque hiver, nous allons skier dans les Alpes.",
    "Les chiens sont les meilleurs amis de l'homme.",
    "J'adore lire des romans au clair de lune.",
    "La musique apporte la joie dans nos cœurs.",
    "Les vendredis soir, nous allons souvent au cinéma.",
    "La vie est pleine de surprises inattendues.",
    "La tour Eiffel est le symbole de Paris.",
    "Les enfants jouent dans la cour pendant la récréation.",
    "Les raisins mûrissent sous le soleil d'été.",
    "Elle adore voyager et découvrir de nouvelles cultures.",
    "Il est important de toujours dire la vérité.",
    "La beauté de la nature m'inspire tous les jours.",
    "Le chocolat est ma gourmandise préférée.",
    "La famille est le pilier de la société.",
    "La poésie exprime les émotions de l'âme.",
    "J'aimerais visiter la Provence au printemps.",
    "Le football est le sport le plus populaire en France.",
  ];

  const sentencesSpanish = [
    "Los pájaros cantan al amanecer.",
    "María prepara tortitas para el desayuno.",
    "El río Sena atraviesa la hermosa ciudad de París.",
    "Cada invierno, vamos a esquiar en los Alpes.",
    "Los perros son los mejores amigos del hombre.",
    "Me encanta leer novelas a la luz de la luna.",
    "La música trae alegría a nuestros corazones.",
    "Los viernes por la noche, solemos ir al cine.",
    "La vida está llena de sorpresas inesperadas.",
    "La Torre Eiffel es el símbolo de París.",
    "Los niños juegan en el patio durante el recreo.",
    "Las uvas maduran bajo el sol del verano.",
    "A ella le encanta viajar y descubrir nuevas culturas.",
    "Es importante decir siempre la verdad.",
    "La belleza de la naturaleza me inspira todos los días.",
    "El chocolate es mi golosina favorita.",
    "La familia es el pilar de la sociedad.",
    "La poesía expresa las emociones del alma.",
    "Me gustaría visitar la Provenza en primavera.",
    "El fútbol es el deporte más popular en España.",
  ];

  const paragraphsByLanguage = {
    English: paragraphsEnglish,
    French: paragraphsFrench,
    Spanish: paragraphsSpanish,
  };

  const sentencesByLanguage = {
    English: sentencesEnglish,
    French: sentencesFrench,
    Spanish: sentencesSpanish,
  };

  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [placeholder, setPlaceholder] = React.useState(
    `Click here to start typing...  ⌨️`
  );

  const [width, setWidth] = useState(window.innerWidth);

  const [randText, setRandText] = React.useState([]);
  const [randWholeText, setRandWholeText] = React.useState([]);
  const [gameover, setGameover] = React.useState(false);
  const inputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const activeSpan = useRef(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );
  const [text, setText] = useState(`paragraphs${language}`);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [started, setStarted] = useState(false);

  const [wpm, setWpm] = useState(0);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);

    const activeLanguageMap =
      width < 767 ? sentencesByLanguage : paragraphsByLanguage;

    const newTextValue = activeLanguageMap[language];

    setText(newTextValue);
  }, [language, width]);

  useEffect(() => {
    inputRef.current.focus();

    if (text.length) {
      const rand = Math.floor(Math.random() * text.length);
      setRandText(text[rand].split(""));
      setRandWholeText(text[rand]);
    }
  }, [text]);

  useEffect(() => {
    if (activeSpan.current) {
      activeSpan.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [index]);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (gameover) {
      const finalScore = calculateScore();
      console.log("Final Score:", finalScore);
      setScore(finalScore); // Update the state for displaying in the UI

      // Directly submit the calculated score
      submitWpm(finalScore);
    }
  }, [gameover, randText, elapsedTime]);

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const submitWpm = async () => {
    try {
      const userId = localStorage.getItem("user");
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      console.log("Submitting Score:", score);

      const response = await axios.post(
        `${REACT_APP_API_ENDPOINT}/update/${userId}`,
        { score: score },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response Data:", response.data);
      setSubmit(true);
    } catch (error) {
      console.error("Error submitting score:", error.response || error);
    }
  };

  const handleInput = (e) => {
    if (!started) setStarted(true);

    setPlaceholder("");
    setPlaceholder("");
    if (index + 1 <= randText.length - 1) {
      setGameover(false);
      setShowPopup(false);
    } else {
      setGameover(true);
      if (submit === false) {
        submitWpm();
      }
      setShowPopup(true);
      setStarted(false);
    }

    if (gameover === false) {
      if (e.target.value === randText[index]) {
        setCorrect(correct + 1);
        setIndex(index + 1);
      } else {
        setIncorrect(incorrect + 1);
        setIndex(index + 1);
        setIncorrectIndices([...incorrectIndices, index]);
      }
    }

    document.getElementById("input-area").value = "";
  };

  const getClassName = (i) => {
    let className = "";

    if (language === "Chinese") {
      className += "letter chinese";
    } else {
      className += "letter";
    }

    if (i < index) {
      className += incorrectIndices.includes(i) ? " incorrect" : " correct";
    } else if (i === index) {
      className += " current";
    } else {
      className += " others";
    }
    return className;
  };

  const calculateWPM = () => {
    const totalChars = randText.join("").length;
    const words = totalChars / 5;
    const minutes = elapsedTime / 60000;
    setWpm(words / minutes);
    return minutes ? words / minutes : 0;
  };

  const [score, setScore] = useState(0);

  const calculateAccuracy = () => {
    const totalChars = randText.join("").length;
    return (correct / totalChars) * 100;
  };

  const calculateScore = () => {
    const rawWpm = calculateWPM();
    const accuracy = calculateAccuracy();
    return rawWpm * (accuracy / 100);
  };

  return (
    <div className="Home">
      <Header />
      {showPopup && (
        <Result
          setShowPopup={setShowPopup}
          time={formatTime(elapsedTime)}
          correct={correct}
          incorrect={incorrect}
          accuracy={Number((correct / randText.length) * 100).toFixed(2)}
          wpm={wpm}
          score={score.toFixed(2)}
        />
      )}

      <div className="language-btn-div">
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg language"
          onChange={(e) => {
            setLanguage(e.target.value);
            localStorage.setItem("language", e.target.value);
            window.location.reload();
          }}
          value={language}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>

      <div className="text-area">
        <div className="timer">{formatTime(elapsedTime)}</div>

        {randText.map((letter, i) => (
          <span
            key={i}
            ref={i === index ? activeSpan : null}
            className={getClassName(i)}
          >
            {letter}
          </span>
        ))}

        <div className="input-area">
          <input
            type="text"
            onChange={handleInput}
            id="input-area"
            ref={inputRef}
            placeholder={placeholder}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
