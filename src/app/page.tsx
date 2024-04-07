import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

// function to get a new ChuckNorrisJoke
async function getNewJoke() {
  const timestamp = Date.now();
  const response = await fetch(`https://api.chucknorris.io/jokes/random?category=dev&timestamp=${timestamp}`);
  const data = await response.json();
  await setNewJoke(data.id, data.icon_url, data.value);
  return data;
}

//function to set the new ChuckNorrisJoke into db
async function setNewJoke(idj: string, iconj: string, valuej: string) {
  //check if already exist
  const existingJoke = await prisma.joke.findUnique({
    where: { id: idj },
  });
  //if didnt exist create a new one
  if (!existingJoke) {
    await prisma.joke.create({
      data: {
        id: idj,
        icon_url: iconj,
        value: valuej,
      },
    })
  }
}

// get the joke counter
async function getJokeCount() {
  const count = await prisma.joke.count();
  return count;
}

export default async function Home() {

  const joke = await getNewJoke();
  const count = await getJokeCount();

  return (
    <div className="container px-8 py-6 rounded-3xl bg-gray-300 text-center">

      {/* HEADER */}
      <header>
        <img src="logo.png" className="h-16" />
      </header>

      {/* MAIN */}
      <main className="container p-5 flex flex-row">
        <section className="bg-red-500 h-full basis-1/3 rounded-2xl">
          <img src="chuckapprove.jpg" className="w-full rounded-2xl" />
        </section>
        
        <section className=" flex flex-col p-10 rounded-2xl h-full basis-2/3 ms-5">
          <h1>{joke.value}</h1>
          <Link href="./" className="bg-blue-300 px-4 py-2 mt-5 rounded-lg">Dashboard</Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-400 p-2">
        <h5>Number of visitors: {count}</h5>
      </footer>
    </div>
  );
}
