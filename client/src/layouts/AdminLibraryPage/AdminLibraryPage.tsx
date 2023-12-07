import { useOktaAuth } from "@okta/okta-react/";
import { Redirect } from "react-router-dom";
import AdminMessages from "./components/AdminMessages";

function ManageLibraryPage() {
    const { authState } = useOktaAuth();

    if (authState?.accessToken?.claims.role === undefined) {
        return <Redirect to="/home" />
    }

    return (
        <div className="container">
            <div className="mt-5">
                <h3>Управление товарами</h3>
                <nav>
                    <div
                        className="nav nav-tabs"
                        id="nav-tab"
                        role="tablist"
                    >
                        <button
                            onClick={() => { }}
                            className="nav-link active"
                            id="nav-add-product-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-add-product"
                            type="button"
                            role="tab"
                            aria-controls="nav-add-product"
                            aria-selected="false"
                        >
                            Добавить новый товар
                        </button>
                        <button
                            onClick={() => { }}
                            className="nav-link"
                            id="nav-quantity-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-quantity"
                            type="button"
                            role="tab" aria-controls="nav-quantity"
                            aria-selected="true"
                        >
                            Изменить количество
                        </button>
                        <button
                            onClick={() => { }}
                            className="nav-link"
                            id="nav-messages-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-messages"
                            type="button"
                            role="tab"
                            aria-controls="nav-messages"
                            aria-selected="false"
                        >
                            Сообщения
                        </button>
                    </div>
                </nav>
                <div
                    className="tab-content"
                    id="nav-tabContent"
                >
                    <div
                        className="tab-pane fade show active"
                        id="nav-add-product"
                        role="tabpanel"
                        aria-labelledby="nav-add-product-tab"
                    >
                        Компонент для добавления
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-quantity"
                        role="tabpanel"
                        aria-labelledby="nav-quantity-tab"
                    >
                        Компонент для изменения
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-messages"
                        role="tabpanel"
                        aria-labelledby="nav-messages-tab"
                    >
                        <AdminMessages />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageLibraryPage;
