import { useOktaAuth } from "@okta/okta-react/";
import { Link } from "react-router-dom";

function LibraryServices() {
    const { authState } = useOktaAuth();

    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">
                        Не получается что-то отыскать?
                    </h1>
                    <div>
                        <p className="lead">
                            Обратитесь в службу поддержки
                        </p>
                        <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                            {
                                authState?.isAuthenticated ?
                                    <Link
                                        to="/messages"
                                        type="button"
                                        className="btn main-color btn-lg px-4 me-md-2 fw-bold text-white">
                                        Техническая поддержка
                                    </Link>
                                    :
                                    <Link
                                        to="/login"
                                        type="button"
                                        className="btn main-color btn-lg px-4 me-md-2 fw-bold text-white">
                                        Войти
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}

export default LibraryServices;