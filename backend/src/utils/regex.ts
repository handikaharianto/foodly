export const setMongoRegex = (text: string) => {
  return new RegExp(
    text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
    "i"
  );
};
