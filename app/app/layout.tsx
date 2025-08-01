export const metadata = {
    title: "NextJs",
    description:  "Gnerated by the nexjs"
}

export default function RootLayout({
    children,
}:{
    children: React.ReactNode
}){
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}