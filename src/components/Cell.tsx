import blueCard from "../assets/card.png";
import {
  robot1,
  robot2,
  robot3,
  robot4,
  robot5,
  robot6,
  robot7,
  robot8,
} from "../assets/robots";
import "./Cell.css";
const getImage = (type: string) => {
  let image = "";

  switch (type) {
    case "red":
      image = robot1;
      break;
    case "yellow":
      image = robot2;
      break;
    case "purple":
      image = robot3;
      break;
    case "green":
      image = robot4;
      break;
    case "grey":
      image = robot5;
      break;
    case "pink":
      image = robot6;
      break;
    case "brown":
      image = robot7;
      break;
    case "blue":
      image = robot8;
      break;
    default:
      image = "";
  }

  return image;
};

const getCardImage = () => {
  return blueCard;
};

interface IProps {
  id: number;
  type: string;
  flipped: boolean;
  solved: boolean;
  height: number;
  width: number;
  onClick: (id: number) => void;
  disabled: boolean;
}

const Cell: React.FC<IProps> = ({
  id,
  type,
  flipped,
  solved,
  height,
  width,
  onClick,
  disabled,
}) => {
  let frontImage = getImage(type);

  let cardImage = getCardImage();

  return (
    <div
      className={`cell ${flipped ? "flipped" : ""}`}
      onClick={() => (disabled ? null : onClick(id))}
    >
      <div className="flipper">
        <img
          alt="card"
          height={height}
          className={flipped ? "card__front" : "card__back"}
          width={width}
          src={flipped || solved ? frontImage : cardImage}
        />
      </div>
    </div>
  );
};
export default Cell;
