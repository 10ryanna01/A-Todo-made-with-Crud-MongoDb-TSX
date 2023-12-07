import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";

interface IProps {
  isDark: Boolean;
  handleDarkMode: React.MouseEventHandler<HTMLButtonElement>;
}

export const ToggleTheme = ({ isDark, handleDarkMode }: IProps) => {
  return (
    <>
      <button
        onClick={handleDarkMode}
        className="AppUI__utilities__button__option"
      >
        {isDark ? <FaLightbulb /> : <FaRegLightbulb />}
      </button>
    </>
  );
};
