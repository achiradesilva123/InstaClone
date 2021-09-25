export type User ={
    id : String;
    name : String;
    imageUri : String;
}

export type Card ={
    id : String;
    content : String;
    contentImageUri :  String,
    user : User
}