/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
  // ...other configurations

  images: {
    domains: [
      'www.modularkitcheninnoida.com',
      'api.designindianwardrobe.com',
      'images.unsplash.com',
      'www.imagekit.io',
      'ik.imagekit.io',
      'homes.devotionalindia.com',
      'cdn-icons-png.flaticon.com',
      'www.freepik.com',
      'img.freepik.com',
      'hlwebsite.s3.ap-south-1.amazonaws.com',
      'www.designindiankitchen.com',
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // async redirects() {
  //   return [
  //     // ...other redirects
  //     {
  //       source: '/calculator/image-maps/:space',
  //       destination: '/calculator/image-maps/[space]',
  //       permanent: true,
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      // {
      //   source: '/locations/:location*',
      //   destination: '/locations/[...location]',
      // },
      {
        source: '/modular-interior-design-ideas',
        destination: '/design-ideas',
      },
      {
        source:
          '/get-free-estimate-by-top-interior-brand-in-delhi-gurgaon-noida-india',
        destination: '/calculator',
      },
      {
        source: '/collaborate-with-architects-interior-designers',
        destination: '/collaborate-us',
      },
      {
        source: '/book-a-interior-design-visit',
        destination: '/contact',
      },
      {
        source: '/refer-and-get-rewards-interior-designers',
        destination: '/refer-and-earn',
      },

      //modular design ideas
      {
        source: '/modular-interior-design-ideas',
        destination: '/',
      },
      {
        source: '/modular-kitchen-designs',
        destination: '/modular-interiors/kitchen-designs',
      },
      {
        source: '/wardrobe-designs',
        destination: '/modular-interiors/wardrobe',
      },
      {
        source: '/vanity-designs',
        destination: '/modular-interiors/vanities',
      },
      {
        source: '/dressers-designs',
        destination: '/modular-interiors/dressers',
      },
      {
        source: '/homes-by-design-indian-homes',
        destination: '/modular-interiors/our-homes',
      },
      {
        source: '/tv-unit-designs',
        destination: '/modular-interiors/tv-unit-designs',
      },
      {
        source: '/crockery-unit-designs',
        destination: '/modular-interiors/crockery-units',
      },
      {
        source: '/glass-partition-designs',
        destination: '/home-interior-services-india/glass-partition-designs',
      },
      {
        source: '/shoerack-designs',
        destination: '/',
      },
      {
        source: '/mandir-designs',
        destination: '/modular-interiors/mandir',
      },
      {
        source: '/chest-of-drawer-designs',
        destination: '/modular-interiors/chest-of-drawers',
      },
      {
        source: '/bar-unit-designs',
        destination: '/modular-interiors/bar-units',
      },
      {
        source: '/side-table-designs',
        destination: '/modular-interiors/side-tables',
      },
      {
        source: '/foyer-area-designs',
        destination: '/modular-interiors/foyer-cabinets',
      },
      {
        source: '/foldable-beds-designs',
        destination: '/modular-interiors/foldable-beds',
      },
      { source: '/home-office-designs', destination: '/' },
      {
        source: '/architectural-designs-services-india',
        destination: '/home-interior-designs',
      },
      {
        source: '/1bhk-apartment-interior-designs',
        destination: '/home-interior-designs/1bhk-residence-interior-designs',
      },
      {
        source: '/2bhk-apartment-interior-designs',
        destination: '/home-interior-designs/2bhk-residence-interior-designs',
      },
      {
        source: '/3bhk-apartment-interior-designs',
        destination: '/home-interior-designs/3bhk-residence-interior-designs',
      },
      {
        source: '/4bhk-apartment-interior-designs',
        destination: '/home-interior-designs/4bhk-residence-interior-designs',
      },
      {
        source: '/villa-interior-designs',
        destination: '/home-interior-designs/villa',
      },
      {
        source: '/farmhouse-interior-designs',
        destination: '/home-interior-designs/farmhouse-interior-designs',
      },
      {
        source: '/penthouse-interior-designs',
        destination: '/home-interior-designs/penthouse-interior-designs',
      },
      {
        source: '/studio-apartment-interior-designs',
        destination: '/home-interior-designs/studio-apartment-interior-designs',
      },
      {
        source: '/bungalow-interior-designs',
        destination: '/home-interior-designs/bunglow-interior-designs',
      },
      {
        source: '/duplex-interior-designs',
        destination: '/home-interior-designs/duplex-residence-interior-designs',
      },
      {
        source: '/cottage-interior-designs',
        destination: '/home-interior-designs/cottage-interior-designs',
      },
      { source: '/complete-end-to-end-interiors', destination: '/' },
      {
        source: '/wooden-polishing-designs',
        destination: '/home-interior-services-india/wooden-polishing-designs',
      },
      {
        source: '/wooden-flooring-designs-designs',
        destination: '/home-interior-services-india/wooden-flooring-designs',
      },
      {
        source: '/vertical-garden-designs',
        destination: '/home-interior-services-india/vertical-garden-designs',
      },
      {
        source: '/wooden-ceiling-designs-ideas-inspiration',
        destination:
          '/home-interior-services-india/wooden-ceiling-designs-ideas-inspiration',
      },
      {
        source: '/upvc-window-designs',
        destination: '/home-interior-services-india/upvc-window-designs',
      },
      {
        source: '/tiling-design-ideas',
        destination: '/home-interior-services-india/tiling-design-ideas',
      },
      {
        source: '/sofa-designs-ideas',
        destination: '/home-interior-services-india/sofa-designs-ideas',
      },
      {
        source: '/kitchen-lightening-inspiration-ideas-india-designs',
        destination:
          '/home-interior-services-india/kitchen-lightening-inspiration-ideas-india',
      },
      {
        source: '/plumbing-works-interiors',
        destination:
          '/home-interior-services-india/home-plumbing-services-india',
      },
      {
        source: '/glass-partition-designs',
        destination: '/home-interior-services-india/glass-partition-designs',
      },
      {
        source: '/ceiling-designs',
        destination:
          '/home-interior-services-india/ceiling-design-ideas-inspiration-india',
      },
      {
        source: '/wall-panelling-designs',
        destination: '/home-interior-services-india/wall-panelling-designs',
      },
      {
        source: '/exterior-cladding-design-ideas-designs',
        destination:
          '/home-interior-services-india/exterior-cladding-design-ideas',
      },
      {
        source: '/wood-door-designs',
        destination:
          '/home-interior-services-india/door-design-dealers-manufacturers-india',
      },
      {
        source: '/home-electric-works-services-interiors',
        destination:
          '/home-interior-services-india/home-electric-works-services',
      },
      {
        source: '/bed-designs-dealers-manufacturers-india-designs',
        destination:
          '/home-interior-services-india/bed-designs-dealers-manufacturers-india',
      },
      {
        source: '/paint-works-interiors',
        destination:
          '/home-interior-services-india/home-painting-services-delhi-ncr',
      },
      {
        source: '/complete-end-to-end-interior-works',
        destination:
          '/home-interior-services-india/end-to-end-interior-services-delhi-ncr-india',
      },
      {
        source: '/commercial-interior-works-interiors',
        destination:
          '/home-interior-services-india/commercial-interiors-services-delhi-ncr-india',
      },
      {
        source: '/architectural-consultancy',
        destination:
          '/architectural-designs-services-india/architectural-consultancy',
      },
      {
        source: '/top-architects-in-india',
        destination:
          '/architectural-designs-services-india/end-to-end-architectural-services',
      },
      {
        source: '/architectural-brand-in-india',
        destination:
          '/architectural-designs-services-india/architectural-designing-and-planning',
      },
      {
        source: '/commercial-architectural-delhi-india',
        destination:
          '/architectural-designs-services-india/commercial-architectural-services',
      },
      {
        source: '/home-renovation-services',
        destination: '/home-renovation-service',
      },
      {
        source: '/structural-renovation-services',
        destination: '/home-renovation-service/structural-renovation',
      },
      {
        source: '/home-interior-designs-renovation-services',
        destination: '/home-renovation-service/interior-renovation',
      },
      {
        source: '/bedroom-renovation-services',
        destination: '/home-renovation-service/bedroom-renovation',
      },
      {
        source: '/lounge-renovation-services',
        destination: '/home-renovation-service/lounge-renovation',
      },
      {
        source: '/bathroom-renovation-services',
        destination: '/home-renovation-service/bathroom-renovation',
      },
      {
        source: '/terrace-renovation-services',
        destination: '/home-renovation-service/terrace-renovation',
      },
      {
        source: '/living-room-renovation-services',
        destination: '/home-renovation-service/living-room-renovation',
      },
      {
        source: '/modular-kitchen-top-brand-india-renovation-services',
        destination: '/home-renovation-service/modular-kitchen-renovation',
      },
      {
        source: '/wardrobe-renovation-services',
        destination: '/home-renovation-service/wardrobe-renovation',
      },
      {
        source: '/mandir-renovation-services',
        destination: '/home-renovation-service/mandir-renovation',
      },
      {
        source: '/gym-spa-renovation-services',
        destination: '/home-renovation-service/gym-spas-renovation',
      },
      {
        source: '/hotel-renovation-services',
        destination: '/home-renovation-service/hotel-renovation',
      },
      {
        source: '/farmhouse-renovation-services',
        destination: '/home-renovation-service/farmhouse-renovation',
      },
      {
        source: '/banquet-renovation-services',
        destination: '/home-renovation-service/banquet-renovation',
      },
      {
        source: '/villa-renovation-services',
        destination: '/home-renovation-service/villa-renovation',
      },
      {
        source: '/architect-advice-tips-ideas',
        destination: '/',
      },
      {
        source: '/architectural-consultancy',
        destination: '/',
      },
      {
        source: '/architectural-brand-in-india',
        destination: '/',
      },
      {
        source: '/top-architects-in-india',
        destination: '/',
      },
      {
        source: '/luxury-interiors-delhi-india',
        destination: '/',
      },
      {
        source: '/home-renovation-services',
        destination: '/',
      },
      {
        source: '/top-modular-kitchen-brand',
        destination: '/',
      },
      {
        source: '/modular-kitchen-types',
        destination: '/',
      },
      {
        source: '/modular-kitchen-designs',
        destination: '/',
      },
      {
        source: '/luxury-modular-kitchen-india',
        destination: '/',
      },
      {
        source: '/wardrobe-designs',
        destination: '/wardrobe-design-gallery-india',
      },
      {
        source: '/types-of-wardrobe-designs',
        destination: '/wardrobe-design-gallery-india/types-of-wardrobes',
      },
      {
        source: '/luxury-wardrobe-designs-india',
        destination: '/wardrobe-design-gallery-india/luxury-wardrobes-designs',
      },
      {
        source: '/lacquer-glass-wardrobe-designs',
        destination:
          '/wardrobe-design-gallery-india/lacquer-glass-wardrobe-designs',
      },
      {
        source: '/wardrobe-renovation-services',
        destination:
          '/wardrobe-design-gallery-india/wardrobe-renovation-services',
      },
      {
        source: '/living-room-designs',
        destination: '/',
      },
      {
        source: '/tv-unit-designs',
        destination: '/',
      },
      {
        source: '/crockery-unit-designs',
        destination: '/',
      },
      {
        source: '/home-office-designs',
        destination: '/',
      },
      {
        source: '/shoerack-designs',
        destination: '/',
      },
      {
        source: '/modular-interior-design-ideas',
        destination: '/',
      },
      {
        source: '/mandir-designs',
        destination: '/modular-interiors/mandir',
      },
      {
        source: '/chest-of-drawer-designs',
        destination: '/modular-interiors/chest-of-drawers',
      },
      {
        source: '/Bar-unit-designs',
        destination: '/modular-interiors/bar-units',
      },
      {
        source: '/side-table-designs',
        destination: '/modular-interiors/side-tables',
      },
      {
        source: '/home-renovation-services',
        destination: '/home-renovation-service',
      },
      {
        source: '/virtual-interior-designing-meeting',
        destination: '/schedule-videocall',
      },
      {
        source: '/about-best-interior-designers-architects',
        destination: '/about-us',
      },
      {
        source: '/largest-interior-designing-brand',
        destination: '/',
      },

      {
        source: '/home-interior-designs-designing-estimates-pricing',
        destination: '/GetQuote',
      },
      {
        source: '/customer-reviews-interior-designs',
        destination: '/reviews',
      },
      {
        source: '/home-interior-designs-designing-plans-for-residences',
        destination: '/offers',
      },
      {
        source: '/why-choose-the-best-interior-designers',
        destination: '/why-choose-us',
      },
      {
        source: '/join-the-largest-interior-designing-brand',
        destination: '/join-us',
      },
      {
        source: '/book-with-top-interior-designers-architects',
        destination: '/book-visit',
      },
      {
        source: '/refer-and-get-rewards-interior-designers',
        destination: '/refer-and-earn',
      },
      {
        source: '/home-interior-designs-designing-estimates-pricing',
        destination: '/GetQuote',
      },
      {
        source: '/contact-top-interior-designers-architects',
        destination: '/architects-speak',
      },
      {
        source: '/foyer-area-designs',
        destination: '/modular-interiors/foyer-cabinets',
      },
      {
        source: '/foldable-area-designs',
        destination: '/modular-interiors/foldable-beds',
      },
      { source: '/home-renovation-services', destination: '/' },
      { source: '/dressers-designs', destination: '/' },
      { source: '/modular-kitchen-price-estimator', destination: '/' },
      { source: '/dressers-designs', destination: '/' },

      {
        source: '/astounding-lobby-area-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/astounding-lobby-area-designs',
      },

      {
        source: '/artistic-bedroom-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/artistic-bedroom-designs',
      },

      {
        source: '/comforting-balcony-area-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/comforting-balcony-area-designs',
      },

      {
        source: '/soulful-kids-room-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/soulful-kids-room-designs',
      },
      {
        source: '/relaxed-walk-in-wardrobe-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/relaxed-walk-in-wardrobe-designs',
      },

      {
        source: '/handsome-modular-wardrobe-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/handsome-modular-wardrobe-designs',
      },

      {
        source: '/exquisite-bathroom-remodel-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/exquisite-bathroom-remodel-designs',
      },

      {
        source: '/chilled-party-bar-unit-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/chilled-party-bar-unit-designs',
      },

      {
        source: '/blissful-parents-room-designs-ideas',
        destination:
          '/selected-homes-exclusive-interior-designs-india/blissful-parents-room-designs-ideas',
      },

      {
        source: '/spellbinding-living-room-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/spellbinding-living-room-designs',
      },

      {
        source: '/delicious-modular-kitchen-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/delicious-modular-kitchen-designs',
      },

      {
        source: '/mesmerizing-modern-home-interiors',
        destination:
          '/selected-homes-exclusive-interior-designs-india/mesmerizing-modern-home-interiors',
      },

      {
        source: '/wholesome-modern-interiors-designs',
        destination:
          '/selected-homes-exclusive-interior-designs-india/mesmerizing-modern-home-interiors',
      },

      // Add more custom rewrites as needed
    ]
  },
}
// nnchanges
export default nextConfig
