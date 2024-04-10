// Define una interfaz para representar un ID de categoría como string directamente.
// Esta interfaz podría ser innecesaria si solo trabajas con strings,
// pero la incluyo aquí por claridad y en caso de que desees expandir la información de cada categoría más adelante.
export interface VehicleCategory {
    categoryId: string;
}

export interface VehicleResponse {
    categories: string[];
}
