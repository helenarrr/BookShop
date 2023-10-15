import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import { error } from "console";


const SearchBookPage = () => {

    const [book, setBooks] = useState<Book[]>([]);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [httperror, setHttpError] = useState<any>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const booksPerPage = 2;

    useEffect(() => {

        const fetchBooks = async () => {
            const baseUrl = `${process.env.REACT_APP_API_URL}/products`;
            const url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Ошибка загрузки");
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.products;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseData.page.totalPages);

            const loadedBooks: Book[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    creator: responseData[key].creator,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message);
        });
        window.scrollTo(0, 0);

    }, [currentPage]);





}