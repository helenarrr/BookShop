import { useEffect, useState } from "react";
import Review from "../../models/Review";
import SpinnerLoading from "../Utils/SpinnerLoading";
import ReviewItem from "../Utils/ReviewItem";
import Pagination from "../Utils/Pagination";

function ReviewListPage() {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<any>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [reviewsPerPage] = useState<number>(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const bookId = (window.location.pathname).split("/")[2];

    useEffect(() => {
        const fetchBookReviewsData = async () => {

            const reviewUrl: string =
                `${process.env.REACT_APP_API_URL}/reviews/search/findByProductId?productId=${bookId}&page=${currentPage - 1}&size=${reviewsPerPage}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Ошибка загрузки");
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);

            const loadedReviews: Review[] = [];

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    productId: responseData[key].productId,
                    reviewDescription: responseData[key].reviewDescription,
                });
            }

            setReviews(loadedReviews);
            setIsLoading(false);
        };
        fetchBookReviewsData().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, bookId, reviewsPerPage]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ?
        reviewsPerPage * currentPage : totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div className="container mt-5">
            <div>
                <h3>Отзывы ({reviews.length})</h3>
            </div>
            <p>
                [{indexOfFirstReview + 1} .. {lastItem}] из {totalAmountOfReviews}:
            </p>
            <div className="row">
                {reviews.map(review => (
                    <ReviewItem review={review} key={review.id} />
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}

export default ReviewListPage;