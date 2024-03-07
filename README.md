# Comedy Notebook
A standup comedy writing app with an AI assistant helper.

<img width="1382" alt="Screenshot 2024-03-07 at 5 28 16 PM" src="https://github.com/connor-henderson/standup-app/assets/78612354/e510fb1e-edd3-4a81-8022-cdbeedadf64d">


[Visite site](https://standup-app-eta.vercel.app/) 
1. Sign in
2. Go to your notebook

With more time I would refactor:
* topic, bit, and joke state variables to a shared context between notebook components
* Simplify the top level /notebook page (Example below)
  * Move sidebar elements to their own `Sidebar` element
  * Move top level separating divs into respective components
    <img width="706" alt="Screenshot 2024-03-07 at 5 34 56 PM" src="https://github.com/connor-henderson/standup-app/assets/78612354/e749d7f7-1056-4507-be67-1968cc1a67e5">


* Add a landing page
* Move prompt construction and openai client creation to the openai service folder
* Put the static variables (i.e., jokeTypes) in relevant files in a helpers folder
* Stronger typing, jsx -> tsx
* Add more AI assistant options between models and services (i.e. add Claude for opus access, maybe integrate LangChain)


## Running locally

Populate the following variables in your `.env`:
`POSTGRES_PRISMA_URL`
`POSTGRES_URL_NON_POOLING`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`NEXTAUTH_SECRET`
`OPENAI_API_KEY`

Make sure you have the required dependencies installed
```bash
npm i
```

Build and run the backend containers defined in the docker-compose.yml file

```bash
docker-compose up
```

Start the development server for the frontend

```bash
npm run dev
```

This command will start the development server with hot-reloading enabled, allowing you to see changes in real-time as you modify the frontend code.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
