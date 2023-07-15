export const capitalizeWords = (text: string) => {
  const words = text.split(" ");

  const capitalizedWords = words.map((word) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
  });

  const result = capitalizedWords.join(" ");

  return result;
};
