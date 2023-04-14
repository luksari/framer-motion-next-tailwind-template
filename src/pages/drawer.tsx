import { motion, AnimatePresence, useCycle } from 'framer-motion';

const links = [
  { name: 'Home', to: '#home', id: 1 },
  { name: 'About', to: '#about', id: 2 },
  { name: 'Blog', to: '#blog', id: 3 },
  { name: 'Contact', to: '#contact', id: 4 },
];

const menuItemsVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const drawerVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export default function DrawerPage() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="mb-16 relative place-items-center">
          <h1 className="text-5xl font-bold text-center">Drawer example</h1>
        </div>
        <button
          className="group rounded-lg border border-transparent px-5 py-4 bg-indigo-700 transition-colors hover:border-gray-800 hover:bg-indigo-800 text-2xl font-bold"
          onClick={() => toggleOpen()}
        >
          Open drawer
        </button>
      </main>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="w-[300px] h-screen fixed top-0 left-0 py-4 z-20" key="aside-wrapper">
              <motion.aside
                key="aside"
                className="bg-indigo-900 text-white shadow-lg w-full h-full p-5 rounded-r-lg"
                initial={{ x: -300 }}
                animate={{
                  x: 0,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  x: -300,
                  transition: { delay: 0.7, duration: 0.3 },
                }}
              >
                <motion.div
                  className="w-full z-10 flex flex-col px-4 py-2"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={drawerVariants}
                >
                  {links.map(({ name, to, id }) => (
                    <motion.a
                      className="text-3xl py-6 px-4"
                      key={id}
                      href={to}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleOpen(0)}
                      variants={menuItemsVariants}
                    >
                      {name}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.aside>
            </div>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 0.2 },
              }}
              exit={{
                opacity: 0,
              }}
              className="bg-indigo-950/30 backdrop-blur-sm fixed h-full w-full flex items-center justify-center top-0 left-0 z-10"
              onClick={() => toggleOpen(0)}
            >
              <span className="absolute bg-red-500 py-2 px-8 -right-[200px] -rotate-90 opacity-70 text-4xl font-bold sm:-right-[50px] md:-right-0">
                Click backdrop to close
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
