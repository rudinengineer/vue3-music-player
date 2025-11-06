import { defineStore } from "pinia";
import Themes from "../components/Themes.vue";

type Themes = {
  backgroundImage: string | null;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  cardBackgroundColor: string;
  cardBackgroundTransparent: number | null;
  cardBackgroundBlur: boolean;
  image: string;
  title: string;
  user: string;
  artist: string;
};

export const useThemeStore = defineStore("themes", {
  persist: true,
  state: (): Themes => ({
    backgroundImage: null,
    backgroundGradientFrom: "#ffd6e8",
    backgroundGradientTo: "#ff70a6",
    cardBackgroundColor: "#fff",
    cardBackgroundTransparent: 20,
    cardBackgroundBlur: true,
    image: import.meta.env.BASE_URL + "/assets/anime.jpg",
    title: "",
    user: "iPhone",
    artist: "Rudin",
  }),
  actions: {
    setBackgroundImage(source: string | null) {
      this.backgroundImage = source;
    },
    setBackgroundGradientFrom(color: string) {
      this.backgroundGradientFrom = color;
    },
    setBackgroundGradientTo(color: string) {
      this.backgroundGradientTo = color;
    },
    setCardBackgroundColor(value: string) {
      this.cardBackgroundColor = value;
    },
    setCardBackgroundTransparent(value: number | null) {
      this.cardBackgroundTransparent = value;
    },
    setCardBackgroundBlur(value: boolean) {
      this.cardBackgroundBlur = value;
    },
    setImage(source: string) {
      this.image = source;
    },
    setTitle(title: string) {
      this.title = title;
    },
    setUser(user: string) {
      this.user = user;
    },
    setArtist(artist: string) {
      this.artist = artist;
    },
  },
  getters: {
    getBackgroundImage: (state) => state.backgroundImage,
    getBackgroundGradientFrom: (state) => state.backgroundGradientFrom,
    getBackgroundGradientTo: (state) => state.backgroundGradientTo,
    getCardBackgroundColor: (state) => state.cardBackgroundColor,
    getCardBackgroundTransparent: (state) => state.cardBackgroundTransparent,
    getCardBackgroundBlur: (state) => state.cardBackgroundBlur,
    getImage: (state) => state.image,
    getTitle: (state) => state.title,
    getUser: (state) => state.user,
    getArtist: (state) => state.artist,
  },
});
