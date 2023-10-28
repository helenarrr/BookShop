import { Link } from "react-router-dom";
import Review from "../../../models/Review";
import Feedback from "../../Utils/Feedback";

interface Props {
    reviews: Review[];
    productId: number | undefined;
    mobile: boolean;
}
function LatestReviews(arg: Props) {
    return (
        <div className={arg.mobile ? "mt-3" : "row mt-5"}>
            <div className={arg.mobile ? "" : "col-sm-2 col-md-2"}>
                <h2>Последние отзывы: </h2>
            </div>
            <div className="col-sm-10 col-md-10">
                {arg.reviews.length > 0 ?
                    <>
                        {arg.reviews.slice(0, 3).map((review, i) => (
                            <Feedback review={review} />
                        ))}

                        <div className="m-3">
                            <Link
                                type="button"
                                className="btn main-color btn-md text-white"
                                to={`/`}>
                                Все отзывы
                            </Link>
                        </div>
                    </>
                    :
                    <div className="m-3">
                        <p className="lead">
                            Отзывов ещё нет
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default LatestReviews;
