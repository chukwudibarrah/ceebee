import { Outfit, Zilla_Slab, Lato, Work_Sans  } from 'next/font/google'
import localFont from 'next/font/local'
 
// define your variable fonts
const outfit = Outfit({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal"],
    subsets: ["latin"],
    preload: false
})
const zilla = Zilla_Slab({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal"],
    subsets: ["latin"],
    preload: false
})
const lato = Lato({
    weight: ["100", "300", "400", "700", "900"],
    style: ["normal"],
    subsets: ["latin"],
    preload: false
})
const worksans = Work_Sans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal"],
    subsets: ["latin"],
    preload: false
})
 
export { outfit, zilla, lato, worksans }