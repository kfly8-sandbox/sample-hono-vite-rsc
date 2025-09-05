import { SlideNavigation } from './SlideNavigation'

type Props = {
  initialPage: number
  totalPages: number
  children: React.ReactNode
}

export function SlideContainer({ initialPage, totalPages, children }: Props) {
  return (
    <div className="space-y-6">
      {/* Slide Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 min-h-[500px]">
        <div className="slide-content-wrapper">
          {children}
        </div>
      </div>

      {/* Navigation - Client Component */}
      <SlideNavigation initialPage={initialPage} totalPages={totalPages} />
    </div>
  )
}