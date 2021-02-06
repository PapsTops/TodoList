export class Todo {

    readonly _id: string

    constructor(readonly description: string, public done: boolean = false) {
        this._id = Math.random().toString(36).substring(2);
    }
}
