<template>
  <v-container grid-list-lg fill-height>
    <v-layout wrap fill-height align-center justify-space-around>
      <v-flex v-for="(item, i) in contentCards" :key="i" lg4 md6 xs12 pa-2>
        <content-card :round="true" :content="generateContent(item)"></content-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CardContent from "../constructors/CardContent";
import ContentCard from "../components/ContentCard";
export default {
  name: "Info",
  components: { ContentCard },
  data() {
    return {
      contentCards: [
        {
          title: "Securitatea Cibernetică",
          description: "De ce este utilă și importantă",
          image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
        },
        {
          title: "Protejează-te online!",
          description: "Anatomia unui site securizat",
          image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
        },
        {
          title: "Hoțomani!",
          description: "Adversarii securității cibernetice",
          image: "https://images.unsplash.com/photo-1544890225-2f3faec4cd60",
        },
      ],
    };
  },
  methods: {
    generateContent(item) {
      return new CardContent(
        item.title,
        item.description,
        item.image + "?auto=format&fit=crop&w=1000",
        item.image + "?auto=format&fit=crop&w=200&q=80"
      );
    },
  },
};
</script>

<style scoped></style>
