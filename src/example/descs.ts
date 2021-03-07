import { DefiniteObjectDescription } from '@/classes/definite-object';

export const DefAppLayer = new DefiniteObjectDescription( 'AppLayer' )
    .single( 'id', {
        type: Number,
        required: true,
    } )
    .single( 'title', {
        type: String,
        required: true,
    } )
    .single( 'type', {
        type: String,
        required: true,
    } )
    .single( 'src', {
        type: String,
        required: true,
    } )
    .array( 'coords', {
        type: Array,
        arrayOf: Number,
        required: true,
    } )
    .array( 'sizes', {
        type: Array,
        arrayOf: Number,
        required: true,
    } )
    .array( 'limits', {
        type: Array,
        arrayOf: Number,
        required: true,
    } )
    .single( 'angle', {
        type: Number,
        required: true,
    } )
    .single( 'color', {
        type: String,
        required: true,
    } );

export const DefAppImageLayer = DefAppLayer
    .extend( 'AppImageLayer' )
    .single( 'format', {
        type: String,
        required: true,
    } );

export const DefAppTextLayer = DefAppLayer
    .extend( 'AppTextLayer' )
    .single( 'text', {
        type: String,
        required: true,
    } )
    .single( 'fontFamily', {
        type: String,
        required: true,
    } )
    .single( 'fontSize', {
        type: Number,
        required: true,
    } )
    .single( 'fontStyle', {
        type: String,
        required: true,
    } )
    .single( 'fontWeight', {
        type: String,
        required: true,
    } );

export const DefAppInitData = new DefiniteObjectDescription( 'AppInitData' )
    .single( 'productId', {
        type: Number,
        required: true,
    } )
    .single( 'textureIndex', {
        type: Number,
        required: true,
    } )
    .single( 'color', {
        type: [ String, null ],
        required: true,
    } )
    .map( 'layers', {
        type: Array,
        arrayOf: [ DefAppImageLayer, DefAppTextLayer ],
        required: true,
    } );