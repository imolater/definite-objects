import { DefAppImageLayer } from '@/example/descs';

const correctImageLayer = {
    id: 321,
    type: 'image',
    format: 'png',
    title: 'Image layer',
    coords: [ 323, 533 ],
    sizes: [ 12, 42 ],
    limits: [ 50, 100 ],
    angle: 56,
    color: 'red',
    src: 'https://some-site.com',
};

const incorrectImageLayer = {
    id: '321',
    title: 'Image layer',
    coords: [ 323, 533 ],
    sizes: [ 12, 42 ],
    limits: [ 50, 100 ],
    angle: '56',
    color: 'red',
    src: 'https://some-site.com',
};

try {
    console.log( DefAppImageLayer.validate<AppImageLayer>( correctImageLayer ) );
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    console.log( DefAppImageLayer.validate<AppImageLayer>( incorrectImageLayer ) );
} catch ( e ) {
    console.log( e );
}