import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Link from 'next/link';


export default async function Home() {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });

  const video = await db.all("SELECT * FROM video ORDER BY good DESC");
  const cut = 3
  const videos: any[][] = [[]]
  video.map((i) => {
    if (video.indexOf(i) / cut){
      videos.push(new Array())
    }
    videos[Math.floor(video.indexOf(i) / cut)].push(i)
  })
  
  return (
    <div>      
      <div className='videoFrame full'>
        {video.map((i) => {
            return (
              <div className='video'>
                <Link href={'/video/'+i.id} className='video'>
                  <div className='thumbnail videoViewFrame'>
                    <video src={'/api/video?fileName='+i.src}></video>
                  </div>
                  <div className='videoDescription'>
                    <h1 className='videoTitle'>{i.title}</h1>
                    <div className='videoDiscription'>
                      <small>{i.description}</small>
                      <small>{i.view}회 시청</small>
                    </div>
                  </div>
                </Link>
              </div>
          )
          })
        }
      </div>
    </div>
  )
}
