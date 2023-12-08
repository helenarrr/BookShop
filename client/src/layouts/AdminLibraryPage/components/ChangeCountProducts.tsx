import React from "react";
import { useEffect, useState } from "react";
import Book from "../../../models/Book";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import Pagination from "../../Utils/Pagination";
import ChangeCountProduct from "./ChangeCountProduct";

function ChangeCountProducts() {

    const [product, setProduct] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [httpError, setHttpError] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(3);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [productRemove, setProductRemove] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const url: string = `${process.env.REACT_APP_API_URL}/products?page=${currentPage - 1}&size=${productsPerPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Ошибка загрузки");
            }

            const dataJson = await response.json();
            const data = dataJson._embedded.products;

            setTotalProducts(dataJson.page.totalElements);
            setTotalPages(dataJson.page.totalPages);

            const loadedProducts: Book[] = [];

            for (const key in data) {
                loadedProducts.push({
                    id: data[key].id,
                    title: data[key].title,
                    creator: data[key].creator,
                    description: data[key].description,
                    copies: data[key].copies,
                    copiesAvailable: data[key].copiesAvailable,
                    category: data[key].category,
                    img: data[key].img,
                });
            }

            setProduct(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, productRemove]);

    const lastIndex: number = currentPage * productsPerPage;
    const firstIndex: number = lastIndex - productsPerPage;
    let lastItem = productsPerPage * currentPage <= totalProducts ?
        productsPerPage * currentPage : totalProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const removeProduct = () => setProductRemove(!productRemove);

    if (isLoading) {
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

    return (
        <div className="container mt-5">
            {totalProducts > 0 ?
                <>
                    <div className="mt-3">
                        <h3>Количество: ({firstIndex + 1} .. {lastItem} из {totalProducts})</h3>
                    </div>
                    {
                        product.map(item => (
                            <ChangeCountProduct
                                productItem={item}
                                key={item.id}
                                removeItem={removeProduct}
                            />
                        ))
                    }
                </>
                :
                <h5>Книга не добавлена</h5>
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

export default ChangeCountProducts;