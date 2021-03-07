interface AppLayer extends DefiniteObjectEntity {
    id: number;
    type: string;
    title: string;
    coords: number[];
    sizes: number[];
    limits: number[];
    angle: number;
    color: string;
    src: string;
}

interface AppImageLayer extends AppLayer {
    format: string;
}

interface AppTextLayer extends AppLayer {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
}

interface AppInitData extends DefiniteObjectEntity {
    productId: number;
    textureIndex: number;
    color: string | null;
    layers: ( AppImageLayer | AppTextLayer )[];
}