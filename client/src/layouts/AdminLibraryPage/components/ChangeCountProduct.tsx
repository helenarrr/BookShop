import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import Book from "../../../models/Book";

interface Props {
    productItem: Book;
    removeItem: any;
}

function ChangeCountProduct(arg: Props) {
    const { authState } = useOktaAuth();
    const [count, setCount] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchProductInState = () => {
            arg.productItem.copies
                ? setCount(arg.productItem.copies)
                : setCount(0);

            arg.productItem.copiesAvailable
                ? setRemaining(arg.productItem.copiesAvailable)
                : setRemaining(0);
        };
        fetchProductInState();
    }, []);

    async function inc() {
        const url = `${process.env.REACT_APP_API_URL}/admin/secure/count/inc?productId=${arg.productItem?.id}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            }
        };

        const upd = await fetch(url, requestOptions);
        if (!upd.ok) {
            throw new Error("Ошибка inc()");
        }
        setCount(count + 1);
        setRemaining(remaining + 1);
    }

    async function dec() {
        if (count == 0)
            return;
        const url = `${process.env.REACT_APP_API_URL}/admin/secure/count/dec?productId=${arg.productItem?.id}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            }
        };

        const upd = await fetch(url, requestOptions);
        if (!upd.ok) {
            throw new Error("Ошибка dec()");
        }
        setCount(count - 1);
        setRemaining(remaining - 1);
    }

    async function deleteBook() {
        const url = `${process.env.REACT_APP_API_URL}/admin/secure/remove/product?productId=${arg.productItem?.id}`;
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            }
        };

        const upd = await fetch(url, requestOptions);
        if (!upd.ok) {
            throw new Error("Ошибка dec()");
        }
        arg.removeItem();
    }

    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {
                            arg.productItem.img ?
                                <img src={arg.productItem.img}
                                    className="small-img-admin"
                                />
                                :
                                <img
                                    src={require("./../../../Images/ImagesBooks/book_001.png")}
                                    className="small-img-admin"
                                />
                        }
                    </div>
                    <div
                        className="d-lg-none d-flex justify-content-center align-items-center">
                        {
                            arg.productItem.img ?
                                <img
                                    src={arg.productItem.img}
                                    className="small-img-admin"
                                />
                                :
                                <img
                                    src={require("./../../../Images/ImagesBooks/book_001.png")}
                                    className="small-img-admin"
                                />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {
                                arg.productItem.creator
                            }
                        </h5>
                        <h4>
                            {
                                arg.productItem.title
                            }
                        </h4>
                        <p
                            className="card-text">
                            {
                                arg.productItem.description
                            }
                        </p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center algin-items-center">
                        <p>
                            Общее количество: <b>{count}</b>
                        </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>
                            Доступно: <b>{remaining}</b>
                        </p>
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            className="m-1 btn btn-white text-white"
                            onClick={() => { inc(); }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="bi bi-plus-square-dotted button-icon-admin" viewBox="0 0 16 16">
                                <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                        </button>
                        <button
                            className="m-1 btn btn-white text-white"
                            onClick={() => { dec(); }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="bi bi-dash-square-dotted button-icon-admin" viewBox="0 0 16 16">
                                <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834 0h.916v-1h-.916v1zm1.833 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                            </svg>
                        </button>
                        <button
                            className="m-1 btn btn-white"
                            onClick={() => { deleteBook(); }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="bi bi-trash button-icon-admin" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeCountProduct;