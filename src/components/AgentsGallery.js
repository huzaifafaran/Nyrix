import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import './AgentsGallery.css';
import agents from './agentsData';

const CategoryRow = ({ category, items, onPick, selectedId }) => {
  const rowRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
    rowRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (rowRef.current) rowRef.current.style.scrollBehavior = 'smooth';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (rowRef.current) rowRef.current.style.scrollBehavior = 'smooth';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
    rowRef.current.style.scrollBehavior = 'auto';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const x = touch.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (rowRef.current) rowRef.current.style.scrollBehavior = 'smooth';
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-14">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-3xl font-display font-black text-nyrix-dark tracking-tighter uppercase">{category}</h3>
        <div className="text-[11px] font-bold text-nyrix-purple uppercase tracking-widest">
          {items.length} agent{items.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div 
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 hide-scrollbar cursor-grab active:cursor-grabbing" 
          ref={rowRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((agent) => (
            <motion.div
              key={agent.id}
              className={`flex-none w-[260px] sm:w-[280px] snap-start bg-white border border-black cursor-pointer transition-all duration-300 ${
                selectedId === agent.id 
                  ? 'border-nyrix-purple' 
                  : 'hover:border-nyrix-purple'
              }`}
              onClick={(e) => {
                if (isDragging) { e.preventDefault(); return; }
                if (onPick) onPick(agent);
              }}
            >
              <div className="h-[150px] relative bg-nyrix-light flex items-center justify-center p-6 border-b border-black">
                {agent.imageThumb ? (
                  <img className="w-full h-full object-contain" src={agent.imageThumb} alt={agent.title} />
                ) : (
                  <div className="w-full h-full opacity-90" style={{ background: agent.color }} />
                )}
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-2 block">{agent.subtitle}</span>
                <h4 className="text-xl font-display font-black tracking-tight text-nyrix-dark truncate">{agent.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AgentsGallery = () => {
  const [selected, setSelected] = React.useState(agents[0]);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [filteredAgents, setFilteredAgents] = React.useState(agents);

  const categories = ['All', ...new Set(agents.map(a => a.category))];

  const getGroupedAgents = () => {
    let filtered = agents;
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory === 'All') {
      const grouped = {};
      filtered.forEach(a => {
        if (!grouped[a.category]) grouped[a.category] = [];
        grouped[a.category].push(a);
      });
      return grouped;
    }
    return { [selectedCategory]: filtered.filter(a => a.category === selectedCategory) };
  };

  const groupedAgents = getGroupedAgents();

  React.useEffect(() => {
    let filtered = agents;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredAgents(filtered);
    if (filtered.length > 0 && !filtered.find(a => a.id === selected.id)) {
      setSelected(filtered[0]);
    }
  }, [searchTerm, selectedCategory, selected.id]);

  const openDetails = (agent) => {
    setSelected(agent);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const go = React.useCallback((dir) => {
    const currentFiltered = filteredAgents.length > 0 ? filteredAgents : agents;
    const idx = currentFiltered.findIndex(a => a.id === selected.id);
    const next = (idx + dir + currentFiltered.length) % currentFiltered.length;
    setSelected(currentFiltered[next]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filteredAgents, selected?.id]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const isGalleryFocused = e.target.closest('.agents-gallery-section');
      const isInputFocused = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      if (isGalleryFocused && !isInputFocused) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [go]);

  React.useEffect(() => setImageLoaded(false), [selected?.id]);

  return (
    <section className="agents-gallery-section relative pt-32 pb-24 bg-nyrix-light min-h-screen" tabIndex={0}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-8 mb-16 border-b border-black/10 pb-8">
          <div className="flex-1 flex items-center gap-3">
            <Search size={20} className="text-nyrix-purple" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b-2 border-black outline-none text-nyrix-dark placeholder-nyrix-dark/40 py-2 text-[13px] font-bold tracking-widest uppercase"
            />
          </div>
          <div className="flex-1 sm:max-w-xs flex items-center gap-3">
            <Filter size={20} className="text-nyrix-purple" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent border-b-2 border-black outline-none text-nyrix-dark py-2 min-w-0 text-[13px] font-bold tracking-widest uppercase cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Featured Section */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div 
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-20"
            >
              <div className="lg:col-span-3 relative aspect-video lg:aspect-square border-2 border-black bg-white flex items-center justify-center p-8 group">
                {!imageLoaded && <div className="absolute inset-0 bg-nyrix-dark/5 animate-pulse" />}
                {selected.imageHero ? (
                  <img
                    src={selected.imageHero}
                    alt={selected.title}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                    className={`w-full h-full object-contain transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  />
                ) : (
                  <div className="w-full h-full opacity-90" style={{ background: selected.color || '#000' }} />
                )}
                
                {/* Navigation Arrows */}
                <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-black flex items-center justify-center text-nyrix-dark hover:text-nyrix-purple transition-colors opacity-0 group-hover:opacity-100 invisible group-hover:visible">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-black flex items-center justify-center text-nyrix-dark hover:text-nyrix-purple transition-colors opacity-0 group-hover:opacity-100 invisible group-hover:visible">
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center py-6">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-nyrix-purple mb-4">
                  {selected.subtitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-display font-black text-nyrix-dark leading-none mb-8 tracking-tighter uppercase">
                  {selected.title}.
                </h2>
                <p className="text-lg text-nyrix-dark/70 leading-relaxed mb-10 font-medium">
                  {selected.fullDescription}
                </p>
                
                <h4 className="text-[11px] font-bold tracking-[0.25em] text-nyrix-dark uppercase mb-6">Key Capabilities</h4>
                <ul className="space-y-4 mb-12 border-l border-black/10 pl-6">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4 text-nyrix-dark/70 font-medium text-[16px]">
                      <span className="text-nyrix-purple font-mono">{"//"}</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank')}
                  className="px-10 py-5 bg-nyrix-dark text-white font-bold tracking-widest uppercase text-[13px] hover:bg-black transition-all w-full sm:w-auto text-center outline-none"
                >
                  Request Demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Netflix style rows */}
        <div className="space-y-4">
          {Object.entries(groupedAgents).map(([cat, items]) => (
            <CategoryRow key={cat} category={cat} items={items} onPick={openDetails} selectedId={selected?.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsGallery;
