import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShelfCurrentItem from "../../../models/ShelfCurrentItem";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import ShelfManagementModal from "./ShelfManagementModal";

function ShelfManagement() {

    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState<any>(null);

    const [shelfCurrentItem, setShelfCurrentItem] = useState<ShelfCurrentItem[]>([]);
    const [isLoadingUserItem, setIsLoadingUserItem] = useState<boolean>(true);
    const [checkout, setCheckout] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserCurrentItem = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/products/secure/shelfproducts`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const shelfResponse = await fetch(url, requestOptions);
                if (!shelfResponse.ok) {
                    throw new Error("Ошибка!");
                }
                const shelfDataJson = await shelfResponse.json();
                setShelfCurrentItem(shelfDataJson);
            }
            setIsLoadingUserItem(false);
        }
        fetchUserCurrentItem().catch((error: any) => {
            setIsLoadingUserItem(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserItem) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnProduct(productId: number) {
        const url = ``;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Ошибка!");
        }
        setCheckout(!checkout);
    }

    async function renewProduct(productId: number) {
        const url = ``;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Ошибка!");
        }
        setCheckout(!checkout);
    }
    return (
        <div>
            <div className="d-none d-lg-block mt-2">
                {shelfCurrentItem.length > 0 ?
                    <>
                        <h5>Текущий список: </h5>
                        {shelfCurrentItem.map(shelfItem => (
                            <div key={shelfItem.product.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {shelfItem.product?.img ?
                                            <img
                                                src={shelfItem.product?.img}
                                                className="image-carousel checkout-img"
                                                alt="" />
                                            :
                                            <img
                                                className="image-carousel checkout-img"
                                                src={require("./../../../Images/ImagesBooks/book_001.png")}
                                                alt=""
                                            />
                                        }
                                    </div>

                                    <div
                                        className="card col-3 col-md-3 
                    container d-flex"
                                    >
                                        <div className="card-body">
                                            <div className="mt-3">
                                                <h4>Варианты: </h4>
                                                {shelfItem.timeLeft > 0 &&
                                                    <p className="text-secondary">
                                                        Осталось дней: {shelfItem.timeLeft}.
                                                    </p>
                                                }
                                                {shelfItem.timeLeft === 0 &&
                                                    <p className="text-success">
                                                        Сегодня
                                                    </p>
                                                }
                                                {shelfItem.timeLeft < 0 &&
                                                    <p className="text-danger">
                                                        Срок вышел дней: {shelfItem.timeLeft}.
                                                    </p>
                                                }
                                                <div className="list-group mt-3">
                                                    <button
                                                        className="list-group-item list-group-item-action"
                                                        aria-current="true"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#modal${shelfItem.product.id}`}
                                                    >
                                                        Управление
                                                    </button>
                                                    <Link
                                                        to={"search"}
                                                        className="list-group-item list-group-item-action">
                                                        Подыскать другие?
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className="mt-3">
                                                Помогите сделать выбор другим пользователям проще...
                                            </p>
                                            <Link
                                                className="btn btn-primary"
                                                to={`/checkout/${shelfItem.product.id}`}
                                            >
                                                Оставить отзыв
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <ShelfManagementModal
                                    shelfCurrentProduct={shelfItem}
                                    mobile={false}
                                    returnProduct={returnProduct}
                                    renew={renewProduct} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className="mt-3">
                            Отсутствует
                        </h3>
                        <Link
                            className="btn btn-primary"
                            to={`search`}
                        >
                            Найти новую
                        </Link>
                    </>
                }
            </div>


            <div className="container d-lg-none mt-2">
                {shelfCurrentItem.length > 0 ?
                    <>
                        <h5 className="mb-3">Сейчас </h5>

                        {shelfCurrentItem.map(item => (
                            <div key={item.product.id}>
                                <div className="d-flex justify-content-center align-items-center">
                                    {item.product?.img ?
                                        <img
                                            src={item.product?.img}
                                            className="image-carousel checkout-img"
                                            alt="Book" />
                                        :
                                        <img
                                            className="image-carousel checkout-img"
                                            src={require("./../../../Images/ImagesBooks/book_001.png")}
                                            alt=""
                                        />
                                    }
                                </div>
                                <div className="card d-flex mt-5 mb-3">
                                    <div className="card-body container">
                                        <div className="mt-3">
                                            <h4>Варианты</h4>
                                            {item.timeLeft > 0 &&
                                                <p className="text-secondary">
                                                    Дней осталось: {item.timeLeft}.
                                                </p>
                                            }
                                            {item.timeLeft === 0 &&
                                                <p className="text-success">
                                                    Сегодня
                                                </p>
                                            }
                                            {item.timeLeft < 0 &&
                                                <p className="text-danger">
                                                    Дней осталось: {item.timeLeft}.
                                                </p>
                                            }
                                            <div className="list-group mt-3">
                                                <button
                                                    className="list-group-item list-group-item-action"
                                                    aria-current="true"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#mobilemodal${item.product.id}`}
                                                >
                                                    Управление
                                                </button>
                                                <Link
                                                    to={"search"}
                                                    className="list-group-item list-group-item-action"
                                                >
                                                    Подыскать другие?
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className="mt-3">
                                            Помогите сделать выбор другим пользователям проще...
                                        </p>
                                        <Link
                                            className="btn btn-primary"
                                            to={`/checkout/${item.product.id}`}
                                        >
                                            Оставить отзыв
                                        </Link>
                                    </div>
                                </div>

                                <hr />
                                <ShelfManagementModal
                                    shelfCurrentProduct={item}
                                    mobile={true}
                                    returnProduct={returnProduct}
                                    renew={renewProduct} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className="mt-3">
                            Отсутствует
                        </h3>
                        <Link
                            className="btn btn-primary"
                            to={`/search`}>
                            Найти новую
                        </Link>
                    </>
                }
            </div>
        </div >
    );
}

export default ShelfManagement;