import VerUser from '../AccountPage/VerUser';
import useUserData from '../auth/useUserData'

function Home() {
    const { auth, name, role, message } = useUserData();


    return (
        <div className="container-fluid" >
             <div className="login-container">
                <VerUser auth={auth} name={name} role={role} message={message} />
            </div>
        </div>
                   
    );
}

export default Home;