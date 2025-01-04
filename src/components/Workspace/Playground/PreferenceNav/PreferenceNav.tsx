import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "../Playground";
import styled, { css } from "styled-components";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #34495e;
  height: 44px;
  width: 100%;
  padding: 0 20px;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b5998;
  }
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  background-color: #2c3e50;
  border-radius: 8px;
  color: #ecf0f1;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b5998;
  }
`;

const SettingsContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #34495e;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  color: #ecf0f1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TestCase = styled.div<{ isActive: boolean }>`
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${({ isActive }) => (isActive ? "#3b5998" : "#34495e")};
  color: ${({ isActive }) => (isActive ? "#ecf0f1" : "#95a5a6")};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #3b5998;
    color: #ecf0f1;
  }
`;

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
      document.removeEventListener("webkitfullscreenchange", exitHandler);
      document.removeEventListener("mozfullscreenchange", exitHandler);
      document.removeEventListener("MSFullscreenChange", exitHandler);
    };
  }, [isFullScreen]);

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = event.target.value;
    setSettings({ ...settings, fontSize: newFontSize });
  };

  return (
    <NavContainer>
      <LanguageButton>
        <div>JavaScript</div>
      </LanguageButton>

      <ButtonContainer>
        <SettingsButton onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}>
          <AiOutlineSetting />
        </SettingsButton>

        <SettingsButton onClick={handleFullScreen}>
          {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
        </SettingsButton>
      </ButtonContainer>
      {settings.settingsModalIsOpen && (
        <SettingsContainer>
          <p>Font Size: {settings.fontSize}</p>
          <select value={settings.fontSize} onChange={handleFontSizeChange}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <button onClick={() => setSettings({ ...settings, settingsModalIsOpen: false })}>
            Close
          </button>
        </SettingsContainer>
      )}
    </NavContainer>
  );
};

export default PreferenceNav;
