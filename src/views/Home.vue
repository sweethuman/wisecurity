<template>
  <v-container>
    <v-layout column class="mb-5">
      <v-flex xs12>
        <v-card dark elevation="24">
          <v-img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=2000&q=80"
            lazy-src="https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=100&q=80"
            aspect-ratio="4"
          >
            <template #placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </template>
            <v-layout column align-center justify-center fill-height style="background:  rgba(19,39,67, 0.8)">
              <v-flex shrink>
                <v-card-title
                  :class="{
                    'display-4': $vuetify.breakpoint.lgAndUp,
                    'display-3': $vuetify.breakpoint.mdOnly || $vuetify.breakpoint.smOnly,
                    'display-2': $vuetify.breakpoint.xsOnly,
                  }"
                  class="text-uppercase font-weight-black"
                  style="text-shadow: 15px 5px 15px #000"
                >
                  <!--                  eslint-disable-->
                  WI

                  <!-- prettier-ignore -->
                  <span class="red--text">SE<span class="font-weight-light">CURITY</span>
                  </span>
                  <!--                  eslint-enable-->
                </v-card-title>
              </v-flex>
              <v-flex shrink>
                <v-card-text class="display-1 font-weight-light" style="text-shadow: 15px 5px 15px #000">
                  Scutul tau virtual!
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex lg4 xs12 pa-2>
        <v-card min-height="200px" height="100%">
          <v-card-title>Wisecurity</v-card-title>
          <v-card-text>
            Aceasta este o platformă menită să învețe adolescenții despre securitate, atât pentru cei care vor să
            dezvolte aplicații sau site-uri, cât și pentru cei care sunt doar utilizatori. Ce aduce nou Wisecurity? Pe
            lângă structurarea intuitivă a materialelor, platforma mai oferă și o multitudine de aplicații și teste
            pentru a implica utilizatorul activ în procesul de învățare. Pentru a începe, pur și simplu dați click pe
            butonul
            <router-link to="/info">Info</router-link>
            , de unde puteți selecta un subiect despre care să învățați.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12 pa-2>
        <v-card min-height="200px" height="100%">
          <v-card-title>Ghid Rapid</v-card-title>
          <v-card-text>
            Procesul efectiv de învățare începe după ce se selectează butonul
            <router-link to="/info">Info</router-link>
            , de unde puteți selecta un subiect despre care să învățați. . De aici puteți accesa fiecare din cele trei
            capitole de unde mai depare puteți accesa fiecare lecție. După ce ați citit o lecție, aveți posibilitatea să
            se afișeze modulele „Mediu” și „Complex”. După ce ați citit, puteți merge la secțiunea Aplicații, de unde
            aveți de ales între aplicații simple, medii sau complexe. Fiecare categorie de aplicații corespunde unei
            categorii de lecție. Aplicațiile simple constau într-un set de teste pentru fiecare lecție. Fiecare test
            conține câte patru întrebări. Aplicațiile medii constau în două jocuri de decizie care pun utilizatorul
            într-o situație în care trebuie să folosească mai mult decât cunoștințele de bază. Aplicația complexă este
            un simulator a unei baze de date nesecurizată de unde se poate vedea ce face lipsa regulilor de securitate.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg4 xs12 pa-2>
        <v-card min-height="200px" height="100%">
          <v-card-title>Prezentare Generală</v-card-title>
          <v-card-text>
            Platforma Wisecurity ajută adolescenții să se informeze despre securitatea cibernetică, mai exact despre cum
            să își securizeze datele personale și, pentru cei car doresc să dezvolte proiecte informatice, inclusiv
            datele altor posibili utilizatori. Dupa vizitarea paginii
            <router-link to="/info">Info</router-link>
            , de unde puteți selecta un subiect despre care să învățați. , se poate selecta o lecție. Fiecare lecție are
            trei nivele de afișare a informațiilor, iar fiecare nivel conține informații utile pentru o anumita categori
            de materiale aplicative. Dupa accesarea lecțiilor, utilizatorul se poate folosi de materialele aplicative
            pentru a-și fixa cunoștințele și a înțelege mai bine ce a învățat.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 pa-2>
        <v-card min-height="200px" height="100%">
          <v-card-title>Bibliografie</v-card-title>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm6 xs12 pa-2>
        <v-card min-height="200px" height="100%">
          <v-card-title>Ajutor</v-card-title>
          <v-card-text>
            DISCLAIMER: Nu reţinem date personale pentru uz privat. Toate materialele pot fi folosite fără a avea un
            cont de utilizator. Dacă pe parcursul utilizării platformei găseşti erori sau ai sugestii legate de
            îmbunătăţirea conţinutului său, te rugăm să ne contactezi la adresa de e-mail: support@wisecurity.net
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
