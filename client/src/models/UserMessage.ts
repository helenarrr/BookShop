class UserMessage {
    id?: number;
    userEmail?: string;
    title: string;
    userText: string;
    adminEmail?: string;
    adminText?: string;
    closed?: boolean;

    constructor(
        title: string,
        user_text: string) {
        this.title = title;
        this.userText = user_text;
    }
}

export default UserMessage;