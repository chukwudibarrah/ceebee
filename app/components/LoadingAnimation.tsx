export default function LoadingAnimation() {
    return (
        <div>
            <div className="flex h-screen w-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
            </div>
        </div>
    )
}