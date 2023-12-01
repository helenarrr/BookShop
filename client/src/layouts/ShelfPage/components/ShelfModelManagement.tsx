import ShelfCurrentItem from "../../../models/ShelfCurrentItem";

interface Props {
    shelfCurrentProduct: ShelfCurrentItem;
    mobile: boolean;
    returnProduct: any;
    renew: any;
}

function ShelfManagementModal(arg: Props) {
    return (
        <div
            className="modal fade"
            id={
                arg.mobile
                    ? `mobilemodal${arg.shelfCurrentProduct.product.id}`
                    : `modal${arg.shelfCurrentProduct.product.id}`
            }
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            key={arg.shelfCurrentProduct.product.id}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Варианты
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-2">
                                        {arg.shelfCurrentProduct.product?.img ?
                                            <img
                                                src={arg.shelfCurrentProduct.product.img}
                                                className="modal-img"
                                                alt="product" />
                                            :
                                            <img
                                                className="modal-img"
                                                src={require("./../../../Images/ImagesBooks/book_001.png")}
                                                alt=""
                                            />
                                        }
                                    </div>
                                    <div className="col-10 px-5">
                                        <h6>{arg.shelfCurrentProduct.product.creator}</h6>
                                        <h4>{arg.shelfCurrentProduct.product.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                {arg.shelfCurrentProduct.timeLeft > 0 &&
                                    <p className="text-secondary">
                                        Осталось дней: {arg.shelfCurrentProduct.timeLeft}.
                                    </p>
                                }
                                {arg.shelfCurrentProduct.timeLeft === 0 &&
                                    <p className="text-success">
                                        Сегодня
                                    </p>
                                }
                                {arg.shelfCurrentProduct.timeLeft < 0 &&
                                    <p className="text-danger">
                                        Срок вышел дней: {arg.shelfCurrentProduct.timeLeft}.
                                    </p>
                                }
                                <div className="list-group mt-3">
                                    <button
                                        onClick={() => arg.returnProduct(arg.shelfCurrentProduct.product.id)}
                                        data-bs-dismiss="modal"
                                        className="list-group-item list-group-item-action"
                                        aria-current="true"
                                    >
                                        Возврат
                                    </button>
                                    <button
                                        onClick=
                                        {
                                            arg.shelfCurrentProduct.timeLeft < 0
                                                ? (event) => event.preventDefault()
                                                : () => arg.renew(arg.shelfCurrentProduct.product.id)
                                        }
                                        data-bs-dismiss="modal"
                                        className={
                                            arg.shelfCurrentProduct.timeLeft < 0
                                                ? "list-group-item list-group-item-action inactiveLink"
                                                : "list-group-item list-group-item-action"
                                        }>
                                        {arg.shelfCurrentProduct.timeLeft < 0 ?
                                            "Просроченные не могут быть продлены" : "Продлить"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShelfManagementModal;