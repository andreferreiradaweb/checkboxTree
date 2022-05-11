export function turnJsonIntoArrayOfObjects(oldValues: any) {
  const array = Object.keys(oldValues).map((i) => {
    if(!!oldValues[i].children) oldValues[i].children = turnJsonIntoArrayOfObjects(oldValues[i].children);
    return oldValues[i];
  });
  return array;
}
