// src/data/nodeTree.ts
export const nodeTree: Record<string, any> = {
  "0": {
    id: "0",
    label: "VÍA51 NODO CENTRAL",
    type: "folder",
    background: "bg-main.png",
    children: ["1.1", "1.2", "1.3"]
  },
  
  // NIVEL 1: EJES PRINCIPALES
  "1.1": {
    id: "1.1",
    label: "RAMA POLÍTICA",
    type: "folder",
    background: "bg-politica.png",
    children: ["1.1.1"] // Agregamos un hijo para que no falle
  },
  "1.2": {
    id: "1.2",
    label: "RAMA SOCIAL",
    type: "folder",
    background: "ceo-lima.png",
    children: ["1.2.1", "1.2.2"]
  },
  "1.3": {
    id: "1.3",
    label: "RAMA PRODUCTIVA",
    type: "folder",
    background: "bg-productivo.png",
    children: ["1.3.1"]
  },

  // NIVEL 2: HOJAS (DONDE VIVEN LOS MOTORES)
  "1.2.1": {
    id: "1.2.1",
    label: "SALUD PÚBLICA",
    type: "leaf",
    variable: "metrica_salud",
    background: "ceo-lima.png"
  },
  "1.2.2": {
    id: "1.2.2",
    label: "EDUCACIÓN",
    type: "leaf",
    variable: "metrica_edu",
    background: "ceo-lima.png"
  },
  
  // PLACEHOLDERS (Para evitar el error de "Nodo no definido" al hacer clic)
  "1.1.1": { id: "1.1.1", label: "ESTABILIDAD", type: "leaf", variable: "pol_est", background: "bg-politica.png" },
  "1.3.1": { id: "1.3.1", label: "PRODUCCIÓN", type: "leaf", variable: "prod_gen", background: "bg-productivo.png" }
};