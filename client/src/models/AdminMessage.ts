class AdminMessage {
    id: number;
    text: string;

    constructor(
        id: number,
        response: string) {
        this.id = id;
        this.text = response;
    }
}

export default AdminMessage;