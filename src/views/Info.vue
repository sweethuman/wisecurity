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
          title: "Securitatea Cibernetica",
          description: "De ce este utila si importanta",
          image: "https://images.unsplash.com/photo-1558980664-1db506751c6c",
        },
        {
          title: "Lorem Impsum",
          description: "Manaca barabule batucite",
          image: "https://images.unsplash.com/photo-1563696542721-71a0637d7884",
        },
        {
          title: "Lorem Impsum",
          description: "Manaca barabule batucite",
          image: "https://images.unsplash.com/photo-1561925770-d9f6a677cdcc",
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
