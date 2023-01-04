import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { MobileHeader } from "./Header/MobileHeader";

export function Template({ children }) {
    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center dark:bg-purple">
                <Header />
                <main className="w-full  max-w-[800px] flex flex-col items-center mt-10 sm:mt-[60px]" style={{ minHeight: "calc(100vh - 120px)" }}>
                    <div className="sm:w-[75%] w-full px-6 small:px-0 flex flex-col relative items-center">
                        {children}
                    </div>
                </main>
                <Footer />
                <MobileHeader />
            </div>
        </>
    )
}