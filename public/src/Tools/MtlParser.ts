export function parseMtl(txt: string) {
  const materials = {};
  const lines = txt.split("\n");
  let currentMaterial: string = "";

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    const keyword = parts[0];
    switch (keyword) {
      case "newmtl":
        currentMaterial = parts[1];
        materials[currentMaterial] = {};
        break;

      case 'Kd':
        materials[currentMaterial].diffuse = parts.splice(1).map(parseFloat);//Stocke la valeur normalise de la couleur diffuse
        break;
    }
  }

  return materials;
}