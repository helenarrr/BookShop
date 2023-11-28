import { useEffect, useState } from "react";
import Book from "../../models/Book";
import SpinnerLoading from "../Utils/SpinnerLoading";
import StarsReview from "../Utils/StarsReview";
import CheckoutAndReviewBox from "./components/CheckoutAndReviewBox";
import Review from "../../models/Review";
import LatestReviews from "./components/LatestReview";
import { useOktaAuth } from "@okta/okta-react/";
import ReviewRequestModel from "../../models/ReviewRequestModels";

function BookCheckoutPage() {
    const { authState } = useOktaAuth();

    const [book, setBook] = useState<Book>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [httpError, setHttpError] = useState<any>(null);

    const [reviews, setReviews] = useState<Review[]>([])
    const [totalStars, setTotalStars] = useState<number>(0);
    const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);

    const [currentCheckoutCount, setCurrentCheckoutCount] = useState<number>(0);
    const [isLoadingCurrentCheckoutCount, setIsLoadingCurrentCheckoutCount] = useState<boolean>(true);

    const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);
    const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState<boolean>(true);

    const [isReviewLeft, setIsReviewLeft] = useState<boolean>(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState<boolean>(true);

    const productId = (window.location.pathname).split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            const url = `${process.env.REACT_APP_API_URL}/products/${productId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Ошибка загрузки");
            }

            const responseJson = await response.json();
            const loadedBook: Book = {
                id: responseJson.id,
                title: responseJson.title,
                creator: responseJson.creator,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message)
        })
    }, [isCheckedOut, productId]);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API_URL}/reviews/search/findByProductId?productId=${productId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Ошибка загрузки");
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: Review[] = [];
            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    productId: responseData[key].productId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    }, [isReviewLeft, productId]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/products/secure/currentorder/count`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error("Ошибка загрузки!");
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentCheckoutCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentCheckoutCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentCheckoutCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);

    useEffect(() => {
        const fetchUserCheckedOutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/products/secure/isorder/byuser?productId=${productId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const bookCheckedOut = await fetch(url, requestOptions);

                if (!bookCheckedOut.ok) {
                    throw new Error("Ошибка загрузки!");
                }

                const bookCheckedOutResponseJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutResponseJson);
            }
            setIsLoadingBookCheckedOut(false);
        }
        fetchUserCheckedOutBook().catch((error: any) => {
            setIsLoadingBookCheckedOut(false);
            setHttpError(error.message);
        })
    }, [authState, productId]);

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API_URL}/reviews/secure/user/product?productId=${productId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error("Ошибка");
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState, productId]);


    if (isLoading
        || isLoadingReview
        || isLoadingCurrentCheckoutCount
        || isLoadingBookCheckedOut
        || isLoadingUserReview
    ) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutBook() {
        const url = `${process.env.REACT_APP_API_URL}/products/secure/order?productId=${productId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Ошибка');
        }
        setIsCheckedOut(true);
    }

    async function submitReview(starInput: number, reviewDescription: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }

        const reviewModel = new ReviewRequestModel(starInput, bookId, reviewDescription);
        const url = `${process.env.REACT_APP_API_URL}/reviews/secure`;
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Something went wrong!");
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img
                                className="image-carousel checkout-img"
                                src={book?.img}
                                alt=""
                            />
                            :
                            <img
                                className="image-carousel checkout-img"
                                src={require("./../../Images/ImagesBooks/book_001.png")}
                                alt=""
                            />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.creator}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview
                                rating={totalStars}
                            />
                        </div>
                    </div>
                    <CheckoutAndReviewBox
                        book={book}
                        mobile={false}
                        currentCheckoutCount={currentCheckoutCount}
                        isAuthenticated={authState?.isAuthenticated}
                        isCheckedOut={isCheckedOut}
                        checkoutBook={checkoutBook}
                        isReviewLeft={isReviewLeft}
                        submitReview={submitReview}
                    />
                </div>
                <hr />
                <LatestReviews
                    productId={book?.id}
                    mobile={false}
                    reviews={reviews}
                    key={book?.id}
                />
            </div>

            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img
                            className="image-carousel checkout-img"
                            src={book?.img}
                            alt=""
                        />
                        :
                        <img
                            className="image-carousel checkout-img"
                            src={require("./../../Images/ImagesBooks/book_001.png")}
                            alt=""
                        />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.creator}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview
                            rating={totalStars}
                        />
                    </div>
                </div>
                <CheckoutAndReviewBox
                    book={book}
                    mobile={true}
                    currentCheckoutCount={currentCheckoutCount}
                    isAuthenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook}
                    isReviewLeft={isReviewLeft}
                    submitReview={submitReview}
                />
                <hr />
                <LatestReviews
                    productId={book?.id}
                    mobile={true}
                    reviews={reviews}
                    key={book?.id}
                />
            </div>
        </div>
    );
}

export default BookCheckoutPage;
