// src/data/products.js
const products = [
  {
    id: 'pb-20000', 
    title: 'FastCharge 20K Power Bank',
    price: 39.00,
    image: '/products/pb-20000.jpg',
    images: ['/products/pb-20000-1.jpg', '/products/pb-20000-2.jpg'],
    short: '20,000mAh fast-charging battery with USB-C PD & passthrough.',
    specs: {
      capacity: '20,000mAh',
      output: '45W PD',
      ports: ['USB-C', '2x USB-A']
    },
    inventory: 120,
    tags: ['power', 'mobile', 'battery']
  },
  {
    id: 'ls-flex',
    title: 'FlexLift Laptop Stand',
    price: 29.00,
    image: '/products/ls-flex.jpg',
    images: ['/products/ls-flex-1.jpg'],
    short: 'Foldable aluminum stand for better posture and airflow.',
    specs: {
      material: 'Aluminum',
      fits: 'Up to 15.6" laptops',
      feature: 'Adjustable height'
    },
    inventory: 80,
    tags: ['workspace', 'ergonomics']
  },
  {
    id: 'wc-bamboo',
    title: 'EcoCharge Wireless Pad',
    price: 24.00,
    image: '/products/wc-bamboo.jpg',
    images: ['/products/wc-bamboo-1.jpg'],
    short: 'Bamboo-surface Qi wireless charger with 10W output.',
    specs: {
      type: 'Qi wireless',
      output: '10W',
      material: 'Bamboo'
    },
    inventory: 200,
    tags: ['wireless', 'eco']
  },
  {
    id: 'pm-clip',
    title: 'ClipDrop Phone Mount',
    price: 12.00,
    image: '/products/pm-clip.jpg',
    images: ['/products/pm-clip-1.jpg'],
    short: 'Magnetic phone mount for dashboards and desks.',
    specs: {
      rotation: '360°',
      material: 'Aluminum & rubber'
    },
    inventory: 250,
    tags: ['mobile', 'mount']
  },
  {
    id: 'eb-orbit',
    title: 'Orbit Earbuds (Basic)',
    price: 49.00,
    image: '/products/eb-orbit.jpg',
    images: ['/products/eb-orbit-1.jpg'],
    short: 'True wireless earbuds with 18h total battery life.',
    specs: {
      bluetooth: '5.2',
      battery: '18h',
      splash: 'IPX4'
    },
    inventory: 60,
    tags: ['audio', 'mobile']
  },
  {
    id: 'lamp-usbc',
    title: 'DeskGlow LED Lamp (USB-C)',
    price: 34.00,
    image: '/products/lamp-usbc.jpg',
    images: ['/products/lamp-usbc-1.jpg'],
    short: 'Compact LED lamp with adjustable warmth and USB-C power.',
    specs: {
      dimmable: 'Yes',
      temperature: '3000–6500K',
      power: 'USB-C'
    },
    inventory: 90,
    tags: ['lighting', 'workspace']
  }
];

export default products;
