export class Todo {
  constructor(
    public _id : string,
    public position : number,
    public isDone: boolean,
    public listId: string,
    public date:any,
    public user:string,
    public text:string,
    public startDate:any,
    public deletedAt:any,
    public createdAt:any,
    public updatedAt:any)
  {

  }
}


export class TodoList {
  constructor(
    public id : string,
    public date:any,
    public user:any,
    public todos: Todo[],
    public createdAt:any,
    public updatedAt:any)
  {

  }
}
