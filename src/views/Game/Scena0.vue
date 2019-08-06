<template>
  <v-container>
    <v-layout fill-height align-center justify-center>
      <v-flex lg8 md10 xs12>
        <v-card>
          <v-card-title>Start</v-card-title>
          <v-card-text class="display-2">
            Prietenul tău Simon are nevoie de ajutor cu contul lui de E-mail. Lui i se tot trimit mail-uri fără ca el să
            le fi scris. Intri la el acasă și îi strângi mâna.Ce faci mai departe?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/game/1" x-large rounded color="#476283">Dai din umeri</v-btn>
            <v-spacer></v-spacer>
            <v-btn to="/game/2" x-large rounded color="#476283">Schimbi parola</v-btn>
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
