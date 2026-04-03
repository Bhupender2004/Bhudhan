/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co',
      'www.deere.co.in',
      'www.tractorjunction.com',
      'www.newholland.com',
      'www.fieldking.com',
      'www.aspee.com',
      'www.sonalika.com',
      'www.kubota.co.in',
      'www.claas.co.in',
      'www.maschio.com',
      'www.swarajtractors.com',
      'www.shaktimanagro.com',
      'www.vsttillers.com',
      'www.agriseedsindia.com',
      'www.organicindiafarmer.com',
      'www.naturecareindia.com',
      'www.netafim.com',
      'www.cropnutrition.com',
      'www.cropguardindia.com',
      'www.gardenpro.com',
      'openweathermap.org' // Added for weather icons
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

}

module.exports = nextConfig
