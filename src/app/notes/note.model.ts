export class Note {
  public uid: string;
  public id: string;
  public title: string;
  public content: string;

  constructor(uid: string, id: string, title: string, content: string) {
    this.content = content;
    this.uid = uid;
    this.id = id;
    this.title = title;
  }
}
