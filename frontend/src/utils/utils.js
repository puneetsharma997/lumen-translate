import { apiBaseUrl } from "../apiConfig/api-url";

// function to convert api response into label and value object
export const convertLanguagesResponse = (languageList) => {
  const lang = languageList();

  if (!lang) return [];

  return Object.entries(lang)?.map(([label, value]) => ({
    label: label?.charAt(0).toUpperCase() + label?.slice(1),
    value: value,
  }))
}

// function for text to speech languages
export const speakText = (text, lang) => {
  if (!text) return;

  const url = `${apiBaseUrl}/speak?text=${encodeURIComponent(text)}&lang=${lang}`;

  const audio = new Audio(url);
  audio.play().catch(err => console.error('Error - ', err));
}