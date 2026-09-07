import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Github from './components/sections/Github';
import Settings from './components/sections/Settings';

/*
  <Route path="..." element={...} /> is the actual mapping: "when the
  URL matches this path, render this component." Nesting them inside
  the parent <Route element={<Layout />}> means every one of these
  pages renders *inside* Layout's <Outlet />, so they all share the
  same VS Code chrome without each page needing to re-render it.
*/
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/github" element={<Github />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
