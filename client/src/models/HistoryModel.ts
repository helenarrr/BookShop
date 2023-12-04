class HistoryModel {
    id: number;
    userEmail: string;
    orderDate: string;
    returnedDate: string;
    title: string;
    creator: string;
    description: string;
    img: string;

    constructor(
        id: number,
        userEmail: string,
        orderDate: string,
        returnedDate: string,
        title: string,
        creator: string,
        description: string,
        img: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.orderDate = orderDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.creator = creator;
        this.description = description;
        this.img = img;
    }
}

export default HistoryModel;