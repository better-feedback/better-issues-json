import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import config from '../config/better.json'

interface Props {
  subtitle: string
  children: React.ReactNode
}

export default function Layout({ subtitle, children }: Props) {
  return (
    <div className="flex flex-col antialiased bg-gray-100 v-full">
      <Header siteTitle={`${config.title} | ${subtitle}`} />
      <Navbar />
      <div className="flex flex-wrap items-center justify-center pb-16 bg-gray-100 content">
        {children}
      </div>
      <Footer />
    </div>
  )
}
