"use client"

import { DocumentNode, gql } from "@apollo/client";

export const REGISTER_USER:DocumentNode = gql`
mutation RegisterUser(
$name:String!
$email:String!
$password:String!
$phone_number:Float!
){
register(
registerDto:{
    name:$name,
    email:$email,
    password:$password,
    phone_number:$phone_number
}
){
access_token
activation_token
}
}
`