import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import { notFound } from "next/navigation";

async function videoinfo(req: Request){
    const db = await open({
        filename: './db.sqlite',
        driver: sqlite3.Database,
    });
    
    const id = req.headers.get('id__')
    const session = await getServerSession(authOption)
    if (session === undefined) notFound()

    const video = await db.get(`select * from video where id='${id}'`)
    const views = await db.get(`select * from views where videoid='${id}' and userId='${session?.user?.email}'`)
    // console.log(views);
    
    if (views === undefined){
        const view = await db.get(`select view from video where id='${id}'`)
        await db.exec(`insert into views (videoId, userId) values('${id}', '${session?.user?.email}')`)
        await db.exec(`update video set view='${view!.view+1}' where id='${id}'`)
    }
    
    return NextResponse.json({
        title: video.title,
        src: video.src, 
        date: video.date,
        view: video.view,
        good: video.good,
    })
}

export async function POST(req: Request){
    return await videoinfo(req)
}