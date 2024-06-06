import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignUpClicked}>Kayıt Ol</Button>
            <Button onClick={onLoginClicked}>Giriş Yap</Button>
        </>
    );
}

export default NavBarLoggedOutView;