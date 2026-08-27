export const generateSlug = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^0-9a-z-]/g, "")
    .replace(/-+/g, "-");
};
