import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div className={font.className}>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </div>
  );
}
