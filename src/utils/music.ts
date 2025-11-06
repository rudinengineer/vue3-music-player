import { MUSIC_EXTENSION_SUPPORT } from "../config/music";

export const SanitizeMusicTitle = (title: string) => {
  MUSIC_EXTENSION_SUPPORT.forEach((ext) => {
    title = title.replace(ext, "");
  });
  return title;
};
