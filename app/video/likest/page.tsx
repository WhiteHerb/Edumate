import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Link from 'next/link';


export default async function Home() {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });

  const video = await db.all("SELECT * FROM video ORDER BY good DESC");
  return (
    <div>      
      <div className='videoFrame full'>
        {video.map((i, i_) => {
            return (
              <div key={Math.random()} className='video'>
                <Link key={Math.random()} href={'/video/'+i.id} className='video'>
                  <div key={Math.random()} className='thumbnail videoViewFrame'>
                    <video key={Math.random()} src={'/api/video?fileName='+i.src}></video>
                  </div>
                  <div key={Math.random()} className='videoDescription'>
                    <h1 key={Math.random()} className='videoTitle'>{i.title}</h1>
                    <div key={Math.random()} className='videoDiscription'>
                      <small key={Math.random()}>{i.description}</small>
                      <small key={Math.random()}>{i.view}회 시청</small>
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
