import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import UserMessage from "../../../models/UserMessage";

function NewMessage() {

    const { authState } = useOktaAuth();
    const [title, setTitle] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [displayWarning, setDisplayWarning] = useState<boolean>(false);
    const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

    async function handleSubmitQuestion() {
        const url = `${process.env.REACT_APP_API_URL}/messages/secure/send/message`;
        if (
            authState?.isAuthenticated
            && title !== ""
            && msg !== "") {
            const messageRequestModel: UserMessage = new UserMessage(title, msg);
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageRequestModel)
            };

            const newMsgResponse = await fetch(url, requestOptions);
            if (!newMsgResponse.ok) {
                throw new Error("Ошибка отправки");
            }

            setTitle("");
            setMsg("");
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                Задайте вопрос
            </div>
            <div className="card-body">
                <form method="POST">
                    {
                        displayWarning &&
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            Заполните все поля
                        </div>
                    }
                    {
                        displaySuccess &&
                        <div
                            className="alert alert-success"
                            role="alert"
                        >
                            Вопрос отправлен, скоро вы получите ответ
                        </div>
                    }
                    <div className="mb-3">
                        <label className="form-label">
                            Заголовок
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Суть вопроса"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Вопрос
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            onChange={e => setMsg(e.target.value)}
                            value={msg}
                        >
                        </textarea>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={handleSubmitQuestion}
                        >
                            Отправить вопрос
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewMessage;