import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import UserMessage from "../../../models/UserMessage";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";
import AdminMessageItem from "./AdminMessageItem";
import AdminMessage from "../../../models/AdminMessage";

function AdminMessages() {

    const { authState } = useOktaAuth();

    const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
    const [httpError, setHttpError] = useState(null);

    const [messages, setMessages] = useState<UserMessage[]>([]);
    const [messagesPerPage] = useState<number>(3);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [btnSubmit, setBtnSubmit] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const messagesResponse = await fetch(url, requestOptions);
                if (!messagesResponse.ok) {
                    throw new Error("Ошибка загрузки");
                }
                const messagesResponseJson = await messagesResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage, btnSubmit, messagesPerPage]);

    if (isLoadingMessages) {
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

    async function submitResponse(id: number, msg: string) {
        const url = `${process.env.REACT_APP_API_URL}/messages/secure/admin/message`;
        if (
            authState
            && authState?.isAuthenticated &&
            id !== null
            && msg !== "") {
            const messageRequest: AdminMessage = new AdminMessage(id, msg);
            console.log(messageRequest);

            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageRequest)
            };

            console.log(requestOptions);


            const adminMessageResponse = await fetch(url, requestOptions);

            if (!adminMessageResponse.ok) {
                throw new Error("Ошибка");
            }
            setBtnSubmit(!btnSubmit);
        }
    }

    return (
        <div className="mt-3">
            {
                messages.length > 0 ?
                    <>
                        <h5>Текущие вопросы </h5>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <AdminMessageItem
                                    message={message}

                                    submitResponse={submitResponse}
                                />
                            </div>
                        ))
                        }
                    </>
                    :
                    <h5>Вопросов нет</h5>
            }
            {
                totalPages > 1
                && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            }
        </div >
    );
}

export default AdminMessages;
