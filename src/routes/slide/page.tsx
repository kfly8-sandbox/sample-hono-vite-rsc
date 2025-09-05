import { SlideContent } from './components/SlideContent'
import { SlideContainer } from './components/SlideContainer'

export async function SlidePage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = 5

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">RSC Presentation</h1>

        <SlideContainer initialPage={currentPage} totalPages={totalPages}>
          <SlideContent page={currentPage} />
        </SlideContainer>
      </div>
    </div>
  )
}
