import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
export async function GET(request) {
   const admin = process.env.NEXT_PUBLIC_ADMIN;
   const password = process.env.NEXT_PUBLIC_PASSWORD;
   const uri = `mongodb+srv://${admin}:${password}@archit.rrghorm.mongodb.net/`;


    const client = new MongoClient(uri);


    try {
        await client.connect();

        const database = client.db('Cinema');
        const movies = database.collection('Shows');


        const query = {};
        const movie = await movies.findOne(query);

        console.log(movie);
        return NextResponse.json({ movie });
    } finally {

        await client.close();
    }

}
