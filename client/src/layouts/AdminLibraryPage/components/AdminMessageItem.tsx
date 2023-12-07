import { useState } from "react";
import UserMessage from "../../../models/UserMessage";

interface Props {
    message: UserMessage;
    submitResponse: any;
}
function AdminMessageItem(arg: Props) {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [response, setResponse] = useState("");

    function handleSubmit() {
        if (arg.message.id !== null && response !== "") {
            arg.submitResponse(arg.message.id, response);
            setDisplayWarning(false);
            setResponse("");
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div >
            <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>🫢# {arg.message.title}</h5>
                <h6>{arg.message.userEmail}</h6>
                <p>{arg.message.userText}</p>
                <hr />
                <div>
                    <h5>Ответ: </h5>
                    <form action="PUT">
                        {
                            displayWarning &&
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                Заполните все поля
                            </div>
                        }
                        <div className="col-md-12 mb-3">
                            <label className="form-label">
                                Сообщение
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows={3}
                                onChange={(e) => setResponse(e.target.value)}
                                value={response}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary mt-3"
                                onClick={() => { handleSubmit(); }}
                            >
                                Ответить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminMessageItem;
