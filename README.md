# Documentatie
## Wisecurity
- platformă educaţională pentru liceeni despre securitatea cibernetica
- pe langa materialele didactice propriu-zise, platforma mai ofera si o serie de teste si jocuri educative pentru aplicarea cunostintelor 

## Utilizare
- Selectezi pagina Info
- Selectezi Capitolul dorit, apoi selectezi lectia
- Lectia va fi afisata in versiunea sa simpla
- Pentru a fi afisata in celelalte doua variante, cand ajungeti la finalul lectiei dati click pe butonul Continua Lectia
- Pentru a accesa materialele duceti mouse-ul pe butonul Aplicatii de unde veti avea trei optiuni
- Pentru a accesa sistemul de teste, dati click pe optiunea Simplu
- Pentru a accesa jocurile interactive dati click pe opiunile Mediu sau Complex

## Mai ofera
- Buton de schimbat pe fond luminos sau intunecat (dark theme toggle)
- Sectiune de Bibliografie
- Descriere tehnica

Aceasta aplicatie genereaza fiecare pagina dinamic, insemnand ca fiecare pagina a aplicatiei este formata de componenta principala (App.vue) care se foloseste de o componenta router (router.js) pentru a genera ce vede utilizatorul, facand adaugarea si extinderea proiectului foarte usoara. Are un design adaptabil rezolutiilor diverse ale dispozitivelor ce vor utiliza aplicatia. (Cu alte cuvinte, prezinta un Responsive Desgin) Deoarece este o aplicatie web, este compatibila cu foarte multe dispozitive. Generarea textelor este facuta cu ajutorul limbajului Markdown. Back End-ul aplicatiei este reprezentat de serviciile FireBase. (Pentru integrare in aplicatie folosim firebase web sdk). Folosim Webpack pentru a „comprima” codul si Babel pentru „transpiling”. Folosim Material design Icons pentru simbolurile prezente in aplicatie.

Pentru Front-End am folosit:

- Vue.js
- Webpack
- Markdown-it - cu pluginuri pentru rendering de markdown in cod HTML
- Babel
- MDI - pentru iconitele inspirate de Material Design
Plugin-uri de Vue.js:

- VueWait - pentru un wait system si loading states, pentru a monitoriza ce se incarca si a da drumul la animatii
- Vuex - pentru state management
- Vuetify - pentru Interfata
- Vue Router - preinclus cu Vue.js pentru routing la diferite pagini
- VRuntimeTemplate - pentru randarea si incarcarea dinamica a unei pagini
- VueJs Logger - pentru logging mai usor
- Lodash
- Vuefire, Vuexfire - pentru comunicarea usoara si actualizarea datelor din Cloud Firestore

Pentru backend folosim Firebase, din care folosim modulul de autentificare si Cloud Firestore.

# wisecurity

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
