// src/data/products.js
import pbImg from '../assets/pb-20000.jpg';
import pb1 from '../assets/pb-20000-1.jpg';
import pb2 from '../assets/pb-20000-2.jpg';

import lsFlex from '../assets/ls-flex.jpg';
import lsFlex1 from '../assets/ls-flex-1.jpg';

import wcBamboo from '../assets/wc-bamboo.jpg';
import wcBamboo1 from '../assets/wc-bamboo-1.jpg';

import pmClip from '../assets/pm-clip.jpg';
import pmClip1 from '../assets/pm-clip-1.jpg';

import ebOrbit from '../assets/eb-orbit.jpg';
import ebOrbit1 from '../assets/eb-orbit-1.jpg';

import lampUsbc from '../assets/lamp-usbc.jpg';
import lampUsbc1 from '../assets/lamp-usbc-1.jpg';

const products = [
  {
    id: 'pb-20000',
    title: 'FastCharge 20K Power Bank',
    price: 39.0,
    image: pbImg,
    images: [pb1, pb2],
    short: '20,000mAh fast-charging battery with USB-C PD & passthrough.',
    specs: {
      capacity: '20,000mAh',
      output: '45W PD',
      ports: ['USB-C', '2x USB-A'],
    },
    inventory: 120,
    tags: ['power', 'mobile', 'battery'],
  },
  {
    id: 'ls-flex',
    title: 'FlexLift Laptop Stand',
    price: 29.0,
    image: lsFlex,
    images: [lsFlex1],
    short: 'Foldable aluminum stand for better posture and airflow.',
    specs: {
      material: 'Aluminum',
      fits: 'Up to 15.6" laptops',
      feature: 'Adjustable height',
    },
    inventory: 80,
    tags: ['workspace', 'ergonomics'],
  },
  {
    id: 'wc-bamboo',
    title: 'EcoCharge Wireless Pad',
    price: 24.0,
    image: wcBamboo,
    images: [wcBamboo1],
    short: 'Bamboo-surface Qi wireless charger with 10W output.',
    specs: {
      type: 'Qi wireless',
      output: '10W',
      material: 'Bamboo',
    },
    inventory: 200,
    tags: ['wireless', 'eco'],
  },
  {
    id: 'pm-clip',
    title: 'ClipDrop Phone Mount',
    price: 12.0,
    image: pmClip,
    images: [pmClip1],
    short: 'Magnetic phone mount for dashboards and desks.',
    specs: {
      rotation: '360°',
      material: 'Aluminum & rubber',
    },
    inventory: 250,
    tags: ['mobile', 'mount'],
  },
  {
    id: 'eb-orbit',
    title: 'Orbit Earbuds (Basic)',
    price: 49.0,
    image: ebOrbit,
    images: [ebOrbit1],
    short: 'True wireless earbuds with 18h total battery life.',
    specs: {
      bluetooth: '5.2',
      battery: '18h',
      splash: 'IPX4',
    },
    inventory: 60,
    tags: ['audio', 'mobile'],
  },
  {
    id: 'lamp-usbc',
    title: 'DeskGlow LED Lamp (USB-C)',
    price: 34.0,
    image: lampUsbc,
    images: [lampUsbc1],
    short: 'Compact LED lamp with adjustable warmth and USB-C power.',
    specs: {
      dimmable: 'Yes',
      temperature: '3000–6500K',
      power: 'USB-C',
    },
    inventory: 90,
    tags: ['lighting', 'workspace'],
  },
];

export default products;
