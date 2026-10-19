import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const NotFound = () => {
    const location = useLocation();
    const {t} = useTranslation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-6">
            <div className="arch-panel p-10 max-w-md w-full text-center">
                <h1 className="mb-3 text-5xl font-display font-bold">404</h1>
                <p className="mb-8 text-base text-muted-foreground">{t("notFound.message")}</p>
                <a
                    href="/"
                    className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors duration-200"
                >
                    {t("notFound.returnHome")}
                </a>
            </div>
        </div>
    );
};

export default NotFound;

