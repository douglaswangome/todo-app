import './Header.css';
import logo from "../assets/image/image.png";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <span>To-Do App</span>
    </div>
  );
}

export default Header;