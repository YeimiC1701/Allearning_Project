import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { auth, firestore, storage } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin, faGithub, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/atoms/userState';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const iconBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: url('https://i.pinimg.com/736x/db/a4/b3/dba4b3fad38764fa8c07a5e44cbd13e0.jpg');
  background-repeat: repeat; /* Repite la imagen en ambas direcciones */
  background-position: top left; /* Alinea la imagen al inicio */
  min-height: 120vh; /* Mantiene la altura mínima del contenedor */
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
  position: relative;
`;


const CornerImage = styled.img`
  position: absolute;
  bottom: 120px;
  right: -30px;
  width: 450px;
  height: 450px;
  opacity: 0.2;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.7s ease;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  animation: ${pulse} 2s infinite;
`;

const Username = styled.input`
  font-size: 2rem;
  font-weight: 700;
  border: none;
  text-align: center;
  background: none;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;

const Email = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  margin-bottom: 20px;
`;

const AboutMeSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  animation: ${fadeIn} 1s ease;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
`;

const AboutMeTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: none;
  transition: all 0.3s ease;
  &:focus {
    border-color: #007bff;
  }
`;

const SocialMediaSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1.2s ease;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const SocialMediaInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const SocialMediaInput = styled.input`
  flex: 1;
  margin-left: 10px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:focus {
    border-color: #007bff;
  }
`;

const IconWrapper = styled.a`
  font-size: 2rem;
  color: inherit;
  &:hover {
    animation: ${iconBounce} 0.6s ease infinite;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  animation: ${fadeIn} 1.5s ease;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #333;
    animation: ${pulse} 1s infinite;
  }
`;

const EditButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
    animation: ${pulse} 1s infinite;
  }
`;

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(auth.currentUser?.displayName || '');
  const [aboutMe, setAboutMe] = useState('');
  const [socialLinks, setSocialLinks] = useState({ xTwitter: '', linkedin: '', github: '', facebook: '', instagram: '' });
  const [profileImage, setProfileImage] = useState('/avatar.png');
  const [name, setName] = useState('');
  const setUser = useSetRecoilState(userState); // Hook para actualizar el estado global del usuario
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/LoginPage');
    } else {
      const fetchUserProfile = async () => {
        const userDocRef = doc(firestore, 'users', auth.currentUser!.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setAboutMe(userData.aboutMe || '');
          setSocialLinks(userData.socialLinks || { xTwitter: '', linkedin: '', github: '', facebook: '', instagram: '' });
          setProfileImage(userData.profileImage || '/avatar.png');
          setUser((prevUser) => ({
            ...prevUser,
            name: userData.name || '',
            profileImage: userData.profileImage || '/avatar.png',
          }));
        }
      };
      fetchUserProfile();
    }
  }, [router, setUser]);

  const handleSave = async () => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: username });
      const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, {
        name,
        aboutMe,
        socialLinks,
        profileImage,
      }, { merge: true });
      setUser((prevUser) => ({
        ...prevUser,
        name,
        profileImage,
      }));
      alert('Profile updated successfully');
      setIsEditing(false);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `profileImages/${auth.currentUser?.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setProfileImage(url);

      // Save the profile image URL to Firestore
      if (auth.currentUser) {
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, { profileImage: url }, { merge: true });
      }

      // Update the Recoil state
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: url,
      }));
    }
  };

  return (
    <ProfileContainer>
      <CornerImage src="/monstruo_4.png" alt="Corner Monster" />
      <ProfileHeader>
        <label htmlFor="profileImage">
          <ProfileImage src={profileImage} alt="Profile Image" />
          <input
            type="file"
            id="profileImage"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>
        {isEditing ? (
          <Username
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          <h1>{username}</h1>
        )}
        <h2>{name}</h2>
        <Email>{auth.currentUser?.email}</Email>
      </ProfileHeader>
      <AboutMeSection>
        <SectionTitle>Acerca de mí</SectionTitle>
        <AboutMeTextarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Cuéntanos sobre ti..."
          disabled={!isEditing}
        />
      </AboutMeSection>
      <SocialMediaSection>
        <SectionTitle>Redes Sociales</SectionTitle>
        {isEditing ? (
          <>
            <SocialMediaInputWrapper>
              <FontAwesomeIcon icon={faXTwitter} style={{ marginRight: '5px', color: "#1DA1F2" }} />
              <SocialMediaInput
                type="text"
                placeholder="X (antes Twitter)"
                value={socialLinks.xTwitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, xTwitter: e.target.value })}
              />
            </SocialMediaInputWrapper>
            <SocialMediaInputWrapper>
              <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '5px', color: "#0077B5" }} />
              <SocialMediaInput
                type="text"
                placeholder="LinkedIn"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
              />
            </SocialMediaInputWrapper>
            <SocialMediaInputWrapper>
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: '5px', color: "#333" }} />
              <SocialMediaInput
                type="text"
                placeholder="GitHub"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
              />
            </SocialMediaInputWrapper>
            <SocialMediaInputWrapper>
              <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '5px', color: "#3b5998" }} />
              <SocialMediaInput
                type="text"
                placeholder="Facebook"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
              />
            </SocialMediaInputWrapper>
            <SocialMediaInputWrapper>
              <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '5px', color: "#E4405F" }} />
              <SocialMediaInput
                type="text"
                placeholder="Instagram"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
              />
            </SocialMediaInputWrapper>
          </>
        ) : (
          <SocialMediaIcons>
            {socialLinks.xTwitter && (
              <IconWrapper href={socialLinks.xTwitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: '2rem', color: "#1DA1F2" }} />
              </IconWrapper>
            )}
            {socialLinks.linkedin && (
              <IconWrapper href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '2rem', color: "#0077B5" }} />
              </IconWrapper>
            )}
            {socialLinks.github && (
              <IconWrapper href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} style={{ fontSize: '2rem', color: "#333" }} />
              </IconWrapper>
            )}
            {socialLinks.facebook && (
              <IconWrapper href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '2rem', color: "#3b5998" }} />
              </IconWrapper>
            )}
            {socialLinks.instagram && (
              <IconWrapper href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2rem', color: "#E4405F" }} />
              </IconWrapper>
            )}
          </SocialMediaIcons>
        )}
      </SocialMediaSection>
      <ButtonContainer>
        {isEditing ? (
          <SaveButton onClick={handleSave}>Guardar cambios</SaveButton>
        ) : (
          <EditButton onClick={() => setIsEditing(true)}>Editar perfil</EditButton>
        )}
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default ProfilePage;
