import chefImage from '../assets/Chef Claude Icon.png'
export default function Header(){
    return(
        <header>
            <img src={chefImage} alt="chefImage" width= "43px"height="52"/>
            <h1>Recipify</h1>
        </header>
    )
}