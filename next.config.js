/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'reactjs.org', 'styled-components.com'], // Añade aquí otros dominios si es necesario
  },
}

module.exports = nextConfig
