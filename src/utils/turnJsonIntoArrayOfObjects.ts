export function getArrayFromJson(oldValues: any) {
  const array = Object.keys(oldValues).map((i) => {
    if(!!oldValues[i].children) oldValues[i].children = getArrayFromJson(oldValues[i].children);
    return oldValues[i];
  });
  return array;
}
