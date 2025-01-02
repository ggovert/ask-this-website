
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 mx-auto bg-gradient-to-b from-zinc-900 to-zinc-600 text-white">
      <h1 className=" text-center text-4xl font-extrabold tracking-tight lg:text-5xl mb-5 mx-auto">Ask and you shall get the answer</h1>
      <h4 className="scroll-m-20 tracking-tight mx-auto text-center mb-10">
      Just add any website link after this link, and you can start asking any questions regarding the website that you want to know.
      </h4>
      <div className="border-2 border-gray-500 rounded-lg p-4">
        <ol className="text-zinc-400 text-sm tracking-normal mx-auto max-w-2xl space-y-4 list-decimal pl-5">
          <li>Choose the website that you want to ask about.</li>
          <li>Append it to the end of this website link
          </li>
          <li>Now the chatbot will appear, and you can freely ask about anything regarding the website.</li>
        </ol>
      </div>
    </div>
   

  );
}
