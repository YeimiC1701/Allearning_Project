// pages/materials.tsx

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: url('https://i.pinimg.com/736x/db/a4/b3/dba4b3fad38764fa8c07a5e44cbd13e0.jpg');
  background-repeat: repeat; /* Repite la imagen en ambas direcciones */
  background-position: top left; /* Alinea la imagen al inicio */
  min-height: 280vh; /* Mantiene la altura mínima del contenedor */
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #F9F9F9;
  color: #333;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 16px;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px;
  font-size: 1rem;
  flex-grow: 1;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  margin-right: 15px;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2C3E50;
  margin: 40px 0 20px;
  align-self: flex-start;
  padding: 15px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  width: 300px;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: #333;
`;

const CardDescription = styled.p`
  margin: 0;
  color: #666;
`;

const CardButton = styled.a`
  margin-top: auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  text-align: center;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const materials = {
  videos: [
    {
      type: 'Video',
      title: 'Los Números en Inglés del 1 al 100 | Contar hasta el 100 en Inglés',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=YLvk_DzlXeU',
      thumbnail: 'https://img.youtube.com/vi/YLvk_DzlXeU/0.jpg',
    },
    {
      type: 'Video',
      title: 'VEGETALES EN INGLÉS | CLASE DE INGLÉS PARA NIÑOS | AMIGO MUMU INGLÉS PARA NIÑOS',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=4RGQhAvoGJ4',
      thumbnail: 'https://img.youtube.com/vi/4RGQhAvoGJ4/0.jpg',
    },
    {
      type: 'video',
      title: 'INGLÉS PARA NIÑOS | PARTES DE LA ESCUELA EN INGLÉS | APRENDER INGLÉS',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=KuAd4GNCaOA',
      thumbnail: 'https://img.youtube.com/vi/KuAd4GNCaOA/0.jpg', 
    },
    {
      type: 'video',
      title: 'Útiles Escolares en Inglés | Inglês Para Niños',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=4ZeBdCGGvWA',
      thumbnail: 'https://img.youtube.com/vi/4ZeBdCGGvWA/0.jpg',
    },
    {
      type: 'video',
      title: '¡Aprende el Abecedario Cantando! 🎶 La Canción MÁS DIVERTIDA para Niños 🚀 A-Z',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=vsDEOToIHLg',
      thumbnail: 'https://img.youtube.com/vi/vsDEOToIHLg/0.jpg',
    },
    {
      type: 'video',
      title: 'Canción de los Colores en Inglés y Español - Canción para niños - Songs for Kids in spanish',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=c6BVOQfgMP8',
      thumbnail: 'https://img.youtube.com/vi/c6BVOQfgMP8/0.jpg',
    },
    {
      type: 'video',
      title: 'Inglés para Niños | Aprender Inglés',
      description: 'Contenido didactico perfecto para el aprendizaje de niños pequeños y nivel principiante.',
      url: 'https://www.youtube.com/watch?v=1hrcA6gIpmQ',
      thumbnail: 'https://img.youtube.com/vi/1hrcA6gIpmQ/0.jpg',
    },
  ],
  pdfs: [
    {
      type: 'PDF',
      title: 'Cuadernillo de Inglés Básico',
      description: 'Material de apoyo complementario de mayor nivel para niños con un nivel mas avanzado.',
      url: 'http://tebaevmartinez.com/documentos2/560810gt%20ingl%C3%89s%20b%C3%81sico%202022%20v2.pdf',
      thumbnail: '/pdf.jpg',
    },
    {
      type: 'PDF',
      title: 'PROYECTO APRENDO INGLES',
      description: 'Material de apoyo complementario de mayor nivel para niños con un nivel mas avanzado.',
      url: 'https://contenidos.mineducacion.gov.co/ntg/men/archivos/Referentes_Calidad/Modelos_Flexibles/Aceleracion_del_Aprendizaje/Guia_del_estudiante/Modulo%20Ingles.pdf',
      thumbnail: '/pdf.jpg',
    },
    {
      type: 'PDF',
      title: 'Guía Bilingüe Inglés – Español',
      description: 'Material de apoyo complementario de mayor nivel para niños con un nivel mas avanzado.',
      url: 'https://cdn.education.ne.gov/wp-content/uploads/2020/05/Gu%C3%ADa-Biling%C3%BCe-Ingl%C3%A9s-%E2%80%93-Espa%C3%B1ol-Binder.pdf',
      thumbnail: '/pdf.jpg', 
    },
    {
      type: 'PDF',
      title: 'https://n1englispaul.wordpress.com/wp-content/uploads/2014/07/ingles-basico-para-ninyos.pdf',
      description: 'Material de apoyo complementario de mayor nivel para niños con un nivel mas avanzado.',
      url: 'https://n1englispaul.wordpress.com/wp-content/uploads/2014/07/ingles-basico-para-ninyos.pdf',
      thumbnail: '/pdf.jpg', 
    },
  ],
  websites: [
    {
      type: 'Sitio Web',
      title: 'English4Kids',
      description: 'Pagina ideal para complementar conocimientos y ejercitar la mente para niños pequeños.',
      url: 'https://english4kidsonline.com',
      thumbnail: '/documentos.jpg', 
    },
    {
      type: 'Sitio Web',
      title: 'Inglés para niños',
      description: 'Pagina ideal para complementar conocimientos y ejercitar la mente para niños pequeños.',
      url: 'https://lingokids.com/es/ingles-para-ninos',
      thumbnail: '/documentos.jpg',
    },
    {
      type: 'Sitio Web',
      title: 'ARBOL ABC',
      description: 'Pagina ideal para complementar conocimientos y ejercitar la mente para niños pequeños.',
      url: 'https://arbolabc.com/juegos-de-ingles',
      thumbnail: '/documentos.jpg',
    },
  ],
};


const MaterialsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = {
    videos: materials.videos.filter(material =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    pdfs: materials.pdfs.filter(material =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    websites: materials.websites.filter(material =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <HeaderImage src="/monstruo_3.png" alt="Study Materials" />
          <HeaderTitle>Materiales de Apoyo</HeaderTitle>
        </HeaderLeft>
        <SearchSection>
          <SearchContainer>
            <SearchIcon icon={faSearch} />
            <SearchInput
              type="text"
              placeholder="Buscar materiales..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </SearchSection>
      </Header>

      <SectionTitle>Videos</SectionTitle>
      <CardsContainer>
        {filteredMaterials.videos.map((material, index) => (
          <Card key={index}>
            <CardImage>
              <Image src={material.thumbnail} alt={material.title} layout="fill" objectFit="cover" />
            </CardImage>
            <CardContent>
              <CardTitle>{material.title}</CardTitle>
              <CardDescription>{material.description}</CardDescription>
              <CardButton href={material.url} target="_blank" rel="noopener noreferrer">
                Ver {material.type}
              </CardButton>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>

      <SectionTitle>Documentos</SectionTitle>
      <CardsContainer>
        {filteredMaterials.pdfs.map((material, index) => (
          <Card key={index}>
            <CardImage>
              <Image src={material.thumbnail} alt={material.title} layout="fill" objectFit="cover" />
            </CardImage>
            <CardContent>
              <CardTitle>{material.title}</CardTitle>
              <CardDescription>{material.description}</CardDescription>
              <CardButton href={material.url} target="_blank" rel="noopener noreferrer">
                Ver {material.type}
              </CardButton>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>

      <SectionTitle>Páginas</SectionTitle>
      <CardsContainer>
        {filteredMaterials.websites.map((material, index) => (
          <Card key={index}>
            <CardImage>
              <Image src={material.thumbnail} alt={material.title} layout="fill" objectFit="cover" />
            </CardImage>
            <CardContent>
              <CardTitle>{material.title}</CardTitle>
              <CardDescription>{material.description}</CardDescription>
              <CardButton href={material.url} target="_blank" rel="noopener noreferrer">
                Ver {material.type}
              </CardButton>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default MaterialsPage;
