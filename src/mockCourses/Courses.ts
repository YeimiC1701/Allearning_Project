import { StaticImageData } from 'next/image';
import curso1 from '../../public/images/curso1.jpg';
import curso2 from '../../public/images/curso2.jpg';
import curso3 from '../../public/images/curso3.jpg';
import curso4 from '../../public/images/curso4.jpg';
import curso5 from '../../public/images/curso5.jpg';

export type Exercise = {
  type: 'multiple-choice' | 'true-false' | 'open-ended' | 'fill-in-the-blank';
  question: string;
  options?: string[];
  answer: string | boolean;
  hint?: string; // Añade esta línea para definir la propiedad hint
};

export type SubLesson = {
  title: string;
  isVideoContent?: boolean; // Añadir esta línea para indicar si el contenido es un video
  videoUrl?: string; // La URL del video de YouTube
  content?: string;
  image?: string;
  exercises: Exercise[];
};

export type Tema = {
  nombre: string;
  duracion: string;
  subLessons: SubLesson[];
};

export type Course = {
  id: string;
  name: string;
  author: string;
  time: string;
  rating: number;
  icon: string | StaticImageData; // Ajustar el tipo de icon para aceptar StaticImageData
  progress?: number; // Asegúrate de que esta propiedad exista
  temas: Tema[];
};

