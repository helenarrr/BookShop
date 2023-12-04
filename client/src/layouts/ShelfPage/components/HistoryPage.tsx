import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";
import HistoryModel from "../../../models/HistoryModel";

function HistoryPage() {

    const { authState } = useOktaAuth();
    const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<any>(null);
    const [histories, setHistories] = useState<HistoryModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchUserHistory = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/histories/search/findProductByUserEmail/?email=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=5`;
                console.log(url);

                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const storyResponse = await fetch(url, requestOptions);
                if (!storyResponse.ok) {
                    throw new Error("Ошибка!");
                }
                const storyJson = await storyResponse.json();
                console.log(storyJson._embedded.histories);

                setHistories(storyJson._embedded.histories);
                setTotalPages(storyJson.page.totalPages);
            }
            setIsLoadingHistory(false);

        }
        fetchUserHistory().catch((error: any) => {
            setIsLoadingHistory(false);
            setHttpError(error.message);
        })
    }, [authState, currentPage]);

    if (isLoadingHistory) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div className="mt-2">
            {histories.length > 0 ?
                <div>
                    <h5>История:</h5>
                    {histories.map((item, i) => (
                        <div key={i}>
                            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-none d-lg-block">
                                            {item.img ?
                                                <img
                                                    src={item.img}
                                                    className="image-carousel history-img"
                                                    alt="Book" />
                                                :
                                                <img
                                                    className="image-carousel history-img"
                                                    src={require("./../../../Images/ImagesBooks/book_001.png")}
                                                    alt=""
                                                />
                                            }
                                        </div>
                                        <div className="d-lg-none d-flex justify-content-center align-items-center">
                                            {item.img ?
                                                <img
                                                    src={item.img}
                                                    className="image-carousel history-img"
                                                    alt="" />
                                                :
                                                <img
                                                    className="image-carousel history-img"
                                                    src={require("./../../../Images/ImagesBooks/book_001.png")}
                                                    alt=""
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title"> {item.creator} </h5>
                                            <h4>{item.title}</h4>
                                            <p className="card-text">{item.description}</p>
                                            <hr />
                                            <p className="card-text">
                                                {`Взято: ${item.orderDate} Возврат: ${item.returnedDate}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
                :
                <div>
                    <h3 className="mt-3">История пуста </h3>
                    <Link
                        className="btn btn-primary"
                        to={"search"}
                    >
                        Найти новую
                    </Link>
                </div>
            }
            {
                totalPages > 1 && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            }
        </div >
    );
}

export default HistoryPage;