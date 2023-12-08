class AppendProductRequest {
    title: string;
    creator: string;
    description: string;
    copies: number;
    category: string;
    img?: string;

    constructor(
        title: string,
        creator: string,
        description: string,
        copies: number,
        category: string) {
        this.title = title;
        this.creator = creator;
        this.description = description;
        this.copies = copies;
        this.category = category;
    }
}

export default AppendProductRequest;