export const courses: Course[] = [
  
  {
    id: "1",
    name: "Nivel Principiante",
    author: "Básico",
    time: "2h 30min",
    rating: 4.9,
    icon: curso1,
    temas: [


      {
        nombre: "Saludos y Despedidas",
        duracion: "30min",
        subLessons: [
          {
            title: "¿Como saludo y me despido en ingles?",
            content: "\n\nObjetivo: Aprender los saludos y despedidas más comunes en inglés, y cómo usarlos en situaciones cotidianas.\n\nVocabulario clave:\n- Saludos:\n  - Hello – Hola\n  - Hi – Hola (más informal)\n  - Good morning – Buenos días\n  - Good afternoon – Buenas tardes\n  - Good evening – Buenas noches (al saludar)\n\n- Despedidas:\n  - Goodbye – Adiós\n  - Bye – Adiós (informal)\n  - Good night – Buenas noches (al despedirse)\n  - See you later – Nos vemos luego\n  - Take care – Cuídate\n\n1. Introducción: Explica la importancia de los saludos y despedidas, y muestra imágenes asociando gestos con palabras.\n\n2. Ejemplos de diálogo:\n- Ejemplo 1:\n  Teacher: Hello!\n  Child: Hello!\n  Teacher: How are you?\n  Child: I'm good, thank you. Goodbye!\n  Teacher: Goodbye!\n- Ejemplo 2:\n  Teacher: Good morning!\n  Child: Good morning!\n  Teacher: See you later!\n  Child: See you later!\n\n3. Canción de saludos y despedidas:\n\"Hello, Hello, Goodbye\"\n(Melodía de “Twinkle, Twinkle, Little Star”)\nHello, hello, how are you?\nI am fine, and how are you?\nGoodbye, goodbye, see you soon.\nSee you later, bye bye too!\n\n4. Actividad interactiva: Juego de roles. Los niños actúan diferentes situaciones usando saludos y despedidas.\n\n5. Ejercicio visual: Empareja el saludo o despedida correcto con la imagen.\n\n6. Actividad creativa: Colorear hojas con imágenes de personas saludando y despidiéndose.\n\n7. Cierre: Repaso los saludos y despedidas aprendidos, haciendo preguntas a los niños como '¿Qué decimos cuando llegamos en la mañana?' (Good morning!).\n",
            image: 'https://previews.123rf.com/images/flint01/flint011510/flint01151000119/46156543-ilustraci%C3%B3n-vectorial-de-ni%C3%B1os-de-los-ni%C3%B1os-caminando-a-la-escuela-y-un-saludo.jpg',
            exercises: [
              {
                type: 'multiple-choice',
                question: '¿Cómo se dice "Hola" en ingles?',
                options: ['Good', 'Bye', 'Hola', 'Hello'],
                answer: 'Hello'
              },
              {
                type: 'true-false',
                question: 'Good Morning ¿Significa "Buenos días"?',
                answer: true
              },
              {
                type: 'open-ended',
                question: '¿Cómo se dice adiós en ingles?',
                answer: 'Goodbye',
                hint: 'La respuesta empieza con "Good"...'
              },
              {
                type: 'fill-in-the-blank',
                question: 'Para decir "Te veo despues" en ingles, debemos de decir: _____ you latter.',
                answer: 'see'
              }
            ]
          }
        ]
      },

      {
        nombre: "Colores y números",
        duracion: "30min",
        subLessons: [
          {
            title: "Aprendamos juntos los colores y números en ingles...",
            content: "Objetivo: Aprender los colores básicos y los números del 1 al 10 en inglés, a través de actividades interactivas.\n\nVocabulario clave:\n- Colores:\n  - Red – Rojo\n  - Blue – Azul\n  - Green – Verde\n  - Yellow – Amarillo\n  - Orange – Naranja\n  - Purple – Morado\n  - Black – Negro\n  - White – Blanco\n\n- Números (1-10):\n  1 – One\n  2 – Two\n  3 – Three\n  4 – Four\n  5 – Five\n  6 – Six\n  7 – Seven\n  8 – Eight\n  9 – Nine\n  10 – Ten\n\n1. Introducción: Presenta los colores y los números con tarjetas o imágenes. Los niños repiten en voz alta después del profesor.\n\n2. Actividad: Canción de los colores y números.\n- Canción de los números (Melodía de “Ten Little Indians”):\n  One, two, three, four, five, six, seven,\n  Eight, nine, ten, let's count again!\n\n- Canción de los colores (Melodía de “Twinkle, Twinkle, Little Star”):\n  Red, blue, green, and yellow too,\n  Orange, purple, white, and black,\n  So many colors we can see,\n  Learning colors is fun for me!\n\n3. Juego interactivo: Juego de memoria. Los niños emparejan tarjetas de colores con el nombre correcto o tarjetas con números.\n\n4. Actividad creativa: Los niños colorean dibujos usando los colores que aprendieron, y cuentan los objetos en la imagen.\n\n5. Ejercicio de asociación: Los niños ven una imagen con varios objetos de colores y deben contar cuántos hay de cada color (ejemplo: '¿Cuántos globos rojos ves?').\n\n6. Cierre: Repasa los colores y los números con preguntas simples como '¿De qué color es esto?' y '¿Cuántos son?'.\n",
            image: 'https://i.pinimg.com/474x/bf/be/d9/bfbed9adee310a5901b26e56ea7ab7d5.jpg',
            exercises: [
              {
                type: 'multiple-choice',
                question: '¿Cómo se dice amarillo en ingles?',
                options: ['Red', 'Green', 'Verdeishon', 'Yellow'],
                answer: 'Yellow'
              },
              {
                type: 'true-false',
                question: 'El nueve en ingles se dice "None".',
                answer: false
              },
              {
                type: 'open-ended',
                question: 'Cómo se dice negro en ingles',
                answer: 'Black"',
                hint: 'Tal vez empieze con Bl y termine con ck...'
              },
              {
                type: 'fill-in-the-blank',
                question: '¿Qué numero falta en la secuencia? One, two, three, ____, five, six, seven...',
                answer: 'four'
              }
            ]
          }
        ]
      },

      {
        nombre: "Animales",
        duracion: "30min",
        subLessons: [
          {
            title: "Identifiquemos a los animales en ingles...",
            content: "Objetivo: Aprender los nombres de animales comunes en inglés, asociando las palabras con imágenes y sonidos.\n\nVocabulario clave:\n- Animales:\n  - Dog – Perro\n  - Cat – Gato\n  - Bird – Pájaro\n  - Fish – Pez\n  - Cow – Vaca\n  - Horse – Caballo\n  - Elephant – Elefante\n  - Lion – León\n\n1. Introducción: Muestra imágenes de los animales y di sus nombres en inglés. Los niños repiten cada palabra en voz alta.\n\n2. Actividad: Imitación de sonidos. Los niños escuchan los sonidos de los animales (ejemplo: el ladrido de un perro) y deben adivinar qué animal es, luego decir su nombre en inglés.\n\n3. Canción de los animales:\n- Canción: (Melodía de “Old MacDonald Had a Farm”):\n  Old MacDonald had a farm,\n  E-I-E-I-O,\n  And on that farm, he had a cow,\n  E-I-E-I-O,\n  With a moo moo here,\n  And a moo moo there...\n\n4. Juego interactivo: Juego de memoria. Los niños deben emparejar imágenes de los animales con sus nombres en inglés.\n\n5. Actividad creativa: Los niños dibujan o colorean los animales que han aprendido y escriben sus nombres en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Qué animal hace miau?' o '¿Cómo se dice perro en inglés?' y deja que los niños respondan.\n\n7. Cierre: Repaso de los animales aprendidos con tarjetas y sonidos. Los niños deben señalar la tarjeta correcta cuando escuchen el nombre o el sonido del animal.\n",
            image: 'https://i.pinimg.com/originals/d9/bb/9f/d9bb9fbb1b8540385d581db9db00f0bc.jpg',
            exercises: [
              {
                type: 'multiple-choice',
                question: '¿Cómo se dice perro en ingles?',
                options: ['Dog', 'Cat', 'Snake', 'Wof'],
                answer: 'Dog'
              },
              {
                type: 'true-false',
                question: 'El animal "Cat", ¿Come pasto, es de color blanco con manchas negras hace el sonido de ¡MUUU!?',
                answer: false
              },
              {
                type: 'open-ended',
                question: '¿Cómo se llama el animal que vive en el agua?',
                answer: 'Fish',
                hint: 'Todos lo conocemos, empieza con "Fis...", pero es todo lo que sé.'
              },
              {
                type: 'fill-in-the-blank',
                question: 'Es mi mascota, es un perro llamado Firus, pero en ingles este animal es un ___...',
                answer: 'Dog'
              }
            ]
          }
        ]
      },

      {
        nombre: "La familia",
        duracion: "30min",
        subLessons: [
          {
            title: "Ellos son mi familia...",
            content: "Objetivo: Aprender los nombres de los miembros de la familia en inglés y cómo usarlos en oraciones sencillas.\n\nVocabulario clave:\n- Miembros de la familia:\n  - Father – Padre\n  - Mother – Madre\n  - Brother – Hermano\n  - Sister – Hermana\n  - Grandfather – Abuelo\n  - Grandmother – Abuela\n  - Uncle – Tío\n  - Aunt – Tía\n  - Cousin – Primo/Prima\n\n1. Introducción: Muestra imágenes de una familia y nombra cada miembro en inglés. Los niños repiten cada palabra en voz alta.\n\n2. Ejemplos de frases:\n  - This is my father – Este es mi padre\n  - She is my sister – Ella es mi hermana\n  - He is my grandfather – Él es mi abuelo\n\n3. Canción de la familia:\n- Canción: (Melodía de “The Finger Family”):\n  Daddy finger, daddy finger, where are you?\n  Here I am, here I am, how do you do?\n  Mommy finger, mommy finger, where are you?\n  Here I am, here I am, how do you do?\n\n4. Juego interactivo: Los niños eligen imágenes de miembros de la familia y dicen su nombre en inglés. El profesor puede preguntar '¿Quién es él/ella?' y los niños responden 'He is my brother' o 'She is my aunt'.\n\n5. Actividad creativa: Los niños dibujan a su familia y etiquetan a cada miembro con su nombre en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice madre en inglés?' o '¿Cómo se llama el hermano en inglés?' para que los niños respondan.\n\n7. Cierre: Repaso con tarjetas de los miembros de la familia. Los niños deben señalar la tarjeta correcta cuando escuchan el nombre en inglés y decir la palabra en voz alta.\n",
            image: 'https://i.ytimg.com/vi/n3mLzOYtUOU/maxresdefault.jpg',
            exercises: [
              {
                type: 'multiple-choice',
                question: '¿Quien es la persona que te dice "Hijo"?',
                options: ['Sister', 'Aunt', 'Mother', 'Son'],
                answer: 'Mother'
              },
              {
                type: 'true-false',
                question: 'Primo en ingles, ¿Se dice Cousin?',
                answer: true
              },
              {
                type: 'open-ended',
                question: '¿Cómo se le llama al papa de mi mama o al papa de mi papa en ingles?',
                answer: 'Grandfather',
                hint: 'Se parece mucho al como dices papa en ingles, pero deberias agregar en alguna parte un Grand...'
              },
              {
                type: 'fill-in-the-blank',
                question: 'Es como mi hermano, pero mujer, entonces en ingles es mi ____',
                answer: 'Sister'
              }
            ]
          }
        ]
      },

      {
        nombre: "Partes del cuerpo",
        duracion: "30min",
        subLessons: [
          {
            title: "¿Cuales son las partes de mi cuerpo?",
            content: "Objetivo: Aprender los nombres de las partes básicas del cuerpo en inglés y usarlas en oraciones simples.\n\nVocabulario clave:\n- Partes del cuerpo:\n  - Head – Cabeza\n  - Eyes – Ojos\n  - Ears – Orejas\n  - Nose – Nariz\n  - Mouth – Boca\n  - Arms – Brazos\n  - Hands – Manos\n  - Legs – Piernas\n  - Feet – Pies\n\n1. Introducción: Muestra imágenes de las partes del cuerpo y di su nombre en inglés. Los niños repiten después de ti.\n\n2. Ejemplos de frases:\n  - This is my head – Esta es mi cabeza\n  - These are my eyes – Estos son mis ojos\n  - I have two hands – Tengo dos manos\n\n3. Canción de las partes del cuerpo:\n- Canción: (Melodía de “Head, Shoulders, Knees, and Toes”):\n  Head, shoulders, knees, and toes,\n  Knees and toes,\n  Head, shoulders, knees, and toes,\n  Knees and toes,\n  Eyes and ears and mouth and nose,\n  Head, shoulders, knees, and toes,\n  Knees and toes.\n\n4. Juego interactivo: Señala una parte del cuerpo y pregunta a los niños '¿Qué es esto?' para que respondan 'It’s my nose' o 'It’s my hand'.\n\n5. Actividad creativa: Los niños dibujan una figura humana y etiquetan las partes del cuerpo con sus nombres en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice manos en inglés?' o '¿Dónde están tus ojos?' para que los niños señalen y digan las palabras.\n\n7. Cierre: Repaso de las partes del cuerpo con tarjetas. Los niños deben tocar la parte del cuerpo correcta cuando escuchan el nombre en inglés y decir la palabra en voz alta.\n",
            image: 'https://lingokids.com/wp-content/uploads/2020/04/parts-of-the-body-english-for-kids-lingokids-1024x806.png',
            exercises: [
              {
                type: 'multiple-choice',
                question: 'Yo tengo un par de ellos, y son por los que puedo ver ... En ingles, ¿Cómo se les llama?',
                options: ['Ears', 'Heads', 'Eyes', 'Nose'],
                answer: 'Python'
              },
              {
                type: 'true-false',
                question: 'Cabeza en ingles, ¿Se dice "feet"?',
                answer: false
              },
              {
                type: 'open-ended',
                question: '¿Cómo se dice nariz en ingles?',
                answer: 'Nose',
                hint: '¿Lo sabes? Si no lo sabes, entonces esa es la respuesta...'
              },
              {
                type: 'fill-in-the-blank',
                question: 'Yo tengo unas ____ para escuchar, aunque en ingles les llaman "Ears"',
                answer: 'Orejas'
              }
            ]
          }
        ]
      },

      {
        nombre: "Comida",
        duracion: "30min",
        subLessons: [
          {
            title: "Escogere alguna comida...",
            content: "Objetivo: Aprender los nombres de alimentos comunes en inglés y usarlos en oraciones sencillas.\n\nVocabulario clave:\n- Comidas:\n  - Apple – Manzana\n  - Banana – Plátano\n  - Bread – Pan\n  - Cheese – Queso\n  - Chicken – Pollo\n  - Fish – Pescado\n  - Rice – Arroz\n  - Salad – Ensalada\n  - Milk – Leche\n  - Water – Agua\n\n1. Introducción: Muestra imágenes de diferentes alimentos y di sus nombres en inglés. Los niños repiten cada palabra en voz alta.\n\n2. Ejemplos de frases:\n  - I like apples – Me gustan las manzanas\n  - Do you like cheese? – ¿Te gusta el queso?\n  - I am eating chicken – Estoy comiendo pollo\n\n3. Canción sobre comidas:\n- Canción: (Melodía de “Twinkle, Twinkle, Little Star”):\n  Apples, bananas, cheese, and bread,\n  Milk and water, let’s be fed,\n  Rice and chicken, fish and more,\n  Healthy foods we do adore!\n\n4. Juego interactivo: Juego de memoria. Los niños deben emparejar imágenes de los alimentos con sus nombres en inglés.\n\n5. Actividad creativa: Los niños dibujan o colorean sus comidas favoritas y escriben los nombres en inglés debajo de cada dibujo.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice plátano en inglés?' o '¿Qué estás comiendo?' para que los niños respondan.\n\n7. Cierre: Repaso de los alimentos aprendidos. Usa tarjetas y pide a los niños que digan el nombre del alimento que vean en la imagen.\n",
            image: 'https://lingokids.com/wp-content/uploads/2020/11/20192F122F102F142F302F472Fcd5603f3-ddd6-4e2b-9b35-739a96bfad352FFood_1.png',
            exercises: [
              {
                type: 'multiple-choice',
                question: '¿Cómo se llama esa fruta que es amarilla y tiene una cascara que vamos pelando?',
                options: ['Banana', 'Bread', 'Apple', 'Taco'],
                answer: 'Python'
              },
              {
                type: 'true-false',
                question: '¿Las vas producen "Water"?',
                answer: false
              },
              {
                type: 'open-ended',
                question: 'Yo amo la leche y el pan, leche se dice "Milk", pero ¿Cómo se dice pan?',
                answer: 'Bread',
                hint: 'Te dare una pista, empeiza con "Br" y termina con "ead"'
              },
              {
                type: 'fill-in-the-blank',
                question: 'A mi me encanta la pizza, porque esta lleva ____, que se derrite sobre el pan.',
                answer: 'Chesee'
              }
            ]
          }
        ]
      }

    ]
  },


  {
    id: "2",
    name: "Nivel Intermedio",
    author: "Básico",
    time: "2h 30min",
    rating: 4.9,
    icon: curso1,
    temas: [


      {
        nombre: "Mi Casa",
        duracion: "30min",
        subLessons: [
          {
            title: "Hogar dulce hogar...",
            content: "Objetivo: Aprender los nombres de las habitaciones y objetos comunes de la casa en inglés y cómo usarlos en oraciones simples.\n\nVocabulario clave:\n- Habitaciones de la casa:\n  - Living room – Sala\n  - Kitchen – Cocina\n  - Bedroom – Dormitorio\n  - Bathroom – Baño\n  - Dining room – Comedor\n\n- Objetos comunes:\n  - Table – Mesa\n  - Chair – Silla\n  - Bed – Cama\n  - Door – Puerta\n  - Window – Ventana\n\n1. Introducción: Muestra imágenes de las habitaciones y objetos de la casa. Di sus nombres en inglés y haz que los niños repitan cada palabra en voz alta.\n\n2. Ejemplos de frases:\n  - This is the kitchen – Esta es la cocina\n  - I sleep in the bedroom – Yo duermo en el dormitorio\n  - The table is in the dining room – La mesa está en el comedor\n\n3. Canción sobre la casa:\n- Canción: (Melodía de “The Wheels on the Bus”):\n  The table in the house goes tap, tap, tap,\n  Tap, tap, tap,\n  Tap, tap, tap,\n  The table in the house goes tap, tap, tap,\n  All day long!\n\n4. Juego interactivo: Los niños eligen imágenes de las habitaciones y objetos, y deben decir su nombre en inglés. El profesor puede preguntar '¿Dónde duermes?' y los niños deben responder 'In the bedroom'.\n\n5. Actividad creativa: Los niños dibujan su casa y etiquetan las habitaciones y algunos objetos con sus nombres en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice cocina en inglés?' o '¿Dónde está la puerta?' para que los niños respondan señalando o diciendo la palabra correcta.\n\n7. Cierre: Repaso de las habitaciones y objetos aprendidos con tarjetas. Los niños deben señalar y nombrar lo que ven en la imagen en inglés.\n",
            image: 'https://img.freepik.com/vector-gratis/vista-frontal-mini-casa-muchos-ninos-sobre-fondo-blanco_1308-76076.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'cama' en inglés?",
                options: ["Chair", "Table", "Bed", "Door"],
                answer: "Bed"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estos objetos se encuentra en la cocina?",
                options: ["Sofa", "Refrigerator", "Bed", "TV"],
                answer: "Refrigerator"
              },
              {
                type: "true-false",
                question: "¿La palabra 'window' significa ventana?",
                answer: true
              },
              {
                type: "true-false",
                question: "'Living room' significa 'cocina' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'puerta' en inglés?",
                answer: "Door",
                hint: "La respuesta empieza con 'D'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'mesa' en inglés, debemos de decir: ______.",
                answer: "table"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la 'sala de estar' se dice: ______ room.",
                answer: "living"
              }
            ]
          }
        ]
      },

      {
        nombre: "Ropa",
        duracion: "30min",
        subLessons: [
          {
            title: "¿Qué me pondre hoy...?",
            content: "Objetivo: Aprender los nombres de las prendas de vestir en inglés y cómo usarlos en oraciones simples.\n\nVocabulario clave:\n- Prendas de vestir:\n  - Shirt – Camisa\n  - Pants – Pantalones\n  - Dress – Vestido\n  - Shoes – Zapatos\n  - Hat – Sombrero\n  - Socks – Calcetines\n  - Jacket – Chaqueta\n  - Skirt – Falda\n\n1. Introducción: Muestra imágenes de diferentes prendas de ropa y di sus nombres en inglés. Los niños repiten cada palabra en voz alta.\n\n2. Ejemplos de frases:\n  - I am wearing a hat – Estoy usando un sombrero\n  - She has a red dress – Ella tiene un vestido rojo\n  - He is putting on his shoes – Él se está poniendo sus zapatos\n\n3. Canción sobre la ropa:\n- Canción: (Melodía de “If You're Happy and You Know It”):\n  If you're wearing a shirt, clap your hands,\n  If you're wearing a shirt, clap your hands,\n  If you're wearing a shirt, and you really want to show it,\n  If you're wearing a shirt, clap your hands!\n\n4. Juego interactivo: Los niños deben señalar o mostrar la prenda que están usando y decir su nombre en inglés. Por ejemplo, el profesor pregunta '¿Quién está usando una camisa?' y el niño debe decir 'I am wearing a shirt'.\n\n5. Actividad creativa: Los niños dibujan su ropa favorita y escriben los nombres de las prendas en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice zapatos en inglés?' o '¿Qué llevas puesto?' para que los niños respondan correctamente.\n\n7. Cierre: Repaso de las prendas de vestir aprendidas con tarjetas o mostrando ropa real. Los niños deben decir el nombre en inglés y asociarlo con lo que están usando o viendo.\n",
            image: 'https://img.freepik.com/vector-premium/ninos-dibujos-animados-invierno-primavera-verano-ropa-otono-chaqueta-acolchada-pantalones-camisa-sandalias-trajes-ninos-conjunto-ilustraciones-vectoriales-ropa-temporada-bebe-temporada-ropa-invierno-primavera_229548-2109.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'camisa' en inglés?",
                options: ["Hat", "Pants", "Shirt", "Shoes"],
                answer: "Shirt"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estas prendas usas en los pies?",
                options: ["Socks", "Jacket", "T-shirt", "Hat"],
                answer: "Socks"
              },
              {
                type: "true-false",
                question: "La palabra 'pants' significa 'pantalones'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Skirt' significa 'zapatos' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'sombrero' en inglés?",
                answer: "Hat",
                hint: "La respuesta empieza con 'H'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'zapatos' en inglés, debemos de decir: ______.",
                answer: "shoes"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la palabra para 'falda' es: ______.",
                answer: "skirt"
              }
            ]
          }
        ]
      },

      {
        nombre: "Acciones comunes",
        duracion: "30min",
        subLessons: [
          {
            title: "Algunas acciones comunes...",
            content: "Objetivo: Aprender los nombres de acciones comunes en inglés y cómo usarlas en oraciones simples.\n\nVocabulario clave:\n- Acciones comunes:\n  - Run – Correr\n  - Walk – Caminar\n  - Jump – Saltar\n  - Eat – Comer\n  - Drink – Beber\n  - Sleep – Dormir\n  - Read – Leer\n  - Write – Escribir\n  - Sing – Cantar\n  - Dance – Bailar\n\n1. Introducción: Muestra imágenes o videos cortos de personas realizando diferentes acciones y di el nombre de la acción en inglés. Los niños repiten cada palabra en voz alta.\n\n2. Ejemplos de frases:\n  - I like to run – Me gusta correr\n  - She is eating an apple – Ella está comiendo una manzana\n  - He can jump very high – Él puede saltar muy alto\n\n3. Canción sobre acciones comunes:\n- Canción: (Melodía de “The Hokey Pokey”):\n  You run to the front, you run to the back,\n  You jump up and down, and then you clap,\n  You walk to the left, you walk to the right,\n  That’s how we move all day!\n\n4. Juego interactivo: Juego de mímica. El profesor dice una acción en inglés y los niños deben realizar la acción correspondiente. Ejemplo: 'Jump!' y los niños saltan.\n\n5. Actividad creativa: Los niños dibujan a alguien haciendo una de las acciones y escriben el verbo en inglés debajo del dibujo.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice correr en inglés?' o '¿Qué acción estás haciendo ahora?' para que los niños respondan correctamente.\n\n7. Cierre: Repaso de las acciones aprendidas. Usa tarjetas o realiza las acciones tú mismo y pide a los niños que nombren la acción en inglés.\n",
            image: 'https://img.freepik.com/vector-gratis/nina-haciendo-tarea-libros-sobre-fondo-blanco_1308-104637.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'correr' en inglés?",
                options: ["Run", "Jump", "Walk", "Swim"],
                answer: "Run"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estas acciones significa 'leer' en inglés?",
                options: ["Eat", "Read", "Write", "Sleep"],
                answer: "Read"
              },
              {
                type: "true-false",
                question: "La palabra 'jump' significa 'saltar'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Swim' significa 'caminar' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'escribir' en inglés?",
                answer: "Write",
                hint: "La respuesta empieza con 'W'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'caminar' en inglés, debemos de decir: ______.",
                answer: "walk"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la acción de 'dormir' se dice: ______.",
                answer: "sleep"
              }
            ]
          }
        ]
      },

      {
        nombre: "Dias de la semana y meses",
        duracion: "30min",
        subLessons: [
          {
            title: "¿Qué dia es hoy?",
            content: "Objetivo: Aprender los nombres de los días de la semana y los meses del año en inglés, y cómo usarlos en oraciones simples.\n\nVocabulario clave:\n- Días de la semana:\n  - Monday – Lunes\n  - Tuesday – Martes\n  - Wednesday – Miércoles\n  - Thursday – Jueves\n  - Friday – Viernes\n  - Saturday – Sábado\n  - Sunday – Domingo\n\n- Meses del año:\n  - January – Enero\n  - February – Febrero\n  - March – Marzo\n  - April – Abril\n  - May – Mayo\n  - June – Junio\n  - July – Julio\n  - August – Agosto\n  - September – Septiembre\n  - October – Octubre\n  - November – Noviembre\n  - December – Diciembre\n\n1. Introducción: Muestra un calendario y señala los días de la semana y los meses del año. Di sus nombres en inglés y pide a los niños que repitan en voz alta.\n\n2. Ejemplos de frases:\n  - Today is Monday – Hoy es lunes\n  - My birthday is in July – Mi cumpleaños es en julio\n  - I go to school on Friday – Voy a la escuela el viernes\n\n3. Canción sobre los días de la semana:\n- Canción: (Melodía de “The Addams Family”):\n  Days of the week (snap, snap),\n  Days of the week (snap, snap),\n  Days of the week, days of the week, days of the week (snap, snap),\n  There’s Monday and there’s Tuesday,\n  There’s Wednesday and there’s Thursday,\n  There’s Friday and there’s Saturday,\n  And then comes Sunday!\n\n4. Juego interactivo: Usa tarjetas con los nombres de los días o meses, mezcla las tarjetas y pide a los niños que las coloquen en el orden correcto. Luego, pregunta '¿Qué día es hoy?' o '¿En qué mes estamos?'.\n\n5. Actividad creativa: Los niños dibujan un calendario y etiquetan los días de la semana y los meses en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice lunes en inglés?' o '¿Cuántos días tiene la semana?' para que los niños respondan correctamente.\n\n7. Cierre: Repaso final de los días de la semana y meses del año con tarjetas o un calendario. Los niños deben decir el día o el mes en inglés al señalarlos.\n",
            image: 'https://img.freepik.com/vector-gratis/coleccion-elementos-meses-ano-dibujados-mano_23-2149886953.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'lunes' en inglés?",
                options: ["Monday", "Tuesday", "Friday", "Sunday"],
                answer: "Monday"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estos es un mes del año?",
                options: ["January", "Thursday", "August", "Wednesday"],
                answer: "January"
              },
              {
                type: "true-false",
                question: "La palabra 'Saturday' significa 'sábado'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Wednesday' significa 'viernes' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'diciembre' en inglés?",
                answer: "December",
                hint: "La respuesta empieza con 'D'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'jueves' en inglés, debemos de decir: ______.",
                answer: "Thursday"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, el primer mes del año es: ______.",
                answer: "January"
              }
            ]
          }
        ]
      },

      {
        nombre: "Frases simples",
        duracion: "30min",
        subLessons: [
          {
            title: "Frases simples...",
            content: "Objetivo: Aprender frases simples en inglés para comunicarse en situaciones cotidianas.\n\nFrases clave:\n- Saludos y presentaciones:\n  - Hello, my name is... – Hola, mi nombre es...\n  - How are you? – ¿Cómo estás?\n  - I am fine, thank you – Estoy bien, gracias\n  - Nice to meet you – Mucho gusto\n\n- Frases para pedir cosas:\n  - Can I have...? – ¿Puedo tener...?\n  - Please – Por favor\n  - Thank you – Gracias\n  - You’re welcome – De nada\n\n- Frases para expresar gustos y preferencias:\n  - I like... – Me gusta...\n  - I don’t like... – No me gusta...\n  - My favorite color is... – Mi color favorito es...\n  - I love... – Me encanta...\n\n1. Introducción: Introduce cada frase mostrando una imagen o situación que la represente. Di la frase en inglés y pide a los niños que la repitan en voz alta.\n\n2. Ejemplos de frases en diálogo:\n  - Hello, my name is John. What is your name? – Hola, mi nombre es John. ¿Cuál es tu nombre?\n  - Can I have some water, please? – ¿Puedo tener agua, por favor?\n  - I like ice cream! – ¡Me gusta el helado!\n\n3. Canción sobre frases simples:\n- Canción: (Melodía de “If You're Happy and You Know It”):\n  If you're happy and you know it, say hello,\n  If you're happy and you know it, say hello,\n  If you're happy and you know it, and you really want to show it,\n  If you're happy and you know it, say hello!\n\n4. Juego interactivo: Juego de rol. Los niños deben usar las frases para interactuar entre ellos. Por ejemplo, uno pregunta 'Can I have a pencil, please?' y otro responde 'Yes, here you go!'.\n\n5. Actividad creativa: Los niños dibujan una situación donde puedan usar una de las frases y escriben la frase debajo del dibujo.\n\n6. Ejercicio de preguntas: Pregunta '¿Cómo dices hola en inglés?' o '¿Cómo pides algo por favor?' para que los niños respondan con las frases correctas.\n\n7. Cierre: Repaso de las frases aprendidas con tarjetas o pequeños diálogos entre los niños, usando las frases para comunicarse entre ellos.\n",
            image: 'https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-mujer-pensamiento-lindo_274619-787.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice '¿Cómo estás?' en inglés?",
                options: ["How old are you?", "What is your name?", "How are you?", "Where are you from?"],
                answer: "How are you?"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál es la forma correcta de decir 'Me llamo Ana' en inglés?",
                options: ["My name is Ana", "I am Ana", "Ana is my name", "Call me Ana"],
                answer: "My name is Ana"
              },
              {
                type: "true-false",
                question: "La frase 'I am hungry' significa 'Tengo hambre'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'See you later' significa 'Te veo mañana'.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'Gracias' en inglés?",
                answer: "Thank you",
                hint: "La respuesta empieza con 'T'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'Lo siento' en inglés, debemos de decir: ______.",
                answer: "I'm sorry"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la frase 'Por favor' se dice: ______.",
                answer: "Please"
              }
            ]
          }
        ]
      },

      {
        nombre: "Clima",
        duracion: "30min",
        subLessons: [
          {
            title: "Hoy hace mucho calor...",
            content: "Objetivo: Aprender vocabulario sobre el clima en inglés y cómo describir el clima en oraciones simples.\n\nVocabulario clave:\n- Tipos de clima:\n  - Sunny – Soleado\n  - Rainy – Lluvioso\n  - Cloudy – Nublado\n  - Snowy – Nevado\n  - Windy – Ventoso\n  - Stormy – Tormentoso\n  - Hot – Caluroso\n  - Cold – Frío\n\n1. Introducción: Muestra imágenes de diferentes tipos de clima y di el nombre en inglés. Los niños repiten cada palabra en voz alta.\n\n2. Ejemplos de frases:\n  - It is sunny today – Hoy está soleado\n  - It is raining outside – Está lloviendo afuera\n  - I like snowy weather – Me gusta el clima nevado\n\n3. Canción sobre el clima:\n- Canción: (Melodía de “Twinkle, Twinkle, Little Star”):\n  What's the weather like today?\n  Is it sunny? Can we play?\n  Is it rainy? Is it cold?\n  Is it windy? Do be bold!\n  What's the weather like today?\n  Let’s go out and shout, Hooray!\n\n4. Juego interactivo: Pregunta a los niños 'What’s the weather like today?' (¿Cómo está el clima hoy?) y ellos deben mirar por la ventana y responder en inglés. Puedes hacer mímica de diferentes tipos de clima y los niños adivinan cuál es diciendo la palabra en inglés.\n\n5. Actividad creativa: Los niños dibujan su clima favorito y escriben el tipo de clima en inglés debajo del dibujo.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice nublado en inglés?' o '¿Qué clima hace hoy?' para que los niños respondan correctamente.\n\n7. Cierre: Repaso final de los tipos de clima aprendidos. Usa tarjetas o realiza preguntas sobre el clima actual para que los niños respondan con el vocabulario aprendido.\n",
            image: 'https://cuentame.inegi.org.mx/territorio/climas/variedad_climas.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'soleado' en inglés?",
                options: ["Cloudy", "Rainy", "Sunny", "Snowy"],
                answer: "Sunny"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estas palabras describe un día lluvioso?",
                options: ["Windy", "Rainy", "Hot", "Cold"],
                answer: "Rainy"
              },
              {
                type: "true-false",
                question: "La palabra 'snowy' significa 'nevado'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Cloudy' significa 'soleado' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'frío' en inglés?",
                answer: "Cold",
                hint: "La respuesta empieza con 'C'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'caliente' en inglés, debemos de decir: ______.",
                answer: "Hot"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la palabra para describir un día ventoso es: ______.",
                answer: "Windy"
              }
            ]
          }
        ]
      },

    ]
  },


  {
    id: "3",
    name: "Nivel Avanzado",
    author: "Básico",
    time: "2h 30min",
    rating: 4.9,
    icon: curso1,
    temas: [


      {
        nombre: "Descripciones personales",
        duracion: "30min",
        subLessons: [
          {
            title: "Descripciones personales",
            content: "Objetivo: Aprender a describir características personales como la apariencia física y la personalidad en inglés.\n\nVocabulario clave:\n- Descripciones físicas:\n  - Tall – Alto\n  - Short – Bajo\n  - Big – Grande\n  - Small – Pequeño\n  - Strong – Fuerte\n  - Weak – Débil\n  - Young – Joven\n  - Old – Viejo\n  - Beautiful – Hermoso\n  - Handsome – Guapo\n\n- Descripciones de personalidad:\n  - Friendly – Amigable\n  - Shy – Tímido\n  - Funny – Divertido\n  - Kind – Amable\n  - Smart – Inteligente\n  - Brave – Valiente\n\n1. Introducción: Muestra imágenes de personas con diferentes características físicas y de personalidad, di la palabra en inglés y pide a los niños que la repitan en voz alta.\n\n2. Ejemplos de frases:\n  - I am tall and strong – Soy alto y fuerte\n  - She is friendly and funny – Ella es amigable y divertida\n  - He is short but brave – Él es bajo pero valiente\n\n3. Canción sobre descripciones personales:\n- Canción: (Melodía de “The Farmer in the Dell”):\n  I am tall and strong,\n  I am tall and strong,\n  Look at me, I’m happy to be,\n  I am tall and strong!\n\n4. Juego interactivo: Juego de adivinanza. Describe a alguien en inglés (por ejemplo, 'She is tall and friendly') y los niños deben adivinar a quién te refieres o realizar una descripción similar.\n\n5. Actividad creativa: Los niños dibujan a sí mismos o a un amigo, luego escriben una descripción simple debajo del dibujo, usando las palabras aprendidas.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice amable en inglés?' o '¿Cómo describirías a un amigo?' para que los niños respondan con descripciones correctas.\n\n7. Cierre: Repaso final de las descripciones personales. Pide a los niños que describan a un compañero o a sí mismos usando el vocabulario aprendido.\n",
            image: 'https://trucoslondres.com/wp-content/uploads/2017/04/caras.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'alto' en inglés?",
                options: ["Tall", "Short", "Big", "Small"],
                answer: "Tall"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estas palabras describe a alguien con cabello rubio?",
                options: ["Blonde", "Brown", "Black", "Red"],
                answer: "Blonde"
              },
              {
                type: "true-false",
                question: "La palabra 'short' significa 'bajo'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Fat' significa 'flaco' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'ojos' en inglés?",
                answer: "Eyes",
                hint: "La respuesta empieza con 'E'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'delgado' en inglés, debemos de decir: ______.",
                answer: "Thin"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la palabra para describir el color 'negro' es: ______.",
                answer: "Black"
              }
            ]
          }
        ]
      },


      {
        nombre: "La escuela",
        duracion: "30min",
        subLessons: [
          {
            title: "La escuela",
            content: "Objetivo: Aprender vocabulario relacionado con la escuela y cómo usarlo en oraciones simples en inglés.\n\nVocabulario clave:\n- Objetos de la escuela:\n  - Pencil – Lápiz\n  - Book – Libro\n  - Backpack – Mochila\n  - Desk – Escritorio\n  - Chair – Silla\n  - Teacher – Maestro/maestra\n  - Student – Estudiante\n  - Blackboard – Pizarrón\n  - Eraser – Borrador\n  - Ruler – Regla\n\n1. Introducción: Muestra imágenes o utiliza objetos reales para enseñar el vocabulario. Di el nombre en inglés y pide a los niños que repitan en voz alta.\n\n2. Ejemplos de frases:\n  - I have a pencil – Tengo un lápiz\n  - The book is on the desk – El libro está en el escritorio\n  - The teacher is kind – El maestro/maestra es amable\n\n3. Canción sobre la escuela:\n- Canción: (Melodía de “The Wheels on the Bus”):\n  The pencil in my hand goes up and down,\n  Up and down, up and down,\n  The pencil in my hand goes up and down,\n  All through the school!\n\n4. Juego interactivo: Los niños realizan una búsqueda del tesoro en el salón, buscando objetos de la escuela. Deben decir el nombre del objeto que encuentren en inglés (por ejemplo, 'Pencil').\n\n5. Actividad creativa: Los niños dibujan su salón de clases ideal, etiquetando los objetos en inglés.\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice libro en inglés?' o '¿Qué llevas en tu mochila?' para que los niños respondan utilizando el vocabulario de la lección.\n\n7. Cierre: Repaso final del vocabulario relacionado con la escuela. Los niños describen su salón de clases o los objetos que usan en la escuela usando las palabras aprendidas.\n",
            image: 'https://img.freepik.com/vector-gratis/ninos-banda-escolar-escuela_1308-30862.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'lápiz' en inglés?",
                options: ["Eraser", "Pencil", "Book", "Desk"],
                answer: "Pencil"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estos objetos encuentras en el aula?",
                options: ["Sofa", "Desk", "Lamp", "Television"],
                answer: "Desk"
              },
              {
                type: "true-false",
                question: "La palabra 'teacher' significa 'profesor'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Notebook' significa 'cuaderno' en inglés.",
                answer: true
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'goma de borrar' en inglés?",
                answer: "Eraser",
                hint: "La respuesta empieza con 'E'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'libro' en inglés, debemos de decir: ______.",
                answer: "book"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la palabra para 'pizarrón' es: ______.",
                answer: "blackboard"
              }
            ]
          }
        ]
      },


      {
        nombre: "Deportes y pasatiempos",
        duracion: "30min",
        subLessons: [
          {
            title: "Deportes y pasatiempos",
            content: "Objetivo: Aprender vocabulario relacionado con actividades de tiempo libre y deportes, y cómo usarlo en oraciones simples en inglés.\n\nVocabulario clave:\n- Actividades de tiempo libre:\n  - Play video games – Jugar videojuegos\n  - Read a book – Leer un libro\n  - Watch TV – Ver televisión\n  - Ride a bike – Montar bicicleta\n  - Draw – Dibujar\n  - Listen to music – Escuchar música\n\n- Deportes:\n  - Soccer – Fútbol\n  - Basketball – Baloncesto\n  - Tennis – Tenis\n  - Swimming – Natación\n  - Running – Correr\n  - Baseball – Béisbol\n\n1. Introducción: Muestra imágenes de diferentes actividades y deportes, di el nombre en inglés y pide a los niños que repitan en voz alta.\n\n2. Ejemplos de frases:\n  - I like to play soccer – Me gusta jugar fútbol\n  - She is reading a book – Ella está leyendo un libro\n  - We are going swimming – Vamos a nadar\n\n3. Canción sobre deportes:\n- Canción: (Melodía de “Row, Row, Row Your Boat”):\n  Run, run, run around,\n  Run around the park,\n  Playing sports is lots of fun,\n  Let's run until it's dark!\n\n4. Juego interactivo: Organiza un juego de mímica donde los niños deben representar una actividad o deporte, y el resto debe adivinar diciendo la palabra en inglés (por ejemplo, 'Soccer').\n\n5. Actividad creativa: Los niños dibujan su deporte favorito o una actividad de tiempo libre que disfruten y escriben el nombre en inglés debajo del dibujo.\n\n6. Ejercicio de preguntas: Pregunta a los niños '¿Cómo se dice fútbol en inglés?' o '¿Qué haces en tu tiempo libre?' para que respondan usando las frases aprendidas.\n\n7. Cierre: Repaso final de las actividades y deportes, utilizando tarjetas o juegos de rol para que los niños describan sus actividades favoritas en inglés.\n",
            image: 'https://cdn5.dibujos.net/dibujos/pintados/202023/jugador-de-baloncesto-junior-deportes-basquet-11815142.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'fútbol' en inglés?",
                options: ["Basketball", "Tennis", "Football", "Soccer"],
                answer: "Soccer"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estos es un pasatiempo?",
                options: ["Swimming", "Running", "Reading", "Cooking"],
                answer: "Reading"
              },
              {
                type: "true-false",
                question: "La palabra 'basketball' significa 'baloncesto'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Tennis' significa 'natación' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'correr' en inglés?",
                answer: "Running",
                hint: "La respuesta empieza con 'R'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'nadar' en inglés, debemos de decir: ______.",
                answer: "swim"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la palabra para 'béisbol' es: ______.",
                answer: "baseball"
              }
            ]
          }
        ]
      },


      {
        nombre: "Prepocisiones basicas",
        duracion: "30min",
        subLessons: [
          {
            title: "Prepocisiones basicas",
            content: "Objetivo: Aprender a usar preposiciones básicas en inglés para describir la ubicación de objetos.\n\nVocabulario clave:\n- Preposiciones básicas:\n  - In – Dentro\n  - On – Sobre\n  - Under – Debajo\n  - Next to – Al lado de\n  - Between – Entre\n  - Behind – Detrás de\n  - In front of – En frente de\n  - Above – Encima de\n  - Below – Debajo de\n\n1. Introducción: Muestra objetos reales en diferentes posiciones, di la preposición en inglés y pide a los niños que repitan en voz alta. Por ejemplo, coloca un libro 'on' (sobre) una mesa y di 'The book is on the table'.\n\n2. Ejemplos de frases:\n  - The pencil is in the box – El lápiz está dentro de la caja\n  - The cat is under the table – El gato está debajo de la mesa\n  - The ball is next to the chair – La pelota está al lado de la silla\n\n3. Canción sobre preposiciones:\n- Canción: (Melodía de “The Wheels on the Bus”):\n  The ball is in the box,\n  In the box, in the box,\n  The ball is in the box,\n  Let’s sing it again!\n\n4. Juego interactivo: Organiza una actividad donde los niños coloquen objetos en diferentes posiciones según tus instrucciones en inglés, usando las preposiciones (por ejemplo, 'Put the book under the chair').\n\n5. Actividad creativa: Los niños dibujan una habitación y etiquetan la ubicación de los objetos utilizando las preposiciones aprendidas (por ejemplo, 'The lamp is on the table').\n\n6. Ejercicio de preguntas: Haz preguntas como '¿Cómo se dice “debajo” en inglés?' o '¿Dónde está el lápiz?' para que los niños respondan usando las preposiciones.\n\n7. Cierre: Repaso final de las preposiciones con un juego donde los niños describen la ubicación de objetos en el salón de clases, utilizando las preposiciones aprendidas.\n",
            image: 'https://diagonalenglish.com/wp-content/uploads/2018/09/Preposiciones-en-ingles.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'sobre' en inglés?",
                options: ["In", "On", "Under", "Behind"],
                answer: "On"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estas preposiciones significa 'debajo'?",
                options: ["Between", "Under", "Next to", "In front of"],
                answer: "Under"
              },
              {
                type: "true-false",
                question: "La preposición 'in' significa 'en' o 'dentro'.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Behind' significa 'al lado de' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'entre' en inglés?",
                answer: "Between",
                hint: "La respuesta empieza con 'B'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'delante de' en inglés, debemos de decir: ______.",
                answer: "in front of"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, la preposición para 'al lado de' es: ______.",
                answer: "next to"
              }
            ]
          }
        ]
      },

      {
        nombre: "Conversaciones cortas",
        duracion: "30min",
        subLessons: [
          {
            title: "Conversaciones cortas",
            content: "Objetivo: Aprender a participar en conversaciones sencillas en inglés, usando frases cotidianas para presentarse y hacer preguntas básicas.\n\nVocabulario clave:\n- Saludos y presentaciones:\n  - Hello – Hola\n  - How are you? – ¿Cómo estás?\n  - I’m fine, thank you – Estoy bien, gracias\n  - What’s your name? – ¿Cómo te llamas?\n  - My name is... – Me llamo...\n  - Nice to meet you – Mucho gusto\n\n- Preguntas básicas:\n  - How old are you? – ¿Cuántos años tienes?\n  - I am... years old – Tengo... años\n  - Where are you from? – ¿De dónde eres?\n  - I am from... – Soy de...\n  - Do you like...? – ¿Te gusta...?\n  - Yes, I do / No, I don’t – Sí, me gusta / No, no me gusta\n\n1. Introducción: Realiza una pequeña conversación en inglés con otro adulto o con un títere para que los niños vean cómo se usan las frases clave en un diálogo cotidiano.\n\n2. Ejemplos de conversación:\n  - A: Hello! What’s your name?\n  - B: Hi! My name is Anna. What’s your name?\n  - A: My name is John. Nice to meet you!\n  - B: Nice to meet you too!\n\n3. Canción sobre conversaciones:\n- Canción: (Melodía de “Twinkle, Twinkle, Little Star”):\n  Hello, hello, how are you?\n  I am fine, how about you?\n  What's your name, can you tell me?\n  My name’s Anna, nice to meet!\n\n4. Juego interactivo: Organiza un juego de rol en el que los niños se presenten entre ellos usando las frases aprendidas. Los niños pueden ir pasando una pelota y, al recibirla, deben decir algo como 'Hello, my name is...'.\n\n5. Actividad creativa: Los niños crean pequeñas tarjetas de presentación con su nombre y edad en inglés y las intercambian con sus compañeros para practicar el diálogo.\n\n6. Ejercicio de preguntas: Pregunta a los niños '¿Cómo preguntas cuántos años tiene alguien en inglés?' o '¿Cómo te presentas a un amigo nuevo?' para que respondan usando las frases aprendidas.\n\n7. Cierre: Repaso final con una conversación guiada, donde cada niño participa y practica presentarse o hacer preguntas sencillas usando las frases de la lección.\n",
            image: 'https://cdn5.dibujos.net/dibujos/pintados/202045/saludo-chino-culturas-china-12071377.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice '¿Cómo te llamas?' en inglés?",
                options: ["How are you?", "What's your name?", "Where are you from?", "What do you do?"],
                answer: "What's your name?"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál es una forma adecuada de responder a 'How are you?'?",
                options: ["I am fine", "I am tired", "Nice to meet you", "See you later"],
                answer: "I am fine"
              },
              {
                type: "true-false",
                question: "La frase 'Nice to meet you' se usa para presentarse a alguien.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Where are you from?' significa '¿Cómo estás?' en inglés.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo respondes en inglés si alguien te dice 'Thank you'?",
                answer: "You're welcome",
                hint: "La respuesta empieza con 'You're'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'Hasta luego' en inglés, debemos de decir: ______.",
                answer: "See you later"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, para preguntar '¿De dónde eres?' se dice: Where are you ______?",
                answer: "from"
              }
            ]
          }
        ]
      },

      {
        nombre: "Cuentos y Canciones",
        duracion: "30min",
        subLessons: [
          {
            title: "Cuentos y Canciones",
            content: "Objetivo: Desarrollar habilidades de escucha y pronunciación en inglés a través de cuentos y canciones infantiles.\n\nVocabulario clave:\n- Palabras comunes en cuentos y canciones:\n  - Once upon a time – Había una vez\n  - Princess – Princesa\n  - Castle – Castillo\n  - Magic – Mágico\n  - Friends – Amigos\n  - Sing – Cantar\n\n1. Introducción: Explica a los niños que hoy aprenderán nuevas palabras en inglés a través de cuentos y canciones. Pregúntales si conocen algunas palabras mágicas o personajes en inglés.\n\n2. Cuento corto: Lee un cuento corto como “Goldilocks and the Three Bears” (Ricitos de Oro y los Tres Osos) en inglés, mostrando imágenes para ayudar a los niños a comprender la historia.\n  - Ejemplo: 'Once upon a time, there was a little girl named Goldilocks...'\n\n3. Canción popular: Canta una canción en inglés que sea fácil de seguir, como 'Twinkle, Twinkle, Little Star' o 'The Wheels on the Bus'. Anima a los niños a unirse y repetir las palabras.\n\n4. Canción: (Melodía de “Twinkle, Twinkle, Little Star”):\n  Twinkle, twinkle, little star,\n  How I wonder what you are!\n  Up above the world so high,\n  Like a diamond in the sky.\n  Twinkle, twinkle, little star,\n  How I wonder what you are!\n\n5. Juego interactivo: Representa partes del cuento con los niños, pidiéndoles que hagan gestos para los personajes o las acciones, por ejemplo, actuar como Ricitos de Oro tocando las puertas o sentándose en una silla.\n\n6. Actividad creativa: Los niños pueden dibujar escenas del cuento o la canción que escucharon, y escribir o copiar algunas palabras clave en inglés, como 'star', 'bear', o 'magic'.\n\n7. Ejercicio de preguntas: Haz preguntas como '¿Qué pasó en el cuento?' o '¿Cómo se dice “estrella” en inglés?' para que los niños respondan usando el vocabulario que aprendieron.\n\n8. Cierre: Repite la canción o repasa brevemente el cuento, pidiendo a los niños que recuerden y digan en inglés algunas palabras importantes como 'princess', 'castle', 'star', o 'friends'.\n",
            image: 'https://img.freepik.com/vector-premium/libro-cuentos-castillo-parque-verde_43633-1698.jpg',
            exercises: [
              {
                type: "multiple-choice",
                question: "¿Cómo se dice 'canción' en inglés?",
                options: ["Story", "Poem", "Song", "Music"],
                answer: "Song"
              },
              {
                type: "multiple-choice",
                question: "¿Cuál de estas es una forma común de contar historias?",
                options: ["Singing", "Reading", "Drawing", "Dancing"],
                answer: "Reading"
              },
              {
                type: "true-false",
                question: "La frase 'Twinkle, Twinkle, Little Star' es una canción famosa para niños.",
                answer: true
              },
              {
                type: "true-false",
                question: "'Once upon a time' se utiliza para comenzar una canción.",
                answer: false
              },
              {
                type: "open-ended",
                question: "¿Cómo se dice 'cuento' en inglés?",
                answer: "Story",
                hint: "La respuesta empieza con 'S'..."
              },
              {
                type: "fill-in-the-blank",
                question: "Para decir 'escuchar música' en inglés, debemos de decir: ______ music.",
                answer: "listen to"
              },
              {
                type: "fill-in-the-blank",
                question: "En inglés, una colección de canciones se llama: ______.",
                answer: "album"
              }
            ]
          }
        ]
      }

    ]
  },


  {
    id: "4",
    name: "Mis primeros pasos",
    author: "Básico",
    time: "2h 30min",
    rating: 4.9,
    icon: curso1,
    temas: [


      {
        nombre: "Los Colores en Inglés para Niños",
        duracion: "30min",
        subLessons: [
          {
            title: "Los Colores en Inglés para Niños",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/2n7CXoRMsG4?si=09xJ5HvU08lMm4q2",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Contar hasta el 100 en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "Contar hasta el 100 en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/jlC2l0kqocE?si=gNSRxZbCYgqNGcdS",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Inglés para Niños",
        duracion: "30min",
        subLessons: [
          {
            title: "Inglés para Niños",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/2o46gKeQTwc?si=j9J_T4RA54ItCcUL",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Miembros de La Familia en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "Miembros de La Familia en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/TZ6eC2EMstQ?si=jicrtnUzrEx2GUEK",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Útiles Escolares en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "Útiles Escolares en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/4ZeBdCGGvWA?si=CUhSjqVMOxac5G9-",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Emociones en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "Emociones en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/aT9CKFC9D2c?si=-oev8EDiIMnMJrEN",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "MEDIOS DE TRANSPORTE en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "MEDIOS DE TRANSPORTE en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/0tlr2qhnam8?si=HzWVUJFuDLrs4INV",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Partes del Cuerpo en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "Partes del Cuerpo en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/6z35B40Gxhw?si=EahRbd9aVs62fvWY",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "Inglés Para Principiantes",
        duracion: "30min",
        subLessons: [
          {
            title: "Inglés Para Principiantes",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/kKM0uNz8VL4?si=82aDSWN5aJUvhiqK",
            exercises: [

            ]
          }
        ]
      },

      {
        nombre: "El Abecedario en Inglés",
        duracion: "30min",
        subLessons: [
          {
            title: "El Abecedario en Inglés",
            isVideoContent: true, // Indicar que el contenido es un video
            videoUrl: "https://www.youtube.com/embed/W_LhyqgaRJI?si=Onq4pD5aIshSjt3t",
            exercises: [

            ]
          }
        ]
      }

    ]
  },

  // Otros cursos...


];
