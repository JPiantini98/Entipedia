
import MainContainer from "../../components/mainContainer";
import HomeContainer from "@/components/homeContainer";

export default function MainPage() {
  return (

    <MainContainer>
      <HomeContainer />
    </MainContainer>


    /* NEW CODE ADDITION HERE 
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
        Welcome to the Main Page!
      </h1>
    </div>
    */
  );
}