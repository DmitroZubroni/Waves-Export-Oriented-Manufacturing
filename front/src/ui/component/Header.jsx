import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    const {isAuthorized, logout} = useContext(AtlantContext);

    return (
        <div className="navbar" style={{background: "#ac6aee", color: "white", padding: "15px"}}>
            <h2> Waves Post Office</h2>
            {
                isAuthorized === false ?
                    <>
                        <Link to="/" style={{color:"white"}} className="btn">страница авторизации</Link>
                    </> :
                    <>
                        <Link to="/" style={{color:"white"}} className="btn"> личный кабинет</Link>
                        <Link to="/state" style={{color:"white"}} className="btn"> весь стейт блокчейна </Link>
                        <Link to="/products" style={{color:"white"}} className="btn"> продукты</Link>
                        <Link to="/bids" style={{color:"white"}} className="btn"> заявки </Link>
                        <Link to="/userCard" style={{color:"white"}} className="btn"> карточка пользователя </Link>
                        <Link to="/func" style={{color:"white"}} className="btn"> функции </Link>
                        <Link to="/" style={{color:"white"}} className="btn" onClick={logout}> выйти </Link>
                    </>
            }
        </div>
    )
}
export default Header;