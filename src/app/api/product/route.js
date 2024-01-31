import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const admin = process.env.NEXT_PUBLIC_ADMIN;
    const password = process.env.NEXT_PUBLIC_PASSWORD;
    console.log(admin);

    const uri = `mongodb+srv://${admin}:${password}@archit.rrghorm.mongodb.net/`;
    console.log(uri);

    const client = new MongoClient(uri);


    try {
        await client.connect();

        const database = client.db('stock');
        const inventory = database.collection('inventory');


        const query = {};
        const allProducts = await inventory.find(query).toArray();

        console.log(allProducts);
        return NextResponse.json({ success: true, allProducts });
    } finally {

        await client.close();
    }

}

export async function POST(request) {
    console.log("hi");
    let body = await request.json();
    console.log(body);
    const uri = `mongodb+srv://${admin}:${password}@archit.rrghorm.mongodb.net/`;
    const client = new MongoClient(uri);
    console.log("product going to be added");
    try {
        await client.connect();

        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const product = await inventory.insertOne(body);

        console.log(product);
        return NextResponse.json({ product, ok: true });
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
