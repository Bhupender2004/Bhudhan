/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'www.deere.co.in' },
      { protocol: 'https', hostname: 'www.tractorjunction.com' },
      { protocol: 'https', hostname: 'www.newholland.com' },
      { protocol: 'https', hostname: 'www.fieldking.com' },
      { protocol: 'https', hostname: 'www.aspee.com' },
      { protocol: 'https', hostname: 'www.sonalika.com' },
      { protocol: 'https', hostname: 'www.kubota.co.in' },
      { protocol: 'https', hostname: 'www.claas.co.in' },
      { protocol: 'https', hostname: 'www.maschio.com' },
      { protocol: 'https', hostname: 'www.swarajtractors.com' },
      { protocol: 'https', hostname: 'www.shaktimanagro.com' },
      { protocol: 'https', hostname: 'www.vsttillers.com' },
      { protocol: 'https', hostname: 'www.agriseedsindia.com' },
      { protocol: 'https', hostname: 'www.organicindiafarmer.com' },
      { protocol: 'https', hostname: 'www.naturecareindia.com' },
      { protocol: 'https', hostname: 'www.netafim.com' },
      { protocol: 'https', hostname: 'www.cropnutrition.com' },
      { protocol: 'https', hostname: 'www.cropguardindia.com' },
      { protocol: 'https', hostname: 'www.gardenpro.com' },
      { protocol: 'https', hostname: 'openweathermap.org' },
      { protocol: 'https', hostname: 'flagcdn.com' }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

}

module.exports = nextConfig
