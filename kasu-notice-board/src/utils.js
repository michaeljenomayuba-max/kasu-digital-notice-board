export function updateDelete(id, list) {
  return list.filter((elem) => elem.id !== id)
}