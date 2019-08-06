<template>
  <v-container>
    <v-layout fill-height align-center justify-center>
      <v-flex lg8 md10 xs12>
        <v-card>
          <v-card-text class="display-2">
            Alegi să schimbi parola contului. Simon se uită la tine plin de recunoștință. Ce faci acum?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/game/2.1" x-large rounded color="#476283">Dai mâna cu Simon și pleci</v-btn>
            <v-spacer></v-spacer>
            <v-btn to="/game/2.2" x-large rounded color="#476283">Pornești autentificarea prin doi pași</v-btn>
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
