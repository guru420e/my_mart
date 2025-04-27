export function isEmpty(value) {
  return (
    !value ||
    value.trim().length == 0 ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}
