<template>
  <v-container>
    <v-layout fill-height align-center justify-center>
      <v-flex lg8 md10 xs12>
        <v-card>
          <v-card-title>Start</v-card-title>
          <v-card-text class="display-2">
            Te uiți cu indiferență la ecran în timp ce dai din umeri. Simon Se încruntă la tine. Ce faci mai departe?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/game/1.1" x-large rounded color="#476283">Chemi un expert</v-btn>
            <v-spacer></v-spacer>
            <v-btn to="/game/1.2" x-large rounded color="#476283">
              Spui 'Cel mai probabil contul tău este spart. Schimbă-ți parola'
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn to="/game/1.3" x-large rounded color="#476283">Schimbi parola</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Scena0",
};
</script>

<style scoped></style>
