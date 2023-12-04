import { useState } from "react";
import ShelfManagement from "./components/ShelfManagement";
import HistoryPage from "./components/HistoryPage";

function ShelfPage() {

    const [historyClick, setHistoryClick] = useState(false);

    return (
        <div className="container">
            <div className="mt-3">
                <nav>
                    <div
                        className="nav nav-tabs"
                        id="nav-tab"
                        role="tablist"
                    >
                        <button
                            onClick={() => setHistoryClick(false)}
                            className="nav-link active"
                            id="nav-rent-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-rent"
                            type="button"
                            role="tab"
                            aria-controls="nav-rent"
                            aria-selected="true"
                        >
                            Добавлено
                        </button>
                        <button
                            onClick={() => setHistoryClick(true)}
                            className="nav-link" id="nav-history-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-history"
                            type="button"
                            role="tab"
                            aria-controls="nav-history"
                            aria-selected="false"
                        >
                            История
                        </button>
                    </div>
                </nav>
                <div
                    className="tab-content"
                    id="nav-tabContent"
                >
                    <div
                        className="tab-pane fade show active"
                        id="nav-rent"
                        role="tabpanel"
                        aria-labelledby="nav-rent-tab"
                    >
                        <ShelfManagement />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-history"
                        role="tabpanel"
                        aria-labelledby="nav-history-tab"
                    >
                        <HistoryPage />
                        История добавления
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShelfPage;