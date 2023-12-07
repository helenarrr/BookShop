import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import UserMessage from "../../../models/UserMessage";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";

function Messages() {
    const { authState } = useOktaAuth();
    const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<any>(null);

    const [messages, setMessages] = useState<UserMessage[]>([]);

    const [messagesPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (
                authState
                && authState?.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/messages/search/findByUserEmail/?userEmail=${authState?.accessToken?.claims.sub}&page=${currentPage - 1}&size=${messagesPerPage}`;
                console.log("url >>> " + url);

                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };

                const messagesResponse = await fetch(url, requestOptions);
                if (!messagesResponse.ok) {
                    throw new Error("Ошибка загрузки сообщений");
                }

                const messagesResponseJson = await messagesResponse.json();
                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }

        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.messages);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage]);

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

    return (
        <div className="mt-2">
            {messages.length > 0 ?
                <div>
                    <h5>История запросов: </h5>
                    {
                        messages.map((message, i) => (
                            <div key={i}>
                                <div className="card mt-2 shadow p-3 bg-body rounded">
                                    <h5>🤔 {message.id}: {message.title}</h5>
                                    <h6>{message.userEmail}</h6>
                                    <p>{message.userText}</p>
                                    <hr />
                                    <div>
                                        <h5>Ответ: </h5>
                                        {
                                            message.adminText && message.adminEmail ?
                                                <div>
                                                    <h6>{message.adminEmail} (admin)</h6>
                                                    <p>{message.adminText}</p>
                                                </div>
                                                :
                                                <p>
                                                    <i>
                                                        Саппорт свяжется с вами в ближайшее время
                                                    </i>
                                                </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                :
                <h5>
                    Все вопросы
                </h5>
            }
            {
                totalPages > 1 &&
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            }
        </div>
    );
}

export default Messages;