import { Link } from "react-router-dom";
import Book from "../../../models/Book";
import StarReview from "../../Utils/StarReview";

interface Props {
    book: Book | undefined;
    mobile: boolean;
    currentCheckoutCount: number;
    isCheckedOut: boolean;
    isAuthenticated: any;
    checkoutBook: any;
    isReviewLeft: boolean;
    submitReview: any;
}

function CheckoutAndReviewBox(arg: Props) {
    function buttonRender() {
        if (arg.isAuthenticated) {
            if (!arg.isCheckedOut && arg.currentCheckoutCount < 5) {
                return (
                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => { arg.checkoutBook() }}
                    >
                        На полку
                    </button>
                );
            } else if (arg.isCheckedOut) {
                return (<p><b>Уже у вас</b></p>);
            } else if (!arg.isCheckedOut) {
                return (<p className="text-danger">План выполнен!</p>);
            }
        }
        return (<Link to={"/login"} className="btn btn-success btn-lg">Войти</Link>)
    }

    function reviewRender() {
        if (arg.isAuthenticated && !arg.isReviewLeft) {
            return (
                <StarReview
                    submitReview={arg.submitReview}
                />
            )
        } else if (arg.isAuthenticated && arg.isReviewLeft) {
            return (
                <p>Спасибо за ваш отзыв</p>
            )
        }
        return (
            <div>
                <hr />
                <p>Войдите, чтобы оставить отзыв</p>
            </div>
        )
    }

    return (
        <div className=
            {arg.mobile
                ? "card d-flex mt-5"
                : "card col-3 container d-flex mb-5"
            }>

            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{arg.currentCheckoutCount}</b> на полке
                    </p>
                    <hr />
                    {arg.book && arg.book.copiesAvailable && arg.book.copiesAvailable > 0
                        ? <h4 className="text-success">Доступно</h4>
                        : <h4 className="text-danger">Ожидание поступления</h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            {arg.book?.copiesAvailable} из  {arg.book?.copies}
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    Значение может меняться пока не будет сделан заказ
                </p>
                {reviewRender()}
            </div>
        </div >
    );
}

export default CheckoutAndReviewBox;