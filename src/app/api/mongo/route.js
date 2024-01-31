import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(request) {

    const uri = "mongodb+srv://mongodb:gXKKtC3ktYnov7mJ@archit.rrghorm.mongodb.net/";


    const client = new MongoClient(uri);


    try {
        await client.connect();

        const database = client.db('harry');
        const movies = database.collection('inventory');


        const query = {};
        const movie = await movies.findOne(query);

        console.log(movie);
        return NextResponse.json({ "a": 34, movie });
    } finally {

        await client.close();
    }

}