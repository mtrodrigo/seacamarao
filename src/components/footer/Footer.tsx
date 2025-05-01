
export const Footer = () => {
    return(
        <footer className="w-full bg-zinc-900 flex-col items-center justify-center text-center">
            <section className="flex items-center justify-center mt-2">
                <div className="flex items-center justify-center gap-5">
                    <a href="https://www.instagram.com/seacamarao/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="Instagram" className="h-9 w-9" />
                    </a>
                    <a href="https://www.facebook.com/seacamarao/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <img src="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000" alt="Facebook" className="h-9 w-9" />
                    </a>
                    <a href="https://wa.me/5535997422651" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <img src="https://img.icons8.com/?size=100&id=AltfLkFSP7XN&format=png&color=000000" alt="WhatsApp" className="h-9 w-9" />
                    </a>
                </div>
            </section>
            <section>
                <p className="text-zinc-200 mb-3">&copy; {new Date().getFullYear()} Sea Camarão. Todos od direitos reservados.</p>
            </section>
        </footer>
    )
}
